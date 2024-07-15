import React, { useState, type ChangeEvent } from 'react';
import styles from './Input.module.scss';
import classnames from 'classnames';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /**
   * theme, the theme of the input
   */
  theme?: 'primary' | 'info' | 'danger' | 'warning' | 'success';
  /**
   * size , the size of the input
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * If `true`, the input will be disabled.
   */
  disabled?: boolean;
  /**
   * label,the label of the input
   */
  label?: React.ReactNode;
  /**
   * placeholder,the placeholder of the input
   */
  placeholder?: string;
  /**
   * function(value:string, e:event) 输入框内容变化时的回调
   */
  onChange?: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
  /**
   * value ,the value of the input
   */
  value?: string;
  /**
   * defaultValue, the defaultValue of the input
   */
  defaultValue?: string;
  // TODO: delete it
  /**
   * isBorder? have the border of the input
   */
  isBorder?: boolean;
  /**
   * className, the className of the input
   */
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      disabled = false,
      label,
      placeholder,
      onChange,
      value,
      theme = 'primary',
      isBorder = true,
      defaultValue = '',
      className,
      size = 'medium',
      ...rest
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState<string>(defaultValue);
    const inputClass = classnames(
      styles['base'],
      styles[disabled ? 'disabled' : ''],
      styles[isBorder ? 'border' : ''],
      styles[size],
      styles[theme],
      className,
    );

    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onChange && onChange(e.target.value, e);
    };

    return (
      <div className={inputClass}>
        {label && <label>{label}</label>}
        <input
          className={styles['input']}
          ref={ref}
          placeholder={placeholder}
          disabled={disabled}
          onChange={changeValue}
          value={value ?? inputValue}
          {...rest}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';
