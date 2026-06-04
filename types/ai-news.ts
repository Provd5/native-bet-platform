export type AINewsKind = "hotTake" | "weeklyBrief";

export interface AINewsItem {
  id: string;
  kind: AINewsKind;
  title: string;
  body: string;
  createdAt: Date | null;
  gameId?: number;
  sources: string[];
  reactionsByUserId: Record<string, string>;
}

export interface AINewsReaction {
  emoji: string;
  count: number;
  isSelected: boolean;
}
