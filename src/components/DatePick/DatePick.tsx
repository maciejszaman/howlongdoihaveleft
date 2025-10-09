import { AnimatePresence, motion } from "motion/react";
import * as Types from "./DatePick.types";
import { DAYS, DELAYS, MONTHS } from "./DatePick.const";
import { useDatePicker } from "./DatePick.hooks";

export const DatePick = ({ setUsersDate }: Types.DatePickProps) => {
  const openingSentence = "When were you born?";

  const {
    dateState,
    errorMessage,
    controls,
    handleDaySelect,
    handleMonthSelect,
    handleYearChange,
    handleSubmit,
    isFormComplete,
    isSubmitting,
  } = useDatePicker(setUsersDate);

  return (
    //wrapper
    <div className="flex flex-col justify-center items-center pb-36 gap-10 select-none">
      {/* "when were you born" text */}
      <div className="upper-text flex text-center mt-4 whitespace-nowrap h-16">
        <AnimatePresence mode="wait">
          {errorMessage ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -10, fontSize: "4rem" }}
              animate={{ opacity: 1, y: 0, fontSize: "2.25rem" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={
                "text-4xl w-full text-red-500 text-shadow-xs/50 text-shadow-red-500"
              }
            >
              {errorMessage}
            </motion.div>
          ) : (
            <motion.div key={openingSentence} className={`text-4xl flex gap-4`}>
              {openingSentence.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* days grid */}
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut", delay: DELAYS.DAYS }}
        className="daypick grid grid-cols-7 gap-5 text-center w-full"
      >
        {DAYS.map((day) => (
          <motion.div
            onClick={() => handleDaySelect(day)}
            key={day}
            whileTap={{ scale: 1.25, transition: { duration: 0.1 } }}
            className="mouse-pointer cursor-pointer"
          >
            <span
              className={`transition-all duration-200
      ${dateState.day === day ? "underline underline-offset-4" : ""}
      ${dateState.day !== null && dateState.day !== day ? "text-stone-500" : ""}
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
        transition={{
          duration: 1,
          ease: "easeInOut",
          delay: DELAYS.DIVIDER1,
        }}
        className="divider w-full bg-stone-500 h-[1px]"
      />

      {/* months grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: DELAYS.MONTHS }}
        className="w-full"
      >
        {MONTHS.map((month, index) => (
          <motion.div
            key={index}
            onClick={() => handleMonthSelect(index)}
            whileTap={{ scale: 1.1, transition: { duration: 0.05 } }}
            className="flex justify-between cursor-pointer hover:text-stone-300 transition-colors duration-200"
          >
            <span
              className={`transition-colors duration-200
                ${
                  dateState.month === index
                    ? "underline underline-offset-4"
                    : ""
                }
                ${
                  dateState.month !== null && dateState.month !== index
                    ? "text-stone-500"
                    : ""
                }`}
            >
              {month}
            </span>
            <motion.span>{`${
              dateState.month === index ? "☒" : "☐"
            }`}</motion.span>
          </motion.div>
        ))}
      </motion.div>
      {/* divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: DELAYS.DIVIDER2 }}
        className="divider w-full bg-stone-500 h-[1px]"
      />
      {/* year input */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: DELAYS.YEAR }}
      >
        <motion.input
          type="text"
          maxLength={4}
          animate={controls}
          value={dateState.year}
          onChange={handleYearChange}
          whileTap={{ scale: 1.1, transition: { duration: 0.1 } }}
          className="rounded-sm outline-1 outline-white text-center focus:outline-1 focus:outline-white p-2 w-full"
          placeholder="Year"
        />
      </motion.div>
      <AnimatePresence>
        {isFormComplete ? (
          <motion.button
            key="button-next"
            onClick={handleSubmit}
            disabled={isSubmitting}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileTap={
              isSubmitting
                ? undefined
                : {
                    scale: 1.1,
                    transition: { duration: 0.03, ease: "easeInOut" },
                  }
            }
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`text-black bg-white p-2 w-full mx-6 text-center font-bold rounded-sm shadow-stone-600 shadow-xl hover:shadow-lg transition-shadow ease-in-out duration-200 cursor-pointer ${
              isSubmitting ? "opacity-50 pointer-events-none" : "cursor-pointer"
            }`}
          >
            Next
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
