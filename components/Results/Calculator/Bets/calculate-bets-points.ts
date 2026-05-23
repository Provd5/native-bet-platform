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
  const basePoints = currentPoints?.currentPoints || 0;
  const baseLivePoints = currentPoints?.currentLivePoints || 0;
  let accurateScores = currentPoints?.currentAccurateScores || 0;
  let liveAccurateScores = currentPoints?.currentLiveAccurateScores || 0;
  let pointsDelta = 0;
  let livePointsDelta = 0;

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
    pointsDelta += isGameFinished ? WINNER_POINTS : 0;
    livePointsDelta += isGameInPlayOrFinished ? WINNER_POINTS : 0;
  }
  if (accurate_score_hit) {
    pointsDelta += isGameFinished ? ACCURATE_SCORE_POINTS : 0;
    livePointsDelta += isGameInPlayOrFinished ? ACCURATE_SCORE_POINTS : 0;

    accurateScores += isGameFinished ? 1 : 0;
    liveAccurateScores += isGameInPlayOrFinished ? 1 : 0;
  }
  if (accurate_score_and_winner_hit && isGameFinished) {
    pointsDelta += ACCURATE_SCORE_AND_WINNER_BONUS_POINTS;
  }

  const multiplierValue = multiplyResult(game.stage);
  const multiplier = typeof multiplierValue === "number" ? multiplierValue : 1;
  const points = basePoints + pointsDelta * multiplier;
  const livePoints = baseLivePoints + livePointsDelta * multiplier;

  return {
    currentPoints: points,
    currentLivePoints: livePoints,
    currentAccurateScores: accurateScores,
    currentLiveAccurateScores: liveAccurateScores,
  };
}
