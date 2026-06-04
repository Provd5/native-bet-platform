export const NAV_THEME = {
  light: {
    background: "hsl(42 62% 97%)", // background
    border: "hsl(39 45% 82%)", // border
    card: "hsl(0 0% 100%)", // card
    notification: "hsl(0 84.2% 60.2%)", // destructive
    primary: "hsl(184 72% 32%)", // primary
    text: "hsl(196 48% 17%)", // foreground
  },
  dark: {
    background: "hsl(196 41% 10%)", // background
    border: "hsl(194 29% 30%)", // border
    card: "hsl(197 44% 14%)", // card
    notification: "hsl(0 72% 51%)", // destructive
    primary: "hsl(39 97% 63%)", // primary
    text: "hsl(45 88% 95%)", // foreground
  },
};

export enum ERROR_ENUM {
  UNAUTHORIZED = "Nie jesteś zalogowany",
  SOMETHING_WENT_WRONG = "Coś poszło nie tak! 😥",
  FETCH_DATA_PROBLEM = "Oops! Wystąpił problem z wczytaniem danych 😥",
  NOTHING_FOUND = "Nic nie znaleziono",
  TRY_AGAIN_LATER = "Spróbuj ponownie za chwilę",
}
