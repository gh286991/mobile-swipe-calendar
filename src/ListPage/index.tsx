import React, { useEffect, RefObject } from "react";
import {
  parseISO,
  format,
  differenceInMinutes,
  differenceInDays,
  parse,
} from "date-fns";
import { zhTW } from "date-fns/locale";
import { typeColors, eventColors, EventCode, TypeCode } from "../Const/colors";

import Dot from "../Units/Dot";
import Event from "../Units/Event";

import style from "./style.module.scss";

export interface DateItem {
  id: string;
  date: string;
  type: TypeCode | null;
  event: EventCode | null;
  name: string;
  start: string;
  end: string;
}

interface DateInfoProps {
  dateInfo: DateItem[];
  clickDate?: Date;
  onClick?: (date: DateItem) => void;
}

const DateInfoComponent: React.FC<DateInfoProps> = ({
  dateInfo,
  clickDate,
  onClick,
}) => {
  const refs: Record<string, RefObject<HTMLDivElement>> = dateInfo.reduce<
    Record<string, RefObject<HTMLDivElement>>
  >((acc, value) => {
    acc[value.date] = React.createRef();
    return acc;
  }, {});

  useEffect(() => {
    if (clickDate) {
      const targetDateStr = format(clickDate, "yyyy-MM-dd");

      // 如果點擊的日期存在於列表中
      if (refs[targetDateStr]?.current) {
        refs[targetDateStr]?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        // 如果不存在，則尋找最接近的日期
        const targetDate = parseISO(targetDateStr);
        const closestDate = dateInfo.reduce((prev, curr) => {
          const prevDate = parseISO(prev.date);
          const currDate = parseISO(curr.date);
          const prevDiff = Math.abs(differenceInDays(prevDate, targetDate));
          const currDiff = Math.abs(differenceInDays(currDate, targetDate));

          return prevDiff < currDiff ? prev : curr;
        });

        refs[closestDate.date]?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [clickDate]);

  const dayFormat = (inputDate: string) => {
    const date = parseISO(inputDate);
    const formattedDate = format(date, "M/d EEEE", { locale: zhTW });

    return formattedDate;
  };

  const timeFormat = (start: string, end: string) => {
    const startTime = parse(start, "yyyy-MM-dd HH:mm:ss", new Date());
    const endTime = parse(end, "yyyy-MM-dd HH:mm:ss", new Date());

    const formattedStart = format(startTime, "HH:mm:ss").split(":");
    const formattedEnd = format(endTime, "HH:mm:ss").split(":");

    const diff = differenceInMinutes(endTime, startTime);
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    const formattedDiff = (
      <>
        <span>{String(hours).padStart(2, "0")}</span>時
        <span>{String(minutes).padStart(2, "0")}</span>分
      </>
    );

    return (
      <>
        <span>{formattedStart[0]}</span>:<span>{formattedStart[1]}</span>:
        <span>{formattedStart[2]}</span>-<span>{formattedEnd[0]}</span>:
        <span>{formattedEnd[1]}</span>:<span>{formattedEnd[2]}</span>(
        {formattedDiff})
      </>
    );
  };

  return (
    <div>
      {dateInfo.map((item, index) => (
        <div className={style.listContainer} key={index} ref={refs[item.date]}>
          <p className={style.title}>
            {index === 0 || item.date !== dateInfo[index - 1].date ? (
              <>
                {dayFormat(item.date)}
                <div className={style.dash} />
              </>
            ) : null}
          </p>

          <div
            className={style.content}
            onClick={() => onClick && onClick(item)}
          >
            <div className={style.contentName}>
              {item.type && <Dot color={typeColors[item.type]}></Dot>}
              {item.event && <Event color={eventColors[item.event]}></Event>}
              <p>{item.name}</p>
            </div>
            <p>{timeFormat(item.start, item.end)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DateInfoComponent;
