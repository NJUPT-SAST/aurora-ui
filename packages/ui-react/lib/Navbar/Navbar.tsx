import classNames from 'classnames';
import React from 'react';
import styles from './Navbar.module.scss';

export interface NavbarProps {}

export const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(() => {
  const navbarClass = classNames(styles['navbar']);
  const mainClass = classNames(styles['base']);

  return (
    <div className={mainClass}>
      <div className={styles['title']}>SAST</div>
      <ul className={navbarClass}>
        <li>HOME</li>
        <li>ABOUT</li>
        <li>BLOG</li>
        <li>CONTACT</li>
      </ul>
    </div>
  );
});

Navbar.displayName = 'Navbar';
