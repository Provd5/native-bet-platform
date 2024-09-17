import { type BetInterface, type GameInterface } from "~/types/games";
import { type PointsInterface } from "~/types/results";

import {
  ACCURATE_SCORE_AND_WINNER_BONUS_POINTS,
  ACCURATE_SCORE_POINTS,
  WINNER_POINTS,
} from "~/constants/calculator";
import { multiplyResult } from "~/lib/utils";

export function calculateBetsPoints(
  currentPoints: PointsInterface | undefined,
  bet: BetInterface,
  game: GameInterface,
): PointsInterface {
  let points = currentPoints?.currentPoints || 0;
  let livePoints = currentPoints?.currentLivePoints || 0;
  let accurateScores = currentPoints?.currentAccurateScores || 0;
  let liveAccurateScores = currentPoints?.currentLiveAccurateScores || 0;

  const away_goals_hit = bet.awayGoals === game.regularTimeScore?.away;
  const home_goals_hit = bet.homeGoals === game.regularTimeScore?.home;
  const accurate_score_hit = away_goals_hit && home_goals_hit;
  const winner_hit = bet.winner === game.regularTimeScore?.winner;
  const accurate_score_and_winner_hit =
    away_goals_hit && home_goals_hit && winner_hit;

  const isGameFinished = game.status === "FINISHED";
  const isGameInPlayOrFinished =
    game.status === "FINISHED" ||
    game.status === "IN_PLAY" ||
    game.status === "PAUSED";

  if (winner_hit) {
    points += isGameFinished ? WINNER_POINTS : 0;
    livePoints += isGameInPlayOrFinished ? WINNER_POINTS : 0;
  }
  if (accurate_score_hit) {
    points += isGameFinished ? ACCURATE_SCORE_POINTS : 0;
    livePoints += isGameInPlayOrFinished ? ACCURATE_SCORE_POINTS : 0;

    accurateScores += isGameFinished ? 1 : 0;
    liveAccurateScores += isGameInPlayOrFinished ? 1 : 0;
  }
  if (accurate_score_and_winner_hit) {
    points += ACCURATE_SCORE_AND_WINNER_BONUS_POINTS;
  }

  const multiplier = multiplyResult(game.stage);
  points *= multiplier;
  livePoints *= multiplier;

  return {
    currentPoints: points,
    currentLivePoints: livePoints,
    currentAccurateScores: accurateScores,
    currentLiveAccurateScores: liveAccurateScores,
  };
}
