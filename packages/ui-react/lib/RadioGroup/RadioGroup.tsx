import React, { useState } from 'react';
import type { RadioProps } from '..';
import classNames from 'classnames';
import styles from './RadioGroup.module.scss';
import { Radio } from '../Radio/Radio';

export interface RadioGroupProps
  extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * the direction of the group
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * the defaultvalue of the group
   */
  defaultValue?: string | undefined;
  /**
   * the onchange of the group
   */
  onChange?: (value: string | number, event: Event) => void;
  /**
   * the options of the radioGroup
   */
  options: RadioProps[];
  /**
   * value of the group
   */
  value?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ direction = 'vertical', defaultValue, onChange, options, value, ...rest }, ref) => {
    const [radioValue, setRadioValue] = useState<string | number | undefined>(defaultValue);

    const handleRadioChange = (value: string | number, event: Event) => {
      setRadioValue(value);
      onChange && onChange(value, event);
    };

    const radioGroupClass = classNames(styles[direction], styles['base']);

    return (
      <div
        ref={ref}
        className={radioGroupClass}
        {...rest}
      >
        {options.map(({ ...optionRest }, index) => {
          return (
            <Radio
              onChange={handleRadioChange}
              checked={value ? value === optionRest.value : radioValue === optionRest.value}
              key={index}
              {...optionRest}
            />
          );
        })}
      </div>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';
