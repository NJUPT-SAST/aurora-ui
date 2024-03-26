import React, { useEffect, useRef, useState, type CSSProperties } from 'react';
import styles from './Dialog.module.scss';
import { Button, Card } from '..';

export interface DialogProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  /**
   * The header of the Dialog.
   */
  header?: React.ReactNode;
  /**
   * The content of the Dialog.
   */
  mainContent?: React.ReactNode;
  /**
   * The footer of the Dialog.
   */
  footer?: React.ReactNode;
  /**
   * the visible of the dialog
   */
  visible?: boolean;
  /**
   * shadow, the shadow of the dialog
   */
  shadow?: 'regular' | 'small' | 'medium' | 'large' | 'extraLarge' | 'inner';
  /**
   * The theme of the Card.
   */
  theme?: 'dark' | 'light';
  /**
   * The size of the Card.
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * cancel, the default 取消 button  callback
   */
  onCancel?: () => void;
  /**
   * onOk , the default 确定 button callback
   */
  onOk?: () => void;
  /**
   * classname, the classname of the dialog
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
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      header,
      mainContent,
      onCancel,
      onOk,
      footer = (
        <div style={{ display: 'flex', gap: '8px', width: '100%', justifyContent: 'end' }}>
          <Button
            color="ghost"
            shadow="small"
            onClick={onCancel}
          >
            取消
          </Button>
          <Button
            shadow="small"
            onClick={onOk}
          >
            确定
          </Button>
        </div>
      ),
      theme,
      shadow = 'regular',
      size,
      visible = false,
      className,
      mask = true,
      maskClosable = true,
      maskStyle,
      ...rest
    },
    ref,
  ) => {
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    const [dialogIn, setDialogIn] = useState<boolean>(false);
    const [dialogHide, setDialogHide] = useState<boolean>(false);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
      if (visible) {
        openDialog();
      } else {
        closeDialog();
      }
    }, [visible]);

    useEffect(() => {
      dialogVisible && dialogRef.current?.show();
      !dialogVisible && dialogRef.current?.close();
    }, [dialogVisible]);

    const openDialog = () => {
      setDialogVisible(true);
      document.body.style.overflow = 'hidden';
      setDialogIn(true);
    };

    const closeDialog = () => {
      setDialogIn(false);
      setDialogHide(true);
      setTimeout(() => {
        setDialogHide(false);
        document.body.style.overflow = '';
        setDialogVisible(false);
      }, 400);
    };

    return (
      <>
        {dialogVisible && (
          <div
            className={`${styles['dialog-container']} ${styles[mask ? 'mask' : 'no-mask']} ${styles[dialogIn ? 'dialog-in' : '']}  
            ${styles[dialogHide ? 'dialog-hide' : '']}`}
            onClick={() => maskClosable && onCancel && onCancel()}
            style={maskStyle}
          >
            <dialog
              ref={dialogRef}
              className={`${styles['dialog']}  ${styles[dialogIn ? 'dialog-in' : '']}  
          ${styles[dialogHide ? 'dialog-hide' : '']}  ${className} `}
              onClick={(e) => e.stopPropagation()}
            >
              <Card
                ref={ref}
                className={`${styles['base']} `}
                header={header}
                mainContent={mainContent}
                footer={footer}
                theme={theme}
                size={size}
                shadow={shadow}
                {...rest}
              ></Card>
            </dialog>
          </div>
        )}
      </>
    );
  },
);

Dialog.displayName = 'Dialog';
