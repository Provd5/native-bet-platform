import { FC } from "react";

import { DataLoadError } from "~/components/data-load-error";
import { P } from "~/components/ui/typography";
import { useGetSessionFinalsBet } from "~/hooks/actions/finals-bet-actions";
import { useAppSelector } from "~/hooks/redux";

import { BetFinalsForm } from "./bet-finals-form";

export const BetFinals: FC = () => {
  const teams = useAppSelector((state) => state.teams);
  const { data: sessionFinalsBet, status } = useGetSessionFinalsBet();

  if (teams.status === "pending" || status === "pending")
    return <P>Ładowanie...</P>;
  if (
    teams.status === "error" ||
    status === "error" ||
    sessionFinalsBet === undefined
  )
    return <DataLoadError />;

  return !!teams.teams ? (
    <BetFinalsForm teams={teams.teams} sessionFinalsBet={sessionFinalsBet} />
  ) : (
    <DataLoadError isEmpty />
  );
};
