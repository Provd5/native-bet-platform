import { type FC } from "react";
import { View } from "react-native";

import { type BetInterface, type GameInterface } from "~/types/games";

import { SafeScrollArea } from "~/components/safe-scroll-area";
import { Separator } from "~/components/ui/separator";
import { H3, P } from "~/components/ui/typography";
import { checkGameBetStatus } from "~/lib/utils";

import { GameTeam } from "../game-team";
import { BetCarouselItem } from "./bet-carousel-item";

interface BetUsersProps {
  game: GameInterface;
  bets: BetInterface[];
}

export const BetUsers: FC<BetUsersProps> = ({ game, bets }) => {
  const sortedBets = bets.sort((a, b) => {
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

  return (
    <View>
      <H3>Tak obstawili inni</H3>
      <View className="!my-3 flex flex-col justify-between gap-x-2 gap-y-4 sm:flex-row sm:items-center">
        {bets.length > 0 ? (
          <SafeScrollArea>
            {sortedBets.map((userBet) => (
              <BetCarouselItem
                key={`BetUsers-BetCarouselItem-${userBet.id}`}
                game={game}
                userBet={userBet}
              />
            ))}
          </SafeScrollArea>
        ) : (
          <P className="mt-1.5">Nikt nie obstawił tego meczu ☹️</P>
        )}

        <Separator className="sm:hidden" />

        <View className="flex flex-col items-end gap-2">
          <View className="flex items-center gap-3">
            <GameTeam
              teamName={game.homeTeamName}
              teamIcon={game.homeTeamIcon}
              teamSide={"HOME_TEAM"}
              gameData={{
                winner: game.regularTimeScore?.winner,
                status: game.status,
              }}
              secondary
            />
            <P className="text-xl font-bold">
              {game.regularTimeScore?.home || 0}
            </P>
          </View>

          <View className="flex items-center gap-3">
            <GameTeam
              teamName={game.awayTeamName}
              teamIcon={game.awayTeamIcon}
              teamSide={"AWAY_TEAM"}
              gameData={{
                winner: game.regularTimeScore?.winner,
                status: game.status,
              }}
              secondary
            />
            <P className="text-xl font-bold">
              {game.regularTimeScore?.away || 0}
            </P>
          </View>
        </View>
      </View>
    </View>
  );
};
