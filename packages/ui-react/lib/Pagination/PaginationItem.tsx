import { type ReactNode } from 'react';
import { Button } from '..';
import styles from './Pagination.module.scss';
import { useCurrentPageStore } from './useCurrentPageStore';

export interface PaginationItemProps {
  children?: ReactNode;
  disabled?: boolean;
  type: 'select' | 'add' | 'delete' | 'none';
  index?: number;
  activePage?: number;
}

export const PaginationItem = ({
  children,
  disabled = false,
  index,
  type,
  activePage,
}: PaginationItemProps) => {
  const [currentPage, increaseCurrentPage, decreaseCurrentPage, changeCurrentPage] =
    useCurrentPageStore((state) => [
      state.currentPage,
      state.increaseCurrentPage,
      state.decreaseCurrentPage,
      state.changeCurrentPage,
    ]);

  const handleClick = (type: 'select' | 'add' | 'delete' | 'none', index?: number) => {
    if (type === 'select' && index !== undefined) changeCurrentPage(index + 1);
    if (type === 'add') increaseCurrentPage();
    if (type === 'delete') decreaseCurrentPage();
  };

  return (
    <Button
      className={styles['pagination-item']}
      color={`${index !== undefined && (activePage || currentPage) === index + 1 ? 'primary' : 'border'}`}
      onClick={() => handleClick(type, index)}
      disabled={disabled}
      shadow="none"
    >
      {children}
    </Button>
  );
};
