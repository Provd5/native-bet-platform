import React, { type FC } from "react";

import { type BetInterface, type GameInterface } from "~/types/games";

import { ModalWrapper } from "~/components/modal-wrapper";

import { GameCard } from "../game-card";
import { Bet } from "./bet";

interface BetModalProps {
  sessionBet: BetInterface | undefined;
  game: GameInterface;
}

export const BetModal: FC<BetModalProps> = ({ sessionBet, game }) => {
  return (
    <ModalWrapper
      triggerChildren={<GameCard game={game} sessionBet={sessionBet} />}
    >
      <Bet game={game} sessionBet={sessionBet} />
    </ModalWrapper>
  );
};
