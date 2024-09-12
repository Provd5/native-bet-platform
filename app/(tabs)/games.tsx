import { ScrollView, View } from "react-native";

import { GamesSwitcher } from "~/components/Games/games-switcher";
import { GamesTable } from "~/components/Games/games-table";
import { useFetchGamesSubscriber } from "~/hooks/actions/games-actions";

export default function GamesPage() {
  useFetchGamesSubscriber();

  return (
    <>
      <GamesSwitcher />
      <ScrollView contentContainerClassName="min-h-full">
        <View className="items-center py-3">
          <GamesTable />
        </View>
      </ScrollView>
    </>
  );
}
