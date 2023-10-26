import { useState } from "react";
import Calendar from "./Calendar";
import ListPage, { DateItem } from "./ListPage";
import { CalendarProvider } from "./Calendar/CalendarContext";
import GoToTodayButton from "./Component/GoToTodayButton";
import GoBackButton from "./Component/GoBackButton";
import { DateColorsConfig } from "./Const/colors";

import "./App.css";

const dateColorsConfig: DateColorsConfig = {
  "2023-10-16": {
    events: [1, 2, 3],
    types: [1, 2],
  },
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

const dateInfo: DateItem[] = [
  {
    date: "2023-09-13",
    type: 1,
    event: null,
    name: "國定假日",
    start: "2023-10-16 00:00:00",
    end: "2023-10-16 23:59:59",
  },
  {
    date: "2023-09-27",
    type: 2,
    event: null,
    name: "排休",
    start: "2023-10-22 08:00:00",
    end: "2023-10-22 17:00:00",
  },
  {
    date: "2023-09-30",
    type: 1,
    event: null,
    name: "國定假日",
    start: "2023-10-16 00:00:00",
    end: "2023-10-16 23:59:59",
  },
  {
    date: "2023-09-30",
    type: 1,
    event: null,
    name: "國定假日",
    start: "2023-10-16 00:00:00",
    end: "2023-10-16 23:59:59",
  },
  {
    date: "2023-10-01",
    type: null,
    event: 1,
    name: "林登松",
    start: "2023-10-22 10:00:00",
    end: "2023-10-22 11:30:00",
  },
  {
    date: "2023-10-04",
    type: null,
    event: 1,
    name: "林登松",
    start: "2023-10-22 10:00:00",
    end: "2023-10-22 11:30:00",
  },
  {
    date: "2023-10-16",
    type: 1,
    event: null,
    name: "國定假日",
    start: "2023-10-16 00:00:00",
    end: "2023-10-16 23:59:59",
  },
  {
    date: "2023-10-22",
    type: 2,
    event: null,
    name: "排休",
    start: "2023-10-22 08:00:00",
    end: "2023-10-22 17:00:00",
  },
  {
    date: "2023-10-21",
    type: 3,
    event: null,
    name: "事假",
    start: "2023-10-22 08:00:00",
    end: "2023-10-22 17:00:00",
  },
  {
    date: "2023-10-24",
    type: null,
    event: 1,
    name: "張鎮欽",
    start: "2023-10-22 04:00:00",
    end: "2023-10-22 04:40:00",
  },
  {
    date: "2023-10-24",
    type: null,
    event: 1,
    name: "林登松",
    start: "2023-10-22 10:00:00",
    end: "2023-10-22 11:30:00",
  },
  {
    date: "2023-10-26",
    type: null,
    event: 1,
    name: "林登松",
    start: "2023-10-22 10:00:00",
    end: "2023-10-22 11:30:00",
  },
  {
    date: "2023-10-26",
    type: null,
    event: 1,
    name: "張鎮欽",
    start: "2023-10-22 10:00:00",
    end: "2023-10-22 11:30:00",
  },
  {
    date: "2023-10-26",
    type: null,
    event: 1,
    name: "王大明",
    start: "2023-10-22 10:00:00",
    end: "2023-10-22 11:30:00",
  },
  {
    date: "2023-10-26",
    type: null,
    event: 1,
    name: "李曉明",
    start: "2023-10-22 10:00:00",
    end: "2023-10-22 11:30:00",
  },
  {
    date: "2023-10-27",
    type: null,
    event: 1,
    name: "林登松",
    start: "2023-10-22 10:00:00",
    end: "2023-10-22 11:30:00",
  },
  {
    date: "2023-10-27",
    type: null,
    event: 1,
    name: "張鎮欽",
    start: "2023-10-22 10:00:00",
    end: "2023-10-22 11:30:00",
  },
  {
    date: "2023-10-27",
    type: null,
    event: 1,
    name: "王大明",
    start: "2023-10-22 10:00:00",
    end: "2023-10-22 11:30:00",
  },
  {
    date: "2023-10-27",
    type: null,
    event: 1,
    name: "李曉明",
    start: "2023-10-22 10:00:00",
    end: "2023-10-22 11:30:00",
  },
  {
    date: "2023-10-28",
    type: null,
    event: 1,
    name: "林登松",
    start: "2023-10-22 10:00:00",
    end: "2023-10-22 11:30:00",
  },
  {
    date: "2023-10-28",
    type: null,
    event: 1,
    name: "張鎮欽",
    start: "2023-10-22 10:00:00",
    end: "2023-10-22 11:30:00",
  },
  {
    date: "2023-10-28",
    type: null,
    event: 1,
    name: "王大明",
    start: "2023-10-22 10:00:00",
    end: "2023-10-22 11:30:00",
  },
  {
    date: "2023-10-28",
    type: null,
    event: 1,
    name: "李曉明",
    start: "2023-10-22 10:00:00",
    end: "2023-10-22 11:30:00",
  },
];

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
        <ListPage dateInfo={dateInfo} clickDate={clickDate}></ListPage>
      ) : (
        <Calendar
          onClick={(date) => {
            setIsShowList(!isShowList);
            setClickDate(date);
          }}
          dateColorsConfig={dateColorsConfig}
        ></Calendar>
      )}
      <GoToTodayButton />
    </CalendarProvider>
  );
}

export default App;
