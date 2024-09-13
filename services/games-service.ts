import { child, onValue, query, ref, Unsubscribe } from "firebase/database";

import { GameInterface } from "~/types/games";

import { db } from "~/firebase.config";
import { useAppDispatch } from "~/hooks/redux";
import { setGames } from "~/lib/features/games-slice";

const COLLECTION_NAME = "matches";

export class GamesService {
  private dispatch = useAppDispatch();

  private getRef = () => {
    return query(child(ref(db), COLLECTION_NAME));
  };

  private requiredFields: Partial<keyof GameInterface>[] = [
    "id",
    "awayTeamIcon",
    "awayTeamName",
    "homeTeamIcon",
    "homeTeamName",
    "status",
    "stage",
    "timestamp",
  ] as const;

  // SUBSCRIBE
  subscribeToFetchGames = (): Unsubscribe =>
    onValue(this.getRef(), (snapshot) => {
      try {
        if (!snapshot.exists()) {
          this.dispatch(
            setGames({ openGames: [], closedGames: [], status: "error" }),
          );
        }

        const snapshotValue: unknown = snapshot.val();

        const isArray = snapshotValue instanceof Array;
        const isObject = snapshotValue instanceof Object;

        const gamesData = (
          isArray
            ? snapshotValue.filter((game) => game !== null)
            : isObject
              ? Object.entries(snapshotValue)
                  .map(([_, value]) => value as GameInterface)
                  .filter((game) => game !== null)
              : []
        ) as GameInterface[];

        this.requiredFields.forEach((field) => {
          if (!gamesData.every((x) => x[field]))
            throw new Error(`No ${field} field`);
        });

        // IN_PLAY and PAUSED games always on top
        const sortGames = (games: GameInterface[]) =>
          games.sort((a) => {
            if (a.status !== "IN_PLAY" && a.status !== "PAUSED") return -1;
            return 0;
          });

        const openGames = gamesData
          .filter((game) => game.status === "TIMED")
          .sort((a, b) => a.timestamp - b.timestamp);

        const closedGames = gamesData
          .filter((game) => game.status !== "TIMED")
          .sort((a, b) => b.timestamp - a.timestamp)
          .sort((a) => {
            if (a.status === "IN_PLAY" || a.status === "PAUSED") return -1;
            return 0;
          });

        this.dispatch(setGames({ openGames, closedGames, status: "success" }));
      } catch (e) {
        console.error("Error subscribing to fetch games:", e);
        this.dispatch(
          setGames({ openGames: [], closedGames: [], status: "error" }),
        );
      }
    });
}
