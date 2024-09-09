import React, { useEffect, useState, type CSSProperties } from 'react';
import styles from './Dialog.module.scss';
import { Button, Card } from '..';
import { createPortal } from 'react-dom';

export interface DialogProps extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'content'> {
  /**
   * The header of the Dialog.
   */
  header?: React.ReactNode;
  /**
   * The content of the Dialog.
   */
  content?: React.ReactNode;
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
  shadow?: 'regular' | 'small' | 'medium' | 'large' | 'extraLarge' | 'inner' | 'none';
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
      content,
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
    const [shouldRender, setShouldRender] = useState<boolean>(false);
    const [dialogHide, setDialogHide] = useState<boolean>(false);

    useLayoutEffect(() => {
      visible ? openDialog() : closeDialog();
    }, [visible]);

    const openDialog = () => {
      setDialogHide(false);
      setShouldRender(true);
      document.body.style.overflow = 'hidden';
    };

    const closeDialog = () => {
      setDialogHide(true);
      // Vanishing animation is implemented by delaying the use of shouldrender to receive visiable data unidirectional
      const timer = setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = '';
      }, 300);
      return () => clearTimeout(timer);
    };

    return (
      shouldRender &&
      createPortal(
        <div
          className={`${styles['dialog-container']} ${styles[mask ? 'mask' : 'no-mask']} ${styles[dialogHide ? 'dialog-hide' : 'dialog-in']}`}
          onClick={() => maskClosable && onCancel && onCancel()}
          style={maskStyle}
        >
          <Card
            ref={ref}
            className={`${styles['base']} ${styles['dialog']} ${styles[dialogHide ? 'dialog-hide' : 'dialog-in']} ${className}`}
            header={header}
            content={content}
            footer={footer}
            size={size}
            shadow={shadow}
            {...rest}
          />
        </div>,
        document.body,
      )
    );
  },
);

Dialog.displayName = 'Dialog';
