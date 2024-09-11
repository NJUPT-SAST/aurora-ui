import React, { useEffect, useState } from 'react';
import styles from './Sheet.module.scss';
import { Button } from '..';
import { X } from 'lucide-react';

export interface SheetHeaderProps {
  /**
   * content of the sheetheader
   */
  content?: string;
  /**
   * onCancel of the sheet
   */
  onCancel?: () => void;
}

export const SheetHeader = React.forwardRef<HTMLDivElement, SheetHeaderProps>(
  ({ content = 'Basic Sheet', onCancel, ...rest }, ref) => {
    return (
      <>
        <div
          ref={ref}
          {...rest}
          className={styles['sheet-header']}
        >
          <div className={styles['sheet-header-content']}>
            <span>{content}</span>
            <Button
              color="ghost"
              className={styles['svg-container']}
              size="small"
              onClick={onCancel}
              shadow="none"
            >
              <X
                size={16}
                // color="#808080"
              />
            </Button>
          </div>
        </div>
      </>
    );
  },
);

SheetHeader.displayName = 'SheetHeader';
