import { Tabs } from "expo-router";
import { Award, Goal } from "lucide-react-native";

import { TabIcon } from "~/components/tab-icon";
import { TopBar } from "~/components/top-bar";

export default function TabsLayout() {
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
          name="games"
          options={{
            title: "Mecze",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon IconToRender={Goal} name="Mecze" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="results"
          options={{
            title: "Wyniki",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon IconToRender={Award} name="Wyniki" focused={focused} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
