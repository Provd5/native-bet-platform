import { FC, useMemo } from "react";

import {
  useGameReactionsSubscriber,
  useGetGameReactions,
  useGetReactionUsers,
  useToggleGameReaction,
} from "~/hooks/actions/reactions-actions";
import { useAppSelector } from "~/hooks/redux";

import { ReactionsPicker } from "./reactions-picker";

interface GameReactionsProps {
  gameId: string | number;
}

export const GameReactions: FC<GameReactionsProps> = ({ gameId }) => {
  const sessionUserId = useAppSelector(
    (state) => state.sessionUser.fsUserData?.uid || "",
  );
  const { data: reactionsByUserId } = useGetGameReactions(gameId);
  const { toggleGameReactionAsync } = useToggleGameReaction(gameId);
  const reactionUserIds = useMemo(
    () => Object.keys(reactionsByUserId),
    [reactionsByUserId],
  );
  const { data: reactionUsersMap } = useGetReactionUsers(reactionUserIds);

  useGameReactionsSubscriber(gameId);

  return (
    <ReactionsPicker
      reactionsByUserId={reactionsByUserId}
      currentUserId={sessionUserId}
      reactionUsersMap={reactionUsersMap}
      onToggleReaction={toggleGameReactionAsync}
    />
  );
};
