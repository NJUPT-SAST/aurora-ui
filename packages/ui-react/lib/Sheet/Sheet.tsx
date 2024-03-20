import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import styles from './Sheet.module.scss';
// import SheetTrigger from './SheetTrigger';
import { SheetHeader } from './SheetHeader';
import { SheetFooter } from './SheetFooter';
import { useWrapperVisibleStore } from './useWrapperVisibleStore';

export interface SheetProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  /**
   * visible of the sheet
   */
  visible: boolean;
  /**
   * onCancel of the sheet
   */
  onCancel?: () => void;
  /**
   * header of the sheet
   */
  sheetTitle?: string;
  /**
   * footer of the sheet
   */
  sheetFooter?: React.ReactNode;
  /**
   * mainContent of the sheet
   */
  mainContent?: React.ReactNode;
  /**
   * width, the width of the sheet
   */
  width?: number;
}

export const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(
  ({ visible, onCancel, sheetTitle, sheetFooter, mainContent, width = 500, ...rest }, ref) => {
    const [innerVisible, setInnerVisible] = useState<boolean>(false);
    const [isShowAnimation, setIsShowAnimation] = useState<boolean>(false);
    const [isHideAnimation, setIsHideAnimation] = useState<boolean>(false);
    const [open, close] = useWrapperVisibleStore((state) => [state.open, state.close]);

    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
    };

    useEffect(() => {
      if (visible) {
        setInnerVisible(true);
        setIsShowAnimation(true);
        open();
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
          setIsShowAnimation(false);
        }, 400);
      }
      if (!visible) {
        setIsHideAnimation(true);
        close();
        setTimeout(() => {
          setIsHideAnimation(false);
          setInnerVisible(false);
          document.body.style.overflow = '';
        }, 400);
      }
    }, [visible, open, close]);

    const sheetClass = classnames(
      `${styles['base']} 
    ${styles[isShowAnimation ? 'showAnimation' : '']} 
    ${styles[isHideAnimation ? 'hideAnimation' : '']}`,
    );

    return (
      <>
        {innerVisible && (
          <div
            className={sheetClass}
            onMouseDown={onCancel}
            ref={ref}
            {...rest}
          >
            <div
              style={{ width: `${width}px` }}
              className={`${styles['sheetContent']} 
            ${styles[isShowAnimation ? 'showAnimation' : '']} 
            ${styles[isHideAnimation ? 'hideAnimation' : '']}`}
              onMouseDown={stopPropagation}
            >
              <SheetHeader
                onCancel={onCancel}
                content={sheetTitle}
              ></SheetHeader>
              <div className={styles['sheetMainContent']}>{mainContent}</div>
              <SheetFooter>{sheetFooter}</SheetFooter>
            </div>
          </div>
        )}
      </>
    );
  },
);

Sheet.displayName = 'Sheet';
