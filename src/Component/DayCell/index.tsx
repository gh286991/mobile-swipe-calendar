import React from "react";
import Dot from "../Units/Dot";
import Dash from "../Units/Dash";
import style from "./styles.module.scss";

import {
  Colors,
  eventColors,
  typeColors,
  EventCode,
  TypeCode,
  IStringEvent,
} from "../../Const/colors";

import { getDate } from "date-fns";

type DayCellProps = {
  date: Date;
  isToday: boolean;
  dashColors?: Colors[];
  dotColors?: Colors[];
  stringEvent?: IStringEvent; // 日期事件文字
  isSimple?: boolean; // 是否為簡單模式(只顯示icon，不顯示文字)
  onClick: (date: Date) => void;
};

const DayCell: React.FC<DayCellProps> = ({
  isToday,
  date,
  dashColors,
  dotColors,
  stringEvent, // 日期事件文字
  isSimple, // 是否為簡單模式(只顯示icon，不顯示文字)
  onClick,
}) => {
  const day = getDate(date);

  const getColorCode = (
    color: Colors,
    colorsMap: Record<number, Colors>,
  ): number | undefined => {
    const codes = Object.keys(colorsMap).map(Number);
    for (const code of codes) {
      if (colorsMap[code] === color) {
        return code;
      }
    }
    return undefined;
  };

  function generateColorArray(
    colorsMap: Record<EventCode | TypeCode, Colors>,
    dotColors?: Colors[],
  ): (Colors | null)[] {
    const resultArray: (Colors | null)[] = [null, null, null];

    if (dotColors) {
      dotColors.forEach((color) => {
        const colorCode = getColorCode(color, colorsMap);

        if (colorCode !== undefined) {
          resultArray[colorCode - 1] = color;
        }
      });
    }

    return resultArray;
  }

  const renderDayCell = () => {
    if (isSimple) {
      // 若為簡單模式，僅顯示一槓及點icon
      return (
        <>
          <div className={style.dashContainer}>
            {generateColorArray(eventColors, dashColors).map((color, index) =>
              color ? (
                <Dash key={index} color={color} />
              ) : (
                <div key={index} className={style.emptyDash} />
              ),
            )}
          </div>
          <div className={style.dotContainer}>
            {generateColorArray(typeColors, dotColors).map((color, index) =>
              color ? (
                <Dot key={index} color={color} />
              ) : (
                <div key={index} className={style.emptyDot} />
              ),
            )}
          </div>
        </>
      );
    } else {
      // 若非為簡單模式，則顯示文字
      return (
        <div
          className={`${style.stringContainer} string-event-${stringEvent?.eventType}`}
        >
          {stringEvent?.eventName}
        </div>
      );
    }
  };

  return (
    <td
      key={date.toISOString()}
      onClick={() => onClick(date)}
      className='day-cell'
    >
      <div className={isToday ? style.today : ""}>{day}</div>
      {renderDayCell()}
    </td>
  );
};

// props 預設值
DayCell.defaultProps = {
  isSimple: true, // 是否為簡單模式
};

export default DayCell;
