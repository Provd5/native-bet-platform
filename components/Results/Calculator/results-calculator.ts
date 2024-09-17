import { type BetInterface, type GameInterface } from "~/types/games";
import { type ResultInterface } from "~/types/results";
import { type BetFinalsInterface } from "~/types/teams";

import { calculateBets } from "./Bets/calculate-bets";
import { calculateLeaderboard } from "./calculate-leaderboard";
import { calculateFinals } from "./FinalsBets/calculate-finals";

export default function resultsCalculator(
  games: GameInterface[],
  bets: BetInterface[],
  finalsBets: BetFinalsInterface[],
): ResultInterface[] {
  const gameMap = new Map(games.map((game) => [game.id, game]));
  const finalGame = games.find((game) => game.stage === "FINAL");

  const userResultsMap = new Map<string, ResultInterface>();

  calculateFinals(finalsBets, finalGame, userResultsMap);
  calculateBets(bets, gameMap, userResultsMap);

  const leaderboard = calculateLeaderboard(userResultsMap);

  return leaderboard;
}
