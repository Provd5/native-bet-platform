import type { FC } from "react";

import { type BetInterface, type GameInterface } from "~/types/games";

import { BetGameForm } from "./bet-game-form";
import { UsersBets } from "./users-bets";
import { UsersBetsWrapper } from "./users-bets-wrapper";

interface BetProps {
  sessionBet: BetInterface | undefined;
  game: GameInterface;
}

export const Bet: FC<BetProps> = ({ game, sessionBet }) => {
  const notStarted = game.status === "TIMED" && Date.now() <= game.timestamp;

  if (notStarted) {
    return <BetGameForm game={game} sessionBet={sessionBet} />;
  } else {
    return (
      <UsersBetsWrapper game={game}>
        <UsersBets game={game} sessionUserId={sessionBet?.userId || ""} />
      </UsersBetsWrapper>
    );
  }
};
