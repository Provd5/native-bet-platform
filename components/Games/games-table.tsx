import { type FC } from "react";
import { FlatList, View } from "react-native";

import { useGetSessionBets } from "~/hooks/actions/game-bets-action";
import { useAppSelector } from "~/hooks/redux";

import { DataLoadError } from "../data-load-error";
import { ContentLoader } from "../Loaders/content-loader";
import { Small } from "../ui/typography";
import { BetModal } from "./Game/Bet/bet-modal";

type GamesTableVariant = "open" | "live" | "closed";

interface GamesTableProps {
  variant?: GamesTableVariant;
}

const GAMES_TABLE_COPY: Record<
  GamesTableVariant,
  {
    title: string;
    empty: string;
  }
> = {
  open: {
    title: "Aktywne zakłady",
    empty: "Brak zaplanowanych meczy\u00a0🕸️",
  },
  live: {
    title: "Trwające mecze",
    empty: "Brak trwających meczów\u00a0🕸️",
  },
  closed: {
    title: "Archiwum zakładów",
    empty: "Wszystkie mecze są\u00a0wciąż otwarte\u00a0🕸️",
  },
};

export const GamesTable: FC<GamesTableProps> = ({ variant = "open" }) => {
  const games = useAppSelector((state) => state.games);
  const { data: sessionBets, status } = useGetSessionBets();
  const displayedGames =
    variant === "closed"
      ? games.closedGames
      : variant === "live"
        ? games.liveGames
        : games.openGames;

  if (games.status === "pending" || status === "pending")
    return <ContentLoader />;
  if (
    games.status === "error" ||
    status === "error" ||
    sessionBets === undefined
  )
    return <DataLoadError />;

  const copy = GAMES_TABLE_COPY[variant];

  return displayedGames.length > 0 ? (
    <FlatList
      className="w-full"
      data={displayedGames}
      contentContainerClassName="mx-auto w-full max-w-4xl px-3 py-8"
      ListHeaderComponent={
        <View className="mb-3 rounded-2xl border border-border/70 bg-card/90 p-3.5">
          <View className="flex-row flex-wrap items-center justify-between gap-2">
            <Small className="font-customSemiBold uppercase tracking-wide text-muted-foreground">
              {copy.title}
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
  ) : (
    <DataLoadError isEmpty description={copy.empty} />
  );
};
