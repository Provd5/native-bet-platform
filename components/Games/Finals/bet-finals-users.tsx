import { FC } from "react";
import { View } from "react-native";

import { DataLoadError } from "~/components/data-load-error";
import { H2, P } from "~/components/ui/typography";
import { useGetFinalsUsersBets } from "~/hooks/actions/finals-bet-actions";

export const BetFinalsUsers: FC = () => {
  const { data: finalsUsersBets, status } = useGetFinalsUsersBets();

  if (status === "pending") return <P>Ładowanie...</P>;
  if (status === "error" || finalsUsersBets === undefined)
    return <DataLoadError />;

  return (
    <View>
      <H2 className="px-2 py-6 text-center">Wytypowani finaliści</H2>
      {finalsUsersBets.length > 0 ? (
        finalsUsersBets.map((finalsUsersBet) => (
          <P key={`BetFinalsUsers-${finalsUsersBet.id}`}>
            {finalsUsersBet.teamBet[0].teamName}
          </P>
        ))
      ) : (
        <DataLoadError isEmpty description="Nikt nie obstawił finalistów 🕸️" />
      )}
    </View>
  );
};
