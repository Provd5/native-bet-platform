import { type GameInterface } from "~/types/games";

export const WINNER_POINTS: number = 1;
export const ACCURATE_SCORE_POINTS: number = 2;
export const ACCURATE_SCORE_AND_WINNER_BONUS_POINTS: number = 0;
export const ACCURATE_FINALS_TEAM_POINTS: number = 3;

export const STAGE_MULTIPLIERS: { [key in GameInterface["stage"]]: number } = {
  FINAL: 1,
  SEMI_FINALS: 1,
  QUARTER_FINALS: 1,
  LAST_16: 1,
  GROUP_STAGE: 1,
  REGULAR_SEASON: 1,
};

export const PENALTY_USERS_IDS: string[] = [];
