import React, { FC } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { View } from "react-native";
import { CircleEqual } from "lucide-react-native";

import { Input } from "~/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { H1, P } from "~/components/ui/typography";
import Icon from "~/lib/icons/Icon";
import { betSchemaType } from "~/lib/validators/bet-schema";

import { GameTeam } from "../game-team";

interface BetTeamProps {
  register: UseFormRegister<betSchemaType>;
  setValue: UseFormSetValue<betSchemaType>;
  homeTeamName: string;
  homeTeamIcon: string;
  awayTeamName: string;
  awayTeamIcon: string;
  userData: { winner: betSchemaType["winner"] };
}

export const BetTeam: FC<BetTeamProps> = ({
  register,
  setValue,
  homeTeamName,
  homeTeamIcon,
  awayTeamName,
  awayTeamIcon,
  userData,
}) => {
  return (
    <ToggleGroup
      type="single"
      className="flex-col justify-between"
      onValueChange={(value) => {
        setValue("winner", value as betSchemaType["winner"], {
          shouldDirty: true,
        });
      }}
      value={userData.winner}
    >
      <>
        <Input
          {...register("winner")}
          value={userData.winner}
          className="hidden"
        />
        <H1 className="self-center text-sm text-gray-500 sm:self-end">
          Wygrany:
        </H1>
        <View className="flex flex-col gap-1 max-sm:w-full">
          <ToggleGroupItem className="w-full" value="HOME_TEAM">
            <GameTeam
              teamName={homeTeamName}
              teamIcon={homeTeamIcon}
              teamSide={"HOME_TEAM"}
              secondary
            />
          </ToggleGroupItem>
          <ToggleGroupItem className="w-full" value="AWAY_TEAM">
            <GameTeam
              teamName={awayTeamName}
              teamIcon={awayTeamIcon}
              teamSide={"AWAY_TEAM"}
              secondary
            />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="w-full justify-center gap-2 sm:justify-end"
            value="DRAW"
          >
            <P>
              Remis <Icon LucideIcon={CircleEqual} size={30} />
            </P>
          </ToggleGroupItem>
        </View>
      </>
    </ToggleGroup>
  );
};
