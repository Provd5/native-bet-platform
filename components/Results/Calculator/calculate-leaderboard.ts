import { type ResultInterface } from "~/types/results";

import { calculatePositions } from "./calculate-positions";
import { compareLiveResults, compareResults } from "./compare";

export const calculateLeaderboard = (
  userResultsMap: Map<string, ResultInterface>,
) => {
  const leaderboard: ResultInterface[] = Array.from(userResultsMap.values());

  // Calculate current positions for finished matches
  calculatePositions(leaderboard, compareResults);
  const initialPositions = new Map<string, number>();
  leaderboard.forEach((result) => {
    initialPositions.set(result.userId, result.currentPosition);
  });

  // Calculate current positions for live + finished matches
  calculatePositions(leaderboard, compareLiveResults);
  // Calculate live positions advance
  leaderboard.forEach((result) => {
    const initialPosition = initialPositions.get(result.userId);
    if (initialPosition !== undefined) {
      result.livePositionAdvance = initialPosition - result.currentPosition;
    }
  });

  return leaderboard;
};
