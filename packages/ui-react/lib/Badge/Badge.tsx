import React from 'react';
import styles from './Badge.module.scss';
import classNames from 'classnames';

export interface BadgeProps {
  /**
   * the type of the Badge
   */
  type?: 'info' | 'success' | 'warning' | 'error' | 'ghost';
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
  /**
   * The shadow of the Badge.
   */
  shadow?: 'regular' | 'small' | 'medium' | 'large' | 'extraLarge' | 'inner' | 'none';
  /**
   * The color of the Badge.
   */
  color?: string;
  /**
   * classname , the classname of the Badge
   */
  className?: string;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      type = 'info',
      size = 'medium',
      content = 'hello',
      clickCopy = false,
      shadow = 'none',
      className,
      color,
      ...rest
    },
    ref,
  ) => {
    const badgeClass = classNames(
      styles['base'],
      styles[type],
      styles[size],
      styles[`shadow-${shadow}`],
      className,
    );

    const handleBadge = () => {
      navigator.clipboard.writeText(content);
    };

    const badgeStyle = color ? { backgroundColor: color } : undefined;

    return (
      <div
        ref={ref}
        className={badgeClass}
        {...rest}
        onClick={clickCopy ? handleBadge : undefined}
        style={badgeStyle}
      >
        <span>{content}</span>
      </div>
    );
  },
);

Badge.displayName = 'Badge';
