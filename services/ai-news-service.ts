import {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  type Unsubscribe,
  updateDoc,
} from "firebase/firestore";

import { AINewsItem, AINewsKind } from "~/types/ai-news";
import { UserInterface } from "~/types/users";

import { store } from "~/firebase.config";
import { ERROR_ENUM } from "~/lib/constants";

const COLLECTION_NAME = "aiNews";
const USERS_COLLECTION_NAME = "users";

export class AINewsService {
  private getRef = () => {
    return collection(store, COLLECTION_NAME);
  };

  private getQuery = (itemsLimit: number) => {
    return query(
      this.getRef(),
      orderBy("createdAt", "desc"),
      limit(itemsLimit),
    );
  };

  private getUserRef = (userId: string) => {
    return doc(store, USERS_COLLECTION_NAME, userId);
  };

  private isValidKind = (kind: unknown): kind is AINewsKind => {
    return kind === "hotTake" || kind === "weeklyBrief";
  };

  private isAINewsItem = (
    id: string,
    value: unknown,
  ): value is Record<string, unknown> => {
    if (!value || typeof value !== "object") return false;

    const item = value as Record<string, unknown>;

    return (
      id.length > 0 &&
      this.isValidKind(item.kind) &&
      typeof item.title === "string" &&
      typeof item.body === "string"
    );
  };

  private toDate = (value: unknown): Date | null => {
    if (value instanceof Date) return value;
    if (value instanceof Timestamp) return value.toDate();
    if (typeof value === "number") return new Date(value);
    return null;
  };

  private mapDoc = (id: string, value: unknown): AINewsItem | null => {
    if (!this.isAINewsItem(id, value)) return null;

    const raw = value;

    return {
      id,
      kind: raw.kind as AINewsKind,
      title: raw.title as string,
      body: raw.body as string,
      createdAt: this.toDate(raw.createdAt),
      gameId: typeof raw.gameId === "number" ? raw.gameId : undefined,
      sources:
        raw.sources instanceof Array
          ? raw.sources.filter((x) => typeof x === "string")
          : [],
      reactionsByUserId:
        raw.reactionsByUserId && typeof raw.reactionsByUserId === "object"
          ? Object.entries(
              raw.reactionsByUserId as Record<string, unknown>,
            ).reduce(
              (acc, [userId, emoji]) => {
                if (typeof emoji === "string") acc[userId] = emoji;
                return acc;
              },
              {} as Record<string, string>,
            )
          : {},
    };
  };

  getAINews = async (itemsLimit = 6): Promise<AINewsItem[]> => {
    try {
      const snapshot = await getDocs(this.getQuery(itemsLimit));

      if (snapshot.empty) return [];

      return snapshot.docs
        .map((docSnap) => this.mapDoc(docSnap.id, docSnap.data()))
        .filter((item): item is AINewsItem => item !== null);
    } catch (e) {
      console.error("Error getting ai news:", e);
      throw new Error(
        "Nie udało się pobrać AI newsów." + ` ${ERROR_ENUM.TRY_AGAIN_LATER}.`,
        { cause: e },
      );
    }
  };

  subscribeToAINews = (
    onData: (items: AINewsItem[]) => void,
    onError: (error: Error) => void,
    itemsLimit = 6,
  ): Unsubscribe =>
    onSnapshot(
      this.getQuery(itemsLimit),
      (snapshot) => {
        try {
          const items = snapshot.docs
            .map((docSnap) => this.mapDoc(docSnap.id, docSnap.data()))
            .filter((item): item is AINewsItem => item !== null);

          onData(items);
        } catch (e) {
          console.error("Error subscribing to ai news:", e);
          onError(
            new Error(
              "Nie udało się odświeżyć AI newsów." +
                ` ${ERROR_ENUM.TRY_AGAIN_LATER}.`,
              { cause: e },
            ),
          );
        }
      },
      (e) => {
        console.error("Error subscribing to ai news:", e);
        onError(
          new Error(
            "Nie udało się odświeżyć AI newsów." +
              ` ${ERROR_ENUM.TRY_AGAIN_LATER}.`,
          ),
        );
      },
    );

  setReaction = async (
    newsId: string,
    userId: string,
    emoji: string,
  ): Promise<void> => {
    try {
      if (!userId)
        throw new Error(ERROR_ENUM.UNAUTHORIZED, { cause: "CUSTOM" });

      await setDoc(
        doc(this.getRef(), newsId),
        { reactionsByUserId: { [userId]: emoji } },
        { merge: true },
      );
    } catch (e) {
      console.error("Error setting ai news reaction:", e);
      throw new Error(
        "Nie udało się dodać reakcji." +
          ` ${e instanceof Error && e.cause === "CUSTOM" ? e.message : ERROR_ENUM.TRY_AGAIN_LATER}.`,
        { cause: e },
      );
    }
  };

  removeReaction = async (newsId: string, userId: string): Promise<void> => {
    try {
      if (!userId)
        throw new Error(ERROR_ENUM.UNAUTHORIZED, { cause: "CUSTOM" });

      await updateDoc(doc(this.getRef(), newsId), {
        [`reactionsByUserId.${userId}`]: deleteField(),
      });
    } catch (e) {
      console.error("Error removing ai news reaction:", e);
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
      console.error("Error getting ai news reaction users:", e);
      throw new Error(
        "Nie udało się pobrać autorów reakcji." +
          ` ${ERROR_ENUM.TRY_AGAIN_LATER}.`,
        { cause: e },
      );
    }
  };
}
