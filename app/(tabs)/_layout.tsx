import { Tabs } from "expo-router";
import { Award, Goal, Newspaper } from "lucide-react-native";

import { RouteRedirect } from "~/components/route-redirect";
import { TabIcon } from "~/components/tab-icon";
import { TopBar } from "~/components/top-bar";
import { useFetchGamesSubscriber } from "~/hooks/actions/games-actions";
import { useColorScheme } from "~/lib/useColorScheme";

export default function TabsLayout() {
  useFetchGamesSubscriber();
  const { isDarkColorScheme } = useColorScheme();

  return (
    <RouteRedirect layout="tabs">
      <TopBar />
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="ai-news"
          options={{
            title: "AI News",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                IconToRender={Newspaper}
                name="AI News"
                focused={focused}
              />
            ),
          }}
        />
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
    </RouteRedirect>
  );
}
