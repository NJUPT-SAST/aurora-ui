import React, { useCallback, useEffect, useState, type HtmlHTMLAttributes } from 'react';
import { type CheckboxProps } from '..';
import { Content } from './Content';

export interface OptionItemProps extends CheckboxProps {
  key?: number;
}

export interface CheckboxGroupProps extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * options of the checkboxGroup
   */
  options: OptionItemProps[];
  /**
   * Onchange of the group
   */
  onChange?: (value: string[]) => void;
  /**
   * type  "column"|"row"
   */
  direction?: 'column' | 'row';
  /**
   * defaultValue, the defaultValue of the checkbox Group
   */
  defaultValue?: string[];
}

export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ options, onChange, direction, defaultValue, ...rest }, ref) => {
    const [selectedValue, setSelectedValue] = useState<string[]>(defaultValue ?? []);

    const changeSelect = useCallback(
      (type: 'add' | 'delete', value: string) => {
        if (type === 'add') {
          const newSelected = [...selectedValue, value];
          setSelectedValue(newSelected);
          onChange && onChange(newSelected);
        }
        if (type === 'delete') {
          const newSelected = selectedValue.filter((element) => element !== value);
          setSelectedValue(newSelected);
          onChange && onChange(newSelected);
        }
      },
      [selectedValue],
    );

    return (
      <>
        <div
          ref={ref}
          style={{ display: 'flex', gap: '5px', flexDirection: direction }}
          {...rest}
        >
          <Content
            options={options}
            selectValue={selectedValue}
            changeSelect={changeSelect}
          />
        </div>
      </>
    );
  },
);

CheckboxGroup.displayName = 'CheckboxGroup';
