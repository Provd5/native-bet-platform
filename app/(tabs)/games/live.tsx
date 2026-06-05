import { View } from "react-native";

import { GamesTable } from "~/components/Games/games-table";

export default function LiveGamesPage() {
  return (
    <View className="h-full items-center bg-background px-2">
      <GamesTable variant="live" />
    </View>
  );
}
