import type { FC } from "react";
import { View } from "react-native";

import { P } from "../ui/typography";
import { LoadingSpinner } from "./spinners";

export const ContentLoader: FC = () => {
  return (
    <View className="mx-auto flex-row items-center gap-1 py-3">
      <LoadingSpinner className="text-foreground" />
      <P>Ładowanie...</P>
    </View>
  );
};
