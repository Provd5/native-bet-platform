import { Stack } from "expo-router";

import { RouteRedirect } from "~/components/route-redirect";
import { TopBar } from "~/components/top-bar";

export default function CallbackLayout() {
  return (
    <RouteRedirect layout="callback">
      <TopBar />
      <Stack>
        <Stack.Screen name="auth-callback" options={{ headerShown: false }} />
      </Stack>
    </RouteRedirect>
  );
}
