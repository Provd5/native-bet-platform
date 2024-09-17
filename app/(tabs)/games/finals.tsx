import { View } from "react-native";

import { BetFinals } from "~/components/Games/Finals/bet-finals";
import { BetFinalsUsers } from "~/components/Games/Finals/bet-finals-users";
import { H3, P } from "~/components/ui/typography";
import { FINALS_BETTING_CLOSING_DATE } from "~/constants/app";
import { useFetchTeamsSubscriber } from "~/hooks/actions/teams-actions";
import { dateFormat } from "~/lib/utils";

export default function FinalsPage() {
  useFetchTeamsSubscriber();
  const isFinished = Date.now() > FINALS_BETTING_CLOSING_DATE;

  return (
    <>
      {isFinished ? (
        <View className="h-full items-center">
          <H3 className="px-2 py-3 text-center">Wytypowani finaliści!</H3>
          <BetFinalsUsers />
        </View>
      ) : (
        <View className="h-full items-center pb-[57px]">
          <H3 className="px-2 pt-3 text-center">Wytypuj finalistów!</H3>
          <P className="px-2 pb-1.5 text-center font-customSemiBold text-info">
            Zamknięcie zakładów:{" "}
            <P style={{ textTransform: "capitalize" }}>
              {dateFormat(FINALS_BETTING_CLOSING_DATE)}
            </P>
          </P>
          <BetFinals />
        </View>
      )}
    </>
  );
}
