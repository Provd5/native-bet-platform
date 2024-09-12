import type { FC } from "react";

import { type BetInterface, type GameInterface } from "~/types/games";

import { BetGameForm } from "./bet-game-form";
import { BetUsers } from "./bet-users";

interface BetProps {
  sessionBet: BetInterface | undefined;
  game: GameInterface;
}

export const Bet: FC<BetProps> = ({ game, sessionBet }) => {
  // const notStarted = game.status === "TIMED" && Date.now() <= game.timestamp;
  const notStarted = game.status === "TIMED";

  if (notStarted) {
    return <BetGameForm game={game} sessionBet={sessionBet} />;
  } else {
    return <BetUsers game={game} />;
  }
};
