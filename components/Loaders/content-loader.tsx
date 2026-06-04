import type { FC } from "react";
import { View } from "react-native";

import { P } from "../ui/typography";
import { LoadingSpinner } from "./spinners";

export const ContentLoader: FC = () => {
  return (
    <View className="mx-auto w-full max-w-3xl items-center px-4 py-6">
      <View className="flex-row items-center gap-2 rounded-full border border-border/70 bg-card/95 px-4 py-2.5">
        <LoadingSpinner className="text-primary" />
        <P className="font-customMedium text-foreground">Ładowanie...</P>
      </View>
    </View>
  );
};
