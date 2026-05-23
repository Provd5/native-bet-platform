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
        const sortedTeamBets = [...(item.teamBet ?? [])].sort((a, b) => {
          const nameA = (a.name ?? "").toUpperCase();
          const nameB = (b.name ?? "").toUpperCase();
          if (nameA < nameB) {
            return -1;
          }

          return 1;
        });

        const firstTeam = sortedTeamBets[0];
        const secondTeam = sortedTeamBets[1];

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
                {item.username || "Nieznany użytkownik"}
              </H4>
              <View className="gap-1">
                <View className="flex-row items-center gap-1">
                  {firstTeam ? (
                    <>
                      <TeamIcon
                        icon={{
                          uri: firstTeam.icon,
                          alt: `${firstTeam.name} icon`,
                        }}
                        size="xs"
                      />
                      <P>{firstTeam.name}</P>
                    </>
                  ) : (
                    <P>Brak pierwszej drużyny</P>
                  )}
                </View>
                <View className="flex-row items-center gap-1">
                  {secondTeam ? (
                    <>
                      <TeamIcon
                        icon={{
                          uri: secondTeam.icon,
                          alt: `${secondTeam.name} icon`,
                        }}
                        size="xs"
                      />
                      <P>{secondTeam.name}</P>
                    </>
                  ) : (
                    <P>Brak drugiej drużyny</P>
                  )}
                </View>
              </View>
            </View>
          </View>
        );
      }}
    />
  );
};
