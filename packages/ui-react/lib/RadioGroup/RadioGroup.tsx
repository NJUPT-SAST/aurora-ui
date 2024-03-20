import React, { useEffect, useState } from 'react';
import type { RadioProps } from '..';
import classNames from 'classnames';
import styles from './RadioGroup.module.scss';
import { Radio } from '../Radio/Radio';

export interface RadioGroupProps {
  /**
   * the direction of the group
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * the defaultvalue of the group,if you use multipe ,the defaultValue must be an array
   */
  defaultValue?: string | undefined;
  /**
   * the onchange of the group
   */
  onChange: (value: string) => void;
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
  (
    {
      direction = 'vertical',
      defaultValue = 'nodejs',
      onChange,
      options = [
        { children: 'nodejs', value: 'nodejs', key: 1 },
        { children: 'vuejs', value: 'vuejs', key: 2 },
        { children: 'react', value: 'react', key: 3 },
      ],
      value,
      ...rest
    },
    ref,
  ) => {
    const [selectedValue, setSelectedValue] = useState<string>(defaultValue);
    const handleRadioChange = (value: string) => {
      setSelectedValue(value);
    };

    const radioGroupClass = classNames(styles[direction], styles['base']);

    useEffect(() => {
      onChange(selectedValue);
    }, [selectedValue, onChange]);

    useEffect(() => {
      value && setSelectedValue(value);
    }, [value]);

    return (
      <div
        {...rest}
        ref={ref}
        className={radioGroupClass}
      >
        {options.map((item, index) => {
          return (
            <Radio
              key={item.key || index}
              value={item.value}
              onChange={handleRadioChange}
              checked={selectedValue === item.value}
              color={item.color}
              size={item.size}
              disabled={item.disabled}
              defaultChecked={item.defaultChecked}
            >
              {item.children}
            </Radio>
          );
        })}
      </div>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';
