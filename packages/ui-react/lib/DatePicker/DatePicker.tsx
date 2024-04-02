import React, { useEffect, useState } from 'react';
import { Button, Calendar } from '..';
import styles from './DatePicker.module.scss';
import { CalendarDays } from 'lucide-react';

export interface DatePickerProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  /**
   * onchange, the onchange of the datepicker
   */
  onchange?: (value: Date) => void;
  /**
   * defaultPickDate, the defaultPickDate of the datepicker
   */
  defaultPickDate?: Date;
  /**
   * pickDate, the pickDate of the datePicker
   */
  pickDate?: Date;
}

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  ({ onchange, defaultPickDate, pickDate, ...rest }, ref) => {
    const [calendarVisible, setCalendarVisible] = useState<boolean>(false);
    const [selectDate, setSelectDate] = useState<Date | undefined>(defaultPickDate);
    const [selectDateString, setSelectDateString] = useState<string | undefined>(
      defaultPickDate?.toString(),
    );
    const [calendarIn, setCalendarIn] = useState<boolean>(false);
    const [calendarHide, setCalendarHide] = useState<boolean>(false);

    useEffect(() => {
      if (pickDate) {
        setSelectDate(pickDate);
        setSelectDateString(pickDate.toString());
      }
    }, [pickDate]);

    useEffect(() => {
      selectDate && onchange && onchange(selectDate);
    }, [selectDate, onchange]);

    const handleDate = (value: Date) => {
      setSelectDate(value);
      if (value.toString() !== new Date().toString()) {
        setSelectDateString(value.toString());
      }
    };

    const handleCalendarVisible = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      const newCalendarVisible = !calendarVisible;
      if (newCalendarVisible) {
        openCalendar();
      } else {
        closeCalendar();
      }
    };

    const openCalendar = () => {
      document.body.addEventListener('click', closeCalendar);
      setCalendarIn(true);
      setCalendarVisible(true);
      setTimeout(() => {
        setCalendarIn(false);
      }, 200);
    };

    const closeCalendar = () => {
      document.body.removeEventListener('click', closeCalendar);
      setCalendarHide(true);
      setTimeout(() => {
        setCalendarHide(false);
        setCalendarVisible(false);
      }, 200);
    };

    // console.log('selectDateString', selectDateString);

    return (
      <>
        <div
          ref={ref}
          {...rest}
        >
          <Button
            color="border"
            className={`${styles['date-picker-button']} 
            ${styles[calendarVisible ? 'is-select-date' : '']}
             ${styles[selectDateString ? 'have-select-date' : '']}`}
            onClick={handleCalendarVisible}
          >
            <CalendarDays size={18} />
            {!selectDateString ? (
              <span>Pick a date</span>
            ) : (
              <span className={styles['select-date']}>{selectDate?.toDateString()}</span>
            )}
          </Button>
          {calendarVisible && (
            <div
              className={`
              ${styles['calendar-container']} 
          ${styles[calendarVisible ? 'show' : '']}
           ${styles[calendarIn ? 'in' : '']}
           ${styles[calendarHide ? 'hide' : '']}
           `}
            >
              <Calendar
                onchange={handleDate}
                defaultSelected={defaultPickDate}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              ></Calendar>
            </div>
          )}
        </div>
      </>
    );
  },
);

DatePicker.displayName = 'DatePicker';
