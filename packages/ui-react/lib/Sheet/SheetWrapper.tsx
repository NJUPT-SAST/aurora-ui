import React from 'react';
import { useWrapperVisibleStore } from './useWrapperVisibleStore';
import styles from './Sheet.module.scss';

export interface SheetWrapperProps {
  /**
   * children of the sheetTrigger
   */
  children: React.ReactNode;
  /**
   * backgroundColor, the color of the background
   */
  backgroundColor?: string;
}

export const SheetWrapper = React.forwardRef<HTMLDivElement, SheetWrapperProps>(
  ({ children, backgroundColor = 'black' }, ref) => {
    const [wrapperVisible] = useWrapperVisibleStore((state) => [state.wrapperVisible]);

    return (
      <>
        <div style={{ backgroundColor: backgroundColor }}>
          <div
            ref={ref}
            className={`${styles['wrapper']} ${styles[wrapperVisible ? 'show' : '']}`}
          >
            {children}
          </div>
        </div>
      </>
    );
  },
);

SheetWrapper.displayName = 'SheetWrapper';
