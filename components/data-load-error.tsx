import type { FC } from "react";
import { View } from "react-native";

import { ERROR_ENUM } from "~/lib/constants";

import { H1, P } from "./ui/typography";

export const DataLoadError: FC = () => {
  return (
    <View className="flex items-center gap-3">
      <View className="flex flex-col">
        <H1 className="text-xl font-bold">{ERROR_ENUM.FETCH_DATA_PROBLEM}</H1>
        <P>{ERROR_ENUM.TRY_AGAIN_LATER}</P>
      </View>
    </View>
  );
};
