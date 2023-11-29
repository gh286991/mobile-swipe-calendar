import React from "react";
import { useCalendarContext } from "../../Module/Calendar/CalendarContext";

interface GoToTodayButtonProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const GoToTodayButton: React.FC<GoToTodayButtonProps> = ({
  className,
  style,
  onClick,
}) => {
  const { setFocusMonth } = useCalendarContext();

  const handleGoToToday = () => {
    setFocusMonth(new Date());
    if (onClick) onClick();
  };

  return (
    <button className={className} style={style} onClick={handleGoToToday}>
      回到今天
    </button>
  );
};

export default GoToTodayButton;
