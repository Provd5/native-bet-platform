import { View } from "react-native";

import { GamesTable } from "~/components/Games/games-table";
import { H3 } from "~/components/ui/typography";

export default function ClosedGamesPage() {
  return (
    <View className="h-full items-center bg-background px-2">
      <GamesTable isClosed />
    </View>
  );
}
