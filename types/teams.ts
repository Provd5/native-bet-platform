export interface TeamInterface {
  id: string | number;
  icon: string;
  name: string;
  nameCode: string;
}

export interface TeamBetInterface {
  teamId: string | number;
  teamName: string;
}

export interface BetFinalsInterface {
  id: string;
  userId: string;
  username: string;
  teamBet: TeamBetInterface[];
}
