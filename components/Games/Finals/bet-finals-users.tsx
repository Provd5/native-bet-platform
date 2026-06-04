import { FC } from "react";
import { View } from "react-native";

import { DataLoadError } from "~/components/data-load-error";
import { ContentLoader } from "~/components/Loaders/content-loader";
import { useGetFinalsUsersBets } from "~/hooks/actions/finals-bet-actions";
import { useAppSelector } from "~/hooks/redux";

import { FinalsBetsList } from "./finals-bets-list";

export const BetFinalsUsers: FC = () => {
  const sessionUser = useAppSelector((state) => state.sessionUser);
  const { data: finalsBets, status } = useGetFinalsUsersBets();
  const sessionUserId = sessionUser.fsUserData?.uid ?? "";

  if (status === "pending") return <ContentLoader />;
  if (status === "error" || finalsBets === undefined) return <DataLoadError />;

  const sortedFinalsBets = [...finalsBets].sort((a, b) => {
    const aIsSessionUser = a.userId === sessionUserId;
    const bIsSessionUser = b.userId === sessionUserId;

    if (aIsSessionUser !== bIsSessionUser) {
      return aIsSessionUser ? -1 : 1;
    }

    const usernameA = (a.username ?? "").toUpperCase();
    const usernameB = (b.username ?? "").toUpperCase();

    return usernameA.localeCompare(usernameB);
  });

  return sortedFinalsBets.length > 0 ? (
    <View className="w-full flex-1 overflow-hidden">
      <FinalsBetsList
        finalsBets={sortedFinalsBets}
        sessionUserId={sessionUserId}
      />
    </View>
  ) : (
    <DataLoadError isEmpty />
  );
};
