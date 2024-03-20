import React from 'react';
import styles from './Sheet.module.scss';
import { Button } from '..';

export interface SheetFooterProps {
  /**
   * content of the sheetheader
   */
  children?: React.ReactNode;
}

export const SheetFooter = React.forwardRef<HTMLDivElement, SheetFooterProps>(
  ({ children, ...rest }, ref) => {
    return (
      <>
        <div
          {...rest}
          ref={ref}
          className={styles['sheetFooter']}
        >
          <div
            style={{
              width: '100%',
              backgroundColor: '#f0f0f0',
              height: '1px',
              marginBottom: '8px',
            }}
          ></div>
          {children || <Button color="ghost">取消</Button>}
        </div>
      </>
    );
  },
);

SheetFooter.displayName = 'SheetFooter';
