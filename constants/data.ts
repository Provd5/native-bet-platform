export type DataStatus = "error" | "success" | "pending";

export type MatchStatus = (typeof MATCH_STATUS_ARRAY)[number];
export const MATCH_STATUS_ARRAY = [
  "TIMED",
  "SCHEDULED",
  "LIVE",
  "IN_PLAY",
  "PAUSED",
  "FINISHED",
  "POSTPONED",
  "SUSPENDED",
  "CANCELLED",
] as const;

export type MatchStage = (typeof MATCH_STAGE_ARRAY)[number];
export const MATCH_STAGE_ARRAY = [
  "REGULAR_SEASON",
  "GROUP_STAGE",
  "LAST_16",
  "QUARTER_FINALS",
  "SEMI_FINALS",
  "FINAL",
] as const;

export type MatchWinner = (typeof MATCH_WINNER_ARRAY)[number];
export const MATCH_WINNER_ARRAY = ["HOME_TEAM", "AWAY_TEAM", "DRAW"] as const;

export const CONSTANT_TRANSLATIONS = {
  HOME_TEAM: "Gospodarze",
  AWAY_TEAM: "Goście",
  DRAW: "Remis",
  TIMED: "Nadchodzi",
  SCHEDULED: "Zaplanowany",
  LIVE: "Na żywo",
  IN_PLAY: "Trwa",
  PAUSED: "Przerwa",
  FINISHED: "Koniec",
  POSTPONED: "Przełożony",
  SUSPENDED: "Zawieszony",
  CANCELLED: "Anulowany",
  GROUP_STAGE: "Grupowa",
  LAST_16: "1/8 finału",
  QUARTER_FINALS: "1/4 finału",
  SEMI_FINALS: "Półfinał",
  FINAL: "Finał",
  REGULAR_SEASON: "Liga",
} as const;
