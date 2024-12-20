import React, { useCallback, useState, type HtmlHTMLAttributes } from 'react';
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
  /**
   * value, the value of the checkbox
   */
  value?: string[];
}

export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ options, onChange, direction, defaultValue, value, ...rest }, ref) => {
    const [selectedValue, setSelectedValue] = useState<string[]>(defaultValue ?? []);

    const changeSelect = useCallback(
      (type: 'add' | 'delete', selectValue: string) => {
        const currentValues = value !== undefined ? value : selectedValue;

        if (type === 'add') {
          const newSelected = [...currentValues, selectValue];
          value === undefined && setSelectedValue(newSelected);
          onChange && onChange(newSelected);
        }

        if (type === 'delete') {
          const newSelected = currentValues.filter((element) => element !== selectValue);
          value === undefined && setSelectedValue(newSelected);
          onChange && onChange(newSelected);
        }
      },
      [value, selectedValue, onChange], // 更新依赖项
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
            selectValue={value !== undefined ? value : selectedValue}
            changeSelect={changeSelect}
          />
        </div>
      </>
    );
  },
);

CheckboxGroup.displayName = 'CheckboxGroup';
