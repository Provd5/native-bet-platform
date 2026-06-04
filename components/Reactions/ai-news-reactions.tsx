import { FC, useMemo } from "react";

import {
  useGetAINewsReactionUsers,
  useToggleAINewsReaction,
} from "~/hooks/actions/ai-news-actions";

import { ReactionsPicker } from "./reactions-picker";

interface AINewsReactionsProps {
  newsId: string;
  reactionsByUserId: Record<string, string>;
  currentUserId: string;
}

export const AINewsReactions: FC<AINewsReactionsProps> = ({
  newsId,
  reactionsByUserId,
  currentUserId,
}) => {
  const { toggleReactionAsync } = useToggleAINewsReaction();
  const reactionUserIds = useMemo(
    () => Object.keys(reactionsByUserId),
    [reactionsByUserId],
  );
  const { data: reactionUsersMap } = useGetAINewsReactionUsers(reactionUserIds);

  return (
    <ReactionsPicker
      reactionsByUserId={reactionsByUserId}
      currentUserId={currentUserId}
      reactionUsersMap={reactionUsersMap}
      onToggleReaction={({ emoji, currentReaction }) =>
        toggleReactionAsync({
          newsId,
          emoji,
          currentReaction,
        })
      }
    />
  );
};
