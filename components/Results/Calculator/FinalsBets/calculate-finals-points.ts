import { type GameInterface } from "~/types/games";
import { type PointsInterface } from "~/types/results";
import { type BetFinalsInterface } from "~/types/teams";

import { ACCURATE_FINALS_TEAM_POINTS } from "~/constants/calculator";

export function calculateFinalsPoints(
  currentPoints: PointsInterface | undefined,
  teamBet: BetFinalsInterface["teamBet"],
  finalGame: GameInterface,
): PointsInterface {
  let points = currentPoints?.currentPoints || 0;
  let livePoints = currentPoints?.currentLivePoints || 0;
  const accurateScores = currentPoints?.currentAccurateScores || 0;
  const liveAccurateScores = currentPoints?.currentLiveAccurateScores || 0;
  const goalsDifferenceSum = currentPoints?.currentGoalsDifferenceSum || 0;
  const liveGoalsDifferenceSum =
    currentPoints?.currentLiveGoalsDifferenceSum || 0;

  if (!(teamBet instanceof Array) || teamBet.length !== 2) {
    return {
      currentPoints: points,
      currentLivePoints: livePoints,
      currentAccurateScores: accurateScores,
      currentLiveAccurateScores: liveAccurateScores,
      currentGoalsDifferenceSum: goalsDifferenceSum,
      currentLiveGoalsDifferenceSum: liveGoalsDifferenceSum,
    };
  }

  const normalize = (value: string) => value.trim().toUpperCase();
  const finalists = new Set([
    normalize(finalGame.awayTeamName),
    normalize(finalGame.homeTeamName),
  ]);

  const hitsCount = teamBet
    .map((bet) => normalize(bet.name || ""))
    .filter((name) => finalists.has(name)).length;

  if (hitsCount >= 1) {
    points += ACCURATE_FINALS_TEAM_POINTS;
    livePoints += ACCURATE_FINALS_TEAM_POINTS;
  }
  if (hitsCount === 2) {
    points += ACCURATE_FINALS_TEAM_POINTS;
    livePoints += ACCURATE_FINALS_TEAM_POINTS;
  }

  const newPoints: PointsInterface = {
    currentPoints: points,
    currentLivePoints: livePoints,
    currentAccurateScores: accurateScores,
    currentLiveAccurateScores: liveAccurateScores,
    currentGoalsDifferenceSum: goalsDifferenceSum,
    currentLiveGoalsDifferenceSum: liveGoalsDifferenceSum,
  };

  return newPoints;
}
