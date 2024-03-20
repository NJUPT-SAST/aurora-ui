import React from 'react';
import styles from './Card.module.scss';
import classnames from 'classnames';

export interface CardProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  /**
   * the image of the card
   */
  titleImage?: HTMLImageElement;
  /**
   * The theme of the Card.
   */
  theme?: 'dark' | 'light';
  /**
   * The size of the Card.
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * The shadow of the Card.
   */
  shadow?: 'regular' | 'small' | 'medium' | 'large' | 'extraLarge' | 'inner';
  /**
   * The Header of the Card.
   */
  header?: React.ReactNode;
  /**
   * The content of the Card.
   */
  mainContent?: React.ReactNode;
  /**
   * The footer of the Card.
   */
  footer?: React.ReactNode;
  /**
   * the className of the Card
   */
  className?: string;
  /**
   * padding, the padding of the card
   */
  padding?: number;
  /**
   * gap , the gap between the content and the header
   */
  gap?: number;
  /**
   * width , the width of the card
   */
  width?: number;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      theme = 'light',
      size = 'medium',
      shadow = 'medium',
      header = <span>header</span>,
      mainContent = <span>content</span>,
      footer = <span>footer</span>,
      titleImage = undefined,
      className = '',
      padding = 20,
      gap = 8,
      ...rest
    },
    ref,
  ) => {
    const cardClass = classnames(
      styles['base'],
      styles[theme],
      styles[size],
      styles[`shadow-${shadow}`],
    );

    return (
      <div
        ref={ref}
        className={`${cardClass} ${className}`}
        {...rest}
      >
        {titleImage && <div className={styles['titleImage']}>{<>{titleImage}</>}</div>}
        <div
          className={styles['contentContainer']}
          style={{ padding: `${padding}px` }}
        >
          <div
            className={styles['mainContent']}
            style={{ gap: `${gap}px` }}
          >
            {header && <div className={styles['header']}>{header}</div>}
            {mainContent && <div className={styles['content']}>{mainContent}</div>}
          </div>
          {footer && <div className={styles['footer']}>{footer}</div>}{' '}
        </div>
      </div>
    );
  },
);

Card.displayName = 'Card';
