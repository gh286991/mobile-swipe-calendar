// GoToTodayButton.tsx
import React from "react";
import { useCalendarContext } from "../../Calendar/CalendarContext";

const GoToTodayButton: React.FC = () => {
  const { setFocusMonth } = useCalendarContext();

  const handleGoToToday = () => {
    setFocusMonth(new Date());
  };

  return <button onClick={handleGoToToday}>回到今天</button>;
};

export default GoToTodayButton;
