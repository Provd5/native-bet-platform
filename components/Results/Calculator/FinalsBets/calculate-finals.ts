import { type GameInterface } from "~/types/games";
import { type ResultInterface } from "~/types/results";
import { type BetFinalsInterface } from "~/types/teams";

import { PENALTY_USERS_IDS } from "~/constants/calculator";

import { calculateFinalsPoints } from "./calculate-finals-points";

export function calculateFinals(
  finalsBets: BetFinalsInterface[],
  finalGame: GameInterface | undefined,
  userResultsMap: Map<string, ResultInterface>,
) {
  finalsBets.forEach((bet) => {
    if (!finalGame) {
      return;
    }

    const currentPoints = userResultsMap.get(bet.userId)?.points;
    const points = calculateFinalsPoints(currentPoints, bet.teamBet, finalGame);

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

  PENALTY_USERS_IDS.forEach((userId) => {
    if (userResultsMap.has(userId)) {
      const existingUser = userResultsMap.get(userId);
      if (existingUser!.points.currentPoints > 0) {
        existingUser!.points.currentPoints -= 1;
      }
      if (existingUser!.points.currentLivePoints > 0) {
        existingUser!.points.currentLivePoints -= 1;
      }
    }
  });
}
