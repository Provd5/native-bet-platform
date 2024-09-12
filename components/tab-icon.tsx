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
}

export const TabIcon: FC<TabIconProps> = ({ IconToRender, name, focused }) => {
  return (
    <View>
      <Icon
        LucideIcon={IconToRender}
        className={cn(
          "self-center",
          focused ? "text-primary" : "text-muted-foreground",
        )}
      />
      <P className={focused ? "font-customMedium" : "text-muted-foreground"}>
        {name}
      </P>
    </View>
  );
};
