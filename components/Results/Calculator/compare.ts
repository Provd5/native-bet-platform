import { type ResultInterface } from "~/types/results";

export function compareLiveResults(
  a: ResultInterface,
  b: ResultInterface,
): number {
  if (b.points.currentLivePoints !== a.points.currentLivePoints) {
    return b.points.currentLivePoints - a.points.currentLivePoints;
  } else {
    return (
      b.points.currentLiveAccurateScores - a.points.currentLiveAccurateScores
    );
  }
}

export function compareResults(a: ResultInterface, b: ResultInterface): number {
  if (b.points.currentPoints !== a.points.currentPoints) {
    return b.points.currentPoints - a.points.currentPoints;
  } else {
    return b.points.currentAccurateScores - a.points.currentAccurateScores;
  }
}
