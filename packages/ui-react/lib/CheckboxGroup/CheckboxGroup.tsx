import React, { useEffect, useState } from 'react';
import { type CheckboxProps } from '..';
import { Content } from './Content';

export interface OptionItemProps extends CheckboxProps {
  value?: string;
  key?: number;
}

export interface CheckboxGroupProps {
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
}

export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ options, onChange, direction, ...rest }, ref) => {
    const [selectedValue, setSelectedValue] = useState<string[]>([]);

    const changeSelect = (type: 'add' | 'delete', value: string) => {
      if (type === 'add') {
        const newSelected = [...selectedValue, value];
        setSelectedValue(newSelected);
      }
      if (type === 'delete') {
        const newSelected = selectedValue.filter((element) => element !== value);
        setSelectedValue(newSelected);
      }
    };

    useEffect(() => {
      onChange && onChange(selectedValue);
    }, [selectedValue, onChange]);

    return (
      <>
        <div
          ref={ref}
          {...rest}
          style={{ display: 'flex', gap: '5px', flexDirection: direction }}
        >
          <Content
            options={options}
            selectValue={selectedValue}
            changeSelect={changeSelect}
          ></Content>
        </div>
      </>
    );
  },
);

CheckboxGroup.displayName = 'CheckboxGroup';
