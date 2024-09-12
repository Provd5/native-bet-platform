import { useMutation, useQuery } from "@tanstack/react-query";

import { betGameSchemaType, betSchemaType } from "~/lib/validators/bet-schema";
import { GameBetsService } from "~/services/game-bets-service";

const QUERY_KEY = "game-bets";

export function useGetSessionBets() {
  const gameBetsService = new GameBetsService();

  const { data, status } = useQuery({
    queryKey: [QUERY_KEY, "session-bets"],
    queryFn: () => gameBetsService.getSessionBets(),
  });

  return {
    status: status,
    data: data,
  };
}

export function useGetGameBets(gameId: string | number) {
  const gameBetsService = new GameBetsService();

  const { data, status } = useQuery({
    queryKey: [QUERY_KEY, "game-bets", gameId],
    queryFn: () => gameBetsService.getGameBets(gameId),
  });

  return {
    status: status,
    data: data,
  };
}

export function useGetUsersBets() {
  const gameBetsService = new GameBetsService();

  const { data, status } = useQuery({
    queryKey: [QUERY_KEY, "users-bets"],
    queryFn: () => gameBetsService.getUsersBets(),
  });

  return {
    status: status,
    data: data,
  };
}

export function useBetGame() {
  const gameBetsService = new GameBetsService();

  const { mutateAsync, error } = useMutation({
    mutationFn: (payload: {
      values: betSchemaType;
      gameValues: betGameSchemaType;
    }) => gameBetsService.betGame(payload.values, payload.gameValues),
  });

  return {
    betGameAsync: mutateAsync,
    error,
  };
}
