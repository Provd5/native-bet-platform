import { View } from "react-native";

import { BetFinals } from "~/components/Games/Finals/bet-finals";
import { BetFinalsUsers } from "~/components/Games/Finals/bet-finals-users";
import { H3, P } from "~/components/ui/typography";
import { FINALS_BETTING_CLOSING_DATE } from "~/constants/app";
import { useFetchTeamsSubscriber } from "~/hooks/actions/teams-actions";
import { useServerTime } from "~/hooks/use-server-time";
import { dateFormat } from "~/lib/utils";

export default function FinalsPage() {
  useFetchTeamsSubscriber();
  const serverNow = useServerTime();
  const isFinished = serverNow > FINALS_BETTING_CLOSING_DATE;

  return isFinished ? (
    <View className="flex-1 bg-background px-2">
      <BetFinalsUsers />
    </View>
  ) : (
    <View className="flex-1 bg-background px-2">
      <BetFinals />
    </View>
  );
}
