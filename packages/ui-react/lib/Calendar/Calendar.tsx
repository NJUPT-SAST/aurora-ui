import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import styles from './Calendar.module.scss';
import DayItem from './DayItem';
import { Button } from '..';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

export interface CalendarProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  /**
   * the onChange of the calendar
   */
  onchange?: (value: Date) => void;
  /**
   * the selected of the date
   */
  selected?: Date;
  /**
   * defaultselected of the calendar
   */
  defaultSelected?: Date;
}

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ onchange, selected = undefined, defaultSelected = undefined, ...rest }, ref) => {
    // Initialize the state to store the selected date
    const [selectDate, setSelectDate] = useState<Date | undefined>(defaultSelected);
    const [currentDate] = useState<Date>(new Date());
    const [numberOfDaysFromPrevMonth, setNumberOfDaysFromPrevMonth] = useState<number>(0);
    const [numberOfDaysInLastMonth, setNumberOfDaysInLastMonth] = useState<number>(0);
    const [numberOfDaysInMonth, setNumberOfDaysInMonth] = useState<number>(0);
    const [numberOfDaysFromAfterMonth, setNumberOfDaysFromAfterMonth] = useState<number>(0);
    const [selectMonth, setSelectMonth] = useState<number>(new Date().getMonth());

    // Function to generate the calendar grid
    useEffect(() => {
      const numberOfDaysInMonth = new Date(currentDate.getFullYear(), selectMonth + 1, 0).getDate();
      setNumberOfDaysInMonth(numberOfDaysInMonth);

      const numberOfDaysInLastMonth = new Date(currentDate.getFullYear(), selectMonth, 0).getDate();
      setNumberOfDaysInLastMonth(numberOfDaysInLastMonth);

      const firstDayOfMonth = new Date(currentDate.getFullYear(), selectMonth, 1).getDay();

      const numberOfDaysFromPrevMonth = (firstDayOfMonth + 6) % 7;
      setNumberOfDaysFromPrevMonth(numberOfDaysFromPrevMonth);

      const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        selectMonth,
        numberOfDaysInMonth,
      ).getDay();

      const numberOfDaysFromAfterMonth = Math.abs(lastDayOfMonth - 7) % 7;
      setNumberOfDaysFromAfterMonth(numberOfDaysFromAfterMonth);
    }, [currentDate, selectMonth]);

    useEffect(() => {
      selected && setSelectDate(selected);
    }, [selected]);

    const weekdays = () => {
      const weekdays = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

      const weekdaysFlex = [];

      weekdaysFlex.push(
        <div
          key="weekdays"
          className={styles['weekdays']}
        >
          {weekdays.map((weekday, index) => (
            <div
              key={index}
              className={`${styles['weekday']} `}
            >
              {weekday}
            </div>
          ))}
        </div>,
      );
      return weekdaysFlex;
    };
    const calendarClass = classNames(`${styles['base']}`);

    const changeMonth = (isBack: boolean) => {
      isBack && setSelectMonth(selectMonth - 1);
      !isBack && setSelectMonth(selectMonth + 1);
    };

    useEffect(() => {
      selectDate && onchange && onchange(selectDate);
    }, [selectDate, onchange]);

    return (
      <div
        className={calendarClass}
        ref={ref}
        {...rest}
      >
        <div className={styles['calendarTitle']}>
          <div className={styles['buttonContainer']}>
            <Button
              color="border"
              onClick={() => changeMonth(true)}
              className={styles['button']}
            >
              <ChevronsLeft
                size={16}
                color="#333333"
              />
            </Button>
            <Button
              color="border"
              onClick={() => changeMonth(false)}
              className={styles['button']}
            >
              <ChevronsRight
                size={16}
                color="#333333"
              />
            </Button>
          </div>
          <span>
            {(([, month, , year]) => `${month}, ${year}`)(
              new Date(currentDate.getFullYear(), selectMonth + 1, 0).toDateString().split(' '),
            )}
          </span>
        </div>
        {weekdays()}
        <div className={styles['calendarItems']}>
          {[...Array(numberOfDaysFromPrevMonth)].map((_, index) => (
            <DayItem
              index={numberOfDaysInLastMonth - numberOfDaysFromPrevMonth + index + 1}
              isOtherMonth="pre"
              key={index}
              selectDate={selectDate}
              currentDate={currentDate}
              onChange={setSelectDate}
              selectMonth={selectMonth}
            />
          ))}

          {[...Array(numberOfDaysInMonth)].map((_, index) => (
            <DayItem
              index={index + 1}
              isOtherMonth="this"
              key={index}
              selectDate={selectDate}
              currentDate={currentDate}
              onChange={setSelectDate}
              selectMonth={selectMonth}
            />
          ))}

          {[...Array(numberOfDaysFromAfterMonth)].map((_, index) => (
            <DayItem
              index={index + 1}
              isOtherMonth="after"
              key={index}
              selectDate={selectDate}
              currentDate={currentDate}
              onChange={setSelectDate}
              selectMonth={selectMonth}
            />
          ))}
        </div>
      </div>
    );
  },
);

Calendar.displayName = 'Calendar';
