# Emoji Reactions — Frontend Implementation Guide

Reactions exist in two contexts that share the same UI patterns but use different Firestore paths.

---

## Emoji List

The full allowed set (66 emojis, displayed in a 6-column grid):

```typescript
export const ALL_EMOJIS: string[] = [
  "😀", "😁", "😂", "🤣", "😄", "😅",  // smiling / laughing
  "😇", "😍", "🥰", "🤩", "😎", "🥳",  // love / cool / fun
  "😏", "🙃", "🫠", "😜", "🤪", "😮",  // fun / silly / surprised
  "😯", "🫡", "🫢", "🫣", "🤯", "😱",  // surprised / shocked
  "😤", "😡", "😬", "😵", "🫥", "🥹",  // angry / stress
  "😢", "😭", "🤔", "🤨", "🧐", "😴",  // sad / thinking
  "🥵", "🥶", "🤡", "👻", "💀", "💩",  // extreme / gross
  "🤦", "👀", "💪", "🤞", "👏", "🙌",  // gestures
  "🤝", "🙏", "❤️", "💚", "💔", "🫶",  // hands / hearts
  "✅", "❌", "🔥", "✨", "💥", "⚡️",  // symbols / elements
  "🌪️", "🏆", "🎉", "🍿", "🚀", "🐐",  // weather / objects
];
```

---

## Firestore Data Structure

### Match reactions

Each match has one Firestore document. The document is a flat map of `userId → emoji`.

```
Collection: reactions
Document ID: {matchId}   (number as string, e.g. "42")
Fields: { [userId: string]: string }
```

Example document at `reactions/42`:
```json
{
  "user_abc": "🔥",
  "user_xyz": "😂",
  "user_def": "🏆"
}
```

### AI News reactions

Reactions are stored as a submap inside the news document itself.

```
Collection: aiNews
Document ID: {auto-generated}
Field: reactionsByUserId: { [userId: string]: string }
```

---

## Reading Reactions

### Match reactions — live subscription

```typescript
import { getFirestore, doc, onSnapshot } from "firebase/firestore";

function subscribeMatchReactions(
  matchId: number,
  onUpdate: (reactions: Record<string, string>) => void
): () => void {
  const db = getFirestore();
  const ref = doc(db, "reactions", String(matchId));

  return onSnapshot(ref, (snapshot) => {
    if (!snapshot.exists()) { onUpdate({}); return; }
    const data = snapshot.data() as Record<string, unknown>;
    // Filter to string values only
    const reactions = Object.fromEntries(
      Object.entries(data).filter(([, v]) => typeof v === "string")
    ) as Record<string, string>;
    onUpdate(reactions);
  });
}
```

### AI News reactions — live subscription

The entire `aiNews` collection is already subscribed for the feed. Extract `reactionsByUserId` from each document — no separate subscription needed.

```typescript
const reactions: Record<string, string> = newsItem.reactionsByUserId ?? {};
```

---

## Writing Reactions

### Set a reaction (match)

```typescript
import { getFirestore, doc, setDoc } from "firebase/firestore";

async function setMatchReaction(matchId: number, userId: string, emoji: string) {
  const db = getFirestore();
  await setDoc(
    doc(db, "reactions", String(matchId)),
    { [userId]: emoji },
    { merge: true }
  );
}
```

### Remove a reaction (match)

```typescript
import { getFirestore, doc, updateDoc, deleteField } from "firebase/firestore";

async function removeMatchReaction(matchId: number, userId: string) {
  const db = getFirestore();
  await updateDoc(doc(db, "reactions", String(matchId)), {
    [userId]: deleteField(),
  });
}
```

### Set a reaction (AI News)

```typescript
await setDoc(
  doc(db, "aiNews", newsId),
  { reactionsByUserId: { [userId]: emoji } },
  { merge: true }
);
```

### Remove a reaction (AI News)

```typescript
await updateDoc(doc(db, "aiNews", newsId), {
  [`reactionsByUserId.${userId}`]: deleteField(),
});
```

### Toggle helper (reuse for both contexts)

Pass the current user's reaction. If the user taps the same emoji again, pass `null` to remove.

