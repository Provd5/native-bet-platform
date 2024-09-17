import { type FC } from "react";
import { FlatList } from "react-native";

import { useGetSessionBets } from "~/hooks/actions/game-bets-action";
import { useAppSelector } from "~/hooks/redux";

import { DataLoadError } from "../data-load-error";
import { ContentLoader } from "../Loaders/ContentLoader";
import { BetModal } from "./Game/Bet/bet-modal";

interface GamesTableProps {
  isClosed?: boolean;
}

export const GamesTable: FC<GamesTableProps> = ({ isClosed = false }) => {
  const games = useAppSelector((state) => state.games);
  const { data: sessionBets, status } = useGetSessionBets();

  if (games.status === "pending" || status === "pending")
    return <ContentLoader />;
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
      renderItem={({ item, index }) => {
        const sessionBet = sessionBets.find((bet) => bet.gameId === item.id);
        return (
          <BetModal
            game={item}
            sessionBet={sessionBet}
            isOdd={index % 2 === 0}
          />
        );
      }}
      keyExtractor={(item) => `GamesTable-${item.id}`}
    />
  ) : isClosed ? (
    <DataLoadError isEmpty description="Brak zaplanowanych meczy 🕸️" />
  ) : (
    <DataLoadError isEmpty description="Wszystkie mecze są wciąż otwarte 🕸️" />
  );
};
