import React, { useState, useRef, useEffect, useCallback } from "react";
import { addMonths, subMonths } from "date-fns";
import { throttle } from "lodash";
import MonthView from "../../Component/MonthView";

import { useCalendarContext } from "./CalendarContext";
import { DateColorsConfig } from "../../Const/colors";

import style from "./style.module.scss";

type Props = {
  isSimple?: boolean; // 是否為簡單模式
  dateColorsConfig: DateColorsConfig[];
  onClick: (date: Date) => void;
};

function Calendar({ isSimple, dateColorsConfig, onClick }: Props) {
  const { focusMonth, setFocusMonth } = useCalendarContext();
  const [monthsToShow, setMonthsToShow] = useState([
    subMonths(new Date(), 1),
    new Date(),
    addMonths(new Date(), 1),
  ]);
  const [touchStartY, setTouchStartY] = useState(0);
  const [scrollDistance, setScrollDistance] = useState(0);
  const SCROLL_THRESHOLD = 80;
  const calendarRef = useRef(null);

  useEffect(() => {
    setMonthsToShow([
      subMonths(focusMonth, 1),
      focusMonth,
      addMonths(focusMonth, 1),
    ]);
  }, [focusMonth]);

  const updateMonthsToShow = useCallback(() => {
    const width = window.innerWidth;
    const isDesktop = width >= 768;
    const months = isDesktop ? 4 : 2;

    setMonthsToShow(
      Array.from({ length: months }, (_, i) =>
        subMonths(focusMonth, Math.floor(months / 2) - i),
      ),
    );
  }, [focusMonth]);

  useEffect(() => {
    updateMonthsToShow();
    window.addEventListener("resize", updateMonthsToShow);

    return () => {
      window.removeEventListener("resize", updateMonthsToShow);
    };
  }, [updateMonthsToShow]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  }, []);

  const handleTouchMove = useCallback(
    throttle((e: React.TouchEvent) => {
      if (!calendarRef.current) return;
      const width = window.innerWidth;
      const isDesktop = width >= 768;
      const addMonth = isDesktop ? 2 : 1;
      const touchMoveY = e.touches[0].clientY;
      const diff = touchStartY - touchMoveY;
      const { scrollTop, scrollHeight, clientHeight } =
        calendarRef.current as HTMLElement;

      const threshold = 25;

      if (Math.abs(diff) > threshold) {
        if (diff > 0 && scrollTop + clientHeight >= scrollHeight) {
          setFocusMonth((prev) => addMonths(prev, addMonth));
        } else if (diff < 0 && scrollTop === 0) {
          setFocusMonth((prev) => subMonths(prev, addMonth));
        }
      }

      setTouchStartY(touchMoveY);
    }, 700),
    [touchStartY, calendarRef],
  );

  const handleWheel = useCallback(
    (event: React.WheelEvent) => {
      if (!calendarRef.current) return;
      const width = window.innerWidth;
      const isDesktop = width >= 768;
      const addMonth = isDesktop ? 2 : 1;
      const { scrollTop, scrollHeight, clientHeight } =
        calendarRef.current as HTMLElement;

      // 累加滚动距离
      setScrollDistance((prev) => prev + event.deltaY);

      if (
        scrollDistance > SCROLL_THRESHOLD &&
        scrollTop + clientHeight >= scrollHeight
      ) {
        setFocusMonth((prev) => addMonths(prev, addMonth));
        setScrollDistance(0); // 重置滚动距离
      } else if (scrollDistance < -SCROLL_THRESHOLD && scrollTop === 0) {
        setFocusMonth((prev) => subMonths(prev, addMonth));
        setScrollDistance(0); // 重置滚动距离
      }
    },
    [calendarRef, scrollDistance],
  );

  return (
    <div>
      <div
        ref={calendarRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onWheel={handleWheel}
        style={{ overflowY: "auto", height: "100%" }}
        className={style.calendarContainer}
      >
        {monthsToShow.map((month) => (
          <MonthView
            key={+month}
            monthDate={new Date(month)}
            dateColorsConfig={dateColorsConfig}
            isSimple={isSimple}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
}

// props 預設值
Calendar.defaultProps = {
  isSimple: true, // 是否為簡單模式
};

export default Calendar;
