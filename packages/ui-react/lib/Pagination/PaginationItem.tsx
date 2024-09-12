import React, { memo, useCallback, useContext, useEffect, type ReactNode } from 'react';
import { Button, PaginiationStoreContext } from '..';
import styles from './Pagination.module.scss';
import { useCurrentPageStore } from './useCurrentPageStore';

export interface PaginationItemProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  disabled?: boolean;
  type: 'select' | 'add' | 'delete' | 'none';
  index?: number;
  className?: string;
}

export const PaginationItemImpl = ({
  children,
  disabled = false,
  index,
  type,
  className,
  ...rest
  // activePage,
}: PaginationItemProps) => {
  const [currentPage, increaseCurrentPage, decreaseCurrentPage, changeCurrentPage] =
    useCurrentPageStore((state) => [
      state.currentPage,
      state.increaseCurrentPage,
      state.decreaseCurrentPage,
      state.changeCurrentPage,
    ]);

  const paginationStoreContext = useContext(PaginiationStoreContext);

  const handleClick = useCallback((type: 'select' | 'add' | 'delete' | 'none', index?: number) => {
    const activePage = paginationStoreContext?.activePage!;

    if (type === 'select' && index !== undefined) {
      !activePage && changeCurrentPage(index + 1);
      paginationStoreContext && paginationStoreContext.onChange?.(index + 1);
    } else if (type === 'add') {
      !activePage && increaseCurrentPage();
      paginationStoreContext &&
        paginationStoreContext.onChange?.(activePage ? activePage + 1 : currentPage + 1);
    } else if (type === 'delete') {
      !activePage && decreaseCurrentPage();
      paginationStoreContext &&
        paginationStoreContext.onChange?.(activePage ? activePage + 1 : currentPage - 1);
    }
  }, []);

  return (
    <Button
      className={`${styles['pagination-item']} ${className}`}
      // @ts-ignore
      color={`${index !== undefined && (paginationStoreContext!.activePage ?? currentPage) === index + 1 ? 'primary' : 'border'}`}
      onClick={() => handleClick(type, index)}
      disabled={disabled}
      shadow="none"
      {...rest}
    >
      {children}
    </Button>
  );
};

export const PaginationItem = memo(PaginationItemImpl);
