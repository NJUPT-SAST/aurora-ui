import React from 'react';
import styles from './Table.module.scss';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

export interface TheadProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TbodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TrProps extends React.HTMLAttributes<HTMLTableRowElement> {}

export interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}

export interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(({ ...rest }, ref) => {
  return (
    <table
      {...rest}
      ref={ref}
      className={styles['table']}
    />
  );
});

export const Thead = React.forwardRef<HTMLTableSectionElement, TheadProps>(({ ...rest }, ref) => {
  return (
    <thead
      {...rest}
      ref={ref}
      className={styles['thead']}
    />
  );
});

export const Tbody = React.forwardRef<HTMLTableSectionElement, TbodyProps>(({ ...rest }, ref) => {
  return (
    <tbody
      {...rest}
      ref={ref}
      className={styles['tbody']}
    />
  );
});

export const Tr = React.forwardRef<HTMLTableRowElement, TrProps>(({ ...rest }, ref) => {
  return (
    <tr
      {...rest}
      ref={ref}
      className={styles['tr']}
    />
  );
});

export const Th = React.forwardRef<HTMLTableCellElement, ThProps>(({ ...rest }, ref) => {
  return (
    <th
      {...rest}
      ref={ref}
      className={styles['th']}
    />
  );
});

export const Td = React.forwardRef<HTMLTableCellElement, ThProps>(({ ...rest }, ref) => {
  return (
    <td
      {...rest}
      ref={ref}
      className={styles['td']}
    />
  );
});

Table.displayName = 'Table';

Thead.displayName = 'Thead';

Tbody.displayName = 'Tbody';

Tr.displayName = 'Tr';

Th.displayName = 'Th';

Td.displayName = 'Td';
