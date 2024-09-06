import { Stack } from "expo-router";

import { TopBar } from "~/components/top-bar";

export default function CallbackLayout() {
  return (
    <>
      <TopBar />
      <Stack>
        <Stack.Screen name="auth-callback" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
