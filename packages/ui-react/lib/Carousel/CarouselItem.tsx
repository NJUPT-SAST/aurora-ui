import React from 'react';
import styles from './Carousel.module.scss';

export interface CarouselItemProps {
  /**
   * children of the CarouselItem
   */
  children?: React.ReactNode;
  /**
   * width of the CarouselItem
   */
  width?: number;
  /**
   * height of the CarouselItem
   */
  height?: number;
}

export const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ children, width, height }, ref) => {
    return (
      <>
        <div
          ref={ref}
          className={`${styles['item']}`}
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          {children}
        </div>
      </>
    );
  },
);

CarouselItem.displayName = 'CarouselItem';
