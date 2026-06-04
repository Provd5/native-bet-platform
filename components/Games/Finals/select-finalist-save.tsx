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

    if (initTeamIds.length !== selectedTeamIds.length) {
      return false;
    }

    return initTeamIds.every((id, index) => id === selectedTeamIds[index]);
  };

  const isSelectionComplete = selectedFinalists.length === 2;

  return (
    <View className="flex-row items-center px-2">
      <View className="mx-auto w-full max-w-4xl flex-row items-center justify-center gap-2">
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
        <H4 className="text-base">VS</H4>
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
          disabled={!isSelectionComplete || isInInitBet()}
          className="ml-2 px-6"
          formState={formState}
          onPress={onSubmit}
          text="Zapisz"
        />
      </View>
    </View>
  );
};
