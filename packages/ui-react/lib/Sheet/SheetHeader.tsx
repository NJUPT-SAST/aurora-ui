import React, { useEffect, useState } from 'react';
import styles from './Sheet.module.scss';
import { Button } from '..';

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
              <svg
                className="icon"
                viewBox="0 0 1024 1024"
                width="13"
                fill="#808080"
              >
                <path d="M925.468404 822.294069 622.19831 512.00614l303.311027-310.331931c34.682917-27.842115 38.299281-75.80243 8.121981-107.216907-30.135344-31.369452-82.733283-34.259268-117.408013-6.463202L512.000512 399.25724 207.776695 87.993077c-34.675754-27.796066-87.272669-24.90625-117.408013 6.463202-30.178323 31.414477-26.560936 79.375815 8.121981 107.216907l303.311027 310.331931L98.531596 822.294069c-34.724873 27.820626-38.341237 75.846432-8.117888 107.195418 30.135344 31.43699 82.72919 34.326806 117.408013 6.485715l304.178791-311.219137 304.177767 311.219137c34.678824 27.841092 87.271646 24.951275 117.408013-6.485715C963.808618 898.140501 960.146205 850.113671 925.468404 822.294069z"></path>
              </svg>
            </Button>
          </div>
        </div>
      </>
    );
  },
);

SheetHeader.displayName = 'SheetHeader';
