import React, { useEffect, useRef, useState, type HtmlHTMLAttributes } from 'react';
import { type CarouselItemProps, CarouselItem } from '..';
import classNames from 'classnames';
import styles from './Carousel.module.scss';

export interface CarouselProps extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * select of the Carousel
   */
  selectedIndex?: number;
  /**
   * defaultselect the defaultselect of the Carousel
   */
  defaultSelectedIndex?: number;
  /**
   * width of the carousel
   */
  width?: number;
  /**
   * height of the Carousel
   */
  height?: number;
  /**
   * CarouselItems of the carousel
   */
  carouselItems: CarouselItemProps[];
  /**
   * onChange : the onChange of the Carousel
   */
  onChange?: (value: number) => void;
  /**
   * isSliding
   */
  isSliding?: boolean;
  /**
   * className
   */
  className?: string;
  /**
   * itemClassName?:
   */
  itemClassName?: string;
}

interface ContentProps {
  CarouselItems: CarouselItemProps[];
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      // width,
      carouselItems,
      // height,
      onChange,
      defaultSelectedIndex,
      selectedIndex,
      isSliding = true,
      className,
      itemClassName,
      ...rest
    },
    ref,
  ) => {
    // The definition judgment of this rotating chart is determined by two factors,
    // one is whether it has reached the halfway position,
    // and the second is the speed of movement, when the dragging speed is greater than 0.5, it is automatically switched.
    // 这个轮播图的界定判断由两个因素决定，一个是是否到达了一半的位置，第二个是移动的速度，当拖拽速度大于0.5时，自动进行切换。
    const [select, setSelect] = useState<number>(defaultSelectedIndex || 0);
    const [startX, setStartX] = useState<number>(0);
    const [endX, setEndX] = useState<number>(0);
    const [startTime, setStartTime] = useState<number>(0);
    const [endTime, setEndTime] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [difference, setDifference] = useState<number>(0);
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const [itemsNumber, setItemsNumber] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const viewRef = useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
      const handleResize = () => {
        if (containerRef.current) {
          setWidth(containerRef.current.offsetWidth);
          setHeight(containerRef.current.offsetHeight);
        }
      };

      // Initialize container width on mount
      handleResize();

      // Update container width on window resize
      window.addEventListener('resize', handleResize);

      // Clean up event listener on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    useEffect(() => {
      selectedIndex !== undefined && setSelect(selectedIndex);
    }, [selectedIndex]);

    const handleMouseDown = (e: React.MouseEvent) => {
      setStartX(e.clientX);
      setStartTime(Date.now());
      setIsDragging(true);
      console.log('startX', startX);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging) return;
      const currentX = e.clientX;
      const difference = startX - currentX;
      setDifference(difference);
    };

    useEffect(() => {
      if (containerRef.current) {
        containerRef.current.style.transition = 'auto';
        containerRef.current.style.transform = `translateX(${-(width * select + difference)}px)`;
      }
    }, [difference, select, width]);

    useEffect(() => {
      if (difference === 0 && containerRef.current) {
        containerRef.current.style.transition = '';
        containerRef.current.style.transform = `translateX(-${width * select}px)`;
      }
    }, [select, width, difference]);

    // This is a half-position judgment
    // 这个是一半位置的判断
    const handleMouseUp = (e: React.MouseEvent) => {
      setEndX(e.clientX);
      setEndTime(Date.now());
      if (Math.abs(difference) >= width / 2 && difference > 0 && select !== itemsNumber - 1) {
        setSelect(select + 1);
        setIsChanged(true);
      } else if (Math.abs(difference) >= width / 2 && difference < 0 && select !== 0) {
        setSelect(select - 1);
        setIsChanged(true);
      } else if (
        Math.abs(difference) < width / 2 &&
        containerRef.current &&
        select === itemsNumber - 1 &&
        select === 0
      ) {
        containerRef.current.style.transform = `translateX(-${width * select}px)`;
      }
      setDifference(0);
      setIsDragging(false);
    };

    useEffect(() => {
      onChange && onChange(select);
    }, [select, onChange]);

    useEffect(() => {
      if (difference === 0 && !isChanged) {
        const duration = endTime - startTime;
        const space = endX - startX;
        const v = space / duration;
        // This is a speed judgment.
        // 这个是速度的判断
        v < -0.5 && select !== itemsNumber - 1 && setSelect(select + 1);
        v > 0.5 && select != 0 && setSelect(select - 1);
      }
      setIsChanged(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [difference]);

    const carouselClass = classNames(styles['base']);

    useEffect(() => {
      carouselItems && setItemsNumber(carouselItems.length);
    }, [carouselItems]);

    const Content = function content({ CarouselItems }: ContentProps) {
      return (
        <>
          {CarouselItems?.map((item, index) => {
            return (
              <CarouselItem
                key={index}
                width={item.width || width}
                height={item.height || height}
                className={itemClassName}
              >
                {item.children}
              </CarouselItem>
            );
          })}
        </>
      );
    };

    return (
      <div
        ref={ref}
        className={`${carouselClass} ${className}`}
        {...rest}
      >
        <div
          style={{ width: '100%', height: '100%' }}
          ref={viewRef}
        >
          <div
            className={styles['carousel-all']}
            ref={containerRef}
            onMouseDown={(e) => isSliding && handleMouseDown(e)}
            onMouseMove={(e) => isSliding && handleMouseMove(e)}
            onMouseUp={(e) => isSliding && handleMouseUp(e)}
          >
            {carouselItems.length && <Content CarouselItems={carouselItems}></Content>}
          </div>
        </div>
      </div>
    );
  },
);

Carousel.displayName = 'Carousel';
