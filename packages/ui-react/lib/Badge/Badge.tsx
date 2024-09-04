import React, { type MouseEventHandler } from 'react';
import styles from './Badge.module.scss';
import classNames from 'classnames';

export interface BadgeProps extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'onClick'> {
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
   * The shadow of the button.
   */
  shadow?: 'regular' | 'small' | 'medium' | 'large' | 'extraLarge' | 'inner' | 'none';
  /**
   * classname , the classname of the badge
   */
  className?: string;
  /**
   * onClick
   */
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      type = 'info',
      size = 'medium',
      content,
      clickCopy = false,
      shadow = 'none',
      className,
      onClick,
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

    const handleClickBadge: MouseEventHandler<HTMLDivElement> = (event) => {
      navigator.clipboard.writeText(content);
      onClick && onClick(event);
    };

    return (
      <div
        ref={ref}
        className={badgeClass}
        onClick={clickCopy ? handleClickBadge : undefined}
        {...rest}
      >
        <span>{content}</span>
      </div>
    );
  },
);

Badge.displayName = 'Badge';
