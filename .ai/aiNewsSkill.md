# AI News Feature — Implementation Guide

This document describes the full working schema of the AI News feature from the **Betowanie** iOS app so you can port it to a TypeScript web app that also talks to Firestore.

---

## Overview

AI News generates short, AI-written commentary cards and displays them as a live feed. The only type currently implemented is **hotTake** — a satirical post-match comment automatically triggered when a match finishes.

---

## Firestore Data Schema

### Collection: `aiNews`

Each document is one news item. Auto-generated document ID.

| Field | Type | Required | Notes |
|---|---|---|---|
| `kind` | `"hotTake"` \| `"weeklyBrief"` | yes | Determines display style |
| `title` | `string` | yes | Human-readable title, e.g. `"Poland 2-1 Germany"` |
| `body` | `string` | yes | AI-generated text content |
| `createdAt` | `Timestamp` | yes | Server timestamp (`FieldValue.serverTimestamp()`) |
| `gameId` | `number` | hotTake only | Which match triggered this item |
| `sources` | `string[]` | no | Optional list of source URLs (currently always empty) |
| `reactionsByUserId` | `{ [userId: string]: string }` | no | Map of userId → emoji string |

**Example document:**
```json
{
  "kind": "hotTake",
  "gameId": 42,
  "title": "Poland 2-1 Germany",
  "body": "Kasia trafiła w dziesiątkę, a reszta jak zwykle patrzyła przez palce.",
  "createdAt": "<server timestamp>",
  "sources": [],
  "reactionsByUserId": {
    "user_abc": "🔥",
    "user_xyz": "😂"
  }
}
```

**Firestore index required:** `createdAt DESC` on the `aiNews` collection (Firestore creates this automatically on first query with `.orderBy`).

---

## Backend: Cloud Function

The generation is a Firebase Cloud Function that runs on the Firebase Admin SDK (Node.js). Adapt this logic to whichever serverless runtime your web app uses (Cloud Functions, Cloud Run, etc.).

### Trigger

```
Realtime Database path: /matches/{key}/status
Event: onValueWritten
```

Fire when the `status` field of any match changes. Abort unless:
- New value is `"FINISHED"`
- Old value was NOT already `"FINISHED"` (prevents re-firing on unrelated writes)

### Deduplication guard

Before generating, check if a hot take already exists for this match:

```typescript
const existing = await firestore
  .collection("aiNews")
  .where("kind", "==", "hotTake")
  .where("gameId", "==", match.id)
  .limit(1)
  .get();

if (!existing.empty) return; // already generated, skip
```

### Data to gather (run in parallel)

Three things are fetched concurrently before building the prompt:

1. **Bet summary for the match** — from Firestore `bets` collection, filtered by `gameId`. For each bet, compute points awarded.
2. **Ranking snapshot** — from Realtime Database `ranking/entries`, sorted by position, top 18 entries.
3. **Recent AI News** — from Firestore `aiNews`, ordered by `createdAt DESC`, limit 10. Used to avoid repeating the same jokes.

### Bet point computation

```typescript
function computeBetPoints(bet: Bet, regularTimeScore: Score, stage: string): number {
  const winnerHit = bet.winner === regularTimeScore.winner;
  const scoreHit = bet.homeGoals === regularTimeScore.home
                && bet.awayGoals === regularTimeScore.away;

  let pts = 0;
  if (winnerHit) pts += 1;
  if (scoreHit)  pts += 2;           // 3 total for exact score

  return pts * (STAGE_POINT_MULTIPLIER[stage] ?? 1);
}
```

Scoring summary: **3 pts** = exact score, **1 pt** = correct winner only, **0 pts** = miss.

### Prompt construction

Build a plain-text prompt with these sections (in order):

```
1. Persona instruction
   - Who the AI is (satirical, crude commentator for a Polish betting app)
   - Hard limits (no advice to players, no moralising, max 3 sentences / 240 chars)

2. Bet results section
   - Header: "WYNIKI NASZYCH TYPERÓW (sortowane od najlepszego):"
   - One bullet per player: "• {username}: typ {homeGoals}-{awayGoals} ({winner}) → {points} pkt"
   - If nobody bet: "(nikt nie obstawił tego meczu)"

3. Ranking section
   - Header: "AKTUALNY RANKING (pozycja, punkty, dokładne wyniki):"
   - One bullet per player: "• {position}. {username} — {points} pkt, {accurateScores} dokładnych"

4. Anti-repetition section
   - Header: "POPRZEDNIE AI NEWSY (nie powtarzaj tego samego żartu, struktury ani pointy):"
   - One bullet per recent item: "• {title}: {body}"

5. Match context
   - "Mecz: {home} vs {away}"
   - "Wynik: {home_score}-{away_score}"
   - "Faza turnieju: {stage}"
```

