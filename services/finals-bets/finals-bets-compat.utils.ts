import { BetFinalsInterface, TeamInterface } from "~/types/teams";

import {
  FinalsBetNewTeamShape,
  RawFinalsBet,
} from "~/services/finals-bets/finals-bets-compat.types";

export const isValidTeam = (value: unknown): value is TeamInterface => {
  if (!value || typeof value !== "object") return false;

  const team = value as Partial<TeamInterface>;

  return (
    (typeof team.id === "string" || typeof team.id === "number") &&
    typeof team.name === "string" &&
    typeof team.icon === "string" &&
    typeof team.nameCode === "string"
  );
};

export const isValidFinalsBet = (value: unknown): value is RawFinalsBet => {
  if (!value || typeof value !== "object") return false;

  const finalsBet = value as RawFinalsBet;

  return (
    typeof finalsBet.userId === "string" &&
    typeof finalsBet.username === "string" &&
    finalsBet.teamBet instanceof Array
  );
};

export const isValidNewTeamShape = (
  value: unknown,
): value is FinalsBetNewTeamShape => {
  if (!value || typeof value !== "object") return false;

  const team = value as Partial<FinalsBetNewTeamShape>;

  return (
    (typeof team.teamId === "string" || typeof team.teamId === "number") &&
    typeof team.teamName === "string"
  );
};

export const normalizeTeam = (
  team: unknown,
  teamsDictionary: Map<string, TeamInterface>,
): TeamInterface | null => {
  if (!team || typeof team !== "object") return null;

  if (isValidTeam(team)) return team;

  if (!isValidNewTeamShape(team)) return null;

  const id = String(team.teamId);
  const knownTeam = teamsDictionary.get(id);

  return {
    id,
    name: team.teamName,
    icon: knownTeam?.icon ?? `https://crests.football-data.org/${id}.svg`,
    nameCode: knownTeam?.nameCode ?? team.teamName.slice(0, 3).toUpperCase(),
  };
};

export const normalizeFinalsBet = (
  value: unknown,
  teamsDictionary: Map<string, TeamInterface>,
): BetFinalsInterface | null => {
  if (!isValidFinalsBet(value)) return null;

  const normalizedTeams = value.teamBet
    .map((team) => normalizeTeam(team, teamsDictionary))
    .filter((team): team is TeamInterface => team !== null);

  return {
    userId: value.userId,
    username: value.username,
    teamBet: normalizedTeams,
  };
};
