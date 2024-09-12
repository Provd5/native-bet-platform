import type { FC } from "react";
import { ScrollView, View } from "react-native";

import { cn } from "~/lib/utils";

interface ScrollAreaProps {
  children: React.ReactNode;
  center?: boolean;
  className?: string;
}

export const ScrollArea: FC<ScrollAreaProps> = ({
  children,
  center,
  className,
}) => {
  return (
    <View className="flex-1">
      <ScrollView contentContainerClassName="min-h-full">
        <View
          className={cn(
            "h-full",
            center && "items-center justify-center",
            className,
          )}
        >
          {children}
        </View>
      </ScrollView>
    </View>
  );
};
