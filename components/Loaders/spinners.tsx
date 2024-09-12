import type { FC } from "react";
import React from "react";
import { View } from "react-native";
import { LoaderCircle } from "lucide-react-native";

import Icon from "~/lib/icons/Icon";

export const LoadingSpinner: FC = () => {
  return (
    <View className="animate-spin-fast">
      <Icon LucideIcon={LoaderCircle} className="text-primary-foreground" />
    </View>
  );
};
