import type { FC } from "react";
import React from "react";
import { View } from "react-native";
import { LoaderCircle } from "lucide-react-native";

import Icon from "~/lib/icons/Icon";
import { cn } from "~/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: number;
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  className,
  size,
}) => {
  return (
    <View className="animate-spin-fast">
      <Icon
        LucideIcon={LoaderCircle}
        className={cn("text-primary-foreground", className)}
        size={size}
      />
    </View>
  );
};
