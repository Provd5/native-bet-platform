import type { FC } from "react";
import React from "react";
import { View } from "react-native";

import { LoaderCircle } from "~/lib/icons/LoaderCircle";

export const LoadingSpinner: FC = () => {
  return (
    <View className="animate-spin-fast">
      <LoaderCircle className="text-primary-foreground" />
    </View>
  );
};
