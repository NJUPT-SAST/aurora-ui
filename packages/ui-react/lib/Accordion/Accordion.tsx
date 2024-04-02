import React, { useState } from 'react';
import styles from './Accordion.module.scss';
import classnames from 'classnames';
import { ChevronDown } from 'lucide-react';

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
          <ChevronDown
            size={15}
            className={`${styles['icon']} ${visible ? styles['rotate'] : ''}`}
          />
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
