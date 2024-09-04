export const CURRENT_EVENT = "Euro 2024";

// change FINALS_BETTING_CLOSING_DATE
const setDate = {
  year: "2024", // YYYY
  month: "06", // MM (01 to 12)
  day: "14", // DD (01 to 31)
  hour: "21:00", // HH:mm (00 to 23):(00 to 59)
};

export const FINALS_BETTING_CLOSING_DATE = new Date(
  `${`${setDate.year}-${setDate.month}-${setDate.day}T${setDate.hour}`}:00.000+02:00`,
).getTime();
