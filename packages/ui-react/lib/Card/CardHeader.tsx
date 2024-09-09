import React from 'react';
import styles from './Card.module.scss';

interface CardHeaderProps extends React.HtmlHTMLAttributes<HTMLDivElement> { }

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>((props, ref) => {
  return (
    <div
      className={styles['card-header']}
      ref={ref}
      {...props}
    />
  );
});

CardHeader.displayName = 'CardHeader';
