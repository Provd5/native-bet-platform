import type { FC } from "react";
import { FlatList, View } from "react-native";

import { ResultCard } from "~/components/Results/Result/result-card";
import { useGetFinalsUsersBets } from "~/hooks/actions/finals-bet-actions";
import { useGetUsersBets } from "~/hooks/actions/game-bets-action";
import { useAppSelector } from "~/hooks/redux";

import { DataLoadError } from "../data-load-error";
import { ContentLoader } from "../Loaders/content-loader";
import { Small } from "../ui/typography";
import resultsCalculator from "./Calculator/results-calculator";

export const ResultsTable: FC = () => {
  const sessionUser = useAppSelector((state) => state.sessionUser);
  const games = useAppSelector((state) => state.games);
  const bets = useGetUsersBets();
  const finalsBets = useGetFinalsUsersBets();

  if (
    games.status === "pending" ||
    bets.status === "pending" ||
    finalsBets.status === "pending"
  )
    return <ContentLoader />;
  if (
    games.status === "error" ||
    bets.status === "error" ||
    finalsBets.status === "error" ||
    bets.data === undefined ||
    finalsBets.data === undefined
  )
    return <DataLoadError />;

  const results = resultsCalculator(
    [...games.closedGames, ...games.liveGames, ...games.openGames],
    bets.data,
    finalsBets.data,
  );

  return results.length > 0 ? (
    <FlatList
      className="w-full"
      data={results}
      contentContainerClassName="mx-auto w-full max-w-4xl px-3 py-8"
      ListHeaderComponent={
        <View className="mb-3 rounded-2xl border border-border/70 bg-card/90 p-3.5">
          <View className="flex-row flex-wrap items-center justify-between gap-2">
            <Small className="font-customSemiBold uppercase tracking-wide text-muted-foreground">
              Tabela liderów
            </Small>
            <View className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1">
              <Small className="font-customSemiBold text-primary">
                Gracze: {results.length}
              </Small>
            </View>
          </View>
        </View>
      }
      ListFooterComponent={<View className="h-3" />}
      keyExtractor={(item) => `ResultsTable-${item.userId}`}
      renderItem={({ item, index }) => (
        <ResultCard
          isOdd={index % 2 !== 0}
          result={item}
          sessionUserId={sessionUser.fsUserData?.uid || ""}
        />
      )}
    />
  ) : (
    <DataLoadError description="Nikt jeszcze nic nie obstawił 🕸️" isEmpty />
  );
};
