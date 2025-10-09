import * as Types from "./DownloadsList.types";
import { motion } from "motion/react";
import { pdf, PDFDownloadLink } from "@react-pdf/renderer";
import { Calendar } from "./Calendar/Calendar";
import { useState } from "react";
import dayjs from "dayjs";

export const DownloadsList = ({ date }: Types.DownloadsListTypes) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const dob = dayjs(date);
  const weeksLived = dayjs().diff(dob, "week");
  const yearsLived = dayjs().diff(dob, "year");
  const LIFE_EXPECTANCY = 80;
  const WEEKS_IN_YEAR = 52;
  const TOTAL_WEEKS = LIFE_EXPECTANCY * WEEKS_IN_YEAR;
  const percentageLived = ((weeksLived / TOTAL_WEEKS) * 100).toFixed(1);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const blob = await pdf(<Calendar date={date} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `life-calendar-${dob.format("YYYY-MM-DD")}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center flex-col gap-8 justify-center bg-slate-50 text-slate-950"
      initial={{ x: 0, y: 2000 }}
      animate={{ x: 0, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="border rounded-2xl bg-white border-slate-200 p-8 shadow-sm shadow-slate-500/20">
        {date.toDateString()}
      </div>

      <div className="border rounded-2xl bg-white border-slate-200 p-8 shadow-sm shadow-slate-500/20 text-center flex flex-col gap-8">
        <div className="max-w-[800px] mx-auto text-center"></div>

        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium shadow-lg shadow-blue-600/20"
        >
          {isGenerating ? " Generating PDF..." : "Download Life Calendar"}
        </button>
      </div>
    </motion.div>
  );
};
