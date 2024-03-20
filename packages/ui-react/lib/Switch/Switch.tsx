import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import styles from './Switch.module.scss';

export interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * size, the size of the Switch
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * checked ,the checked of the switch
   */
  checked?: boolean;
  /**
   * defaultChecked ,the defaultChecked of the switch
   */
  defaultChecked?: boolean;
  /**
   * onChange, the onChange of the switch
   */
  onchange?: (value: boolean) => void;
  /**
   * disabled, the disabled of the switch
   */
  disabled?: boolean;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      size = 'medium',
      checked = false,
      defaultChecked = false,
      onchange,
      disabled = false,
      ...rest
    },
    ref,
  ) => {
    const [isChecked, setIsChecked] = useState<boolean | undefined>(defaultChecked);
    const switchClass = classNames(
      `${styles['base']} ${isChecked ? styles['isChecked'] : ''} ${styles[size]} 
      ${disabled ? styles['disabled'] : ''}`,
    );

    useEffect(() => {
      setIsChecked(checked);
    }, [checked]);

    useEffect(() => {
      onchange && isChecked !== undefined && onchange(isChecked);
    }, [isChecked, onchange]);
    return (
      <>
        <div className={`${styles['background']} ${styles[size]}`}>
          <button
            className={switchClass}
            onClick={() => setIsChecked(!isChecked)}
            ref={ref}
            disabled={disabled}
            {...rest}
          ></button>
        </div>
      </>
    );
  },
);

Switch.displayName = 'Switch';
