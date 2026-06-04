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
    <View className="relative flex-1 overflow-hidden bg-background">
      <View className="absolute -left-24 -top-20 h-64 w-64 rounded-full bg-accent/25" />
      <View className="absolute -right-20 top-40 h-56 w-56 rounded-full bg-primary/20" />
      <View className="absolute bottom-20 left-10 h-40 w-40 rounded-full bg-secondary/50" />
      <ScrollView contentContainerClassName="min-h-full">
        <View
          className={cn(
            "h-full px-3 pb-8 pt-3",
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
