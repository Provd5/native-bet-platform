import React, { FC } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { View } from "react-native";

import { H1 } from "~/components/ui/typography";
import { betSchemaType } from "~/lib/validators/bet-schema";

import { GoalsInput } from "./goals-input";

interface BetGoalsProps {
  register: UseFormRegister<betSchemaType>;
  setValue: UseFormSetValue<betSchemaType>;
  homeTeamName: string;
  homeTeamIcon: string;
  awayTeamName: string;
  awayTeamIcon: string;
  userData: { awayGoals: number; homeGoals: number };
}

export const BetGoals: FC<BetGoalsProps> = ({
  register,
  setValue,
  homeTeamName,
  homeTeamIcon,
  awayTeamName,
  awayTeamIcon,
  userData,
}) => {
  return (
    <View className="flex flex-col justify-between gap-1">
      <H1 className="self-center text-sm text-gray-500 sm:self-end">
        Dokładny wynik:
      </H1>
      <View className="flex flex-col gap-2">
        <GoalsInput
          setValue={setValue}
          register={register}
          teamIcon={homeTeamIcon}
          teamName={homeTeamName}
          teamSide="HOME_TEAM"
          userGoalsData={userData.homeGoals}
        />
        <GoalsInput
          setValue={setValue}
          register={register}
          teamIcon={awayTeamIcon}
          teamName={awayTeamName}
          teamSide="AWAY_TEAM"
          userGoalsData={userData.awayGoals}
        />
      </View>
    </View>
  );
};
