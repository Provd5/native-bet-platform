export const NAV_THEME = {
  light: {
    background: "hsl(0 0% 100%)", // background
    border: "hsl(240 5.9% 90%)", // border
    card: "hsl(0 0% 100%)", // card
    notification: "hsl(0 84.2% 60.2%)", // destructive
    primary: "hsl(240 5.9% 10%)", // primary
    text: "hsl(240 10% 3.9%)", // foreground
  },
  dark: {
    background: "hsl(240 10% 3.9%)", // background
    border: "hsl(240 3.7% 15.9%)", // border
    card: "hsl(240 10% 3.9%)", // card
    notification: "hsl(0 72% 51%)", // destructive
    primary: "hsl(0 0% 98%)", // primary
    text: "hsl(0 0% 98%)", // foreground
  },
};

export enum ERROR_ENUM {
  UNAUTHORIZED = "Nie jesteś zalogowany",
  SOMETHING_WENT_WRONG = "Coś poszło nie tak! 😥",
  FETCH_DATA_PROBLEM = "Oops! Wystąpił problem z wczytaniem danych 😥",
  TRY_AGAIN_LATER = "Spróbuj ponownie za chwilę",
}

export type DataStatus = "error" | "success" | "pending";

export type MatchStatus = (typeof MatchStatusArray)[number];
export const MatchStatusArray = [
  "TIMED",
  "SCHEDULED",
  "LIVE",
  "IN_PLAY",
  "PAUSED",
  "FINISHED",
  "POSTPONED",
  "SUSPENDED",
  "CANCELLED",
] as const;

export type MatchStage = (typeof MatchStageArray)[number];
export const MatchStageArray = [
  "REGULAR_SEASON",
  "GROUP_STAGE",
  "LAST_16",
  "QUARTER_FINALS",
  "SEMI_FINALS",
  "FINAL",
] as const;

export type MatchWinner = (typeof MatchWinnerArray)[number];
export const MatchWinnerArray = ["HOME_TEAM", "AWAY_TEAM", "DRAW"] as const;

export const constantTranslations = {
  HOME_TEAM: "Gospodarze",
  AWAY_TEAM: "Goście",
  DRAW: "Remis",
  TIMED: "Nadchodzi",
  SCHEDULED: "Zaplanowany",
  LIVE: "Na żywo",
  IN_PLAY: "Trwa",
  PAUSED: "Przerwa",
  FINISHED: "Koniec",
  POSTPONED: "Przełożony",
  SUSPENDED: "Zawieszony",
  CANCELLED: "Anulowany",
  GROUP_STAGE: "Grupowa",
  LAST_16: "1/8 finału",
  QUARTER_FINALS: "1/4 finału",
  SEMI_FINALS: "Półfinał",
  FINAL: "Finał",
  REGULAR_SEASON: "Liga",
} as const;
