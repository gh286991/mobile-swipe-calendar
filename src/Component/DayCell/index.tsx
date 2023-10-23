import React from "react";
import Dot from "../../Units/Dot";
import Dash from "../../Units/Dash";
import style from "./styles.module.scss";

import { Colors } from "../../Const/colors";

import { getDate } from "date-fns"; // 引入 date-fns 的 getDate 函數

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
  const day = getDate(date); // 使用 getDate 函數從 date 取得日子

  return (
    <td key={date.toISOString()} onClick={() => onClick(date)}>
      <div className={isToday ? style.today : ""}>{day}</div>
      <div className={style.dashContainer}>
        {dashColors.map((color, index) => (
          <Dash key={index} color={color} />
        ))}
      </div>
      <div className={style.dotContainer}>
        {dotColors.map((color, index) => (
          <Dot key={index} color={color} />
        ))}
      </div>
    </td>
  );
};

export default DayCell;
