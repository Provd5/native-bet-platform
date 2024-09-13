import { child, onValue, query, ref, Unsubscribe } from "firebase/database";

import { TeamInterface } from "~/types/teams";

import { db } from "~/firebase.config";
import { useAppDispatch } from "~/hooks/redux";
import { setTeams } from "~/lib/features/teams-slice";

const COLLECTION_NAME = "teams";

export class TeamsService {
  private dispatch = useAppDispatch();

  private getRef = () => {
    return query(child(ref(db), COLLECTION_NAME));
  };

  private requiredFields: Partial<keyof TeamInterface>[] = [
    "id",
    "icon",
    "name",
    "nameCode",
  ] as const;

  // SUBSCRIBE
  subscribeToFetchTeams = (): Unsubscribe =>
    onValue(this.getRef(), (snapshot) => {
      try {
        if (!snapshot.exists()) {
          this.dispatch(setTeams({ teams: [], status: "error" }));
        }

        const snapshotValue: unknown = snapshot.val();

        const isArray = snapshotValue instanceof Array;
        const isObject = snapshotValue instanceof Object;

        const teamsData = (
          isArray
            ? snapshotValue.filter((team) => team !== null)
            : isObject
              ? Object.entries(snapshotValue)
                  .map(([_, value]) => value as TeamInterface)
                  .filter((team) => team !== null)
              : []
        ) as TeamInterface[];

        this.requiredFields.forEach((field) => {
          if (!teamsData.every((x) => x[field]))
            throw new Error(`No ${field} field`);
        });

        const teams = teamsData.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }

          return 0;
        });

        this.dispatch(setTeams({ teams, status: "success" }));
      } catch (e) {
        console.error("Error subscribing to fetch teams:", e);
        this.dispatch(setTeams({ teams: [], status: "error" }));
      }
    });
}
