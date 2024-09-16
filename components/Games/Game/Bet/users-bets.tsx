import React, { type FC } from "react";
import { View } from "react-native";

import { type GameInterface } from "~/types/games";

import { DataLoadError } from "~/components/data-load-error";
import { H3, P } from "~/components/ui/typography";
import { useGetGameBets } from "~/hooks/actions/game-bets-action";
import { sortUsersBets } from "~/lib/utils";

import { GameTeams } from "../game-teams";
import { UsersBetsItems } from "./users-bets-items";

interface UsersBetsProps {
  sessionUserId: string;
  game: GameInterface;
}

export const UsersBets: FC<UsersBetsProps> = ({ sessionUserId, game }) => {
  const { data: bets, status } = useGetGameBets(game.id);

  if (status === "pending") return <P>Ładowanie...</P>;
  if (status === "error" || bets === undefined) return <DataLoadError />;

  const sortedBets = sortUsersBets(game, bets).sort((a) => {
    if (a.userId === sessionUserId) {
      return -1;
    }
    return 1;
  });

  return (
    <View className="max-h-full gap-3">
      <H3 className="text-center">Tak obstawili inni</H3>
      <GameTeams
        teams={{
          away: { icon: game.awayTeamIcon, name: game.awayTeamName },
          home: { icon: game.homeTeamIcon, name: game.homeTeamName },
        }}
        scores={{
          away: game.regularTimeScore?.away || 0,
          home: game.regularTimeScore?.home || 0,
        }}
        gameData={{
          status: game.status,
          winner: game.regularTimeScore?.winner,
        }}
      />
      {bets.length > 0 ? (
        <UsersBetsItems
          game={game}
          bets={sortedBets}
          sessionUserId={sessionUserId}
        />
      ) : (
        <DataLoadError isEmpty description="Nikt nie obstawił tego meczu 🕸️" />
      )}
    </View>
  );
};
