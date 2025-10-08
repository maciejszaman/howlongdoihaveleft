import { useState } from "react";
import "./App.css";

import { DatePick } from "./components/DatePick/DatePick";

function App() {
  const [usersInputDate, setUsersDate] = useState("");

  return (
    <div className="wrapper mt-6 h-screen w-full flex items-center justify-center">
      <div className="content w-[250px] h-screen flex flex-col">
        <DatePick setUsersDate={setUsersDate} />
      </div>
    </div>
  );
}

export default App;
