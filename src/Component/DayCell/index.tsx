import React from "react";
import Dot from "../../Units/Dot";
import Dash from "../../Units/Dash";
import style from "./styles.module.scss";

type DayCellProps = {
  day: number;
  isToday: boolean;
  dashColors: ("purple" | "teal" | "blue")[];
  dotColors: ("purple" | "teal" | "blue")[];
};

const DayCell: React.FC<DayCellProps> = ({
  isToday,
  day,
  dashColors,
  dotColors,
}) => {
  return (
    <td key={day}>
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
