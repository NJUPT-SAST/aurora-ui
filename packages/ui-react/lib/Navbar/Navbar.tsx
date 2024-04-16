import classNames from 'classnames';
import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  type HtmlHTMLAttributes,
  type ReactNode,
} from 'react';
import styles from './Navbar.module.scss';

export interface NavbarItemProps {
  itemKey: string;
  text?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export interface NavbarProps extends HtmlHTMLAttributes<HTMLDivElement> {
  /**
   * items, the items of the Navbar
   */
  items?: NavbarItemProps[];
  /**
   * className, the className of the navbar, 最外层元素的样式名
   */
  className?: string;
  /**
   * footer , the footer of the navbar
   */
  footer?: ReactNode;
  /**
   * header, the header of the navbar
   */
  header?: ReactNode;
  /**
   * mainContent, the mainContent of the header,If you don't want to use items and let us do the rendering, you can define your own mainContent as items
   */
  mainContent?: ReactNode;
  /**
   * defaultSelectedKey ,
   */
  defaultSelectedKey?: string;
  /**
   * selectedKey
   */
  selectedKey?: string;
  /**
   * onchange , callback the itemKey
   */
  onchange?: (value: string) => void;
}

export const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(
  (
    {
      className,
      items,
      footer,
      header,
      mainContent,
      defaultSelectedKey,
      selectedKey,
      onchange,
      ...rest
    },
    ref,
  ) => {
    const [selectItem, setSelectItem] = useState<string>('');
    const footerRef = useRef<HTMLDivElement>(null);
    const selectedItemRef = useRef<HTMLDivElement>(null);
    const mainClass = classNames(styles['base'], className);

    useEffect(() => {
      defaultSelectedKey && setSelectItem(defaultSelectedKey);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      itemMoveAnimation();
      onchange && onchange(selectItem);
    }, [selectItem, onchange]);

    const itemMoveAnimation = () => {
      const currentEle = selectedItemRef.current as HTMLDivElement;
      const width = currentEle?.offsetWidth;
      const offsetLeft = currentEle?.offsetLeft;
      const footerEle = footerRef.current as HTMLDivElement;
      footerEle.style.width = `${width}px`;
      footerEle.style.transform = `translateX(${offsetLeft + 1}px)`;
    };

    useEffect(() => {
      selectedKey && setSelectItem(selectedKey);
    }, [selectedKey]);

    return (
      <div
        className={mainClass}
        {...rest}
        ref={ref}
      >
        {header}
        <div className={styles['navbar-items-container']}>
          <div
            className={styles['footer']}
            ref={footerRef}
          />
          {!mainContent &&
            items?.map((item, index) => {
              const isLastItem = index === items.length - 1;
              return (
                <Fragment key={index}>
                  <div
                    className={`${styles['navbar-item']} ${selectItem === item.itemKey ? styles['select'] : ''}`}
                    id={item.itemKey}
                    ref={selectItem === item.itemKey ? selectedItemRef : undefined}
                    onClick={() => setSelectItem(item.itemKey)}
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                  {!isLastItem && <div className={styles['divider']} />}
                </Fragment>
              );
            })}
          {mainContent}
        </div>
        {footer}
      </div>
    );
  },
);

Navbar.displayName = 'Navbar';
