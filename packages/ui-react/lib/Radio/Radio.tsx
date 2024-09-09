import classNames from 'classnames';
import React, { type ChangeEventHandler } from 'react';
import styles from './Radio.module.scss';

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /**
   * The color of the Radio.
   */
  type?: 'primary' | 'warning' | 'danger' | 'info';
  /**
   * The size of the Radio.
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * If `true`, the Radio will be disabled.
   */
  disabled?: boolean;
  /**
   * the value of the radio,if not provide ,the value is children
   */
  value: string | number;
  /**
   * the checked of the radio
   */
  checked?: boolean;
  /**
   * the defaultchecked of the radio?
   */
  defaultChecked?: boolean;
  /**
   * the onchange of the radio (type:the type of the click(used for can cancel radio),value:string)
   */
  onChange?: (value: string | number, event: Event) => void;
  /**
   * label, the label of the Radio
   */
  label?: React.ReactNode;
  /**
   * className of the wrapper of the radio
   */
  className?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      type = 'primary',
      size = 'medium',
      disabled = false,
      checked,
      onChange,
      value,
      defaultChecked = false,
      label,
      className,
      ...rest
    },
    ref,
  ) => {
    const radioId = `radio-${Math.random().toString(36).slice(2, 11)}`;

    const radioWrapperClass = classNames(
      styles['base'],
      styles[type],
      styles[size],
      styles[disabled ? 'disabled' : ''],
      className,
    );

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      onChange && onChange(value, event as unknown as Event);
    };

    return (
      <div className={radioWrapperClass}>
        <input
          type="radio"
          id={radioId}
          defaultChecked={checked === undefined ? defaultChecked : undefined}
          checked={checked}
          className={`${styles['radio']} ${styles[type]}`}
          disabled={disabled}
          onChange={handleChange}
          ref={ref}
          {...rest}
        />
        {label && (
          <label
            htmlFor={radioId}
            className={styles['label']}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

Radio.displayName = 'Radio';
