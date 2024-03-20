import React from 'react';
import styles from './Badge.module.scss';
import classNames from 'classnames';

export interface BadgeProps {
  /**
   * the type of the Badge
   */
  type?: 'info' | 'success' | 'warning' | 'error';
  /**
   * the size of the Badge
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * the content of the Badge
   */
  content: string;
  /**
   * is clickCopy work?
   */
  clickCopy?: boolean;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ type = 'info', size = 'medium', content = 'hello', clickCopy = false, ...rest }, ref) => {
    const badgeClass = classNames(styles['base'], styles[type], styles[size]);

    const handleBadge = () => {
      navigator.clipboard.writeText(content);
    };

    return (
      <div
        ref={ref}
        className={badgeClass}
        {...rest}
        onClick={clickCopy ? handleBadge : undefined}
      >
        <span>{content}</span>
      </div>
    );
  },
);

Badge.displayName = 'Badge';
