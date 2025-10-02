import "./App.css";

import { DatePick } from "./components/DatePick/DatePick";

function App() {
  return (
    <div className="wrapper mt-6 h-screen w-screen flex items-center justify-center">
      <div className="content w-[250px] h-screen flex flex-col">
        <DatePick />
      </div>
    </div>
  );
}

export default App;
