import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { EmojiGroup } from "~/constants/emojis";
import { useAppSelector } from "~/hooks/redux";
import { AINewsService } from "~/services/ai-news-service";

const QUERY_KEY = "ai-news";

export function useGetAINews(itemsLimit = 6) {
  const aiNewsService = new AINewsService();

  const { data, status } = useQuery({
    queryKey: [QUERY_KEY, "feed", itemsLimit],
    queryFn: () => aiNewsService.getAINews(itemsLimit),
  });

  return {
    status,
    data,
  };
}

export function useAINewsSubscriber(itemsLimit = 6) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const aiNewsService = new AINewsService();

    const unsubscribe = aiNewsService.subscribeToAINews(
      (items) => {
        queryClient.setQueryData([QUERY_KEY, "feed", itemsLimit], items);
      },
      () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY, "feed"] });
      },
      itemsLimit,
    );

    return () => unsubscribe();
  }, [itemsLimit, queryClient]);
}

export function useToggleAINewsReaction() {
  const sessionUser = useAppSelector((state) => state.sessionUser);
  const queryClient = useQueryClient();
  const aiNewsService = new AINewsService();

  const { mutateAsync, error } = useMutation({
    mutationFn: async (payload: {
      newsId: string;
      emoji: string | EmojiGroup;
      currentReaction: string | undefined;
    }) => {
      const userId = sessionUser.fsUserData?.uid || "";
      const emoji =
        typeof payload.emoji === "string" ? payload.emoji : payload.emoji.emoji;

      if (payload.currentReaction === emoji) {
        await aiNewsService.removeReaction(payload.newsId, userId);
        return;
      }

      await aiNewsService.setReaction(payload.newsId, userId, emoji);
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [QUERY_KEY, "feed"] });
    },
  });

  return {
    toggleReactionAsync: mutateAsync,
    error,
  };
}

export function useGetAINewsReactionUsers(userIds: string[]) {
  const aiNewsService = new AINewsService();
  const normalizedIds = [...new Set(userIds)].sort();

  const { data, status } = useQuery({
    queryKey: [QUERY_KEY, "reaction-users", normalizedIds],
    queryFn: () => aiNewsService.getReactionUsers(normalizedIds),
    staleTime: 5 * 60 * 1000,
    enabled: normalizedIds.length > 0,
  });

  return {
    status,
    data: data ?? {},
  };
}
