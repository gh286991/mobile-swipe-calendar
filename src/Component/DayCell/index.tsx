import React from "react";
import Dot from "../../Units/Dot";
import Dash from "../../Units/Dash";
import style from "./styles.module.scss";

type DayCellProps = {
  day: number;
  isToday: boolean;
};

const DayCell: React.FC<DayCellProps> = ({ isToday, day }) => {
  return (
    <td key={day}>
      <div className={isToday ? style.today : ""}>{day}</div>
      <div className={style.dashContainer}>
        <Dash color="purple" />
        <Dash color="teal" />
        <Dash color="blue" />
      </div>
      <div className={style.dotContainer}>
        <Dot color="purple" />
        <Dot color="teal" />
        <Dot color="blue" />
      </div>
    </td>
  );
};

export default DayCell;
