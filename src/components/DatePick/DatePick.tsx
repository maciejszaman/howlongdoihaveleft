import { AnimatePresence, motion, useAnimation } from "motion/react";
import { useState } from "react";
import dayjs from "dayjs";
import * as Types from "./DatePick.types";

export const DatePick = ({ setUsersDate }: Types.DatePickProps) => {
  const openingSentence = "When were you born?";

  const Days = Array.from({ length: 31 }, (_, i) => i + 1);
  const Months = [
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

  const handleDaySelect = (day: number) => {
    if (daySelected === day) {
      setDaySelected(null);
    } else {
      setDaySelected(day);
    }
  };

  const handleMonthSelect = (month: number) => {
    if (monthSelected === month) {
      setMonthSelected(null);
    } else {
      setMonthSelected(month);
    }
  };

  const handleChangeYearInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.2 },
    });
    const input = e.target.value;
    if (/^\d{0,4}$/.test(input)) {
      setYearInput(input);
      console.log(input);
    }
  };

  const handleSubmitButton = () => {};

  const [daySelected, setDaySelected] = useState<number | null>(null);
  const [monthSelected, setMonthSelected] = useState<number | null>(null);
  const [yearInput, setYearInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const controls = useAnimation();

  const displayText = errorMessage || openingSentence;

  return (
    //wrapper
    <div className="flex flex-col justify-center items-center pb-36 gap-10 select-none">
      {/* "when were you born" text */}
      <div className="upper-text flex text-center mt-4 mb-4 justify-center">
        <motion.div className="flex gap-4 text-4xl">
          {openingSentence.split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                delay: index * 0.5,
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* days grid */}
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 2.5 }}
        className="daypick grid grid-cols-7 gap-5 text-center w-full"
      >
        {Days.map((day) => (
          <motion.div
            onClick={() => handleDaySelect(day)}
            key={day}
            whileTap={{ scale: 1.25, transition: { duration: 0.1 } }}
            className="mouse-pointer cursor-pointer"
          >
            <span
              className={`transition-all duration-200
      ${daySelected === day ? "underline underline-offset-4" : ""}
      ${daySelected !== null && daySelected !== day ? "text-stone-500" : ""}
    `}
            >
              {day}
            </span>
          </motion.div>
        ))}
      </motion.div>
      {/* divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 3.5 }}
        className="divider w-full bg-stone-500 h-[1px]"
      />

      {/* months grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 4.5 }}
        className="w-full"
      >
        {Months.map((month, index) => (
          <motion.div
            key={index}
            onClick={() => handleMonthSelect(index)}
            whileTap={{ scale: 1.1, transition: { duration: 0.05 } }}
            className="flex justify-between cursor-pointer hover:text-stone-300 transition-colors duration-200"
          >
            <span
              className={`transition-colors duration-200
                ${monthSelected === index ? "underline underline-offset-4" : ""}
                ${
                  monthSelected !== null && monthSelected !== index
                    ? "text-stone-500"
                    : ""
                }`}
            >
              {month}
            </span>
            <motion.span>{`${
              monthSelected === index ? "☒" : "☐"
            }`}</motion.span>
          </motion.div>
        ))}
      </motion.div>
      {/* divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 5.5 }}
        className="divider w-full bg-stone-500 h-[1px]"
      />
      {/* year input */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 6.5 }}
      >
        <motion.input
          type="text"
          maxLength={4}
          animate={controls}
          value={yearInput}
          onChange={handleChangeYearInput}
          whileTap={{ scale: 1.1, transition: { duration: 0.1 } }}
          className="rounded-sm outline-1 outline-white text-center focus:outline-1 focus:outline-white p-2 w-full"
          placeholder="Year"
        />
      </motion.div>
      <AnimatePresence>
        {daySelected && monthSelected && yearInput.length === 4 ? (
          <motion.button
            key="button-next"
            onClick={handleSubmitButton}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileTap={{
              scale: 1.1,
              transition: { duration: 0.03, ease: "easeInOut" },
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-black bg-white p-2 w-full mx-6 text-center font-bold rounded-sm shadow-stone-600 shadow-xl hover:shadow-lg transition-shadow ease-in-out duration-200 cursor-pointer"
          >
            Next
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
