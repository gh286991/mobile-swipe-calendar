import { useState } from "react";
import Calendar from "./Calendar";
import { CalendarProvider } from "./Calendar/CalendarContext";
import GoToTodayButton from "./Component/GoToTodayButton";

import "./App.css";

function App() {
  const [focusMonth, setFocusMonth] = useState(new Date());
  return (
    <>
      <CalendarProvider focusMonth={focusMonth} setFocusMonth={setFocusMonth}>
        <Calendar></Calendar>
        <GoToTodayButton />
      </CalendarProvider>
    </>
  );
}

export default App;
