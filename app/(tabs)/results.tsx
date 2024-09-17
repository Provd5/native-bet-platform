import { View } from "react-native";

import { ResultsTable } from "~/components/Results/results-table";
import { H3 } from "~/components/ui/typography";

export default function ResultsPage() {
  return (
    <View className="h-full items-center">
      <H3 className="px-2 py-3 text-center">Punkty za obstawianie</H3>
      <ResultsTable />
    </View>
  );
}
