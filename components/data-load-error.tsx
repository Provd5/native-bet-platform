import type { FC } from "react";
import { View } from "react-native";

import { ERROR_ENUM } from "~/lib/constants";

import { H3, P } from "./ui/typography";

interface DataLoadErrorProps {
  isEmpty?: boolean;
  title?: string;
  description?: string;
}

export const DataLoadError: FC<DataLoadErrorProps> = ({
  isEmpty = false,
  title,
  description,
}) => {
  return (
    <View className="px-2 py-3">
      <H3>
        {title
          ? title
          : isEmpty
            ? ERROR_ENUM.NOTHING_FOUND
            : ERROR_ENUM.FETCH_DATA_PROBLEM}
      </H3>
      <P>{description ? description : ERROR_ENUM.TRY_AGAIN_LATER}</P>
    </View>
  );
};
