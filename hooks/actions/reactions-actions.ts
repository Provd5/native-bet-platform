import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { EmojiGroup } from "~/constants/emojis";
import { useAppSelector } from "~/hooks/redux";
import { ReactionsService } from "~/services/reactions-service";

const QUERY_KEY = "reactions";

export function useGetReactionUsers(userIds: string[]) {
  const reactionsService = new ReactionsService();
  const normalizedIds = [...new Set(userIds)];

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
  const gameQueryKey = [QUERY_KEY, "game", String(gameId)] as const;

  const { mutateAsync, error } = useMutation({
    mutationFn: async (payload: {
      emoji: string | EmojiGroup;
      currentReaction: string | undefined;
    }) => {
      const userId = sessionUser.fsUserData?.uid || "";
      const emoji =
        typeof payload.emoji === "string" ? payload.emoji : payload.emoji.emoji;

      if (payload.currentReaction === emoji) {
        await reactionsService.removeGameReaction(gameId, userId);
        return;
      }

      await reactionsService.setGameReaction(gameId, userId, emoji);
    },
    onMutate: async (payload) => {
      const userId = sessionUser.fsUserData?.uid || "";
      const emoji =
        typeof payload.emoji === "string" ? payload.emoji : payload.emoji.emoji;

      await queryClient.cancelQueries({ queryKey: gameQueryKey });

      const previousReactions =
        queryClient.getQueryData<Record<string, string>>(gameQueryKey);

      if (userId) {
        queryClient.setQueryData<Record<string, string>>(
          gameQueryKey,
          (old) => {
            const current = old ?? {};

            if (payload.currentReaction === emoji) {
              const { [userId]: _removed, ...next } = current;
              return next;
            }

            return {
              ...current,
              [userId]: emoji,
            };
          },
        );
      }

      return { previousReactions };
    },
    onError: (_error, _payload, context) => {
      if (context?.previousReactions) {
        queryClient.setQueryData(gameQueryKey, context.previousReactions);
        return;
      }

      queryClient.invalidateQueries({ queryKey: gameQueryKey });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: gameQueryKey });
    },
  });

  return {
    toggleGameReactionAsync: mutateAsync,
    error,
  };
}
