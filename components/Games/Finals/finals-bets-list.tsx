import type { FC } from "react";
import { ScrollView, View } from "react-native";

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
    <View className="w-full flex-1">
      <ScrollView
        className="w-full"
        contentContainerClassName="mx-auto w-full max-w-md gap-2 px-1 py-8"
      >
        {finalsBets.map((item, index) => {
          const sortedTeamBets = [...(item.teamBet ?? [])].sort((a, b) => {
            const nameA = (a.name ?? "").toUpperCase();
            const nameB = (b.name ?? "").toUpperCase();
            return nameA.localeCompare(nameB);
          });

          const firstTeam = sortedTeamBets[0];
          const secondTeam = sortedTeamBets[1];

          return (
            <View
              key={`FinalsBetsList-${item.userId}`}
              className={cn(
                "w-full rounded-xl border border-border/70 bg-card/95 px-3 py-2.5",
                index % 2 !== 0 && "bg-secondary/15",
              )}
            >
              <View className="w-full justify-center gap-1.5">
                <H4
                  className={cn(
                    "text-center text-lg",
                    item.userId === sessionUserId &&
                      "font-customSemiBold text-info",
                  )}
                  numberOfLines={1}
                >
                  {item.username || "Nieznany użytkownik"}
                </H4>
                <View className="flex-row items-center justify-between gap-1">
                  <View className="flex-row items-center gap-1.5">
                    {firstTeam ? (
                      <>
                        <TeamIcon
                          icon={{
                            uri: firstTeam.icon,
                            alt: `${firstTeam.name} icon`,
                          }}
                          size="xs"
                        />
                        <P className="text-sm">{firstTeam.name}</P>
                      </>
                    ) : (
                      <P className="text-sm text-muted-foreground">
                        Brak pierwszej drużyny
                      </P>
                    )}
                  </View>
                  <View className="flex-row items-center gap-1.5">
                    {secondTeam ? (
                      <>
                        <P className="text-sm">{secondTeam.name}</P>
                        <TeamIcon
                          icon={{
                            uri: secondTeam.icon,
                            alt: `${secondTeam.name} icon`,
                          }}
                          size="xs"
                        />
                      </>
                    ) : (
                      <P className="text-sm text-muted-foreground">
                        Brak drugiej drużyny
                      </P>
                    )}
                  </View>
                </View>
              </View>
            </View>
          );
        })}
        <View className="h-2" />
      </ScrollView>
    </View>
  );
};
