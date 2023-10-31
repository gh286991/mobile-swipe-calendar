import React from "react";
import { useCalendarContext } from "../../Calendar/CalendarContext";

interface GoToTodayButtonProps {
  className?: string;
  style?: React.CSSProperties;
}

const GoToTodayButton: React.FC<GoToTodayButtonProps> = ({
  className,
  style,
}) => {
  const { setFocusMonth } = useCalendarContext();

  const handleGoToToday = () => {
    setFocusMonth(new Date());
  };

  return (
    <button className={className} style={style} onClick={handleGoToToday}>
      回到今天
    </button>
  );
};

export default GoToTodayButton;
