export const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const DELAYS = {
  TITLE: 0.5,
  DAYS: 0.5,
  DIVIDER1: 1.5,
  MONTHS: 2.0,
  DIVIDER2: 2.5,
  YEAR: 3.0,
} as const;
