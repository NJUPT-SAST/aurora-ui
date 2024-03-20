import React, { useState } from 'react';
import styles from './Accordion.module.scss';
import classnames from 'classnames';

export interface AccordionProps {
  /**
   * the width of the Accordion
   */
  width?: number;
  /**
   * If `true`, the Accordion will be disabled.
   */
  disabled?: boolean;
  /**
   * the AccordionTrigger of the Accordion
   */
  accordionTrigger: React.ReactNode;
  /**
   * the accordionContent of the Accordion
   */
  accordionContent: React.ReactNode;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ disabled = false, accordionTrigger, accordionContent, width = 280, ...rest }, ref) => {
    const accordionClass = classnames(styles['base']);
    const [visible, setVisble] = useState<boolean>(false);
    return (
      <div
        style={{ width: width }}
        ref={ref}
        className={`${accordionClass}  ${visible ? styles['show'] : ''}`}
        {...rest}
      >
        <button
          className={`${styles['accordionTrigger']} ${disabled ? styles['disabled'] : ''}`}
          onClick={() => setVisble(!visible)}
          disabled={disabled}
        >
          <div> {accordionTrigger}</div>
          <svg
            width={15}
            height={15}
            className={`${styles['icon']} ${visible ? styles['rotate'] : ''}`}
          >
            <path
              d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className={styles['accordionContentWrap']}>
          <div className={`${styles['inner']} ${visible ? styles['show'] : ''}`}>
            {accordionContent}
          </div>
        </div>
        <div className={styles['divider']}></div>
      </div>
    );
  },
);

Accordion.displayName = 'Accordion';
