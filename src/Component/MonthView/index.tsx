import {
  isToday,
  format,
  getDaysInMonth,
  startOfMonth,
  getDay,
} from "date-fns";

import { zhTW } from "date-fns/locale";

import DayCell from "../DayCell";

import style from "./style.module.scss";

type Prop = {
  monthDate: Date;
};

function MonthView({ monthDate }: Prop) {
  const daysInMonth = getDaysInMonth(monthDate);
  const firstDayOfMonth = getDay(startOfMonth(monthDate));
  const days = Array.from({ length: daysInMonth }, (_, idx) => idx + 1);
  const month = monthDate.getMonth();
  const year = monthDate.getFullYear();

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
            {days.slice(0, 7 - firstDayOfMonth).map((day) => (
              <DayCell
                day={day}
                isToday={isToday(new Date(year, month, day))}
              />
            ))}
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
                  .map((day) => (
                    <DayCell
                      day={day}
                      isToday={isToday(new Date(year, month, day))}
                    />
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default MonthView;
