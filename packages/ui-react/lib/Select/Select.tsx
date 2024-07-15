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
      size,
      shadow = 'regular',
      ...rest
    },
    ref,
  ) => {
    const defaultSelectItem: SelectItemProps = {
      selectItem: optionsList.find((item) => item.key === defaultSelectKey),
    };
    const selectItemStore = useRef(createSelectItemStore(defaultSelectItem)).current;
    const keySelectItemStore = useRef(createKeySelectItemStore(defaultSelectItem)).current;

    const [visible, setVisible] = useState<boolean>(false);
    const closeContent = () => {
      setTimeout(() => {
        setVisible(false);
      }, 100);
 
    };
    return (
      <SelectItemContext.Provider value={selectItemStore}>
        <KeySelectItemContext.Provider value={keySelectItemStore}>
          <div
            ref={ref}
            className={styles['base']}
            {...rest}
          >
            <SelectTrigger
              label={label}
              disabled={disabled}
              placeholder={placeHolder}
              size={size}
              optionsList={optionsList}
              onClick={() => setVisible(true)}
              onBlur={closeContent}
            />
            {visible && (
              <SelectContent
                onChange={onChange}
                selectKey={selectKey}
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
