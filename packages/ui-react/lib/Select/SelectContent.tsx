import React from 'react';
import styles from './Select.module.scss';
import type { OptionProps } from './Select';
import { SelectGroup } from './SelectGroup';

export interface SelectContentProps
  extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * the options of the SelectContent
   */
  optionsList: OptionProps[];
  /**
   * onChange
   */
  shadow?: 'regular' | 'small' | 'medium' | 'large' | 'extraLarge' | 'inner' | 'none';
}

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ optionsList: options, shadow, ...rest }, ref) => {
    return (
      <div
        className={`${styles['select-content']} ${styles[`shadow-${shadow}`]}`}
        ref={ref}
        {...rest}
      >
        <SelectGroup optionsList={options} />
      </div>
    );
  },
);

SelectContent.displayName = 'SelectContent';
