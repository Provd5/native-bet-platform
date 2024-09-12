import { FC, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Image, View } from "react-native";
import { Minus, Plus } from "lucide-react-native";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { P } from "~/components/ui/typography";
import Icon from "~/lib/icons/Icon";
import { betSchemaType } from "~/lib/validators/bet-schema";

interface GoalsInputProps {
  register: UseFormRegister<betSchemaType>;
  setValue: UseFormSetValue<betSchemaType>;
  teamName: string;
  teamIcon: string;
  teamSide: "HOME_TEAM" | "AWAY_TEAM";
  userGoalsData: number;
}

export const GoalsInput: FC<GoalsInputProps> = ({
  register,
  setValue,
  teamName,
  teamIcon,
  teamSide,
  userGoalsData,
}) => {
  const [valueState, setValueState] = useState(userGoalsData);
  const registerTeam = teamSide === "AWAY_TEAM" ? "away" : "home";

  return (
    <View className="flex flex-col items-center gap-0.5">
      <View className="flex items-center gap-1">
        <Image
          source={{ uri: teamIcon }}
          style={{ width: 20, height: 20 }}
          alt={`${teamName} icon`}
          resizeMode="contain"
          className="pointer-events-none"
        />
        <P className="text-sm">
          {teamSide === "AWAY_TEAM" ? "Gole gości:" : "Gole gospodarzy:"}
        </P>
      </View>
      <View className="flex items-center gap-1">
        <Button
          variant={"outline"}
          className="size-9"
          onPress={() => (
            setValueState((prev) => (prev > 0 ? prev - 1 : 0)),
            setValue(registerTeam, valueState > 0 ? valueState - 1 : 0, {
              shouldDirty: true,
            })
          )}
        >
          <Icon LucideIcon={Minus} size={20} />
        </Button>
        <Input
          {...register(registerTeam, { valueAsNumber: true })}
          value={valueState.toString()}
          inputMode="decimal"
          className="w-14"
        />
        <Button
          variant={"outline"}
          className="size-9"
          onPress={() => (
            setValueState((prev) => prev + 1),
            setValue(registerTeam, valueState + 1, { shouldDirty: true })
          )}
        >
          <Icon LucideIcon={Plus} size={20} />
        </Button>
      </View>
    </View>
  );
};
