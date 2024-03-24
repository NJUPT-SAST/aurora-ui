import React, {
  useState,
  type MouseEventHandler,
  type KeyboardEvent,
  useEffect,
  useRef,
} from 'react';
import styles from './Select.module.scss';
import { Input } from '..';

export interface OptionProps {
  value: string;
  label: string;
  key: number;
}

export interface SelectProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  /**
   * onChange of the select
   */
  onchange?: (value: OptionProps) => void;
  /**
   * the optionList of the select
   */
  optionsList?: Array<OptionProps>;
  /**
   * the title of the select
   */
  title?: string;
  /**
   * diabled of the select
   */
  disabled?: boolean;
  /**
   * defaultselectKey ,the defaultselectkey of the options
   */
  defaultSelectKey?: number;
  /**
   * selectKey, the selectKey of the options
   */
  selectKey?: number;
  /**
   * isBorder,  the border of the select
   */
  isBorder?: boolean;
  /**
   * width, the width of the select
   */
  width?: number;
  /**
   * placeHolder of the select
   */
  placeHolder?: string;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      optionsList = [
        { value: 'nextjs', label: 'nextjs', key: 3 },
        { value: 'nuxtjs', label: 'nuxtjs', key: 5 },
      ],
      onchange,
      title = 'which framwork?',
      disabled = false,
      defaultSelectKey,
      selectKey,
      isBorder = true,
      width = 280,
      placeHolder = '',
      ...rest
    },
    ref,
  ) => {
    // Here selectItemIndex is different from selectItem,
    // selectItem is all the contents of the selected selectItem,
    // selectItemIndex is the index value inside options, starting from 0, and has nothing to do with the key inside the options.
    const [visible, setVisble] = useState<boolean>(false);
    const [selectItem, setSelectItem] = useState<OptionProps | undefined>(
      optionsList.find((item) => item.key === defaultSelectKey),
    );
    const [options, setOptions] = useState<OptionProps[]>(optionsList);
    const [inputValue, setInputValue] = useState<string>('');
    const [selectPlaceHolder, setSelectPlaceHolder] = useState<string>('');
    const [selectItemIndex, setSelectItemIndex] = useState<number>(-1);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setSelectPlaceHolder(placeHolder);
    }, [placeHolder]);

    const showOptions: MouseEventHandler = () => {
      if (!disabled) setVisble(!visible);
    };

    useEffect(() => {
      setSelectItem(optionsList.find((item) => item.key === selectKey));
    }, [selectKey, optionsList]);

    function handleClick(value: OptionProps): void {
      setSelectItem(value);
      setSelectPlaceHolder(value.label);
      setTimeout(() => {
        setInputValue('');
      }, 300);
    }

    const onKeyDown = (event: KeyboardEvent) => {
      const optionsList = options;
      const listLength = optionsList.length;
      if (listLength === 0) return;
      const KEY_ARROW_DOWN = 'arrowdown';
      const KEY_ARROW_UP = 'arrowup';
      const KEY_ENTER = 'enter';

      function handleArrowDown() {
        if (selectItemIndex === -1 || selectItemIndex === optionsList.length - 1) {
          setSelectItemIndex(0);
        } else {
          setSelectItemIndex((selectItemIndex) => selectItemIndex + 1);
        }
      }

      function handleArrowUp() {
        if (selectItemIndex === -1 || selectItemIndex === 0) {
          setSelectItemIndex(optionsList.length - 1);
        } else {
          setSelectItemIndex((selectItemIndex) => selectItemIndex - 1);
        }
      }

      function handleEnter() {
        if (selectItemIndex !== -1) {
          handleClick(optionsList[selectItemIndex]!);
          closeOptions();
        }
      }

      if (event.key.toLocaleLowerCase() === KEY_ARROW_DOWN) {
        handleArrowDown();
      } else if (event.key.toLocaleLowerCase() === KEY_ARROW_UP) {
        handleArrowUp();
      } else if (event.key.toLocaleLowerCase() === KEY_ENTER) {
        handleEnter();
      }
    };

    useEffect(() => {
      onchange && selectItem && onchange(selectItem);
      selectItem?.label && setSelectPlaceHolder(selectItem.label);
    }, [selectItem, onchange]);

    const handleOptions = (value: string) => {
      if (value === '') {
        setSelectItem(undefined);
      }
      setInputValue(value);
    };

    function fuzzySearch(optionsList: OptionProps[], searchTerm: string): OptionProps[] {
      const regex = new RegExp(searchTerm, 'i');
      return optionsList.filter((option) => regex.test(option.label));
    }

    // When closeoptions, you need to set selectItemIndex to -1,
    // and at the same time input loses focus and options disappear.
    const closeOptions = () => {
      setSelectItemIndex(-1);
      inputRef.current?.blur();
      setTimeout(() => {
        setVisble(false);
      }, 100);
    };

    useEffect(() => {
      const results = fuzzySearch(optionsList, inputValue);
      setOptions(results);
    }, [inputValue, optionsList]);

    return (
      <>
        <div
          ref={ref}
          {...rest}
        >
          <Input
            onClick={showOptions}
            onBlur={closeOptions}
            value={inputValue}
            width={width}
            onchange={handleOptions}
            label={title}
            isBorder={isBorder}
            placeholder={selectPlaceHolder}
            disabled={disabled}
            onKeyDown={onKeyDown.bind(this)}
            ref={inputRef}
            // According to the visible of the options box, determine the color of the placeholder,
            // if the options are not expanded, the display will be black,
            // if it has been expanded, the display will be gray.
            className={`${styles['input']} ${visible ? styles['hide-placeholder'] : ''}`}
          ></Input>
          <div className={`${styles['options']} ${visible ? styles['show'] : ''}`}>
            {!options.length ? (
              <div className={styles['nothing-img-container']}>
                <img src="../../public/sast_test_image/404.png" />
                <span style={{ fontWeight: '700' }}>什么都没有检索到哦😭</span>
              </div>
            ) : (
              options.map((obj, index) => {
                return (
                  <div
                    key={obj.key}
                    className={`${styles['option-item']} ${styles['option-item']}_${obj.key} ${selectItemIndex === index ? styles['option-item-selected'] : ''}`}
                    onClick={() => handleClick(obj)}
                  >
                    <span className={styles['option-item-span']}>{obj.label}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </>
    );
  },
);

Select.displayName = 'Select';
