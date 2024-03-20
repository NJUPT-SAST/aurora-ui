import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import styles from './Calendar.module.scss';
import DayItem from './DayItem';
import { Button } from '..';

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
              <svg
                width="16"
                height="16"
                fill="#333333"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.7265 12L12.6665 11.06L9.61317 8L12.6665 4.94L11.7265 4L7.7265 8L11.7265 12Z" />
                <path d="M7.33344 12L8.27344 11.06L5.2201 8L8.27344 4.94L7.33344 4L3.33344 8L7.33344 12Z" />
              </svg>
            </Button>
            <Button
              color="border"
              onClick={() => changeMonth(false)}
              className={styles['button']}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="#333333"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.2735 4L3.3335 4.94L6.38683 8L3.3335 11.06L4.2735 12L8.2735 8L4.2735 4Z" />
                <path d="M8.66656 4L7.72656 4.94L10.7799 8L7.72656 11.06L8.66656 12L12.6666 8L8.66656 4Z" />
              </svg>
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
