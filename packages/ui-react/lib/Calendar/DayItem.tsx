import { memo } from 'react';
import styles from './Calendar.module.scss';

interface DayItemProps {
  index: number;
  isOtherMonth: 'pre' | 'this' | 'after';
  selectDate?: Date;
  currentDate: Date;
  onChange: (value: Date) => void;
  selectMonth: number;
}

const DayItem = memo(function otherMonthItem({
  index,
  isOtherMonth,
  selectDate,
  currentDate,
  onChange,
  selectMonth,
}: DayItemProps) {
  let month;

  switch (isOtherMonth) {
    case 'pre':
      month = selectMonth - 1;
      break;
    case 'after':
      month = selectMonth + 1;
      break;
    default:
      month = selectMonth;
      break;
  }

  function isSameDay(date1?: Date, date2?: Date) {
    return (
      date1?.getFullYear() === date2?.getFullYear() &&
      date1?.getMonth() === date2?.getMonth() &&
      date1?.getDate() === date2?.getDate()
    );
  }

  const thisDate = new Date(currentDate.getFullYear(), month, index);

  const handleClick = () => {
    thisDate && onChange(thisDate);
  };

  return (
    <div
      key={`${isOtherMonth} ${index}`}
      className={`${styles['calendarItem']}
           ${styles[isOtherMonth !== 'this' ? 'otherMonth' : '']}
           ${styles[isSameDay(thisDate, currentDate) ? 'today' : '']}          
           ${styles[isSameDay(thisDate, selectDate) ? 'select' : '']}`}
      onClick={handleClick}
    >
      {index}
    </div>
  );
});

export default DayItem;
