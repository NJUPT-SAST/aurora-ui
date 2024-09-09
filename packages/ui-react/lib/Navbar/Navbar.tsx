import classNames from 'classnames';
import React, { useCallback, useState, type HtmlHTMLAttributes, type ReactNode } from 'react';
import styles from './Navbar.module.scss';

export interface NavbarItemProps {
  navbarItemKey: string;
  navbarItemContent?: ReactNode;
  navbarItemIcon?: ReactNode;
  onClick?: () => void;
}

export interface NavbarProps
  extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'content' | 'onChange'> {
  /**
   * items, the items of the Navbar
   */
  contentItems?: NavbarItemProps[];
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
  content?: ReactNode;
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
  onChange?: (value: string) => void;
  /**
   * headerClassName
   */
  headerClassName?: string;
  /**
   * footerClassName
   */
  footerClassName?: string;
}

export const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(
  (
    {
      className,
      contentItems = [],
      footer,
      header,
      content,
      defaultSelectedKey,
      selectedKey,
      onChange,
      headerClassName,
      footerClassName,
      ...rest
    },
    ref,
  ) => {
    const navbarClass = classNames(styles['base'], className);
    const [selectItemKey, setSelectItemKey] = useState<string>(defaultSelectedKey ?? '');

    const handleClickItem = useCallback((contentItem: NavbarItemProps) => {
      contentItem.onClick && contentItem.onClick();
      onChange && onChange(contentItem.navbarItemKey);
      setSelectItemKey(contentItem.navbarItemKey);
    }, []);

    return (
      <div
        className={navbarClass}
        {...rest}
        ref={ref}
      >
        <div className={classNames(styles['header-container'], headerClassName)}>{header}</div>
        {contentItems.length > 0 && (
          <div className={styles['navbar-items-container']}>
            {contentItems.map((contentItem) => (
              <div
                onClick={() => handleClickItem(contentItem)}
                className={classNames(
                  styles['navbar-item-container'],
                  (selectedKey ?? selectItemKey) === contentItem.navbarItemKey
                    ? styles['select-item']
                    : '',
                )}
                key={contentItem.navbarItemKey}
              >
                {contentItem.navbarItemIcon}
                {contentItem.navbarItemContent}
              </div>
            ))}
          </div>
        )}
        {content}
        <div className={classNames(styles['footer-container'], footerClassName)}>{footer}</div>
      </div>
    );
  },
);

Navbar.displayName = 'Navbar';
