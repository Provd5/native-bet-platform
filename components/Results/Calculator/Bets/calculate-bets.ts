import { type BetInterface, type GameInterface } from "~/types/games";
import { type ResultInterface } from "~/types/results";

import { calculateBetsPoints } from "./calculate-bets-points";

export function calculateBets(
  bets: BetInterface[],
  gameMap: Map<string | number, GameInterface>,
  userResultsMap: Map<string, ResultInterface>,
) {
  bets.forEach((bet) => {
    const game = gameMap.get(bet.gameId);
    if (!game) {
      return;
    }

    const currentPoints = userResultsMap.get(bet.userId)?.points;
    const points = calculateBetsPoints(currentPoints, bet, game);

    if (userResultsMap.has(bet.userId)) {
      const existingUser = userResultsMap.get(bet.userId);
      existingUser!.points = points;
    } else {
      userResultsMap.set(bet.userId, {
        userId: bet.userId,
        username: bet.username,
        points,
        currentPosition: 0, // Will calculate this later
        livePositionAdvance: 0, // Will calculate this later
      });
    }
  });
}
