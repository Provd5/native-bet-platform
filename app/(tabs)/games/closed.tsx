import { View } from "react-native";

import { GamesTable } from "~/components/Games/games-table";
import { H2 } from "~/components/ui/typography";

export default function ClosedGamesPage() {
  return (
    <View className="h-full items-center">
      <H2 className="px-2 py-3 text-center">Sprawdź typy innych!</H2>
      <GamesTable isClosed />
    </View>
  );
}
