import type { FC } from "react";
import { FormState } from "react-hook-form";
import { View } from "react-native";

import { TeamInterface } from "~/types/teams";

import { TeamIcon } from "~/components/team-icon";
import { FormButton } from "~/components/ui/button";
import { H4 } from "~/components/ui/typography";
import { betFinalsSchemaType } from "~/lib/validators/bet-schema";

interface SelectFinalistSaveProps {
  initBet: TeamInterface[];
  selectedFinalists: TeamInterface[];
  formState: FormState<betFinalsSchemaType>;
  onSubmit: () => void;
}

export const SelectFinalistSave: FC<SelectFinalistSaveProps> = ({
  initBet,
  selectedFinalists,
  formState,
  onSubmit,
}) => {
  const isInInitBet = (): boolean => {
    const initTeamIds = initBet.map((team) => team?.id).sort();
    const selectedTeamIds = selectedFinalists.map((team) => team?.id).sort();

    return initTeamIds.every((id, index) => id === selectedTeamIds[index]);
  };

  return (
    <View className="absolute inset-x-0 bottom-0 flex-row items-center border-t border-border bg-background px-2 py-1">
      <View className="mx-auto flex-row items-center gap-2">
        <TeamIcon
          icon={
            selectedFinalists[0]
              ? {
                  uri: selectedFinalists[0].icon,
                  alt: `${selectedFinalists[0].name} icon`,
                }
              : null
          }
          size="xs"
        />
        <H4>VS</H4>
        <TeamIcon
          icon={
            selectedFinalists[1]
              ? {
                  uri: selectedFinalists[1].icon,
                  alt: `${selectedFinalists[1].name} icon`,
                }
              : null
          }
          size="xs"
        />
        <FormButton
          disabled={isInInitBet()}
          className="ml-3 px-12"
          formState={formState}
          onPress={onSubmit}
          text="Zapisz"
        />
      </View>
    </View>
  );
};
