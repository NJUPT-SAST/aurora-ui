import classNames from 'classnames';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Calendar.module.scss';
import DayItem from './DayItem';
import { Button, Card } from '..';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

export interface CalendarProps extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * the onChange of the calendar
   */
  onChange?: (value: Date) => void;
  /**
   * the selected of the date
   */
  selected?: Date;
  /**
   * defaultselected of the calendar
   */
  defaultSelected?: Date;
  /**
   * shadow of the calendar
   */
  shadow?: 'regular' | 'small' | 'medium' | 'large' | 'extraLarge' | 'inner' | 'none';
}

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ onChange, selected, defaultSelected, shadow = 'none', ...rest }, ref) => {
    // Initialize the state to store the selected date
    const [selectDate, setSelectDate] = useState<Date | undefined>(defaultSelected);
    const [selectMonth, setSelectMonth] = useState<number>(new Date().getMonth());

    const currentDate = useMemo(() => new Date(), []);

    const numberOfDaysInMonth = useMemo(
      () => new Date(currentDate.getFullYear(), selectMonth + 1, 0).getDate(),
      [selectMonth],
    );

    const numberOfDaysInLastMonth = useMemo(
      () => new Date(currentDate.getFullYear(), selectMonth, 0).getDate(),
      [selectMonth],
    );

    const numberOfDaysFromPrevMonth = useMemo(() => {
      const firstDayOfMonth = new Date(currentDate.getFullYear(), selectMonth, 1).getDay();
      const numberOfDaysFromPrevMonth = (firstDayOfMonth + 6) % 7;

      return numberOfDaysFromPrevMonth;
    }, [selectMonth, currentDate]);

    const numberOfDaysFromAfterMonth = useMemo(() => {
      const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        selectMonth,
        numberOfDaysInMonth,
      ).getDay();

      const numberOfDaysFromAfterMonth = Math.abs(lastDayOfMonth - 7) % 7;

      return numberOfDaysFromAfterMonth;
    }, [selectMonth, numberOfDaysInMonth, numberOfDaysInMonth]);

    // Function to generate the calendar grid

    useEffect(() => {
      selected && setSelectDate(selected);
    }, [selected]);

    const Weekdays = memo(() => {
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
    });

    Weekdays.displayName = 'Weekdays';

    const calendarClass = classNames(`${styles['base']} ${styles[`shadow-${shadow}`]}`);

    const changeMonth = useCallback(
      (isBack: boolean) => {
        isBack && setSelectMonth(selectMonth - 1);
        !isBack && setSelectMonth(selectMonth + 1);
      },
      [selectMonth],
    );

    useEffect(() => {
      selectDate && onChange && onChange(selectDate);
    }, [selectDate, onChange]);

    return (
      <Card
        ref={ref}
        shadow="none"
        content={
          <>
            <div className={styles['calendarTitle']}>
              <div className={styles['buttonContainer']}>
                <Button
                  color="ghost"
                  onClick={() => changeMonth(true)}
                  className={styles['button']}
                  shadow="none"
                >
                  <ChevronsLeft
                    size={16}
                    color="#333333"
                  />
                </Button>
                <Button
                  color="ghost"
                  onClick={() => changeMonth(false)}
                  className={styles['button']}
                  shadow="none"
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
            <Weekdays />
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
          </>
        }
        className={calendarClass}
        {...rest}
      />
    );
  },
);

Calendar.displayName = 'Calendar';
