import { useState, useRef, useEffect } from 'react';
import { addMonths, subMonths } from 'date-fns';
import MonthView from './MonthView';

function Calendar() {
  const [focusMonth, setFocusMonth] = useState(new Date());
  const [monthsToShow, setMonthsToShow] = useState([
    subMonths(new Date(), 1),
    new Date(),
    addMonths(new Date(), 1)
  ]);
  const [touchStartY, setTouchStartY] = useState(0);
  const calendarRef = useRef(null);

  useEffect(() => {
    setMonthsToShow([
      subMonths(focusMonth, 1),
      focusMonth,
      addMonths(focusMonth, 1),
    ]);
  }, [focusMonth]);

  const handleTouchStart = (e :any) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e:any) => {
    const touchMoveY = e.touches[0].clientY;
    const diff = touchStartY - touchMoveY;
    const { scrollTop, scrollHeight, clientHeight } = calendarRef.current as any;

    const movedByMonths = Math.floor(Math.abs(diff) / 150); // 每150px滑動距離加載一個月份

    if (scrollTop === 0 && diff < 0) {
      setFocusMonth(prev => subMonths(prev, movedByMonths));
    } else if (scrollTop + clientHeight >= scrollHeight && diff > 0) {
      setFocusMonth(prev => addMonths(prev, movedByMonths));
    }
  };

  const goToToday = () => {
    setFocusMonth(new Date());
  };

  const handleWheel = () => {
  console.log('handleWheelsdf')
  }
  return (
    <div>
      <button onClick={goToToday}>回到今天</button>
      <div 
        ref={calendarRef} 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onWheel={handleWheel}
        onWheelCapture={handleWheel}
        style={{ overflowY: 'auto', height: '500px' }}>
        {monthsToShow.map(month => <MonthView monthDate={new Date(month)} />)}
      </div>
    </div>
  );
}

export default Calendar;
