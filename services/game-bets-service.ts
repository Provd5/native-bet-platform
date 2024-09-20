import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { BetInterface } from "~/types/games";

import { store } from "~/firebase.config";
import { useAppSelector } from "~/hooks/redux";
import { ERROR_ENUM } from "~/lib/constants";
import {
  betGameSchema,
  betGameSchemaType,
  betSchema,
  betSchemaType,
} from "~/lib/validators/bet-schema";

const COLLECTION_NAME = "bets";

export class GameBetsService {
  private sessionUser = useAppSelector((state) => state.sessionUser);

  private getRef = () => {
    return collection(store, COLLECTION_NAME);
  };

  // GET
  getSessionBets = async (): Promise<BetInterface[]> => {
    try {
      if (!this.sessionUser.dbUserData || !this.sessionUser.fsUserData) {
        throw new Error(ERROR_ENUM.UNAUTHORIZED, { cause: "CUSTOM" });
      }

      const q = query(
        this.getRef(),
        where("userId", "==", this.sessionUser.fsUserData.uid),
      );
      const bets = await getDocs(q);

      if (bets.empty) return [];

      const betsArray = bets.docs.map((doc) => doc.data()) as BetInterface[];

      return betsArray;
    } catch (e) {
      console.error("Error getting session bets:", e);
      throw new Error(
        "Nie udało się pobrać danych o twoich zakładach." +
          ` ${e instanceof Error && e.cause === "CUSTOM" ? e.message : ERROR_ENUM.TRY_AGAIN_LATER}.`,
      );
    }
  };

  getGameBets = async (gameId: string | number): Promise<BetInterface[]> => {
    try {
      const q = query(this.getRef(), where("gameId", "==", gameId));
      const bets = await getDocs(q);

      if (bets.empty) return [];

      const betsArray = bets.docs.map((doc) => doc.data()) as BetInterface[];

      return betsArray;
    } catch (e) {
      console.error("Error getting game bets:", e);
      throw new Error(
        "Nie udało się pobrać danych zakładów." +
          ` ${ERROR_ENUM.TRY_AGAIN_LATER}.`,
      );
    }
  };

  getUsersBets = async (): Promise<BetInterface[]> => {
    try {
      const bets = await getDocs(this.getRef());

      if (bets.empty) return [];

      const betsArray = bets.docs.map((doc) => doc.data()) as BetInterface[];

      return betsArray;
    } catch (e) {
      console.error("Error getting users bets:", e);
      throw new Error(
        "Nie udało się pobrać danych zakładów innych użytkowników." +
          ` ${ERROR_ENUM.TRY_AGAIN_LATER}.`,
      );
    }
  };

  // POST
  betGame = async (
    values: betSchemaType,
    gameValues: betGameSchemaType,
  ): Promise<void> => {
    try {
      const validValues = betSchema.parse(values);
      const validGameValues = betGameSchema.parse(gameValues);

      if (values.winner === "")
        throw new Error("Wybierz najpierw kto wygra", { cause: "CUSTOM" });

      if (Date.now() > gameValues.timestamp)
        throw new Error("Zakłady na ten mecz zostały już zamknięte", {
          cause: "CUSTOM",
        });

      if (!this.sessionUser.dbUserData || !this.sessionUser.fsUserData)
        throw new Error(ERROR_ENUM.UNAUTHORIZED, { cause: "CUSTOM" });

      const betsRef = doc(
        store,
        COLLECTION_NAME,
        `${this.sessionUser.fsUserData.uid}_${validGameValues.gameId}`,
      );

      await setDoc(betsRef, {
        username: this.sessionUser.dbUserData.username,
        userId: this.sessionUser.fsUserData.uid,
        gameId: validGameValues.gameId,
        awayGoals: validValues.away,
        homeGoals: validValues.home,
        winner: validValues.winner,
        gameStage: validGameValues.stage,
      });
    } catch (e) {
      console.error("Error creating new bet:", e);
      throw new Error(
        "Nie udało się utworzyć zakładu." +
          ` ${e instanceof Error && e.cause === "CUSTOM" ? e.message : ERROR_ENUM.TRY_AGAIN_LATER}.`,
      );
    }
  };
}
