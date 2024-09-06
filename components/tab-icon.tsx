import type { FC } from "react";
import { View } from "react-native";
import { LucideIcon } from "lucide-react-native";

import { cn } from "~/lib/utils";

import { P } from "./ui/typography";

interface TabIconProps {
  Icon: LucideIcon;
  name: string;
  focused: boolean;
}

export const TabIcon: FC<TabIconProps> = ({ Icon, name, focused }) => {
  return (
    <View>
      <Icon
        className={cn(
          "self-center",
          focused ? "text-foreground" : "text-muted-foreground",
        )}
      />
      <P className={focused ? "font-customMedium" : "text-muted-foreground"}>
        {name}
      </P>
    </View>
  );
};
