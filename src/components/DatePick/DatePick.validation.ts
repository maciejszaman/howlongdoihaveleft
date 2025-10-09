import dayjs from "dayjs";

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateDate = (
  day: number | null,
  month: number | null,
  year: string
): ValidationResult => {
  // #1 Check if all 3 are present
  if (!day || month === null || year.length !== 4) {
    return {
      isValid: false,
      error: "Please fill in all fields",
    };
  }

  const yearNumber = Number(year);

  // #2 Check if year is real
  if (yearNumber < 1940 || yearNumber > new Date().getFullYear()) {
    return {
      isValid: false,
      error: "Please enter a valid year",
    };
  }

  const date = dayjs(`${yearNumber}-${month + 1}-${day}`, "YYYY-M-D", true);

  if (!date.isValid()) {
    return {
      isValid: false,
      error: "This date doesn't exist",
    };
  }

  // #4 Date overflow
  if (
    date.year() !== yearNumber ||
    date.month() !== month ||
    date.date() !== day
  ) {
    return {
      isValid: false,
      error: "This date doesn't exist",
    };
  }

  // #5 Future
  if (date.isAfter(dayjs())) {
    return {
      isValid: false,
      error: "Birth date cannot be in the future",
    };
  }

  return { isValid: true };
};
