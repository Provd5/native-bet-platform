import type { FC } from "react";
import { FlatList, View } from "react-native";

import { type BetInterface, type GameInterface } from "~/types/games";

import { H4 } from "~/components/ui/typography";
import { checkGameBetStatus, cn } from "~/lib/utils";

import { UsersBetsTeam } from "./users-bets-team";

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
    <FlatList
      className="w-full flex-1 gap-1 overflow-y-auto py-2"
      data={bets}
      keyExtractor={(item) => `UsersBetsItems-${item.userId}-${item.gameId}`}
      contentContainerClassName="mx-auto w-full max-w-4xl gap-2 px-3 pb-3"
      scrollEnabled={true}
      renderItem={({ item, index }) => {
        const conditions = checkGameBetStatus(game, item);

        return (
          <View
            className={cn(
              "w-full gap-1.5 rounded-xl border border-border/70 bg-card/95 px-3 py-2.5",
              index % 2 !== 0 && "bg-secondary/15",
            )}
          >
            <H4
              className={cn(
                "text-lg",
                item.userId === sessionUserId &&
                  "font-customSemiBold text-info",
              )}
              numberOfLines={1}
            >
              {item.username}
            </H4>
            <View className="gap-1">
              <UsersBetsTeam
                conditions={conditions}
                game={{
                  side: "HOME_TEAM",
                  teamIcon: game.homeTeamIcon,
                  teamName: game.homeTeamName,
                }}
                bet={{ goals: item.homeGoals, winner: item.winner }}
              />
              <UsersBetsTeam
                conditions={conditions}
                game={{
                  side: "AWAY_TEAM",
                  teamIcon: game.awayTeamIcon,
                  teamName: game.awayTeamName,
                }}
                bet={{ goals: item.awayGoals, winner: item.winner }}
              />
            </View>
          </View>
        );
      }}
    />
  );
};
