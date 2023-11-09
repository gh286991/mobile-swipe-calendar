import React from "react";
// 導入組件和樣式
import DayCell from "../../Component/DayCell";
import { eventColors, typeColors } from "../../Const/colors";
import style from "./style.module.scss";

// 定義日曆項目的基本信息
const legendItems = [
  {
    key: "today",
    date: new Date("2023-10-31"),
    isToday: true,
    description: "今日",
  },
  {
    key: "nationalHoliday",
    date: new Date("2023-10-31"),
    isToday: false,
    description: "國定假日",
    dotColor: typeColors[1],
  },
  {
    key: "institutionHoliday",
    date: new Date("2023-10-31"),
    isToday: false,
    description: "機構行事曆",
    dotColor: typeColors[2],
  },
  {
    key: "personalCalendar",
    date: new Date("2023-10-31"),
    isToday: false,
    description: "個人行事曆",
    dotColor: typeColors[3],
  },
  {
    key: "personalEventScheduling",
    date: new Date("2023-10-31"),
    isToday: false,
    description: "個人事件（排班）",
    dashColor: eventColors[1],
  },
  {
    key: "personalEventCourse",
    date: new Date("2023-10-31"),
    isToday: false,
    description: "個人事件（課程）",
    dashColor: eventColors[2],
  },
  {
    key: "personalEventThree",
    date: new Date("2023-10-31"),
    isToday: false,
    description: "個人事件（事件三）",
    dashColor: eventColors[3],
  },
];

const LegendPage: React.FC = () => {
  return (
    <div>
      <div className={style.itemContainer}>
        <table>
          <tbody>
            {legendItems.map((item) => (
              <tr key={item.key}>
                <DayCell
                  date={item.date}
                  isToday={item.isToday}
                  onClick={() => {}}
                  dashColors={item.dashColor ? [item.dashColor] : []}
                  dotColors={item.dotColor ? [item.dotColor] : []}
                />
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LegendPage;
