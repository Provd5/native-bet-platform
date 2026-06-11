import { child, get, ref } from "firebase/database";

import { TeamInterface } from "~/types/teams";

import { db } from "~/firebase.config";
import { isValidTeam } from "~/services/finals-bets/finals-bets-compat.utils";

const TEAMS_COLLECTION_NAME = "teams";

const getTeamsRef = () => {
  return child(ref(db), TEAMS_COLLECTION_NAME);
};

export const getTeamsDictionary = async (): Promise<
  Map<string, TeamInterface>
> => {
  const teamsSnapshot = await get(getTeamsRef());

  if (!teamsSnapshot.exists()) return new Map();

  const teamsData: unknown = teamsSnapshot.val();

  const teamsArray = (
    teamsData instanceof Array
      ? teamsData.filter((team) => team !== null)
      : teamsData instanceof Object
        ? Object.values(teamsData).filter((team) => team !== null)
        : []
  ).filter(isValidTeam);

  return teamsArray.reduce((acc, team) => {
    acc.set(String(team.id), team);
    return acc;
  }, new Map<string, TeamInterface>());
};
