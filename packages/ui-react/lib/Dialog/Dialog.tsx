import React, { useEffect, useState } from 'react';
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
   * cancel, the cancel callback
   */
  onCancel?: () => void;
  /**
   * onOk , the onOk callback
   */
  onOk?: () => void;
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      header,
      mainContent,
      onCancel,
      onOk,
      footer = (
        <>
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
        </>
      ),
      theme,
      shadow = 'regular',
      size,
      visible = false,
      ...rest
    },
    ref,
  ) => {
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    const [dialogIn, setDialogIn] = useState<boolean>(false);
    const [dialogHide, setDialogHide] = useState<boolean>(false);

    useEffect(() => {
      if (visible) {
        console.log('hello');
        setDialogVisible(true);
        document.body.style.overflow = 'hidden';
        setDialogIn(true);
        setTimeout(() => {
          setDialogIn(false);
        }, 200000);
      }
      if (!visible) {
        console.log('hi');
        setDialogHide(true);
        setTimeout(() => {
          setDialogHide(false);
          setDialogVisible(false);
          document.body.style.overflow = '';
        }, 400);
      }
    }, [visible]);

    return (
      <>
        {dialogVisible && (
          <div
            className={`${styles['background']}  ${styles[dialogIn ? 'background-in' : '']} 
          ${styles[dialogHide ? 'background-hide' : '']}`}
          >
            <Card
              ref={ref}
              className={`${styles['base']} 
          ${styles[dialogIn ? 'in' : '']} 
          ${styles[dialogHide ? 'hide' : '']}`}
              header={header}
              mainContent={mainContent}
              footer={footer}
              shadow={shadow}
              theme={theme}
              size={size}
              {...rest}
            ></Card>
          </div>
        )}
      </>
    );
  },
);

Dialog.displayName = 'Dialog';
