import type { FC } from "react";
import { View } from "react-native";

import { type BetInterface, type GameInterface } from "~/types/games";

import { H4, P } from "~/components/ui/typography";
import { checkGameBetStatus, cn, getMatchWinnerName } from "~/lib/utils";

interface BetCarouselItemProps {
  game: GameInterface;
  userBet: BetInterface;
  sessionUserId: string;
}

export const BetCarouselItem: FC<BetCarouselItemProps> = ({
  game,
  userBet,
  sessionUserId,
}) => {
  const { accurateScoreHit, scoreInPlay, winnerHit, isGameInPlay } =
    checkGameBetStatus(game, userBet);

  return (
    <View className="w-full justify-center gap-1 border-t border-border py-2 web:select-none web:hover:bg-gray-500/10">
      <P
        className={cn(
          "mx-auto w-full max-w-sm truncate text-center",
          userBet.userId === sessionUserId && "font-customSemiBold text-info",
        )}
      >
        {userBet.username}
      </P>
      <H4
        className={cn(
          "-mt-1 text-center",
          accurateScoreHit
            ? "text-success"
            : scoreInPlay
              ? "text-warning"
              : "text-destructive",
        )}
      >
        {userBet.homeGoals} - {userBet.awayGoals}
      </H4>
      <P
        className={cn(
          "-mt-1 text-center",
          winnerHit
            ? "text-success"
            : isGameInPlay
              ? "text-warning"
              : "text-destructive",
        )}
      >
        {getMatchWinnerName(userBet.winner, game)}
      </P>
    </View>
  );
};
