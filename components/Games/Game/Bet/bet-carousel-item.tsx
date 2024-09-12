import type { FC } from "react";
import { View } from "react-native";

import { type BetInterface, type GameInterface } from "~/types/games";

import { H1, P } from "~/components/ui/typography";
import { checkGameBetStatus, cn, getMatchWinnerName } from "~/lib/utils";

interface BetCarouselItemProps {
  game: GameInterface;
  userBet: BetInterface;
}

export const BetCarouselItem: FC<BetCarouselItemProps> = ({
  game,
  userBet,
}) => {
  const { accurateScoreHit, scoreInPlay, winnerHit, isGameInPlay } =
    checkGameBetStatus(game, userBet);

  return (
    <View className="flex flex-col justify-center">
      <H1 className="max-w-40 truncate">{userBet.username}</H1>
      <View className="flex flex-col text-sm">
        <P className="text-gray-500">
          Wynik:{" "}
          <P
            className={cn(
              accurateScoreHit
                ? "text-green-600"
                : scoreInPlay
                  ? "text-yellow-600"
                  : "text-destructive",
            )}
          >
            {userBet.homeGoals}-{userBet.awayGoals}
          </P>
        </P>
        <P className="text-gray-500">
          Zwycięzca:{" "}
          <P
            className={
              winnerHit
                ? "text-green-600"
                : isGameInPlay
                  ? "text-yellow-600"
                  : "text-destructive"
            }
          >
            {getMatchWinnerName(userBet.winner, game)}
          </P>
        </P>
      </View>
    </View>
  );
};
