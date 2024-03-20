import React, { useEffect, useState } from 'react';
import styles from './Checkbox.module.scss';
import classNames from 'classnames';
export interface CheckboxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * value of the checkbox
   */
  value?: string;
  /**
   *label of the checkbox
   */
  label: string;
  /**
   * diabled of the checkbox
   */
  disabled?: boolean;
  /**
   * checked of the checkbox
   */
  checked?: boolean;
  /**
   * onchange of the checkbox
   */
  onChecked?: (type: 'add' | 'delete', value: string) => void;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    { value, checked, label = 'SAST', disabled = false, onChecked = function () {}, ...rest },
    ref,
  ) => {
    const checkboxClass = classNames(`${styles['base']} ${styles[disabled ? 'disabled' : '']}`);
    const [isChecked, setIsChecked] = useState<boolean>(false);

    useEffect(() => {
      checked && setIsChecked(checked);
    }, [checked]);
    const handleChecked = () => {
      const newIsChecked = !isChecked;
      setIsChecked(newIsChecked);
      newIsChecked && value && onChecked('add', value || label);
      !newIsChecked && value && onChecked('delete', value || label);
    };

    return (
      <div
        className={checkboxClass}
        onClick={handleChecked}
      >
        <button
          id="checkbox"
          disabled={disabled}
          className={`${styles['checkboxButton']} ${styles[isChecked ? 'checked' : '']}`}
          ref={ref}
          {...rest}
        >
          {isChecked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                className={`${styles['checkPath']} ${styles[isChecked ? 'checked' : '']}`}
                fill="none"
                stroke="white"
                strokeWidth="4.5"
                d="M4 12 L9 17 L20 6"
              />
            </svg>
          )}
        </button>
        <label className={styles['labelSpan']}>{label}</label>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
