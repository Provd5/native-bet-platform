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
  if (secondary) {
    return (
      <View
        className={cn(
          "flex-row items-center gap-1 rounded-full border px-2.5 py-1",
          focused
            ? "border-primary/40 bg-primary/15"
            : "border-border/70 bg-card/70",
        )}
      >
        <Icon
          LucideIcon={IconToRender}
          className={cn(focused ? "text-primary" : "text-muted-foreground/90")}
          size={14}
        />
        <P
          className={cn(
            "text-xs",
            focused
              ? "font-customSemiBold text-foreground"
              : "font-customRegular text-muted-foreground",
          )}
        >
          {name}
        </P>
      </View>
    );
  }

  return (
    <View className={cn("border-none")}>
      <Icon
        LucideIcon={IconToRender}
        className={cn(
          "self-center",
          focused ? "text-primary" : "text-muted-foreground/90",
        )}
        size={18}
      />
      <P
        className={cn(
          "mt-0.5 text-[11px]",
          focused
            ? "font-customSemiBold text-foreground"
            : "font-customRegular text-muted-foreground",
        )}
      >
        {name}
      </P>
    </View>
  );
};
