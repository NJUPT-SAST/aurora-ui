import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import styles from './Switch.module.scss';

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
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
  onChange?: (value: boolean) => void;
  /**
   * disabled, the disabled of the switch
   */
  disabled?: boolean;
}

const SwitchImpl = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    { size = 'medium', checked, defaultChecked = false, onChange, disabled = false, ...rest },
    ref,
  ) => {
    const [isChecked, setIsChecked] = useState<boolean | undefined>(defaultChecked);
    const switchClass = classNames(
      `${styles['base']} ${(checked !== undefined ? checked : isChecked) ? styles['isChecked'] : ''} ${styles[size]} 
      ${disabled ? styles['disabled'] : ''}`,
    );

    const handleClick = useCallback(() => {
      setIsChecked(!isChecked);
      onChange && onChange(checked !== undefined ? !checked : !isChecked);
    }, [onChange, checked, isChecked]);

    return (
      <>
        <div className={`${styles['background']} ${styles[size]}`}>
          <button
            className={switchClass}
            onClick={handleClick}
            ref={ref}
            disabled={disabled}
            {...rest}
          />
        </div>
      </>
    );
  },
);

SwitchImpl.displayName = 'Switch';

export const Switch = React.memo(SwitchImpl);
