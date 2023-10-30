import { useState } from "react";
import Calendar from "./Calendar";
import ListPage, { DateItem } from "./ListPage";
import { CalendarProvider } from "./Calendar/CalendarContext";
import GoToTodayButton from "./Component/GoToTodayButton";
import GoBackButton from "./Component/GoBackButton";
import Modal from "./Component/Modal";
import { DateColorsConfig } from "./Const/colors";

import calendarData from "./mockData/calendar.json";
import dateInfo from "./mockData/dateInfo.json";
import "./App.css";

function App() {
  const [focusMonth, setFocusMonth] = useState(new Date());
  const [isShowList, setIsShowList] = useState(false);
  const [clickDate, setClickDate] = useState<Date | undefined>(undefined);
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <CalendarProvider focusMonth={focusMonth} setFocusMonth={setFocusMonth}>
      <button onClick={() => setModalOpen(true)}>打開模態視窗</button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title='我的模態視窗'
      >
        <p>這是模態視窗的內容。</p>
      </Modal>
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
          dateColorsConfig={calendarData as DateColorsConfig}
        />
      )}
      <GoToTodayButton />
    </CalendarProvider>
  );
}

export default App;
