import type { FC } from "react";
import { ScrollView, View } from "react-native";

import { type BetInterface, type GameInterface } from "~/types/games";

import { H4, P } from "~/components/ui/typography";
import { checkGameBetStatus, cn, getMatchWinnerName } from "~/lib/utils";

interface UsersBetsItemsProps {
  game: GameInterface;
  bets: BetInterface[];
  sessionUserId: string;
}

export const UsersBetsItems: FC<UsersBetsItemsProps> = ({
  game,
  bets,
  sessionUserId,
}) => {
  return (
    <ScrollView>
      {bets.map((item) => {
        const { accurateScoreHit, scoreInPlay, winnerHit, isGameInPlay } =
          checkGameBetStatus(game, item);

        return (
          <View
            key={`UsersBetsItems-${item.userId}-${item.id}`}
            className="w-full justify-center gap-1 border-t border-border py-2 web:select-none web:hover:bg-muted-foreground/10"
          >
            <P
              className={cn(
                "mx-auto w-full max-w-sm truncate text-center",
                item.userId === sessionUserId &&
                  "font-customSemiBold text-info",
              )}
            >
              {item.username}
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
              {item.homeGoals} - {item.awayGoals}
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
              {getMatchWinnerName(item.winner, game)}
            </P>
          </View>
        );
      })}
    </ScrollView>
  );
};

{
  /* <FlatList
className="!h-96"
contentContainerClassName="!h-96"
data={bets}
renderItem={({ item }) => {
  const { accurateScoreHit, scoreInPlay, winnerHit, isGameInPlay } =
    checkGameBetStatus(game, item);

  return (
    <View className="w-full justify-center gap-1 border-t border-border py-2 web:select-none web:hover:bg-muted-foreground/10">
      <P
        className={cn(
          "mx-auto w-full max-w-sm truncate text-center",
          item.userId === sessionUserId &&
            "font-customSemiBold text-info",
        )}
      >
        {item.username}
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
        {item.homeGoals} - {item.awayGoals}
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
        {getMatchWinnerName(item.winner, game)}
      </P>
    </View>
  );
}}
keyExtractor={(item) => `UsersBet-${item.userId}-${item.id}`}
/> */
}
