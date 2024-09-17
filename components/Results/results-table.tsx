import type { FC } from "react";
import { FlatList } from "react-native";

import { useGetFinalsUsersBets } from "~/hooks/actions/finals-bet-actions";
import { useGetUsersBets } from "~/hooks/actions/game-bets-action";
import { useAppSelector } from "~/hooks/redux";

import { DataLoadError } from "../data-load-error";
import { ContentLoader } from "../Loaders/ContentLoader";
import resultsCalculator from "./Calculator/results-calculator";
import { ResultCard } from "./Result/result-card";

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
    [...games.closedGames, ...games.openGames],
    bets.data,
    finalsBets.data,
  );

  return results.length > 0 ? (
    <FlatList
      className="w-full"
      data={results}
      keyExtractor={(item) => `ResultsTable-${item.userId}`}
      renderItem={({ item, index }) => (
        <ResultCard
          isOdd={index % 2 === 0}
          result={item}
          sessionUserId={sessionUser.fsUserData?.uid || ""}
        />
      )}
    />
  ) : (
    <DataLoadError description="Nikt jeszcze nic nie obstawił 🕸️" isEmpty />
  );
};
