import { type ClassValue, clsx } from "clsx";
import { pl } from "date-fns/locale";
import { formatInTimeZone } from "date-fns-tz";
import { twMerge } from "tailwind-merge";

import { BetInterface, GameInterface } from "~/types/games";

import { STAGE_MULTIPLIERS } from "~/constants/calculator";
import { CONSTANT_TRANSLATIONS } from "~/constants/data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFormat(timestamp: number): string {
  return formatInTimeZone(
    new Date(timestamp),
    "Europe/Warsaw",
    "EEE HH:mm | dd/MM/yyyy",
    { locale: pl },
  );
}

export function checkGameBetStatus(game: GameInterface, bet: BetInterface) {
  const gameInPlay = game.status === "IN_PLAY" || game.status === "PAUSED";

  const accurateScoreHit =
    game.regularTimeScore?.home === bet.homeGoals &&
    game.regularTimeScore?.away === bet.awayGoals;

  const scoreInPlay =
    game.regularTimeScore && gameInPlay
      ? game.regularTimeScore.home <= bet.homeGoals &&
        game.regularTimeScore.away <= bet.awayGoals
      : false;

  const winnerHit = game.regularTimeScore?.winner === bet.winner;

  return { gameInPlay, accurateScoreHit, scoreInPlay, winnerHit };
}

export function sortUsersBets(game: GameInterface, bets: BetInterface[]) {
  return bets
    .sort((a, b) => {
      const usernameA = a.username.toUpperCase();
      const usernameB = b.username.toUpperCase();
      if (usernameA < usernameB) {
        return -1;
      }
      return 1;
    })
    .sort((a, b) => {
      const ABet = checkGameBetStatus(game, a);
      const BBet = checkGameBetStatus(game, b);

      if (ABet.accurateScoreHit && !BBet.accurateScoreHit) {
        return -1;
      }
      if (ABet.winnerHit && !BBet.winnerHit) {
        return -1;
      }
      if (ABet.scoreInPlay && !BBet.scoreInPlay) {
        return -1;
      }

      return 1;
    });
}

export const translateConstantsToPolish = (
  key: keyof typeof CONSTANT_TRANSLATIONS,
) => CONSTANT_TRANSLATIONS[key] || key;

export const multiplyResult = (key: keyof typeof STAGE_MULTIPLIERS) =>
  STAGE_MULTIPLIERS[key] || key;
