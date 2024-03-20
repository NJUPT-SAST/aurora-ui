import { memo } from 'react';
import type { OptionItemProps } from './CheckboxGroup';
import { Checkbox } from '..';

export interface ContentProps {
  options: OptionItemProps[];
  selectValue: string[];
  changeSelect: (type: 'add' | 'delete', value: string) => void;
}

export const Content = memo(function Content({ options, selectValue, changeSelect }: ContentProps) {
  return (
    <>
      {options.map((child, index) => {
        return (
          <Checkbox
            checked={selectValue.includes(child.value || child.label)}
            value={child.value}
            label={child.label}
            key={child.key || index}
            onChecked={changeSelect}
          ></Checkbox>
        );
      })}
    </>
  );
});
