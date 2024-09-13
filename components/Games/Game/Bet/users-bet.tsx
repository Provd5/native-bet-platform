import React, { type FC } from "react";
import { ScrollView, View } from "react-native";

import { type GameInterface } from "~/types/games";

import { DataLoadError } from "~/components/data-load-error";
import { H2, P } from "~/components/ui/typography";
import { useGetGameBets } from "~/hooks/actions/game-bets-action";
import { sortUsersBets } from "~/lib/utils";

import { GameTeams } from "../game-teams";
import { BetCarouselItem } from "./bet-carousel-item";

interface UsersBetProps {
  sessionUserId: string;
  game: GameInterface;
}

export const UsersBet: FC<UsersBetProps> = ({ sessionUserId, game }) => {
  const { data: bets, status } = useGetGameBets(game.id);

  if (status === "pending") return <P>Ładowanie...</P>;
  if (status === "error" || bets === undefined) return <DataLoadError />;

  const sortedBets = sortUsersBets(game, bets).sort((a) => {
    if (a.userId === sessionUserId) {
      return -1;
    }
    return 0;
  });

  return (
    <View className="gap-3">
      <H2 className="text-center">Tak obstawili inni</H2>
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
        size="sm"
      />
      <View className="h-96 py-3">
        <ScrollView>
          {bets.length > 0 ? (
            sortedBets.map((userBet) => (
              <BetCarouselItem
                key={`UsersBet-BetCarouselItem-${userBet.userId}-${userBet.id}`}
                game={game}
                userBet={userBet}
                sessionUserId={sessionUserId}
              />
            ))
          ) : (
            <DataLoadError
              isEmpty
              description="Nikt nie obstawił tego meczu 🕸️"
            />
          )}
        </ScrollView>
      </View>
    </View>
  );
};
