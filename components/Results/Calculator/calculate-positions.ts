import { type ResultInterface } from "~/types/results";

export function calculatePositions(
  results: ResultInterface[],
  comparator: (a: ResultInterface, b: ResultInterface) => number,
) {
  results.sort(comparator);

  let currentPosition = 1;
  results.forEach((result, index) => {
    if (index > 0 && comparator(results[index - 1], result) === 0) {
      result.currentPosition = results[index - 1].currentPosition;
    } else {
      currentPosition = index + 1;
      result.currentPosition = currentPosition;
    }
  });
}
