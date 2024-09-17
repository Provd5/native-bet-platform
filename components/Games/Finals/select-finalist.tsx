import { type FC } from "react";
import { Pressable, View } from "react-native";
import { Circle, CircleCheck } from "lucide-react-native";

import { TeamInterface } from "~/types/teams";

import { TeamIcon } from "~/components/team-icon";
import { H4, P } from "~/components/ui/typography";
import Icon from "~/lib/icons/Icon";
import { cn } from "~/lib/utils";

interface SelectFinalistProps {
  isOdd: boolean;
  initBet: TeamInterface[];
  selectedFinalists: TeamInterface[];
  team: TeamInterface;
  setValueFunc: (team: TeamInterface) => void;
}

export const SelectFinalist: FC<SelectFinalistProps> = ({
  team,
  isOdd,
  initBet,
  selectedFinalists,
  setValueFunc,
}) => {
  const isSelected = selectedFinalists.some(
    (selected) => selected.id === team.id,
  );
  const isInitBet = initBet.some((init) => init.id === team.id);

  return (
    <Pressable
      role="button"
      className={cn(
        "w-full justify-center border-t border-border py-2 web:cursor-pointer web:hover:bg-warning-foreground/30",
        isOdd && "bg-muted/30",
        isSelected && "bg-warning/30",
      )}
      onPress={() => setValueFunc(team)}
    >
      <View className="relative mx-auto w-full max-w-4xl flex-row items-center justify-between px-2">
        <View className="flex-row items-center gap-3">
          <P className="ml-auto w-12 text-right" numberOfLines={1}>
            {team.nameCode}
          </P>
          <TeamIcon
            icon={{ uri: team.icon, alt: `${team.name} icon` }}
            size="sm"
          />
          <H4 className={cn(isInitBet && "text-info")}>{team.name}</H4>
        </View>
        <Icon
          className={cn(isInitBet && "text-info")}
          LucideIcon={isSelected ? CircleCheck : Circle}
          size={24}
        />
      </View>
    </Pressable>
  );
};
