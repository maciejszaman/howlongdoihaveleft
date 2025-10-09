import { useState } from "react";
import "./App.css";

import { DatePick } from "./components/DatePick/DatePick";
import { DownloadsList } from "./components/DownloadsList/DownloadsList";

function App() {
  const [usersInputDate, setUsersDate] = useState<Date | null>(null);
  const [currentStep, setCurrentStep] = useState<"date-pick" | "downloads">(
    "date-pick"
  );

  const handleDateSubmit = (date: Date) => {
    console.log("datas correct");
    setUsersDate(date);
    setCurrentStep("downloads");
  };

  return (
    <div className="wrapper h-screen w-full flex items-center justify-center">
      <div className="content mt-6 mb-6 w-[250px] h-screen flex flex-col">
        {currentStep === "date-pick" && (
          <DatePick setUsersDate={handleDateSubmit} />
        )}
        {currentStep === "downloads" && usersInputDate && (
          <DownloadsList date={usersInputDate} />
        )}
      </div>
    </div>
  );
}

export default App;
