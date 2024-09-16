import React, { FC, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { View } from "react-native";

import { Input } from "~/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { P } from "~/components/ui/typography";
import { cn } from "~/lib/utils";
import { betSchemaType } from "~/lib/validators/bet-schema";

import { BetWrapper } from "./bet-wrapper";

interface BetTeamProps {
  register: UseFormRegister<betSchemaType>;
  setValue: UseFormSetValue<betSchemaType>;
  initWinner: betSchemaType["winner"];
}

export const BetTeam: FC<BetTeamProps> = ({
  register,
  setValue,
  initWinner,
}) => {
  const [toggleValue, setToggleValue] = useState(initWinner);

  const items = [
    {
      label: "Gospodarze",
      value: "HOME_TEAM",
    },
    { label: "Remis", value: "DRAW", icon: null, name: "Remis" },
    {
      label: "Goście",
      value: "AWAY_TEAM",
    },
  ];

  return (
    <BetWrapper title="Zwycięzca:">
      <View className="hidden">
        <Input readOnly {...register("winner")} value={toggleValue} />
      </View>
      <ToggleGroup
        variant="outline"
        size="lg"
        type="single"
        onValueChange={(value) => {
          setToggleValue(value as betSchemaType["winner"]);
          setValue("winner", value as betSchemaType["winner"], {
            shouldDirty: true,
          });
        }}
        value={toggleValue}
      >
        {items.map((item) => (
          <ToggleGroupItem
            key={`BetTeam-${item.value}`}
            value={item.value}
            disabled={toggleValue === item.value}
          >
            <P
              className={cn(
                "w-16 text-center text-primary",
                toggleValue === item.value && "text-success",
              )}
              numberOfLines={1}
            >
              {item.label}
            </P>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </BetWrapper>
  );
};
