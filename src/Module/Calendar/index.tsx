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
  scrollThreshold?: number;
  touchThreshold?: number;
  touchDelayTime?: number;
};

function Calendar({
  isSimple,
  dateColorsConfig,
  onClick,
  scrollThreshold = 60,
  touchThreshold = 25,
  touchDelayTime = 700,
}: Props) {
  const { focusMonth, setFocusMonth } = useCalendarContext();
  const [monthsToShow, setMonthsToShow] = useState([
    subMonths(new Date(), 1),
    new Date(),
    addMonths(new Date(), 1),
  ]);
  const [touchStartY, setTouchStartY] = useState(0);
  const [scrollDistance, setScrollDistance] = useState(0);
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

      if (Math.abs(diff) > touchThreshold) {
        if (diff > 0 && scrollTop + clientHeight >= scrollHeight) {
          setFocusMonth((prev) => addMonths(prev, addMonth));
        } else if (diff < 0 && scrollTop === 0) {
          setFocusMonth((prev) => subMonths(prev, addMonth));
        }
      }

      setTouchStartY(touchMoveY);
    }, touchDelayTime),
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

      setScrollDistance((prev) => prev + event.deltaY);

      if (
        scrollDistance > scrollThreshold &&
        scrollTop + clientHeight >= scrollHeight
      ) {
        setFocusMonth((prev) => addMonths(prev, addMonth));
        setScrollDistance(0);
      } else if (scrollDistance < -scrollThreshold && scrollTop === 0) {
        setFocusMonth((prev) => subMonths(prev, addMonth));
        setScrollDistance(0);
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
