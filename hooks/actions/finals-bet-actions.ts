import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAppSelector } from "~/hooks/redux";
import { betFinalsSchemaType } from "~/lib/validators/bet-schema";
import { FinalsBetsService } from "~/services/finals-bet-service";

const QUERY_KEY = "finals-bet";

export function useGetSessionFinalsBet() {
  const sessionUser = useAppSelector((state) => state.sessionUser);
  const finalsBetsService = new FinalsBetsService(sessionUser);

  const { data, status } = useQuery({
    queryKey: [QUERY_KEY, "session", "session-finals-bet"],
    queryFn: () => finalsBetsService.getSessionFinalsBet(),
    staleTime: Infinity,
  });

  return {
    status: status,
    data: data,
  };
}

export function useGetFinalsUsersBets() {
  const sessionUser = useAppSelector((state) => state.sessionUser);
  const finalsBetsService = new FinalsBetsService(sessionUser);

  const { data, status } = useQuery({
    queryKey: [QUERY_KEY, "users-finals-bets"],
    queryFn: () => finalsBetsService.getUsersFinalsBets(),
  });

  return {
    status: status,
    data: data,
  };
}

export function useBetFinals() {
  const sessionUser = useAppSelector((state) => state.sessionUser);
  const finalsBetsService = new FinalsBetsService(sessionUser);
  const queryClient = useQueryClient();

  const { mutateAsync, error } = useMutation({
    mutationFn: (payload: { values: betFinalsSchemaType }) =>
      finalsBetsService.betFinals(payload.values),
    onSuccess: () =>
      queryClient.refetchQueries({
        queryKey: [QUERY_KEY, "session", "session-finals-bet"],
        exact: true,
      }),
  });

  return {
    betFinalsAsync: mutateAsync,
    error,
  };
}
