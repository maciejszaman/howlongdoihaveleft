"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import moment from "moment";

export const DatePicker = () => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
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
  ];
  const years = Array.from({ length: 60 }, (_, i) => i + 1965);

  const [step, setStep] = useState(1);

  const [daySelected, setDaySelected] = useState<null | number>(null);
  const [monthSelected, setMonthSelected] = useState<null | string>(null);
  const [yearSelected, setYearSelected] = useState<null | number>(null);
  const [isValid, setValid] = useState<boolean>(false);

  const handleDayClick = (day: number) => {
    if (daySelected) {
      setDaySelected(null);
    } else {
      setDaySelected(day);
    }
  };
  const handleMonthClick = (month: string) => {
    if (monthSelected) {
      setMonthSelected(null);
    } else {
      setMonthSelected(month);
    }
  };
  const handleYearClick = (year: number) => {
    if (yearSelected) {
      setYearSelected(null);
    } else {
      setYearSelected(year);
    }
  };

  useEffect(() => {
    if (monthSelected && daySelected && yearSelected) {
      const monthNumber = months.indexOf(monthSelected) + 1;

      const monthNumberFormatted =
        monthNumber < 10 ? "0" + monthNumber : monthNumber;

      const date =
        yearSelected + "-" + monthNumberFormatted + "-" + daySelected;
      console.log(date);
      console.log(moment(date).isValid());
      if (moment(date).isValid()) {
        setValid(true);
      } else {
        setValid(false);
      }
    }
  }, [yearSelected, monthSelected, daySelected]);

  console.log(moment("2020-02-31").isValid());

  return (
    <>
      <div className="grid grid-cols-3 w-[600px] h-[400px] gap-6 items-center">
        {daySelected ? (
          <p
            className="cursor-pointer text-4xl text-center"
            onClick={() => handleDayClick(daySelected)}
          >
            {daySelected}
          </p>
        ) : (
          <div className="days grid grid-cols-6 h-fit">
            {days.map((day) => (
              <Button
                key={day}
                onClick={() => handleDayClick(day)}
                variant="ghost"
              >
                {day}
              </Button>
            ))}
          </div>
        )}

        {monthSelected ? (
          <p
            className="cursor-pointer text-4xl text-center"
            onClick={() => handleMonthClick(monthSelected)}
          >
            {monthSelected}
          </p>
        ) : (
          <div className="months flex flex-col">
            {months.map((month) => (
              <Button
                key={month}
                onClick={() => handleMonthClick(month)}
                variant="ghost"
              >
                {month}
              </Button>
            ))}
          </div>
        )}
        {yearSelected ? (
          <p
            className="cursor-pointer text-4xl text-center"
            onClick={() => handleYearClick(yearSelected)}
          >
            {yearSelected}
          </p>
        ) : (
          <div className="years flex flex-col h-[400px] overflow-scroll">
            {years.map((year) => (
              <Button
                key={year}
                onClick={() => handleYearClick(year)}
                variant="ghost"
              >
                {year}
              </Button>
            ))}
          </div>
        )}
      </div>
      <Button className={isValid ? "visible" : "hidden"}>Next</Button>
    </>
  );
};
