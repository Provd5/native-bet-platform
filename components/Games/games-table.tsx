import { type FC } from "react";
import { FlatList } from "react-native";

import { useGetSessionBets } from "~/hooks/actions/game-bets-action";
import { useAppSelector } from "~/hooks/redux";

import { DataLoadError } from "../data-load-error";
import { P } from "../ui/typography";
import { BetModal } from "./Game/Bet/bet-modal";

interface GamesTableProps {
  isClosed?: boolean;
}

export const GamesTable: FC<GamesTableProps> = ({ isClosed = false }) => {
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

  return (isClosed ? games.closedGames : games.openGames).length > 0 ? (
    <FlatList
      className="w-full"
      data={isClosed ? games.closedGames : games.openGames}
      renderItem={({ item }) => {
        const sessionBet = sessionBets.find((bet) => bet.gameId === item.id);
        return <BetModal game={item} sessionBet={sessionBet} />;
      }}
      keyExtractor={(item) => `GamesTable-${item.id}`}
    />
  ) : isClosed ? (
    <DataLoadError isEmpty description="Brak zaplanowanych meczy 🕸️" />
  ) : (
    <DataLoadError isEmpty description="Wszystkie mecze są wciąż otwarte 🕸️" />
  );
};
