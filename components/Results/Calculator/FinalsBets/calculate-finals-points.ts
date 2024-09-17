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

  const finals_team_hit = teamBet.some(
    (bet) =>
      bet.name === finalGame.awayTeamName ||
      bet.name === finalGame.homeTeamName,
  );
  const double_finals_team_hit = teamBet.every(
    (bet) =>
      bet.name === finalGame.awayTeamName ||
      bet.name === finalGame.homeTeamName,
  );
  if (finals_team_hit) {
    points += ACCURATE_FINALS_TEAM_POINTS;
    livePoints += ACCURATE_FINALS_TEAM_POINTS;
  }
  if (double_finals_team_hit) {
    points += ACCURATE_FINALS_TEAM_POINTS;
    livePoints += ACCURATE_FINALS_TEAM_POINTS;
  }

  const newPoints: PointsInterface = {
    currentPoints: points,
    currentLivePoints: livePoints,
    currentAccurateScores: accurateScores,
    currentLiveAccurateScores: liveAccurateScores,
  };

  return newPoints;
}
