import { useState } from "react";
import Calendar from "./Calendar";
import ListPage, { DateItem } from "./ListPage";
import { CalendarProvider } from "./Calendar/CalendarContext";
import GoToTodayButton from "./Component/GoToTodayButton";
import GoBackButton from "./Component/GoBackButton";
import { DateColorsConfig } from "./Const/colors";

import calendarData from "./mockData/calendar.json";
import dateInfo from "./mockData/dateInfo.json";
import "./App.css";

function App() {
  const [focusMonth, setFocusMonth] = useState(new Date());
  const [isShowList, setIsShowList] = useState(false);
  const [clickDate, setClickDate] = useState<Date | undefined>(undefined);

  return (
    <CalendarProvider focusMonth={focusMonth} setFocusMonth={setFocusMonth}>
      <GoBackButton
        isShowList={isShowList}
        setIsShowList={setIsShowList}
      ></GoBackButton>
      {isShowList ? (
        <ListPage
          dateInfo={dateInfo as DateItem[]}
          clickDate={clickDate}
          onClick={(dateItem) => {
            console.log("Clicked date:", dateItem);
          }}
        />
      ) : (
        <Calendar
          onClick={(date) => {
            setIsShowList(!isShowList);
            setClickDate(date);
          }}
          dateColorsConfig={calendarData as DateColorsConfig[]}
        />
      )}
      <GoToTodayButton />
    </CalendarProvider>
  );
}

export default App;
