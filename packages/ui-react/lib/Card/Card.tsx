import React from 'react';
import styles from './Card.module.scss';
import classnames from 'classnames';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { CardFooter } from './CardFooter';

export interface CardProps extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'content'> {
  /**
   * the image of the card
   */
  heroImage?: string;
  /**
   * The size of the Card.
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * The shadow of the Card.
   */
  shadow?: 'none' | 'regular' | 'small' | 'medium' | 'large' | 'extraLarge' | 'inner';
  /**
   * The Header of the Card.
   */
  header?: React.ReactNode;
  /**
   * The content of the Card.
   */
  content?: React.ReactNode;
  /**
   * The footer of the Card.
   */
  footer?: React.ReactNode;
  /**
   * the className of the Card
   */
  className?: string;
  /**
   * heroImageClassName string
   */
  heroImageClassName?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      size = 'medium',
      shadow = 'regular',
      header,
      content,
      footer,
      heroImage,
      className,
      heroImageClassName,
      ...rest
    },
    ref,
  ) => {
    const cardClass = classnames(
      styles['base'],
      styles[size],
      styles[`shadow-${shadow}`],
      className,
    );

    return (
      <div
        ref={ref}
        className={cardClass}
        {...rest}
      >
        {heroImage && (
          <img
            className={`${styles['hero-image']} ${heroImageClassName}`}
            src={heroImage}
            alt="card-hero-image"
          />
        )}
        {header && <CardHeader>{header}</CardHeader>}
        {content && <CardContent>{content}</CardContent>}
        {footer && <CardFooter>{footer}</CardFooter>}
      </div>
    );
  },
);

Card.displayName = 'Card';
