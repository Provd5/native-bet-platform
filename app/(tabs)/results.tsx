import { View } from "react-native";

import { ResultsTable } from "~/components/Results/results-table";

export default function ResultsPage() {
  return (
    <View className="h-full items-center bg-background px-2">
      <ResultsTable />
    </View>
  );
}
