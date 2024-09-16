import { type FC, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FlatList, Pressable, View } from "react-native";
import { Circle, CircleCheck } from "lucide-react-native";

import { BetFinalsInterface, TeamInterface } from "~/types/teams";

import { TeamIcon } from "~/components/team-icon";
import { H4, P } from "~/components/ui/typography";
import Icon from "~/lib/icons/Icon";
import { cn } from "~/lib/utils";
import { betFinalsSchemaType } from "~/lib/validators/bet-schema";

interface SelectFinalistProps {
  setValue: UseFormSetValue<betFinalsSchemaType>;
  teams: TeamInterface[];
  sessionFinalsBet: BetFinalsInterface | null;
  callbackSelect: (data: TeamInterface[]) => void;
}

export const SelectFinalist: FC<SelectFinalistProps> = ({
  setValue,
  teams,
  sessionFinalsBet,
  callbackSelect,
}) => {
  const [betState, setBetState] = useState(
    sessionFinalsBet ? sessionFinalsBet.teamBet : [],
  );

  const isInBet = (teamId: TeamInterface["id"]): boolean =>
    betState.some((bet) => bet.id === teamId);

  const setValueFunc = (values: TeamInterface) => {
    let newBet;

    if (isInBet(values.id)) {
      newBet = betState.filter((bet) => bet.id !== values.id);
    } else {
      if (betState.length >= 2) {
        newBet = [betState.reverse()[0], values];
      } else {
        newBet = [...betState, values];
      }
    }

    setBetState(newBet);
    callbackSelect(newBet);
    setValue("teams", newBet, { shouldDirty: true });
  };

  return (
    <FlatList
      className="w-full"
      keyExtractor={(item) => `SelectFinalist-${item.id}`}
      data={teams}
      renderItem={({ item, index }) => {
        const isInitBet = sessionFinalsBet?.teamBet.some(
          (bet) => bet.id === item.id,
        );

        return (
          <Pressable
            className={cn(
              "w-full justify-center border-t border-border py-2 web:cursor-pointer web:select-none web:transition-colors",
              index % 2 === 0 && "bg-muted/10",
              isInBet(item.id)
                ? "bg-muted-foreground/10 web:hover:bg-muted-foreground/30"
                : "web:hover:bg-muted-foreground/10",
            )}
            onPress={() => setValueFunc(item)}
          >
            <View className="relative mx-auto w-full max-w-4xl flex-row items-center justify-between px-2">
              <View className="flex-row items-center gap-3">
                <P className="ml-auto w-12 text-right" numberOfLines={1}>
                  {item.nameCode}
                </P>
                <TeamIcon
                  icon={{ uri: item.icon, alt: `${item.name} icon` }}
                  size="sm"
                />
                <H4
                  className={cn(
                    isInitBet && "text-info",
                    isInBet(item.id) && "text-warning",
                  )}
                >
                  {item.name}
                </H4>
              </View>
              <Icon
                className={cn(
                  isInitBet && "text-info",
                  isInBet(item.id) && "text-warning",
                )}
                LucideIcon={isInBet(item.id) ? CircleCheck : Circle}
                size={24}
              />
            </View>
          </Pressable>
        );
      }}
    />
  );
};
