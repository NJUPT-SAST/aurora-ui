import React from 'react';
import { useWrapperVisibleStore } from './useWrapperVisibleStore';
import styles from './Sheet.module.scss';
import { createPortal } from 'react-dom';

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
        {createPortal(
          <div style={{ backgroundColor: backgroundColor }}>
            <div
              ref={ref}
              className={`${styles['wrapper']} ${styles[wrapperVisible ? 'show' : '']}`}
            >
              {children}
            </div>
          </div>,
          document.body,
        )}
      </>
    );
  },
);

SheetWrapper.displayName = 'SheetWrapper';
