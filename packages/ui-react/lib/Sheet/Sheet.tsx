import React, { useEffect, useState, type CSSProperties } from 'react';
import styles from './Sheet.module.scss';
// import SheetTrigger from './SheetTrigger';
import { SheetHeader } from './SheetHeader';
import { SheetFooter } from './SheetFooter';
import { useWrapperVisibleStore } from './useWrapperVisibleStore';
import { createPortal } from 'react-dom';

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
  /**
   * classname , the classname of the sidesheet
   */
  className?: string;
  /**
   * mask, Whether to display the mask
   */
  mask?: boolean;
  /**
   * Whether or not to allow closing the dialog by clicking on the mask
   */
  maskClosable?: boolean;
  /**
   * the style of the mask
   */
  maskStyle?: CSSProperties;
  /**
   * placement : left|right
   */
  placement?: 'left' | 'right';
}

export const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(
  (
    {
      visible,
      onCancel,
      sheetTitle,
      sheetFooter,
      mainContent,
      width = 500,
      className,
      maskClosable = true,
      mask = true,
      maskStyle,
      placement = 'right',
      ...rest
    },
    ref,
  ) => {
    const [sheetVisible, setSheetVisible] = useState<boolean>(false);
    const [sheetIn, setSheetIn] = useState<boolean>(false);
    const [sheetHide, setSheetHide] = useState<boolean>(false);
    const [open, close] = useWrapperVisibleStore((state) => [state.open, state.close]);

    useEffect(() => {
      visible ? openSheet() : closeSheet();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    const closeSheet = () => {
      setSheetIn(false);
      setSheetHide(true);
      close();
      setTimeout(() => {
        setSheetHide(false);
        setSheetVisible(false);
        document.body.style.overflow = '';
      }, 400);
    };

    const openSheet = () => {
      setSheetVisible(true);
      setSheetIn(true);
      open();
      document.body.style.overflow = 'hidden';
    };

    return (
      <>
        {createPortal(
          <div>
            {sheetVisible && (
              <div
                className={`${styles['sheet-container']}   ${styles[sheetIn ? 'sheet-in' : '']} 
            ${styles[sheetHide ? 'sheet-hide' : '']} ${styles[mask ? 'mask' : 'no-mask']}`}
                style={maskStyle}
                onMouseDown={() => maskClosable && onCancel && onCancel()}
                ref={ref}
                {...rest}
              >
                <div
                  style={{ width: `${width}px` }}
                  className={`${styles['sheet']} 
            ${styles[sheetIn ? 'sheet-in' : '']} 
            ${styles[sheetHide ? 'sheet-hide' : '']} ${className} ${styles[placement === 'left' ? 'left' : '']}`}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <SheetHeader
                    onCancel={onCancel}
                    content={sheetTitle}
                  ></SheetHeader>
                  <div className={styles['sheetMainContent']}>{mainContent}</div>
                  <SheetFooter onCancel={onCancel}>{sheetFooter}</SheetFooter>
                </div>
              </div>
            )}
          </div>,
          document.body,
        )}
      </>
    );
  },
);

Sheet.displayName = 'Sheet';
