import { FC } from "react";

import { DataLoadError } from "~/components/data-load-error";
import { ContentLoader } from "~/components/Loaders/ContentLoader";
import { useGetFinalsUsersBets } from "~/hooks/actions/finals-bet-actions";
import { useAppSelector } from "~/hooks/redux";

import { FinalsBetsList } from "./finals-bets-list";

export const BetFinalsUsers: FC = () => {
  const sessionUser = useAppSelector((state) => state.sessionUser);
  const { data: finalsBets, status } = useGetFinalsUsersBets();

  if (status === "pending") return <ContentLoader />;
  if (status === "error" || finalsBets === undefined) return <DataLoadError />;

  const sortedFinalsBets = finalsBets
    .sort((a, b) => {
      const usernameA = a.username.toUpperCase();
      const usernameB = b.username.toUpperCase();
      if (usernameA < usernameB) {
        return -1;
      }
      return 1;
    })
    .sort((a) => {
      if (a.userId === sessionUser.fsUserData?.uid || "") {
        return -1;
      }
      return 1;
    });

  return finalsBets.length > 0 ? (
    <FinalsBetsList
      finalsBets={sortedFinalsBets}
      sessionUserId={sessionUser.fsUserData?.uid || ""}
    />
  ) : (
    <DataLoadError isEmpty />
  );
};
