import React, { useState, useRef, useEffect, useCallback } from "react";
import { addMonths, subMonths } from "date-fns";
import MonthView from "../Component/MonthView";
import { useCalendarContext } from "./CalendarContext";

function Calendar() {
  const { focusMonth, setFocusMonth } = useCalendarContext();
  const [monthsToShow, setMonthsToShow] = useState([
    subMonths(new Date(), 1),
    new Date(),
    addMonths(new Date(), 1),
  ]);
  const [touchStartY, setTouchStartY] = useState(0);
  const calendarRef = useRef(null);
  const MemoizedMonthView = React.memo(MonthView);
  useEffect(() => {
    setMonthsToShow([
      subMonths(focusMonth, 1),
      focusMonth,
      addMonths(focusMonth, 1),
    ]);
  }, [focusMonth]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!calendarRef.current) return;
      const touchMoveY = e.touches[0].clientY;
      const diff = touchStartY - touchMoveY;
      const { scrollTop, scrollHeight, clientHeight } =
        calendarRef.current as HTMLElement;

      if (diff > 0 && scrollTop + clientHeight >= scrollHeight) {
        setFocusMonth((prev) => addMonths(prev, 1));
      } else if (diff < 0 && scrollTop === 0) {
        setFocusMonth((prev) => subMonths(prev, 1));
      }
      setTouchStartY(touchMoveY);
    },
    [touchStartY, calendarRef],
  );

  const handleWheel = useCallback(
    (event: React.WheelEvent) => {
      if (!calendarRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } =
        calendarRef.current as HTMLElement;

      if (event.deltaY > 0 && scrollTop + clientHeight >= scrollHeight) {
        setFocusMonth((prev) => addMonths(prev, 1));
      } else if (event.deltaY < 0 && scrollTop === 0) {
        setFocusMonth((prev) => subMonths(prev, 1));
      }
    },
    [calendarRef],
  );

  return (
    <div>
      <div
        ref={calendarRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onWheel={handleWheel}
        style={{ overflowY: "auto", height: "100%" }}
      >
        {monthsToShow.map((month) => (
          <MemoizedMonthView monthDate={new Date(month)} />
        ))}
      </div>
    </div>
  );
}

export default Calendar;
