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
  DAYS: 2,
  DIVIDER1: 2.3,
  MONTHS: 2.6,
  DIVIDER2: 2.9,
  YEAR: 3.2,
} as const;
