import React from 'react';
import styles from './Card.module.scss';

interface CardFooterProps extends React.HtmlHTMLAttributes<HTMLDivElement> { }

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>((props, ref) => {
  return (
    <div
      className={styles['card-footer']}
      ref={ref}
      {...props}
    />
  );
});

CardFooter.displayName = 'CardFooter';
