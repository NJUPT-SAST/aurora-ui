import React, { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import styles from './Table.module.scss';
import { Pagination } from '..';

export interface column {
  /**
   * title , the title of the column
   */
  title?: string;
  /**
   * dataIndex, the dataIndex of the column
   */
  dataIndex?: string;
  /**
   * width, the width of the column
   */
  width?: number;
  /**
   * render, the render of the column
   */
  render?: (title?: string, dataIndex?: string) => ReactNode;
}

export interface dataItem {
  /**
   * key , the key of the dataItem
   */
  key?: string;

  /**
   * other property
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [property: string]: any;
}

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /**
   * the caption of the Table
   */
  caption?: ReactNode;
  /**
   * style , the style of the table
   */
  style?: CSSProperties;
  /**
   * columns, the column of the table
   */
  columns: column[];
  /**
   * dataSource
   */
  dataSource: dataItem[];
  /**
   * pageSize: number
   */
  pageSize: number;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ caption, style, columns, dataSource, pageSize = 8, ...rest }, ref) => {
    const [page, setPage] = useState<number>(1);
    const [showData, setShowData] = useState<dataItem[]>([]);

    useEffect(() => {
      const newShowData = dataSource.slice((page - 1) * pageSize, page * pageSize);
      setShowData(newShowData);
    }, [page, pageSize, dataSource]);
    return (
      <>
        <table
          className={styles['table']}
          style={style}
          ref={ref}
          {...rest}
        >
          <caption className={styles['caption']}>{caption}</caption>
          <thead className={styles['thead']}>
            <tr>
              {columns?.map((item: column) => {
                return (
                  <th
                    key={item.dataIndex}
                    style={{ width: `${item?.width}px` }}
                  >
                    {item.render && item.render(item.title, item.dataIndex)}
                    {!item.render && item.title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={styles['tbody']}>
            {showData.map((dataItem) => (
              <tr key={dataItem.key}>
                {columns?.map((column) => (
                  <td key={column.dataIndex}>{dataItem[`${column.dataIndex}`]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles['pagination']}>
          <Pagination
            total={dataSource?.length}
            pageSize={pageSize}
            onChange={(value) => setPage(value)}
          />
        </div>
      </>
    );
  },
);

Table.displayName = 'Table';
