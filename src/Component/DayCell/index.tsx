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
} from "../../Const/colors";

import { getDate } from "date-fns";

type DayCellProps = {
  date: Date;
  isToday: boolean;
  dashColors: Colors[];
  dotColors: Colors[];
  onClick: (date: Date) => void;
};

const DayCell: React.FC<DayCellProps> = ({
  isToday,
  date,
  dashColors,
  dotColors,
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
    dotColors: Colors[],
    colorsMap: Record<EventCode | TypeCode, Colors>,
  ): (Colors | null)[] {
    const resultArray: (Colors | null)[] = [null, null, null];

    dotColors.forEach((color) => {
      const colorCode = getColorCode(color, colorsMap);

      if (colorCode !== undefined) {
        resultArray[colorCode - 1] = color;
      }
    });

    return resultArray;
  }

  return (
    <td key={date.toISOString()} onClick={() => onClick(date)}>
      <div className={isToday ? style.today : ""}>{day}</div>
      <div className={style.dashContainer}>
        {generateColorArray(dashColors, eventColors).map((color, index) =>
          color ? (
            <Dash key={index} color={color} />
          ) : (
            <div key={index} className={style.emptyDash} />
          ),
        )}
      </div>
      <div className={style.dotContainer}>
        {generateColorArray(dotColors, typeColors).map((color, index) =>
          color ? (
            <Dot key={index} color={color} />
          ) : (
            <div key={index} className={style.emptyDot} />
          ),
        )}
      </div>
    </td>
  );
};

export default DayCell;
