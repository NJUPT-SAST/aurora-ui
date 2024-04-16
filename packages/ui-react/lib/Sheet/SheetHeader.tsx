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
  ({ content, onCancel, ...rest }, ref) => {
    const [headerContent, setHeaderContent] = useState<string>('Basic Sheet');

    useEffect(() => {
      content && setHeaderContent(content);
    }, [content]);
    return (
      <>
        <div
          ref={ref}
          {...rest}
          className={styles['sheet-header']}
        >
          <div className={styles['sheet-header-content']}>
            <span>{headerContent}</span>
            <Button
              color="ghost"
              className={styles['svg-container']}
              size="small"
              onClick={onCancel}
            >
              <X
                size={16}
                color="#808080"
              />
            </Button>
          </div>
        </div>
      </>
    );
  },
);

SheetHeader.displayName = 'SheetHeader';
