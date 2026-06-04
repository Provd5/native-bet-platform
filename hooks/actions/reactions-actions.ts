import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAppSelector } from "~/hooks/redux";
import { ReactionsService } from "~/services/reactions-service";

const QUERY_KEY = "reactions";

export function useGetReactionUsers(userIds: string[]) {
  const reactionsService = new ReactionsService();
  const normalizedIds = [...new Set(userIds)].sort();

  const { data, status } = useQuery({
    queryKey: [QUERY_KEY, "users", normalizedIds],
    queryFn: () => reactionsService.getReactionUsers(normalizedIds),
    staleTime: 5 * 60 * 1000,
    enabled: normalizedIds.length > 0,
  });

  return {
    status,
    data: data ?? {},
  };
}

export function useGetGameReactions(gameId: string | number) {
  const reactionsService = new ReactionsService();

  const { data, status } = useQuery({
    queryKey: [QUERY_KEY, "game", String(gameId)],
    queryFn: () => reactionsService.getGameReactions(gameId),
  });

  return {
    status,
    data: data ?? {},
  };
}

export function useGameReactionsSubscriber(gameId: string | number) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const reactionsService = new ReactionsService();

    const unsubscribe = reactionsService.subscribeToGameReactions(
      gameId,
      (reactions) => {
        queryClient.setQueryData(
          [QUERY_KEY, "game", String(gameId)],
          reactions,
        );
      },
      () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY, "game", String(gameId)],
        });
      },
    );

    return () => unsubscribe();
  }, [gameId, queryClient]);
}

export function useToggleGameReaction(gameId: string | number) {
  const reactionsService = new ReactionsService();
  const sessionUser = useAppSelector((state) => state.sessionUser);
  const queryClient = useQueryClient();

  const { mutateAsync, error } = useMutation({
    mutationFn: async (payload: {
      emoji: string;
      currentReaction: string | undefined;
    }) => {
      const userId = sessionUser.fsUserData?.uid || "";

      if (payload.currentReaction === payload.emoji) {
        await reactionsService.removeGameReaction(gameId, userId);
        return;
      }

      await reactionsService.setGameReaction(gameId, userId, payload.emoji);
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEY, "game", String(gameId)],
      });
    },
  });

  return {
    toggleGameReactionAsync: mutateAsync,
    error,
  };
}
