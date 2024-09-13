import { View } from "react-native";

import { GamesTable } from "~/components/Games/games-table";
import { H2 } from "~/components/ui/typography";

export default function GamesPage() {
  return (
    <View className="h-full items-center">
      <H2 className="px-2 py-3 text-center">Obstawiaj mecze!</H2>
      <GamesTable />
    </View>
  );
}
