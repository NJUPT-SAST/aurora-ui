import React, { useEffect, useState } from 'react';
import styles from './Checkbox.module.scss';
import classNames from 'classnames';
import { Check } from 'lucide-react';
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
  /**
   * fontsize
   */
  fontsize?: number;
  /**
   * labelClass
   */
  labelClass?: string;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      value,
      checked,
      label = 'SAST',
      disabled = false,
      fontsize,
      labelClass,
      onChecked = function() { },
      ...rest
    },
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
            <Check
              size={16}
              className={styles['check-icon']}
            />
          )}
        </button>
        <label
          className={`${labelClass} ${styles['labelSpan']}`}
          style={{ fontSize: `${fontsize}px` }}
        >
          {label}
        </label>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
