import { type ResultInterface } from "~/types/results";

export function compareLiveResults(
  a: ResultInterface,
  b: ResultInterface,
): number {
  if (b.points.currentLivePoints !== a.points.currentLivePoints) {
    return b.points.currentLivePoints - a.points.currentLivePoints;
  }

  if (
    b.points.currentLiveAccurateScores !== a.points.currentLiveAccurateScores
  ) {
    return (
      b.points.currentLiveAccurateScores - a.points.currentLiveAccurateScores
    );
  }

  return (
    a.points.currentLiveGoalsDifferenceSum -
    b.points.currentLiveGoalsDifferenceSum
  );
}

export function compareResults(a: ResultInterface, b: ResultInterface): number {
  if (b.points.currentPoints !== a.points.currentPoints) {
    return b.points.currentPoints - a.points.currentPoints;
  }

  if (b.points.currentAccurateScores !== a.points.currentAccurateScores) {
    return b.points.currentAccurateScores - a.points.currentAccurateScores;
  }

  return (
    a.points.currentGoalsDifferenceSum - b.points.currentGoalsDifferenceSum
  );
}
