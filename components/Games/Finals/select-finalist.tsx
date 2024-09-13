import { type FC, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  BetFinalsInterface,
  TeamBetInterface,
  TeamInterface,
} from "~/types/teams";

import { P } from "~/components/ui/typography";
import { betFinalsSchemaType } from "~/lib/validators/bet-schema";

interface SelectFinalistProps {
  setValue: UseFormSetValue<betFinalsSchemaType>;
  teams: TeamInterface[];
  sessionFinalsBet: BetFinalsInterface | null;
}

export const SelectFinalist: FC<SelectFinalistProps> = ({
  setValue,
  teams,
  sessionFinalsBet,
}) => {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const [betState, setBetState] = useState(
    sessionFinalsBet ? sessionFinalsBet.teamBet : [],
  );

  const setValueFunc = (values: TeamBetInterface) => {
    const isInBet = betState.some((bet) => bet.teamId === values.teamId);

    if (isInBet) {
      const newBet = betState.filter((bet) => bet.teamId !== values.teamId);
      setBetState(newBet);
      setValue("teams", newBet, { shouldDirty: true });
    } else {
      const newBet = [...betState, values];
      setBetState(newBet);
      setValue("teams", newBet, { shouldDirty: true });
    }
  };

  return (
    <FlatList
      className="w-full"
      keyExtractor={(item) => item.id.toString()}
      data={teams}
      renderItem={({ item }) => (
        <View className="w-full justify-center gap-1 border-t border-border py-2 web:cursor-pointer web:select-none web:transition-colors web:hover:bg-muted-foreground/10">
          <View className="relative mx-auto w-full max-w-4xl px-2">
            <P>{item.name}</P>
          </View>
        </View>
      )}
    />
  );
};
