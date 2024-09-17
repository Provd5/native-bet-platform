import type { FC } from "react";
import { ScrollView, View } from "react-native";

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
    <ScrollView>
      {bets.map((item, index) => {
        const conditions = checkGameBetStatus(game, item);

        return (
          <View
            key={`UsersBetsItems-${item.userId}-${item.gameId}`}
            className={cn(
              "w-full gap-1 px-6 py-2 web:hover:bg-muted-foreground/20",
              index % 2 === 0 && "bg-muted/30",
            )}
          >
            <H4
              className={cn(
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
      })}
    </ScrollView>
  );
};
