import { memo, useMemo } from 'react';
import styles from './Calendar.module.scss';
import { Button } from '..';

interface DayItemProps {
  index: number;
  isOtherMonth: 'pre' | 'this' | 'after';
  selectDate?: Date;
  currentDate: Date;
  onChange: (value: Date) => void;
  selectMonth: number;
}

const DayItem = memo(function DayItem({
  // Change the function name here
  index,
  isOtherMonth,
  selectDate,
  currentDate,
  onChange,
  selectMonth,
}: DayItemProps) {
  function isSameDay(date1?: Date, date2?: Date) {
    return (
      date1?.getFullYear() === date2?.getFullYear() &&
      date1?.getMonth() === date2?.getMonth() &&
      date1?.getDate() === date2?.getDate()
    );
  }

  const thisDate = useMemo(() => {
    let month: number = selectMonth;

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

    return new Date(currentDate.getFullYear(), month, index);
  }, [currentDate, index, isOtherMonth, selectMonth]);

  const handleClick = () => {
    thisDate && onChange(thisDate);
  };

  return (
    <Button
      key={`${isOtherMonth} ${index}`}
      className={`${styles['calendarItem']}
           ${styles[isOtherMonth !== 'this' ? 'otherMonth' : '']}
           ${styles[isSameDay(thisDate, currentDate) ? 'today' : '']}          
           ${styles[isSameDay(thisDate, selectDate) ? 'select' : '']}`}
      onClick={handleClick}
      shadow="none"
      color="ghost"
    >
      {index}
    </Button>
  );
});

export default DayItem;
