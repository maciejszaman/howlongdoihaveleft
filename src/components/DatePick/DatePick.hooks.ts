import { useState } from "react";
import { useAnimation } from "motion/react";
import dayjs from "dayjs";
import { validateDate } from "./DatePick.validation";
import type { DateState } from "./DatePick.types";

export const useDatePicker = (onSubmit: (date: Date) => void) => {
  const [localDateState, setLocalDateState] = useState<DateState>({
    day: null,
    month: null,
    year: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const controls = useAnimation();

  const handleDaySelect = (day: number) => {
    setLocalDateState((prev: DateState) => ({
      ...prev,
      day: prev.day === day ? null : day,
    }));
    setErrorMessage(null);
  };

  const handleMonthSelect = (month: number) => {
    setLocalDateState((prev: DateState) => ({
      ...prev,
      month: prev.month === month ? null : month,
    }));
    setErrorMessage(null);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (/^\d{0,4}$/.test(input)) {
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.2 },
      });
      setLocalDateState((prev: DateState) => ({ ...prev, year: input }));
      setErrorMessage(null);
    }
  };

  const handleSubmit = () => {
    const validation = validateDate(
      localDateState.day,
      localDateState.month,
      localDateState.year
    );

    if (!validation.isValid) {
      setErrorMessage(validation.error || "Invalid date");
      handleReset();
      return;
    }

    setErrorMessage(null);
    const yearNumber = Number(localDateState.year);
    const date = dayjs(
      `${yearNumber}-${localDateState.month! + 1}-${localDateState.day}`,
      "YYYY-M-D"
    );

    onSubmit(date.toDate());
  };

  const handleReset = () => {
    setLocalDateState({ day: null, month: null, year: "" });
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  const isFormComplete =
    localDateState.day !== null &&
    localDateState.month !== null &&
    localDateState.year.length === 4;

  return {
    dateState: localDateState,
    errorMessage,
    controls,
    handleDaySelect,
    handleMonthSelect,
    handleYearChange,
    handleSubmit,
    isFormComplete,
    handleReset,
  };
};
