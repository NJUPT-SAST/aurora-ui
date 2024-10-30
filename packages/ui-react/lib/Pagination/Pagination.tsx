import React, { createContext, memo, useEffect, useState, type ReactNode } from 'react';
import styles from './Pagination.module.scss';
import classNames from 'classnames';
import { PaginationItem } from './PaginationItem';
import { useCurrentPageStore } from './useCurrentPageStore';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

export interface PaginationProps
  extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * the total of the number 一共的总条数
   */
  total: number;
  /**
   * the pageSize of the total 每页条数
   */
  pageSize: number;
  /**
   * the onchange of the Pagination
   */
  onChange?: (value: number) => void;
  /**
   * currentpage of the Pagination
   */
  activePage?: number;
  /**
   * defaultActivePage of the Pagination
   */
  defaultActivePage?: number;
  /**
   * disabled of the Pagination
   */
  disabled?: boolean;
}

export const PaginationStoreContext = createContext<
  { onChange?: (value: number) => void; activePage?: number } | undefined
>(undefined);

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      pageSize,
      total,
      onChange,
      activePage,
      defaultActivePage = 1,
      disabled = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const [itemList, setItemList] = useState<ReactNode[]>();
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [currentPage, changeCurrentPage] = useCurrentPageStore((state) => [
      state.currentPage,
      state.changeCurrentPage,
    ]);

    //default value must be assigned initially, and cannot be assigned later.
    useEffect(() => {
      changeCurrentPage(defaultActivePage);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const pageNumber = total / pageSize;
      //Returns the smallest integer greater than or equal to its numeric argument.
      setPageNumber(Math.ceil(pageNumber));
    }, [total, pageSize]);

    useEffect(() => {
      const newItems: ReactNode[] = [];
      //When the number of pages is less than or equal to 7, all are displayed without ellipses in between
      if (pageNumber <= 7)
        for (let i = 0; i < pageNumber; i++) {
          newItems.push(
            <PaginationItem
              type="select"
              key={i}
              index={i}
              disabled={disabled}
            >
              {i + 1}
            </PaginationItem>,
          );
        }
      else {
        // This is the omission of currentPage when there are too many numbers and the currentPage appears in the first Four.
        if (activePage ?? currentPage <= 3) {
          for (let i = 0; i < 4; i++) {
            newItems.push(
              <PaginationItem
                type="select"
                key={i}
                index={i}
                disabled={disabled}
              >
                {i + 1}
              </PaginationItem>,
            );
          }
          newItems.push(
            <PaginationItem
              type="none"
              key="more"
              disabled={disabled}
            >
              <span>...</span>
            </PaginationItem>,
          );
          for (let i = pageNumber - 3; i < pageNumber; i++) {
            newItems.push(
              <PaginationItem
                type="select"
                index={i}
                key={i}
                disabled={disabled}
              >
                {i + 1}
              </PaginationItem>,
            );
          }
        }
        // This is the case when currentPage is omitted in the last four occurrences.
        else if (activePage ?? currentPage >= pageNumber - 2) {
          for (let i = 0; i < 3; i++) {
            newItems.push(
              <PaginationItem
                type="select"
                index={i}
                key={i}
                disabled={disabled}
              >
                {i + 1}
              </PaginationItem>,
            );
          }
          newItems.push(
            <PaginationItem
              type="none"
              key="more"
              disabled={disabled}
            >
              <span>...</span>
            </PaginationItem>,
          );
          for (let i = pageNumber - 4; i < pageNumber; i++) {
            newItems.push(
              <PaginationItem
                type="select"
                index={i}
                key={i}
                disabled={disabled}
              >
                {i + 1}
              </PaginationItem>,
            );
          }
        }
        //This is what happens when currentPage appears in the middle of the omission
        else if ((activePage ?? currentPage) < pageNumber - 2 && (activePage ?? currentPage) > 3) {
          newItems.push(
            <PaginationItem
              type="select"
              index={0}
              key={1}
              disabled={disabled}
            >
              {1}
            </PaginationItem>,
          );
          newItems.push(
            <PaginationItem
              type="none"
              key="leftMore"
              disabled={disabled}
            >
              <span>...</span>
            </PaginationItem>,
          );
          for (let i = currentPage - 2; i < currentPage + 1; i++) {
            newItems.push(
              <PaginationItem
                type="select"
                index={i}
                key={i}
                disabled={disabled}
              >
                {i + 1}
              </PaginationItem>,
            );
          }
          newItems.push(
            <PaginationItem
              type="none"
              key="rightMore"
              disabled={disabled}
            >
              <span>...</span>
            </PaginationItem>,
          );
          newItems.push(
            <PaginationItem
              type="select"
              index={pageNumber - 1}
              disabled={disabled}
              key={pageNumber - 1}
            >
              {pageNumber}
            </PaginationItem>,
          );
        }
      }
      setItemList(newItems);
    }, [pageNumber, currentPage, disabled, activePage]);

    const PaginationClass = classNames(`${styles['base']} ${styles[disabled ? 'disabled' : '']}`);

    return (
      <div
        ref={ref}
        className={`${PaginationClass} ${className}`}
        {...rest}
      >
        <PaginationStoreContext.Provider value={{ onChange, activePage }}>
          <PaginationItem
            type="delete"
            disabled={currentPage === 1 || disabled}
            key={'delete'}
            className={styles['pagination-item-direction']}
          >
            <ChevronsLeft size={16} />
          </PaginationItem>
          {itemList}
          <PaginationItem
            type="add"
            disabled={currentPage === pageNumber || disabled}
            key={'add'}
            className={styles['pagination-item-direction']}
          >
            <ChevronsRight size={16} />
          </PaginationItem>
        </PaginationStoreContext.Provider>
      </div>
    );
  },
);

Pagination.displayName = 'Pagination';
