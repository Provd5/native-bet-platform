import type { FC } from "react";
import { FlatList, View } from "react-native";

import { BetFinalsInterface } from "~/types/teams";

import { TeamIcon } from "~/components/team-icon";
import { H4, P } from "~/components/ui/typography";
import { cn } from "~/lib/utils";

interface FinalsBetsListProps {
  finalsBets: BetFinalsInterface[];
  sessionUserId: string;
}

export const FinalsBetsList: FC<FinalsBetsListProps> = ({
  finalsBets,
  sessionUserId,
}) => {
  return (
    <FlatList
      className="w-full"
      keyExtractor={(item) => `FinalsBetsList-${item.userId}`}
      data={finalsBets}
      renderItem={({ index, item }) => {
        const sortedTeamBets = item.teamBet.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }

          return 1;
        });

        return (
          <View
            className={cn(
              "border-t border-border px-6 py-2 pb-4 web:hover:bg-muted-foreground/20",
              index % 2 === 0 && "bg-muted/30",
            )}
          >
            <View className="mx-auto w-full max-w-xl justify-center gap-2">
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
                <View className="flex-row items-center gap-1">
                  <TeamIcon
                    icon={{
                      uri: sortedTeamBets[0].icon,
                      alt: `${sortedTeamBets[0].name} icon`,
                    }}
                    size="xs"
                  />
                  <P>{sortedTeamBets[0].name}</P>
                </View>
                <View className="flex-row items-center gap-1">
                  <TeamIcon
                    icon={{
                      uri: sortedTeamBets[1].icon,
                      alt: `${sortedTeamBets[1].name} icon`,
                    }}
                    size="xs"
                  />
                  <P>{sortedTeamBets[1].name}</P>
                </View>
              </View>
            </View>
          </View>
        );
      }}
    />
  );
};
