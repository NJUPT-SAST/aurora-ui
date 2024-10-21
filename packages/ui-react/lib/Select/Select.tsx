import React, { useRef, useState } from 'react';
import { SelectTrigger } from './SelectTrigger';
import { SelectContent } from './SelectContent';
import {
  createKeySelectItemStore,
  createSelectItemStore,
  type SelectItemProps,
  SelectItemContext,
  KeySelectItemContext,
} from './SelectStore';
import styles from './Select.module.scss';
import classNames from 'classnames';

export interface OptionProps {
  value: string;
  label: string;
  key: number;
}

export interface SelectProps extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * the label of the select
   */
  label?: React.ReactNode;
  /**
   * onChange of the select
   */
  onChange?: (value: OptionProps) => void;
  /**
   * the optionList of the select
   */
  optionsList: Array<OptionProps>;
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
   * placeHolder of the select
   */
  placeHolder?: string;
  /**
   * size?:
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * shadow of the select
   */
  shadow?: 'regular' | 'small' | 'medium' | 'large' | 'extraLarge' | 'inner' | 'none';
  /**
   * className, the className of the select
   */
  className?: string;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      optionsList = [],
      label,
      onChange,
      disabled = false,
      defaultSelectKey,
      selectKey,
      placeHolder,
      size = 'medium',
      shadow = 'regular',
      className,
      ...rest
    },
    ref,
  ) => {
    const defaultSelectItem: SelectItemProps = {
      selectItem: optionsList.find((item) => item.key === defaultSelectKey),
    };

    const selectItem: SelectItemProps = {
      selectItem: optionsList.find((item) => item.key === selectKey),
    };

    const selectItemStore = useRef(createSelectItemStore(defaultSelectItem ?? selectKey)).current;
    const keySelectItemStore = useRef(createKeySelectItemStore()).current;
    const [visible, setVisible] = useState<boolean>(false);
    const selectClass = classNames(styles['base'], styles[size], className);
    const closeOptions = () => {
      setVisible(false);
    };
    return (
      <SelectItemContext.Provider value={selectItemStore}>
        <KeySelectItemContext.Provider value={keySelectItemStore}>
          <div
            ref={ref}
            className={selectClass}
            {...rest}
          >
            <SelectTrigger
              label={label}
              disabled={disabled}
              placeholder={placeHolder}
              size={size}
              onBlur={closeOptions}
              optionsList={optionsList}
              onClick={() => setVisible(true)}
              onKeyDown={() => setVisible(true)}
              closeOptions={() => setVisible(false)}
              onChange={onChange}
              selectKey={selectKey}
            />
            {visible && (
              <SelectContent
                optionsList={optionsList}
                shadow={shadow}
              />
            )}
          </div>
        </KeySelectItemContext.Provider>
      </SelectItemContext.Provider>
    );
  },
);

Select.displayName = 'Select';
