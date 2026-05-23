export const APP_TITLE = "Betowanie";
export const CURRENT_EVENT = "Mistrzostwa Świata 2026";

// change FINALS_BETTING_CLOSING_DATE
const setDate = {
  year: "2026", // YYYY
  month: "05", // MM (01 to 12)
  day: "24", // DD (01 to 31)
  hour: "00:02", // HH:mm (00 to 23):(00 to 59)
};

export const FINALS_BETTING_CLOSING_DATE = new Date(
  `${`${setDate.year}-${setDate.month}-${setDate.day}T${setDate.hour}`}:00.000+02:00`,
).getTime();
