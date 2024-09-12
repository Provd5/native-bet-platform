import type { FC } from "react";
import { View } from "react-native";

import { H4 } from "~/components/ui/typography";

interface BetWrapperProps {
  children: React.ReactNode;
  title: string;
}

export const BetWrapper: FC<BetWrapperProps> = ({ children, title }) => {
  return (
    <View className="gap-2">
      <H4 className="self-center text-muted-foreground">{title}</H4>
      {children}
    </View>
  );
};