```typescript
async function toggleReaction(
  current: string | null,
  tapped: string,
  set: (e: string) => Promise<void>,
  remove: () => Promise<void>
) {
  if (current === tapped) {
    await remove();    // tapping own reaction deselects it
  } else {
    await set(tapped);
  }
}
```

---

## Aggregating for Display

Takes the raw `{ [userId]: emoji }` map and produces display-ready chips, sorted with the current user's reaction first.

```typescript
interface ReactionChip {
  emoji: string;
  count: number;
  isSelected: boolean;
}

function aggregateReactions(
  reactionsByUserId: Record<string, string>,
  currentUserId: string | null
): ReactionChip[] {
  const grouped: Record<string, number> = {};
  for (const emoji of Object.values(reactionsByUserId)) {
    grouped[emoji] = (grouped[emoji] ?? 0) + 1;
  }

  const currentUserReaction = currentUserId
    ? reactionsByUserId[currentUserId] ?? null
    : null;

  return Object.entries(grouped)
    .map(([emoji, count]) => ({
      emoji,
      count,
      isSelected: emoji === currentUserReaction,
    }))
    .sort((a, b) => {
      if (a.isSelected !== b.isSelected) return a.isSelected ? -1 : 1;
      if (b.count !== a.count) return b.count - a.count;
      return a.emoji.localeCompare(b.emoji);
    });
}
```

---

## Reactions Bar UI

Shown at the bottom of every match card and AI news card.

```
[🔥 3] [😂 1] [🏆 1]  [😊+]
```

- Each chip: `{emoji} {count}` inside a pill/capsule
- Selected chip: slightly highlighted background + stronger border
- Unselected chip: lighter background + faint border
- **Add button** (smiley icon): shown only when the current user has no reaction yet
- Clicking any chip (selected or not) opens the picker modal
- Disable all chips while an update is in-flight to prevent double-writes

---

## Reaction Picker Modal

A bottom sheet with two tabs.

### Tab 1 — Emoji grid ("Wybierz")

- 6 columns, all 66 emojis from `ALL_EMOJIS`
- Currently selected emoji has a highlighted background (e.g. primary color at 16% opacity)
- Tapping an emoji calls `onSelect(emoji)` and closes the modal
- Tapping the already-selected emoji calls `onSelect(null)` (deselect) and closes

### Tab 2 — Users list ("Reakcje (N)")

Shows who reacted and with what, one row per user.

Row layout: `[avatar 32px]  [username]  [spacer]  [emoji]`

**Sort order:**
1. Current user always first
2. Then alphabetically by emoji
3. Then alphabetically by username

To resolve `userId → username + photoURL`, join against the ranking data (already loaded in-app).

```typescript
interface UserReactionEntry {
  userId: string;
  username: string;
  photoURL?: string;
  emoji: string;
}

function buildUserReactions(
  reactionsByUserId: Record<string, string>,
  rankingById: Record<string, { username: string; photoURL?: string }>,
  currentUserId: string | null
): UserReactionEntry[] {
  return Object.entries(reactionsByUserId)
    .map(([userId, emoji]) => ({
      userId,
      username: rankingById[userId]?.username ?? "Użytkownik",
      photoURL: rankingById[userId]?.photoURL,
      emoji,
    }))
    .sort((a, b) => {
      if ((a.userId === currentUserId) !== (b.userId === currentUserId)) {
        return a.userId === currentUserId ? -1 : 1;
      }
      if (a.emoji !== b.emoji) return a.emoji.localeCompare(b.emoji);
      return a.username.localeCompare(b.username, undefined, { sensitivity: "base" });
    });
}
```

Empty state: show a placeholder when `reactionsByUserId` is empty.

---

## Summary of Firestore Paths

| Context | Read | Write (set) | Write (remove) |
|---|---|---|---|
| Match | `reactions/{matchId}` (live) | `setDoc` merge `{ [userId]: emoji }` | `updateDoc` `{ [userId]: deleteField() }` |
| AI News | inside `aiNews/{newsId}.reactionsByUserId` (already subscribed) | `setDoc` merge `{ reactionsByUserId: { [userId]: emoji } }` | `updateDoc` `{ reactionsByUserId.{userId}: deleteField() }` |
