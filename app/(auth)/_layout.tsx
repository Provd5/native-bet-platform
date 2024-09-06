import { Tabs } from "expo-router";

import { TabIcon } from "~/components/tab-icon";
import { TopBar } from "~/components/top-bar";
import { LogIn } from "~/lib/icons/LogIn";
import { UserRoundPlus } from "~/lib/icons/UserRoundPlus";

export default function AuthLayout() {
  return (
    <>
      <TopBar />
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: { height: 60 },
        }}
      >
        <Tabs.Screen
          name="sign-in"
          options={{
            title: "Logowanie",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon Icon={LogIn} name="Logowanie" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="sign-up"
          options={{
            title: "Stwórz konto",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                Icon={UserRoundPlus}
                name="Stwórz konto"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="auth-callback"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </>
  );
}
