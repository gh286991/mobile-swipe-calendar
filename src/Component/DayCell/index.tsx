import React from "react";
import Dot from "../../Units/Dot";
import Dash from "../../Units/Dash";
import style from "./styles.module.scss";

type DayCellProps = {
  day: number;
};

const DayCell: React.FC<DayCellProps> = ({ day }) => {
  return (
    <td key={day}>
      {day}
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
