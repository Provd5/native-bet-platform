import { Tabs } from "expo-router";

import { TabIcon } from "~/components/tab-icon";
import { TopBar } from "~/components/top-bar";
import { Award } from "~/lib/icons/Award";
import { Goal } from "~/lib/icons/Goal";

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
              <TabIcon Icon={Goal} name="Mecze" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="results"
          options={{
            title: "Wyniki",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon Icon={Award} name="Wyniki" focused={focused} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
