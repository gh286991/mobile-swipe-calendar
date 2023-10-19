type  Prop= {
  monthDate : any
}

function MonthView({ monthDate } : Prop) {
  const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, idx) => idx + 1);

  return (
      <div key={monthDate}>
          <div>{monthDate.toLocaleString('default', { month: 'long' })} {monthDate.getFullYear()}</div>
          <table>
              <thead>
                  <tr>
                      <th>Sun</th>
                      <th>Mon</th>
                      <th>Tue</th>
                      <th>Wed</th>
                      <th>Thu</th>
                      <th>Fri</th>
                      <th>Sat</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      {Array(firstDayOfMonth).fill(null).map((_, idx) => <td key={idx}></td>)}
                      {days.slice(0, 7 - firstDayOfMonth).map(day => <td key={day}>{day}</td>)}
                  </tr>
                  {Array(Math.ceil((daysInMonth - (7 - firstDayOfMonth)) / 7)).fill(null).map((_, weekIdx) => (
                      <tr key={weekIdx}>
                          {days.slice((7 - firstDayOfMonth) + (weekIdx * 7), (7 - firstDayOfMonth) + ((weekIdx + 1) * 7)).map(day => <td key={day}>{day}</td>)}
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
}

export default MonthView;
