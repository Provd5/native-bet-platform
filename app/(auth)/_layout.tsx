import { Tabs } from "expo-router";
import { LogIn, UserRoundPlus } from "lucide-react-native";

import { TabIcon } from "~/components/tab-icon";
import { TopBar } from "~/components/top-bar";

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
              <TabIcon
                IconToRender={LogIn}
                name="Logowanie"
                focused={focused}
              />
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
                IconToRender={UserRoundPlus}
                name="Stwórz konto"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
