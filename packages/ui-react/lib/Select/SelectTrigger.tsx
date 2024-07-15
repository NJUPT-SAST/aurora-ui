import React, { useContext, useEffect, type KeyboardEventHandler } from 'react';
import styles from './Select.module.scss';
import { Input, type InputProps, type OptionProps } from '..';
import { KeySelectItemContext, SelectItemContext, useInputStringStore } from './SelectStore';
import { useStore } from 'zustand';
import fuzzySearch from './fuzzySearch';

export interface SelectTriggerProps extends InputProps {
  optionsList: OptionProps[];
}

export const SelectTrigger = React.forwardRef<HTMLInputElement, SelectTriggerProps>(
  ({ optionsList, ...rest }, ref) => {
    const keySelectItemStore = useContext(KeySelectItemContext);
    const selectItemStore = useContext(SelectItemContext);
    if (!keySelectItemStore) throw new Error('Missing BearContext.Provider in the tree');
    if (!selectItemStore) throw new Error('Missing BearContext.Provider in the tree');
    const keySelectItem = useStore(keySelectItemStore, (state) => state.selectItem);
    const updateKeySelectItem = useStore(keySelectItemStore, (state) => state.updateSelectItem);
    const inputValue = useInputStringStore((state) => state.value);
    const changeValue = useInputStringStore((state) => state.changeValue);
    const updateSelectItem = useStore(selectItemStore, (state) => state.updateSelectItem);
    const selectItem = useStore(selectItemStore, (state) => state.selectItem);

    useEffect(() => {
      console.log(selectItem);
    }, [selectItem]);
    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
      const options = inputValue ? fuzzySearch(optionsList, inputValue) : optionsList;
      const listLength = options.length;
      let selectItemIndex = keySelectItem
        ? options.findIndex((item) => item.key === keySelectItem.key)
        : -1;
      if (listLength === 0) return;

      const KEY_ARROW_DOWN = 'arrowdown';
      const KEY_ARROW_UP = 'arrowup';
      const KEY_ENTER = 'enter';

      function handleArrowDown() {
        if (selectItemIndex === -1 || selectItemIndex === options.length - 1) {
          selectItemIndex = 0;
        } else {
          selectItemIndex = selectItemIndex + 1;
        }
      }

      function handleArrowUp() {
        if (selectItemIndex === -1 || selectItemIndex === 0) {
          selectItemIndex = options.length - 1;
        } else {
          selectItemIndex = selectItemIndex - 1;
        }
      }

      function handleEnter() {
        if (selectItemIndex !== -1) {
          updateSelectItem(optionsList[selectItemIndex]!);
          // handleClick(optionsList[selectItemIndex]!);
          // closeOptions();
        }
      }

      if (event.key.toLocaleLowerCase() === KEY_ARROW_DOWN) {
        handleArrowDown();
      } else if (event.key.toLocaleLowerCase() === KEY_ARROW_UP) {
        handleArrowUp();
      } else if (event.key.toLocaleLowerCase() === KEY_ENTER) {
        handleEnter();
      }

      updateKeySelectItem(options[selectItemIndex]!);
    };

    const handleInput = (value: string) => {
      changeValue(value);
    };

    return (
      <Input
        {...rest}
        ref={ref}
        className={styles['select-trigger']}
        onKeyDown={onKeyDown.bind(this)}
        value={inputValue}
        onChange={handleInput}
        placeholder={selectItem?.label}
      />
    );
  },
);

SelectTrigger.displayName = 'SelectTrigger';
