import type { FC } from "react";

import { type BetInterface, type GameInterface } from "~/types/games";

import { DataLoadError } from "~/components/data-load-error";
import { P } from "~/components/ui/typography";
import { useGetGameBets } from "~/hooks/actions/game-bets-action";

import { BetGameForm } from "./bet-game-form";
import { BetUsers } from "./bet-users";

interface BetProps {
  sessionBet: BetInterface | undefined;
  game: GameInterface;
}

export const Bet: FC<BetProps> = ({ game, sessionBet }) => {
  // const notStarted = game.status === "TIMED" && Date.now() <= game.timestamp;
  const notStarted = game.status === "TIMED";
  const { data: bets, status } = useGetGameBets(game.id);

  if (notStarted) {
    return <BetGameForm game={game} sessionBet={sessionBet} />;
  } else {
    if (status === "pending") return <P>Ładowanie...</P>;
    if (status === "error" || bets === undefined) return <DataLoadError />;

    return <BetUsers game={game} bets={bets} />;
  }
};
