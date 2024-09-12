import { type FC } from "react";
import { View } from "react-native";

import { type GameInterface } from "~/types/games";

import { DataLoadError } from "~/components/data-load-error";
import { ScrollArea } from "~/components/scroll-area";
import { Separator } from "~/components/ui/separator";
import { H3, P } from "~/components/ui/typography";
import { useGetGameBets } from "~/hooks/actions/game-bets-action";
import { sortUsersBets } from "~/lib/utils";

import { GameTeam } from "../game-team";
import { BetCarouselItem } from "./bet-carousel-item";

interface BetUsersProps {
  game: GameInterface;
}

export const BetUsers: FC<BetUsersProps> = ({ game }) => {
  const { data: bets, status } = useGetGameBets(game.id);

  if (status === "pending") return <P>Ładowanie...</P>;
  if (status === "error" || bets === undefined) return <DataLoadError />;

  const sortedBets = sortUsersBets(game, bets);

  return (
    <View>
      <H3>Tak obstawili inni</H3>
      <View className="!my-3 flex flex-col justify-between gap-x-2 gap-y-4 sm:flex-row sm:items-center">
        {bets.length > 0 ? (
          <ScrollArea>
            {sortedBets.map((userBet) => (
              <BetCarouselItem
                key={`BetUsers-BetCarouselItem-${userBet.id}`}
                game={game}
                userBet={userBet}
              />
            ))}
          </ScrollArea>
        ) : (
          <P className="mt-1.5">Nikt nie obstawił tego meczu ☹️</P>
        )}

        <Separator className="sm:hidden" />

        <View className="flex flex-col items-end gap-2">
          <View className="flex items-center gap-3">
            <GameTeam
              team={{
                icon: game.homeTeamIcon,
                name: game.homeTeamName,
              }}
              side={"HOME_TEAM"}
              gameData={{
                winner: game.regularTimeScore?.winner,
                status: game.status,
              }}
            />
            <P>{game.regularTimeScore?.home || 0}</P>
          </View>

          <View className="flex items-center gap-3">
            <GameTeam
              team={{
                icon: game.awayTeamIcon,
                name: game.awayTeamName,
              }}
              side={"AWAY_TEAM"}
              gameData={{
                winner: game.regularTimeScore?.winner,
                status: game.status,
              }}
            />
            <P>{game.regularTimeScore?.away || 0}</P>
          </View>
        </View>
      </View>
    </View>
  );
};
