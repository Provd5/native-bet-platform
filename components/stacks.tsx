import { type FC } from "react";
import { Stack } from "expo-router";

import { useAuthChangesSubscriber } from "~/hooks/actions/user-actions";

export const Stacks: FC = () => {
  useAuthChangesSubscriber();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(callback)" options={{ headerShown: false }} />
    </Stack>
  );
};
