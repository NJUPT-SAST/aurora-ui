import React from 'react';
import styles from './Sheet.module.scss';
import { Button } from '..';

export interface SheetFooterProps {
  /**
   * content of the sheetheader
   */
  children?: React.ReactNode;
  /**
   * onCancel, the exit of the sheet
   */
  onCancel?: () => void;
}

export const SheetFooter = React.forwardRef<HTMLDivElement, SheetFooterProps>(
  ({ children, onCancel, ...rest }, ref) => {
    return (
      <>
        <div
          {...rest}
          ref={ref}
          className={styles['sheetFooter']}
        >
          <div
            id="divider"
            style={{
              width: '100%',
              backgroundColor: '#f0f0f0',
              height: '1px',
              marginBottom: '8px',
            }}
          ></div>
          {children || (
            <Button
              color="ghost"
              onClick={onCancel}
            >
              取消
            </Button>
          )}
        </div>
      </>
    );
  },
);

SheetFooter.displayName = 'SheetFooter';
