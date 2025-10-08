import { useState } from "react";
import "./App.css";

import { DatePick } from "./components/DatePick/DatePick";

function App() {
  const [usersInputDate, setUsersDate] = useState<Date | null>(null);
  const [currentStep, setCurrentStep] = useState<"date-pick" | "renders">(
    "date-pick"
  );

  const handleDateSubmit = (date: Date) => {
    setUsersDate(date);
    setCurrentStep("renders");
  };

  return (
    <div className="wrapper mt-6 h-screen w-full flex items-center justify-center">
      <div className="content w-[250px] h-screen flex flex-col">
        <DatePick setUsersDate={handleDateSubmit} />
      </div>
    </div>
  );
}

export default App;
