import TopTabs from "expo-router/js-top-tabs";
import { Award, Coins, ListChecks } from "lucide-react-native";

import { TabIcon } from "~/components/tab-icon";

export default function GamesTabsLayout() {
  return (
    <TopTabs
      initialRouteName="index"
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarItemStyle: { width: "auto" },
        tabBarIconStyle: { width: "100%", paddingHorizontal: 10 },
        tabBarStyle: { margin: "auto", shadowColor: "transparent" },
      }}
    >
      <TopTabs.Screen
        name="finals"
        options={{
          title: "Finaliści",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon
              secondary
              IconToRender={Award}
              name="Finaliści"
              focused={focused}
            />
          ),
        }}
      />
      <TopTabs.Screen
        name="index"
        options={{
          title: "Otwarte",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon
              secondary
              IconToRender={Coins}
              name="Otwarte"
              focused={focused}
            />
          ),
        }}
      />
      <TopTabs.Screen
        name="closed"
        options={{
          title: "Zamknięte",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon
              secondary
              IconToRender={ListChecks}
              name="Zamknięte"
              focused={focused}
            />
          ),
        }}
      />
    </TopTabs>
  );
}
