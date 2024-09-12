import { type FC } from "react";
import { View } from "react-native";

import { useGetSessionBets } from "~/hooks/actions/game-bets-action";
import { useAppSelector } from "~/hooks/redux";
import { cn } from "~/lib/utils";

import { DataLoadError } from "../data-load-error";
import { P } from "../ui/typography";
import { BetModal } from "./Game/Bet/bet-modal";

export const GamesTable: FC = () => {
  const games = useAppSelector((state) => state.games);
  const { data: sessionBets, status } = useGetSessionBets();

  if (games.status === "pending" || status === "pending")
    return <P>Ładowanie...</P>;
  if (
    games.status === "error" ||
    status === "error" ||
    sessionBets === undefined
  )
    return <DataLoadError />;

  return (
    <View className="w-full">
      {games.openGames.map((game) => {
        const sessionBet = sessionBets.find((bet) => bet.gameId === game.id);

        return (
          <View
            className={cn(games.show !== "open" && "hidden")}
            key={`GamesTable-BetModal-${game.id}`}
          >
            <BetModal game={game} sessionBet={sessionBet} />
          </View>
        );
      })}
      {games.closedGames.map((game) => {
        const sessionBet = sessionBets.find((bet) => bet.gameId === game.id);

        return (
          <View
            className={cn(games.show !== "closed" && "hidden")}
            key={`GamesTable-BetModal-${game.id}`}
          >
            <BetModal game={game} sessionBet={sessionBet} />
          </View>
        );
      })}
    </View>
  );
};
