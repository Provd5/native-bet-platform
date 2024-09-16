export interface TeamInterface {
  id: string | number;
  icon: string;
  name: string;
  nameCode: string;
}

export interface BetFinalsInterface {
  userId: string;
  username: string;
  teamBet: TeamInterface[];
}
