import type { FC } from "react";
import { View } from "react-native";
import { LucideIcon } from "lucide-react-native";

import Icon from "~/lib/icons/Icon";
import { cn } from "~/lib/utils";

import { P } from "./ui/typography";

interface TabIconProps {
  IconToRender: LucideIcon;
  name: string;
  focused: boolean;
  secondary?: boolean;
}

export const TabIcon: FC<TabIconProps> = ({
  IconToRender,
  name,
  focused,
  secondary = false,
}) => {
  return (
    <View className={cn(secondary && "flex-row items-center gap-1")}>
      <Icon
        LucideIcon={IconToRender}
        className={cn(
          "shrink-0",
          !secondary && "self-center",
          focused ? "text-primary" : "text-muted-foreground",
        )}
        size={secondary ? 16 : 25}
      />
      <P
        className={cn(focused ? "font-customMedium" : "text-muted-foreground")}
      >
        {name}
      </P>
    </View>
  );
};
