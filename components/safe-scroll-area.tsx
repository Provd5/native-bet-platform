import type { FC } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { cn } from "~/lib/utils";

interface SafeScrollAreaProps {
  children: React.ReactNode;
  center?: boolean;
  className?: string;
}

export const SafeScrollArea: FC<SafeScrollAreaProps> = ({
  children,
  center,
  className,
}) => {
  return (
    <SafeAreaView className="flex-1">
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
    </SafeAreaView>
  );
};
