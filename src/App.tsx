import { useState } from "react";
import Calendar from "./Calendar";
import { CalendarProvider } from "./Calendar/CalendarContext";
import GoToTodayButton from "./Component/GoToTodayButton";
import { DateColorsConfig } from "./Const/colors";

import "./App.css";

const dateColorsConfig: DateColorsConfig = {
  "2023-10-22": {
    events: [1, 2, 3],
    types: [1, 2],
  },
  "2023-10-21": {
    events: [1, 3],
    types: [1],
  },
  "2023-10-31": {
    events: [1, 3],
    types: [1],
  },
};

function App() {
  const [focusMonth, setFocusMonth] = useState(new Date());
  return (
    <>
      <CalendarProvider focusMonth={focusMonth} setFocusMonth={setFocusMonth}>
        <Calendar dateColorsConfig={dateColorsConfig}></Calendar>
        <GoToTodayButton />
      </CalendarProvider>
    </>
  );
}

export default App;
