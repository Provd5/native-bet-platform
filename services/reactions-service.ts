import {
  deleteField,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  type Unsubscribe,
  updateDoc,
} from "firebase/firestore";

import { UserInterface } from "~/types/users";

import { store } from "~/firebase.config";
import { ERROR_ENUM } from "~/lib/constants";

const GAME_REACTIONS_COLLECTION_NAME = "reactions";
const USERS_COLLECTION_NAME = "users";

export class ReactionsService {
  private getGameReactionRef = (gameId: string | number) => {
    return doc(store, GAME_REACTIONS_COLLECTION_NAME, String(gameId));
  };

  private getUserRef = (userId: string) => {
    return doc(store, USERS_COLLECTION_NAME, userId);
  };

  private mapReactions = (value: unknown): Record<string, string> => {
    if (!value || typeof value !== "object") return {};

    return Object.entries(value as Record<string, unknown>).reduce(
      (acc, [userId, emoji]) => {
        if (typeof emoji === "string") acc[userId] = emoji;
        return acc;
      },
      {} as Record<string, string>,
    );
  };

  getGameReactions = async (
    gameId: string | number,
  ): Promise<Record<string, string>> => {
    try {
      const snap = await getDoc(this.getGameReactionRef(gameId));
      if (!snap.exists()) return {};

      return this.mapReactions(snap.data());
    } catch (e) {
      console.error("Error getting game reactions:", e);
      throw new Error(
        "Nie udało się pobrać reakcji meczu." +
          ` ${ERROR_ENUM.TRY_AGAIN_LATER}.`,
        { cause: e },
      );
    }
  };

  subscribeToGameReactions = (
    gameId: string | number,
    onData: (reactions: Record<string, string>) => void,
    onError: (error: Error) => void,
  ): Unsubscribe =>
    onSnapshot(
      this.getGameReactionRef(gameId),
      (snapshot) => {
        try {
          if (!snapshot.exists()) {
            onData({});
            return;
          }

          onData(this.mapReactions(snapshot.data()));
        } catch (e) {
          console.error("Error subscribing to game reactions:", e);
          onError(
            new Error(
              "Nie udało się odświeżyć reakcji meczu." +
                ` ${ERROR_ENUM.TRY_AGAIN_LATER}.`,
              { cause: e },
            ),
          );
        }
      },
      (e) => {
        console.error("Error subscribing to game reactions:", e);
        onError(
          new Error(
            "Nie udało się odświeżyć reakcji meczu." +
              ` ${ERROR_ENUM.TRY_AGAIN_LATER}.`,
          ),
        );
      },
    );

  setGameReaction = async (
    gameId: string | number,
    userId: string,
    emoji: string,
  ): Promise<void> => {
    try {
      if (!userId)
        throw new Error(ERROR_ENUM.UNAUTHORIZED, { cause: "CUSTOM" });

      await setDoc(
        this.getGameReactionRef(gameId),
        { [userId]: emoji },
        { merge: true },
      );
    } catch (e) {
      console.error("Error setting game reaction:", e);
      throw new Error(
        "Nie udało się dodać reakcji." +
          ` ${e instanceof Error && e.cause === "CUSTOM" ? e.message : ERROR_ENUM.TRY_AGAIN_LATER}.`,
        { cause: e },
      );
    }
  };

  removeGameReaction = async (
    gameId: string | number,
    userId: string,
  ): Promise<void> => {
    try {
      if (!userId)
        throw new Error(ERROR_ENUM.UNAUTHORIZED, { cause: "CUSTOM" });

      await updateDoc(this.getGameReactionRef(gameId), {
        [userId]: deleteField(),
      });
    } catch (e) {
      console.error("Error removing game reaction:", e);
      throw new Error(
        "Nie udało się usunąć reakcji." +
          ` ${e instanceof Error && e.cause === "CUSTOM" ? e.message : ERROR_ENUM.TRY_AGAIN_LATER}.`,
        { cause: e },
      );
    }
  };

  getReactionUsers = async (
    userIds: string[],
  ): Promise<Record<string, string>> => {
    try {
      const uniqueUserIds = [...new Set(userIds.filter(Boolean))];

      if (uniqueUserIds.length === 0) return {};

      const usersEntries = await Promise.all(
        uniqueUserIds.map(async (userId) => {
          const userSnap = await getDoc(this.getUserRef(userId));

          if (!userSnap.exists()) return [userId, userId] as const;

          const userData = userSnap.data() as Partial<UserInterface>;
          const username =
            typeof userData.username === "string" && userData.username.trim()
              ? userData.username
              : userId;

          return [userId, username] as const;
        }),
      );

      return Object.fromEntries(usersEntries);
    } catch (e) {
      console.error("Error getting reaction users:", e);
      throw new Error(
        "Nie udało się pobrać autorów reakcji." +
          ` ${ERROR_ENUM.TRY_AGAIN_LATER}.`,
        { cause: e },
      );
    }
  };
}
