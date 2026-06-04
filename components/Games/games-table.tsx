import { type FC } from "react";
import { FlatList, View } from "react-native";

import { useGetSessionBets } from "~/hooks/actions/game-bets-action";
import { useAppSelector } from "~/hooks/redux";

import { DataLoadError } from "../data-load-error";
import { ContentLoader } from "../Loaders/content-loader";
import { Muted, Small } from "../ui/typography";
import { BetModal } from "./Game/Bet/bet-modal";

interface GamesTableProps {
  isClosed?: boolean;
}

export const GamesTable: FC<GamesTableProps> = ({ isClosed = false }) => {
  const games = useAppSelector((state) => state.games);
  const { data: sessionBets, status } = useGetSessionBets();
  const displayedGames = isClosed ? games.closedGames : games.openGames;

  if (games.status === "pending" || status === "pending")
    return <ContentLoader />;
  if (
    games.status === "error" ||
    status === "error" ||
    sessionBets === undefined
  )
    return <DataLoadError />;

  return displayedGames.length > 0 ? (
    <FlatList
      className="w-full"
      data={displayedGames}
      contentContainerClassName="mx-auto w-full max-w-4xl px-3 py-8"
      ListHeaderComponent={
        <View className="mb-3 rounded-2xl border border-border/70 bg-card/90 p-3.5">
          <View className="flex-row flex-wrap items-center justify-between gap-2">
            <Small className="font-customSemiBold uppercase tracking-wide text-muted-foreground">
              {isClosed ? "Archiwum zakładów" : "Aktywne zakłady"}
            </Small>
            <View className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1">
              <Small className="font-customSemiBold text-primary">
                {displayedGames.length}{" "}
                {displayedGames.length === 1 ? "mecz" : "mecze"}
              </Small>
            </View>
          </View>
        </View>
      }
      ListFooterComponent={<View className="h-3" />}
      renderItem={({ item, index }) => {
        const sessionBet = sessionBets.find((bet) => bet.gameId === item.id);
        return (
          <BetModal
            game={item}
            sessionBet={sessionBet}
            isOdd={index % 2 !== 0}
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
