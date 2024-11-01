import React, { useState } from 'react';
import styles from './Checkbox.module.scss';
import classNames from 'classnames';
import { Check } from 'lucide-react';
export interface CheckboxProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
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
   * labelClass
   */
  labelClass?: string;
  /**
   * classname:string
   */
  className?: string;
  /**
   * type
   */
  type?: 'primary' | 'warning' | 'danger' | 'info' | 'ghost';
  /**
   * defaultChecked
   */
  defaultChecked?: boolean;
}

export const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(
  (
    {
      value,
      checked,
      label,
      disabled = false,
      className,
      labelClass,
      onChecked = function () {},
      type = 'primary',
      defaultChecked,
      ...rest
    },
    ref,
  ) => {
    const checkboxClass = classNames(
      `${styles['base']} ${styles[disabled ? 'disabled' : '']} ${className} ${styles[type]}`,
    );
    const [isChecked, setIsChecked] = useState<boolean>(defaultChecked ?? false);

    const handleChecked = () => {
      const newIsChecked = !(checked ?? isChecked);
      !checked && setIsChecked(newIsChecked);
      newIsChecked && value && onChecked('add', value || label);
      !newIsChecked && value && onChecked('delete', value || label);
    };

    return (
      <div
        className={checkboxClass}
        onClick={handleChecked}
        ref={ref}
        {...rest}
      >
        <button
          id="checkbox"
          disabled={disabled}
          className={`${styles['checkbox-button']} ${styles[(checked ?? isChecked) ? 'checked' : '']}`}
        >
          {(checked ?? isChecked) && (
            <Check
              size={16}
              className={styles['check-icon']}
            />
          )}
        </button>
        <label className={`${labelClass} ${styles['label-span']}`}>{label}</label>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
