import { type ClassValue, clsx } from "clsx";
import { pl } from "date-fns/locale";
import { formatInTimeZone } from "date-fns-tz";
import { twMerge } from "tailwind-merge";

import { BetInterface, GameInterface } from "~/types/games";

import { constantTranslations, MatchWinner } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFormat(timestamp: number): string {
  return formatInTimeZone(
    new Date(timestamp),
    "Europe/Warsaw",
    "EEEE HH:mm | dd/MM/yyyy",
    { locale: pl },
  );
}

export function checkGameBetStatus(game: GameInterface, bet: BetInterface) {
  const isGameInPlay = game.status === "IN_PLAY" || game.status === "PAUSED";

  const accurateScoreHit =
    game.regularTimeScore?.home === bet.homeGoals &&
    game.regularTimeScore?.away === bet.awayGoals;

  const scoreInPlay =
    game.regularTimeScore && isGameInPlay
      ? game.regularTimeScore.home <= bet.homeGoals &&
        game.regularTimeScore.away <= bet.awayGoals
      : false;

  const winnerHit = game.regularTimeScore?.winner === bet.winner;

  return { isGameInPlay, accurateScoreHit, scoreInPlay, winnerHit };
}

export function getMatchWinnerName(
  matchWinner: MatchWinner,
  game: GameInterface,
): string {
  switch (matchWinner) {
    case "AWAY_TEAM":
      return game.awayTeamName;
    case "HOME_TEAM":
      return game.homeTeamName;
    default:
      return translateConstantsToPolish(matchWinner);
  }
}

export const translateConstantsToPolish = (
  key: keyof typeof constantTranslations,
) => constantTranslations[key] || key;
