import { FC } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { View } from "react-native";
import { Minus, Plus } from "lucide-react-native";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import Icon from "~/lib/icons/Icon";
import { betSchemaType } from "~/lib/validators/bet-schema";

interface GoalsInputProps {
  register: UseFormRegister<betSchemaType>;
  setValue: UseFormSetValue<betSchemaType>;
  team: {
    name: string;
    icon: string;
  };
  side: Extract<betSchemaType["winner"], "HOME_TEAM" | "AWAY_TEAM">;
  scoreState: number;
  setScoreState: React.Dispatch<React.SetStateAction<number>>;
}

export const GoalsInput: FC<GoalsInputProps> = ({
  register,
  setValue,
  side,
  scoreState,
  setScoreState,
}) => {
  const registerTeam = side === "AWAY_TEAM" ? "away" : "home";

  return (
    <View className="justify-center">
      <View className="hidden">
        <Input
          readOnly
          {...register(registerTeam, { valueAsNumber: true })}
          value={scoreState.toString()}
        />
      </View>

      <View className="flex-row-reverse gap-1">
        <Button
          variant={"outline"}
          size={"icon"}
          onPress={() => (
            setScoreState(scoreState + 1),
            setValue(registerTeam, scoreState + 1, { shouldDirty: true })
          )}
        >
          <Icon LucideIcon={Plus} size={20} />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          onPress={() => (
            setScoreState(scoreState > 0 ? scoreState - 1 : 0),
            setValue(registerTeam, scoreState > 0 ? scoreState - 1 : 0, {
              shouldDirty: true,
            })
          )}
        >
          <Icon LucideIcon={Minus} size={20} />
        </Button>
      </View>
    </View>
  );
};
