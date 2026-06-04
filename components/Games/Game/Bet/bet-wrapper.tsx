import type { FC } from "react";
import { View } from "react-native";

import { H4 } from "~/components/ui/typography";

interface BetWrapperProps {
  children: React.ReactNode;
  title: string;
}

export const BetWrapper: FC<BetWrapperProps> = ({ children, title }) => {
  return (
    <View className="gap-3 rounded-2xl border border-border/70 bg-muted/20 p-3">
      <H4 className="self-center text-base text-muted-foreground">{title}</H4>
      {children}
    </View>
  );
};
