# Ranking Feature — Frontend Implementation Guide

Frontend-only reference for building the ranking screen in a TypeScript web app connected to the same Firebase project.

---

## Data Source

The ranking lives in **Firebase Realtime Database** (not Firestore).

```
Path: ranking/entries
```

The entries array is pre-computed and sorted server-side. Read it as-is; no client-side sorting is needed.

---

## Data Schema

Each entry at `ranking/entries[n]`:

```typescript
interface RankingEntry {
  id: string;            // Firebase Auth user ID
  username: string;
  position: number;      // 1-based rank
  totalPoints: number;
  correctScores: number; // exact score predictions
  correctOutcomes: number; // correct winner predictions (incl. those that were also exact)
  positionChange: number; // live delta: positive = moved up, negative = moved down, 0 = unchanged
  goalDifference: number; // tiebreaker: sum of |predictedGoals - actualGoals|, lower = better
  photoURL?: string;     // user avatar URL, may be absent
}
```

**`positionChange`** is non-zero only while a match is currently in play. It reflects how the live score would shift the ranking compared to using only finished matches. Show it as an up/down indicator; hide it when 0.

**`goalDifference`** is a tiebreaker field added later — default to 0 if the key is missing.

---

## Reading the Data

### One-time fetch

```typescript
import { getDatabase, ref, get } from "firebase/database";

async function fetchRanking(): Promise<RankingEntry[]> {
  const db = getDatabase();
  const snapshot = await get(ref(db, "ranking/entries"));
  if (!snapshot.exists()) return [];

  const val = snapshot.val();
  // RTDB may return an object keyed by index or a plain array
  const raw: unknown[] = Array.isArray(val) ? val : Object.values(val);
  return raw.filter(Boolean) as RankingEntry[];
}
```

### Live subscription (recommended for ranking screen)

The ranking updates in real time when matches are live. Subscribe while the component is mounted.

```typescript
import { getDatabase, ref, onValue, off } from "firebase/database";

function subscribeRanking(onUpdate: (entries: RankingEntry[]) => void): () => void {
  const db = getDatabase();
  const rankingRef = ref(db, "ranking/entries");

  onValue(rankingRef, (snapshot) => {
    if (!snapshot.exists()) { onUpdate([]); return; }
    const val = snapshot.val();
    const raw: unknown[] = Array.isArray(val) ? val : Object.values(val);
    onUpdate(raw.filter(Boolean) as RankingEntry[]);
  });

  return () => off(rankingRef); // call this to unsubscribe
}
```

---

## Display Logic

### Row layout (left → right)

```
[Avatar + rank badge]  [Username / stats subtitle]  [spacer]  [Points + "pkt"]
```

- **Avatar**: round, with the rank number overlaid on top
- **Username**: primary text
- **Stats subtitle**: `"Dok.: {correctScores} | Wynik: {correctOutcomes}"` in secondary style
- **Points**: large number + small "pkt" label

### Highlight current user

If `entry.id === currentUser.uid`, apply a distinct background tint to the row (e.g. primary color at low opacity).

### Position badge colors (podium)

```typescript
function podiumColor(position: number): string {
  switch (position) {
    case 1: return "rgb(212, 175, 55)";  // Gold
    case 2: return "rgb(167, 167, 173)"; // Silver
    case 3: return "rgb(176, 141, 87)";  // Bronze
    default: return "transparent";
  }
}
```

For positions 1–3, tint the avatar overlay with the podium color (e.g. 55% opacity). For others use a neutral dark tint (~35% opacity black) so the rank number stays readable.

### Position change indicator

Show only when `entry.positionChange !== 0`. Display as a small pill/badge below the avatar:

- `positionChange > 0` → green arrow up + number (moved up in ranking)
- `positionChange < 0` → red arrow down + number (moved down)

```typescript
const magnitude = Math.abs(entry.positionChange);
const isUp = entry.positionChange > 0;
// render: ↑3 in green pill  or  ↓2 in red pill
```

---

## Loading States

### While data hasn't loaded yet
Show skeleton rows (placeholder shimmer cards) — 8 rows is a good default.

### After load with empty data
Show an empty state (e.g. trophy icon + "Ranking jest pusty").

### Suggested state shape

```typescript
const [ranking, setRanking] = useState<RankingEntry[]>([]);
const [hasLoaded, setHasLoaded] = useState(false);

// hasLoaded = false → show skeletons
// hasLoaded = true, ranking.length === 0 → show empty state
// hasLoaded = true, ranking.length > 0 → show rows
```

---

## Row Tap / User Detail

Tapping a row should open that user's individual bets view. Pass `entry.id`, `entry.username`, and `entry.photoURL` to the detail component.

---

## TypeScript Type

```typescript
interface RankingEntry {
  id: string;
  username: string;
  position: number;
  totalPoints: number;
  correctScores: number;
  correctOutcomes: number;
  positionChange: number;
  goalDifference: number;
  photoURL?: string;
}
```
