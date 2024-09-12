import { type FC } from "react";
import { Stack } from "expo-router";

import { useAuthChangesSubscriber } from "~/hooks/actions/user-actions";
import useRedirectUser from "~/hooks/useRedirectUser";

export const Stacks: FC = () => {
  useAuthChangesSubscriber();
  useRedirectUser();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(callback)" options={{ headerShown: false }} />
    </Stack>
  );
};