The persona instructions and player nicknames/trivia are app-specific and can be replaced with whatever fits your app's tone and user list.

### AI call (Google Gemini)

```typescript
import { GoogleGenAI, ThinkingLevel, HarmCategory, HarmBlockThreshold } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const result = await ai.models.generateContent({
  model: "gemini-2.5-flash",   // or whichever Gemini model you prefer
  contents: prompt,
  config: {
    temperature: 0.9,
    thinkingConfig: { thinkingLevel: ThinkingLevel.MEDIUM },
    safetySettings: [
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.OFF },
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT,        threshold: HarmBlockThreshold.OFF },
    ],
  },
});

const body = result?.text?.trim() ?? "";
```

Use `ThinkingLevel.MEDIUM` for better commentary quality. Safety thresholds are relaxed because the prompt intentionally produces crude/satirical content.

### Write to Firestore

```typescript
await firestore.collection("aiNews").add({
  kind: "hotTake",
  gameId: match.id,
  title: `${homeTeamName} ${homeScore}-${awayScore} ${awayTeamName}`,
  body,
  createdAt: FieldValue.serverTimestamp(),
  sources: [],
  reactionsByUserId: {},
});
```

---

## Client: Reading AI News

### Fetch (one-time)

```typescript
const snapshot = await firestore
  .collection("aiNews")
  .orderBy("createdAt", "desc")
  .limit(6)
  .get();

const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
```

### Live subscription (real-time)

```typescript
const unsubscribe = firestore
  .collection("aiNews")
  .orderBy("createdAt", "desc")
  .limit(6)
  .onSnapshot(snapshot => {
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAiNews(items);
  });

// Call unsubscribe() on component unmount
```

The live subscription is important: when a new hot take is generated (right after a match finishes), it appears automatically without the user needing to refresh.

---

## Client: Reactions

Each news item supports per-user emoji reactions stored in `reactionsByUserId`.

### Set a reaction

```typescript
await firestore.collection("aiNews").doc(newsId).set(
  { reactionsByUserId: { [userId]: emoji } },
  { merge: true }
);
```

### Remove a reaction

```typescript
import { deleteField } from "firebase/firestore";

await firestore.collection("aiNews").doc(newsId).update({
  [`reactionsByUserId.${userId}`]: deleteField(),
});
```

### Aggregate for display

Group by emoji, count, mark the current user's own reaction as selected:

```typescript
const grouped = Object.entries(reactionsByUserId).reduce((acc, [uid, emoji]) => {
  acc[emoji] = (acc[emoji] ?? []);
  acc[emoji].push(uid);
  return acc;
}, {} as Record<string, string[]>);

const displayReactions = Object.entries(grouped)
  .map(([emoji, users]) => ({
    emoji,
    count: users.length,
    isSelected: users.includes(currentUserId),
  }))
  .sort((a, b) => {
    if (a.isSelected !== b.isSelected) return a.isSelected ? -1 : 1;
    if (b.count !== a.count) return b.count - a.count;
    return a.emoji.localeCompare(b.emoji);
  });
```

---

## TypeScript Types

```typescript
type AINewsKind = "hotTake" | "weeklyBrief";

interface AINewsItem {
  id: string;                          // Firestore document ID
  kind: AINewsKind;
  title: string;
  body: string;
  createdAt: Date | null;              // convert from Firestore Timestamp
  gameId?: number;                     // hotTake only
  sources: string[];
  reactionsByUserId: Record<string, string>; // userId → emoji
}
```

---

## Manual Test Endpoint

The backend also exposes an HTTP endpoint (`testGenerateAINews`) for triggering generation manually without waiting for a real match to finish. Useful during development:

```
GET /testGenerateAINews?kind=hotTake&gameId=42&dryRun=true
```

- `dryRun=true` (default): generates and returns the result but does NOT write to Firestore
- `dryRun=false`: generates AND writes the document

---
