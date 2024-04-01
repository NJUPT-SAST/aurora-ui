import classNames from 'classnames';
import React, { Fragment, useRef, useState, type HtmlHTMLAttributes, type ReactNode } from 'react';
import styles from './Navbar.module.scss';
import logoSvg from '../assets/Logo.svg';

export interface NavbarItemProps {
  itemKey?: string;
  text?: string;
  icon?: ReactNode;
  //
  onClick?: () => void;
}

export interface NavbarProps extends HtmlHTMLAttributes<HTMLDivElement> {
  /**
   * items, the items of the Navbar
   */
  items?: NavbarItemProps[];
  /**
   * logo , the logo of the header
   */
  // log
}

export const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(() => {
  const [selectItem, setSelectItem] = useState<string>('Home');
  const footerRef = useRef<HTMLDivElement>(null);

  const mainClass = classNames(styles['base']);

  const items = [
    {
      itemKey: 'Home',
      text: '首页',
      icon: (
        <svg
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
        >
          <path d="M549.61981 133.022476l319.683047 203.605334A70.851048 70.851048 0 0 1 902.095238 396.361143v434.883047A70.89981 70.89981 0 0 1 831.146667 902.095238h-282.819048l0.024381-218.112h-71.826286v218.087619L192.853333 902.095238A70.89981 70.89981 0 0 1 121.904762 831.24419V390.241524c0-24.527238 12.678095-47.299048 33.54819-60.220953l318.659048-197.485714a70.972952 70.972952 0 0 1 75.50781 0.487619zM828.952381 828.952381V397.214476L511.488 195.047619 195.047619 391.119238V828.952381h211.309714v-216.551619h212.187429v216.527238L828.952381 828.952381z"></path>
        </svg>
      ),
    },
    {
      itemKey: 'Library',
      text: '题库题库',
      icon: (
        <svg
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
        >
          <path d="M414.47619 121.904762a73.142857 73.142857 0 0 1 73.142858 73.142857v292.571429H195.047619a73.142857 73.142857 0 0 1-73.142857-73.142858V195.047619a73.142857 73.142857 0 0 1 73.142857-73.142857h219.428571z m0 73.142857H195.047619v219.428571h219.428571V195.047619z m73.142858 341.333333v292.571429a73.142857 73.142857 0 0 1-73.142858 73.142857H195.047619a73.142857 73.142857 0 0 1-73.142857-73.142857v-219.428571a73.142857 73.142857 0 0 1 73.142857-73.142858h292.571429zM195.047619 609.52381v219.428571h219.428571v-219.428571H195.047619zM719.238095 121.904762a182.857143 182.857143 0 1 1 0 365.714286 182.857143 182.857143 0 0 1 0-365.714286z m0 73.142857a109.714286 109.714286 0 1 0 0 219.428571 109.714286 109.714286 0 0 0 0-219.428571zM828.952381 536.380952a73.142857 73.142857 0 0 1 73.142857 73.142858v219.428571a73.142857 73.142857 0 0 1-73.142857 73.142857h-219.428571a73.142857 73.142857 0 0 1-73.142858-73.142857V536.380952h292.571429z m-219.428571 292.571429h219.428571v-219.428571h-219.428571v219.428571z"></path>
        </svg>
      ),
    },
    {
      itemKey: 'Rank',
      text: '排名',
      icon: (
        <svg
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
        >
          <path d="M512 292.571429c175.055238 0 316.952381 141.897143 316.952381 316.952381s-141.897143 316.952381-316.952381 316.95238S195.047619 784.579048 195.047619 609.52381s141.897143-316.952381 316.952381-316.952381z m0 73.142857c-134.656 0-243.809524 109.153524-243.809524 243.809524s109.153524 243.809524 243.809524 243.809523 243.809524-109.153524 243.809524-243.809523-109.153524-243.809524-243.809524-243.809524z m0 73.142857a170.666667 170.666667 0 1 1 0 341.333333 170.666667 170.666667 0 0 1 0-341.333333z m0 73.142857a97.52381 97.52381 0 1 0 0 195.047619 97.52381 97.52381 0 0 0 0-195.047619zM768 109.714286a73.142857 73.142857 0 0 1 73.142857 73.142857v124.854857l-59.489524 59.489524-51.687619-51.736381 38.034286-38.034286V182.857143h-97.52381V243.809524h-73.142857V182.857143h-170.666666V243.809524h-73.142857V182.857143h-97.52381v94.573714l38.034286 38.034286-51.687619 51.736381-59.489524-59.489524V182.857143a73.142857 73.142857 0 0 1 73.142857-73.142857h512z"></path>
        </svg>
      ),
    },
  ];

  const handleSelect = (e: React.MouseEvent<HTMLDivElement>, key: string) => {
    const element = e.currentTarget;
    const width = element.offsetWidth;
    const offsetLeft = element.offsetLeft;

    const footerEle = footerRef.current as HTMLDivElement;
    footerEle.style.width = `${width}px`;
    footerEle.style.transform = `translateX(${offsetLeft + 2}px)`;

    setSelectItem(key);
  };

  return (
    <div style={{ height: '768px', width: '1024px', backgroundColor: '#f1f1f1' }}>
      <div className={mainClass}>
        <img
          src={logoSvg}
          alt="Logo"
          height={36}
        />
        <div className={styles['navbar-items-container']}>
          <div
            className={styles['footer']}
            ref={footerRef}
          />
          {items.map((item, index) => {
            const isLastItem = index === items.length - 1;
            return (
              <Fragment key={index}>
                <div
                  className={`${styles['navbar-item']} ${selectItem === item.itemKey ? styles['select'] : ''}`}
                  id={item.itemKey}
                  onClick={(e) => handleSelect(e, item.itemKey)}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </div>
                {!isLastItem && <div className={styles['divider']} />}
              </Fragment>
            );
          })}
        </div>
        <div>hello</div>
      </div>
    </div>
  );
});

Navbar.displayName = 'Navbar';
