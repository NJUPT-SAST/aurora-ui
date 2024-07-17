import React from 'react';
import styles from './Card.module.scss';

interface CardContentProps extends React.HtmlHTMLAttributes<HTMLDivElement> { }

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>((props, ref) => {
  return (
    <div
      className={styles['card-content']}
      ref={ref}
      {...props}
    />
  );
});

CardContent.displayName = 'CardContent';
