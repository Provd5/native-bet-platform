import { FC } from "react";
import { View } from "react-native";

import { DataLoadError } from "~/components/data-load-error";
import { ContentLoader } from "~/components/Loaders/content-loader";
import { H4, Muted, Small } from "~/components/ui/typography";
import { useGetSessionFinalsBet } from "~/hooks/actions/finals-bet-actions";
import { useAppSelector } from "~/hooks/redux";

import { BetFinalsForm } from "./bet-finals-form";
import { FINALS_BETTING_CLOSING_DATE } from "~/constants/app";
import { cn, dateFormat } from "~/lib/utils";

export const BetFinals: FC = () => {
  const teams = useAppSelector((state) => state.teams);
  const { data: sessionFinalsBet, status } = useGetSessionFinalsBet();

  if (teams.status === "pending" || status === "pending")
    return <ContentLoader />;
  if (
    teams.status === "error" ||
    status === "error" ||
    sessionFinalsBet === undefined
  )
    return <DataLoadError />;

  return teams.teams ? (
    <View className="w-full gap-3 px-2 py-8">
      <View className="mx-auto w-full max-w-4xl rounded-2xl border border-border/70 bg-card/90 p-3">
        <Small className="font-customSemiBold uppercase tracking-wide text-muted-foreground">
          Typowanie finałów
        </Small>
        <Muted className="mt-1 text-sm text-accent">
          Koniec typowania: {dateFormat(FINALS_BETTING_CLOSING_DATE)}
        </Muted>
      </View>
      <BetFinalsForm teams={teams.teams} sessionFinalsBet={sessionFinalsBet} />
    </View>
  ) : (
    <DataLoadError isEmpty />
  );
};
