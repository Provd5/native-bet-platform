type MatchStatus = (typeof MatchStatusArray)[number];
export const MatchStatusArray = [
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

type MatchStage = (typeof MatchStageArray)[number];
export const MatchStageArray = [
  "REGULAR_SEASON",
  "GROUP_STAGE",
  "LAST_16",
  "QUARTER_FINALS",
  "SEMI_FINALS",
  "FINAL",
] as const;

export type MatchWinner = (typeof MatchWinnerArray)[number];
export const MatchWinnerArray = ["HOME_TEAM", "AWAY_TEAM", "DRAW"] as const;

export type constantsToTranslate = MatchStatus | MatchStage | MatchWinner;

export interface GameInterface {
  id: string | number;
  awayTeamIcon: string;
  awayTeamName: string;
  homeTeamIcon: string;
  homeTeamName: string;
  fullTimeScore?: {
    away: number;
    home: number;
    winner: MatchWinner;
  };
  regularTimeScore?: {
    away: number;
    home: number;
    winner: MatchWinner;
  };
  status: MatchStatus;
  stage: MatchStage;
  timestamp: number;
}

export interface BetInterface {
  id: string;
  username: string;
  userId: string;
  gameId: GameInterface["id"];
  awayGoals: number;
  homeGoals: number;
  winner: MatchWinner;
  gameStage: MatchStage;
}
