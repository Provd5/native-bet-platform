import type { FC } from "react";
import { View } from "react-native";

import { Logo } from "../logo";

export const PageLoader: FC = () => {
  return (
    <View className="absolute inset-0 flex h-full w-full items-center justify-center">
      <Logo size="lg" className="animate-bounce" />
    </View>
  );
};
