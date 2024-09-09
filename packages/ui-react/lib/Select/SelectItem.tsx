import React, { useContext } from 'react';
import styles from './Select.module.scss';
import type { OptionProps } from './Select';
import { KeySelectItemContext, SelectItemContext, useInputStringStore } from './SelectStore';
import { useStore } from 'zustand';

export interface SelectItemProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  /**
   * option props
   */
  option: OptionProps;
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ option, ...rest }, ref) => {
    const keySelectItemStore = useContext(KeySelectItemContext);
    if (!keySelectItemStore) throw new Error('Missing BearContext.Provider in the tree');
    const keySelectItem = useStore(keySelectItemStore, (state) => state.selectItem);

    const selectItemStore = useContext(SelectItemContext);
    if (!selectItemStore) throw new Error('Missing BearContext.Provider in the tree');
    const updateSelectItem = useStore(selectItemStore, (state) => state.updateSelectItem);
    const changeValue = useInputStringStore((state) => state.changeValue);

    return (
      <div
        className={`${styles['select-item']} ${rest.className} ${keySelectItem?.key === option.key ? styles['key-select'] : ''}`}
        ref={ref}
        onClick={() => {
          updateSelectItem(option);
          changeValue(option.label);
        }}
        {...rest}
      >
        {option.label}
      </div>
    );
  },
);

SelectItem.displayName = 'SelectItem';
