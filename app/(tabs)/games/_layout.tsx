import type {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  type ParamListBase,
  type TabNavigationState,
} from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import { Award, Coins, ListChecks } from "lucide-react-native";

import { TabIcon } from "~/components/tab-icon";
import { useFetchGamesSubscriber } from "~/hooks/actions/games-actions";

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function GamesTabsLayout() {
  useFetchGamesSubscriber();

  return (
    <MaterialTopTabs
      initialRouteName="index"
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarItemStyle: { width: "auto" },
        tabBarIconStyle: { width: "100%", paddingHorizontal: 10 },
        tabBarStyle: { margin: "auto", shadowColor: "transparent" },
      }}
    >
      <MaterialTopTabs.Screen
        name="finals"
        options={{
          title: "Finaliści",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              secondary
              IconToRender={Award}
              name="Finaliści"
              focused={focused}
            />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="index"
        options={{
          title: "Otwarte",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              secondary
              IconToRender={Coins}
              name="Otwarte"
              focused={focused}
            />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="closed"
        options={{
          title: "Zamknięte",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              secondary
              IconToRender={ListChecks}
              name="Zamknięte"
              focused={focused}
            />
          ),
        }}
      />
    </MaterialTopTabs>
  );
}
