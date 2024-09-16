import { View } from "react-native";

import { GamesTable } from "~/components/Games/games-table";
import { H3 } from "~/components/ui/typography";

export default function GamesPage() {
  return (
    <View className="h-full items-center">
      <H3 className="px-2 py-3 text-center">Obstawiaj mecze!</H3>
      <GamesTable />
    </View>
  );
}
