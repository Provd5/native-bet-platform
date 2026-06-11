export interface FinalsBetNewTeamShape {
  teamId: string | number;
  teamName: string;
}

export interface RawFinalsBet {
  userId: string;
  username: string;
  teamBet: unknown[];
}
