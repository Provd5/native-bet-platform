import TopTabs from "expo-router/js-top-tabs";
import { Activity, Award, Coins, ListChecks } from "lucide-react-native";

import { TabIcon } from "~/components/tab-icon";

export default function GamesTabsLayout() {
  return (
    <TopTabs
      initialRouteName="index"
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "transparent" },
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
          title: "Nadchodzące",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon
              secondary
              IconToRender={Coins}
              name="Nadchodzące"
              focused={focused}
            />
          ),
        }}
      />
      <TopTabs.Screen
        name="live"
        options={{
          title: "Trwające",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon
              secondary
              IconToRender={Activity}
              name="Trwające"
              focused={focused}
            />
          ),
        }}
      />
      <TopTabs.Screen
        name="closed"
        options={{
          title: "Zakończone",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon
              secondary
              IconToRender={ListChecks}
              name="Zakończone"
              focused={focused}
            />
          ),
        }}
      />
    </TopTabs>
  );
}
