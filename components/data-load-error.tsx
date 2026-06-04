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
    <View className="mx-auto w-full max-w-3xl items-center px-4 py-6">
      <View className="w-full rounded-3xl border border-border/70 bg-card/95 p-5">
        <H3 className="text-center text-foreground">
          {title
            ? title
            : isEmpty
              ? ERROR_ENUM.NOTHING_FOUND
              : ERROR_ENUM.FETCH_DATA_PROBLEM}
        </H3>
        <P className="mt-2 text-center text-muted-foreground">
          {description ? description : ERROR_ENUM.TRY_AGAIN_LATER}
        </P>
      </View>
    </View>
  );
};
