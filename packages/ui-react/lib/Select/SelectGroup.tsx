import React from 'react';
import styles from './Select.module.scss';
import type { OptionProps } from './Select';
import { SelectItem } from './SelectItem';
import { useInputStringStore } from './SelectStore';
import fuzzySearch from './fuzzySearch';

export interface SelectGroupProps
  extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * options the options of SelectGroupProps
   */
  optionsList: OptionProps[];
}

export const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ optionsList, ...rest }, ref) => {
    const inputValue = useInputStringStore((state) => state.value);
    const options: OptionProps[] = inputValue ? fuzzySearch(optionsList, inputValue) : optionsList;

    return (
      <div
        className={styles['select-group']}
        ref={ref}
        {...rest}
      >
        {!options.length ? (
          <div className={styles['nothing']}>
            <span style={{ fontWeight: '700' }}>什么都没有检索到哦</span>
          </div>
        ) : (
          options.map((option, index) => (
            <SelectItem
              option={option}
              key={index}
            />
          ))
        )}
      </div>
    );
  },
);

SelectGroup.displayName = 'SelectGroup';
