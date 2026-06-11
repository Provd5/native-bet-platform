import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

import { BetFinalsInterface } from "~/types/teams";

import { FINALS_BETTING_CLOSING_DATE } from "~/constants/app";
import { store } from "~/firebase.config";
import { ERROR_ENUM } from "~/lib/constants";
import { getServerNow, initServerTimeGuard } from "~/lib/server-time";
import type { AppState } from "~/lib/store";
import {
  betFinalsSchema,
  betFinalsSchemaType,
} from "~/lib/validators/bet-schema";
import { normalizeFinalsBet } from "~/services/finals-bets/finals-bets-compat.utils";
import { getTeamsDictionary } from "~/services/finals-bets/finals-bets-teams-dictionary";

const COLLECTION_NAME = "finals";

export class FinalsBetsService {
  constructor(private sessionUser: AppState["sessionUser"]) {}

  private getRef = () => {
    return collection(store, COLLECTION_NAME);
  };

  private getQuery = (userId: string) => {
    return doc(this.getRef(), `${userId}_finals`);
  };

  getSessionFinalsBet = async (): Promise<BetFinalsInterface | null> => {
    try {
      if (!this.sessionUser.dbUserData || !this.sessionUser.fsUserData) {
        throw new Error(ERROR_ENUM.UNAUTHORIZED, { cause: "CUSTOM" });
      }

      const q = this.getQuery(this.sessionUser.fsUserData.uid);
      const finalsBet = await getDoc(q);

      if (!finalsBet.exists()) return null;

      const teamsDictionary = await getTeamsDictionary();
      const finalsBetData = normalizeFinalsBet(
        finalsBet.data(),
        teamsDictionary,
      );

      return finalsBetData;
    } catch (e) {
      console.error("Error getting session finals bets:", e);
      throw new Error(
        "Nie udało się pobrać danych o twoich zakładach." +
          ` ${e instanceof Error && e.cause === "CUSTOM" ? e.message : ERROR_ENUM.TRY_AGAIN_LATER}.`,
      );
    }
  };

  getUsersFinalsBets = async (): Promise<BetFinalsInterface[]> => {
    try {
      const finalsBets = await getDocs(this.getRef());

      if (finalsBets.empty) return [];

      const teamsDictionary = await getTeamsDictionary();

      const finalsArray = finalsBets.docs
        .map((doc) => doc.data())
        .map((docData) => normalizeFinalsBet(docData, teamsDictionary))
        .filter((bet): bet is BetFinalsInterface => bet !== null);

      return finalsArray;
    } catch (e) {
      console.error("Error getting users finals bets:", e);
      throw new Error(
        "Nie udało się pobrać danych zakładów innych użytkowników." +
          ` ${ERROR_ENUM.TRY_AGAIN_LATER}.`,
      );
    }
  };

  betFinals = async (values: betFinalsSchemaType): Promise<void> => {
    try {
      const validValues = betFinalsSchema.parse(values);

      if (validValues.teams.length !== 2)
        throw new Error("Wybierz najpierw dwie drużyny finałowe", {
          cause: "CUSTOM",
        });

      await initServerTimeGuard();

      if (getServerNow() > FINALS_BETTING_CLOSING_DATE)
        throw new Error("Zakłady na finały zostały już zamknięte", {
          cause: "CUSTOM",
        });

      if (!this.sessionUser.dbUserData || !this.sessionUser.fsUserData)
        throw new Error(ERROR_ENUM.UNAUTHORIZED, { cause: "CUSTOM" });

      const q = this.getQuery(this.sessionUser.fsUserData.uid);

      await setDoc(q, {
        userId: this.sessionUser.fsUserData.uid,
        username: this.sessionUser.dbUserData.username,
        teamBet: validValues.teams,
      });
    } catch (e) {
      console.error("Error creating new finals bet:", e);
      throw new Error(
        "Nie udało się utworzyć zakładu." +
          ` ${e instanceof Error && e.cause === "CUSTOM" ? e.message : ERROR_ENUM.TRY_AGAIN_LATER}.`,
      );
    }
  };
}
