import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import styles from './Toast.module.scss';
import { CircleX } from 'lucide-react';

export interface ToastProps {
  /**
   * The type of the Toast.
   */
  type?: 'info' | 'success' | 'warning' | 'error';
  /**
   * The size of the Toast.
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * The content of the Toast.
   */
  content?: React.ReactNode;
  /**
   * The footer of the Toast.
   */
  footer?: React.ReactNode;
  /**
   * onChange of the toast
   */
  close?: () => void;
  /**
   * The shadow of the button.
   */
  shadow?: 'regular' | 'small' | 'medium' | 'large' | 'extraLarge' | 'inner' | 'none';
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      type = 'info',
      size = 'medium',
      content = (
        <span>
          这是一条<strong>{type}</strong>信息 👋
        </span>
      ),
      footer = null,
      close,
      shadow = 'none',
      ...rest
    },
    ref,
  ) => {
    const [visible, setVisble] = useState(true);

    const toastClass = classNames(
      styles['base'],
      styles[type],
      styles[size],
      styles[visible ? 'visible' : ''],
      styles[`shadow-${shadow}`],
      styles[`${type}Sider`],
    );

    useEffect(() => {
      if (!visible && close) close();
    }, [visible, close]);

    return (
      <>
        {
          <div style={{ padding: '10px' }}>
            <div
              ref={ref}
              className={toastClass}
              {...rest}
            >
              <div className={`${styles['sider']}`}></div>
              <div>
                <div className={styles['header']}>
                  {/* Capitalize the TYPE one-key to present it as a headline */}
                  <div>{type.toUpperCase()}</div>
                  <div
                    className={styles['closeButton']}
                    onClick={() => setVisble(false)}
                  >
                    <CircleX
                      className={styles['icon']}
                      size={16}
                    />
                  </div>
                </div>
                <div className={styles['content']}>{content}</div>
                {footer && <div className={styles['footer']}>{footer}</div>}
              </div>
            </div>
          </div>
        }
      </>
    );
  },
);

Toast.displayName = 'Toast';
