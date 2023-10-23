import {
  isToday,
  format,
  getDaysInMonth,
  startOfMonth,
  getDay,
} from "date-fns";

import { zhTW } from "date-fns/locale";

import DayCell from "../DayCell";
import { eventColors, typeColors, DateColorsConfig } from "../../Const/colors";

import style from "./style.module.scss";

type Prop = {
  monthDate: Date;
  dateColorsConfig: DateColorsConfig;
  onClick: (date: Date) => void;
};

function MonthView({ monthDate, dateColorsConfig, onClick }: Prop) {
  const daysInMonth = getDaysInMonth(monthDate);
  const firstDayOfMonth = getDay(startOfMonth(monthDate));
  const days = Array.from({ length: daysInMonth }, (_, idx) => idx + 1);
  const month = monthDate.getMonth();
  const year = monthDate.getFullYear();

  const getColorsForDate = (date: Date) => {
    const key = format(date, "yyyy-MM-dd");
    const config = dateColorsConfig[key] || { events: [], types: [] };

    const dashColors = config.events
      .map((eventCode) => eventColors[eventCode])
      .filter(Boolean);
    const dotColors = config.types
      .map((typeCode) => typeColors[typeCode])
      .filter(Boolean);

    return { dashColors, dotColors };
  };

  return (
    <div key={monthDate.toString()} className={style.container}>
      <div>{format(monthDate, "MMMM", { locale: zhTW })}</div>
      <table>
        <thead>
          <tr>
            <th>日</th>
            <th>一</th>
            <th>二</th>
            <th>三</th>
            <th>四</th>
            <th>五</th>
            <th>六</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {Array(firstDayOfMonth)
              .fill(null)
              .map((_, idx) => (
                <td key={idx}></td>
              ))}
            {days.slice(0, 7 - firstDayOfMonth).map((day) => {
              const date = new Date(year, month, day);
              const { dashColors, dotColors } = getColorsForDate(date);

              return (
                <DayCell
                  key={+date}
                  date={date}
                  isToday={isToday(date)}
                  dashColors={dashColors}
                  dotColors={dotColors}
                  onClick={onClick}
                />
              );
            })}
          </tr>
          {Array(Math.ceil((daysInMonth - (7 - firstDayOfMonth)) / 7))
            .fill(null)
            .map((_, weekIdx) => (
              <tr key={weekIdx}>
                {days
                  .slice(
                    7 - firstDayOfMonth + weekIdx * 7,
                    7 - firstDayOfMonth + (weekIdx + 1) * 7,
                  )
                  .map((day) => {
                    const date = new Date(year, month, day);
                    const { dashColors, dotColors } = getColorsForDate(date);

                    return (
                      <DayCell
                        key={+date}
                        date={date}
                        isToday={isToday(date)}
                        dashColors={dashColors}
                        dotColors={dotColors}
                        onClick={onClick}
                      />
                    );
                  })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default MonthView;
