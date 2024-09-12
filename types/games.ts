import { MatchStage, MatchStatus, MatchWinner } from "~/lib/constants";

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
