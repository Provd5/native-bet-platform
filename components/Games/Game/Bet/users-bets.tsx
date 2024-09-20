import React, { type FC } from "react";

import { type GameInterface } from "~/types/games";

import { DataLoadError } from "~/components/data-load-error";
import { ContentLoader } from "~/components/Loaders/content-loader";
import { useGetGameBets } from "~/hooks/actions/game-bets-action";
import { sortUsersBets } from "~/lib/utils";

import { UsersBetsItems } from "./users-bets-items";

interface UsersBetsProps {
  sessionUserId: string;
  game: GameInterface;
}

export const UsersBets: FC<UsersBetsProps> = ({ sessionUserId, game }) => {
  const { data: bets, status } = useGetGameBets(game.id);

  if (status === "pending") return <ContentLoader />;
  if (status === "error" || bets === undefined) return <DataLoadError />;

  const sortedBets = sortUsersBets(game, bets).sort((a) => {
    if (a.userId === sessionUserId) {
      return -1;
    }
    return 1;
  });

  return bets.length > 0 ? (
    <UsersBetsItems
      game={game}
      bets={sortedBets}
      sessionUserId={sessionUserId}
    />
  ) : (
    <DataLoadError isEmpty description="Nikt nie obstawił tego meczu 🕸️" />
  );
};
