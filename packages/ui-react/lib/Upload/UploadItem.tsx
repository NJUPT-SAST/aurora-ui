import type React from 'react';
import styles from './Upload.module.scss';
import { Button } from '..';
import { useEffect, useState } from 'react';
import { File } from 'lucide-react';

export interface UploadItemProps {
  /**
   * the name of this file
   */
  name: string;
  /**
   * the size of this file
   */
  size: number;
  /**
   * file
   */
  file: File;
  /**
   * deleteCurrentFile
   */
  deleteCurrentFile: (value: File) => void;
}
export const UploadItem: React.FC<UploadItemProps> = ({ name, size, file, deleteCurrentFile }) => {
  //将文件大小转换为最适合单位
  const [fileSize, setFileSize] = useState<string | undefined>(undefined);

  function formatFileSize(fileSize: number): string {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;

    while (fileSize >= 1024 && unitIndex < units.length - 1) {
      fileSize /= 1024;
      unitIndex++;
    }

    return `${fileSize.toFixed(2)} ${units[unitIndex]}`;
  }

  useEffect(() => {
    setFileSize(formatFileSize(size));
  }, [size]);

  return (
    <div className={styles['upload-item']}>
      {/* <svg
        className={styles['file-svg']}
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M128 128C128 57.4 185.4 0 256 0h320v256c0 35.4 28.6 64 64 64h256v576c0 70.6-57.4 128-128 128H256c-70.6 0-128-57.4-128-128V128z m768 128H640V0l256 256z"></path>
      </svg> */}
      <File
        className={styles['file-svg']}
        color="#808080"
      />
      <div className={styles['file-information']}>
        <span className={styles['name']}>{name}</span>
        <span className={styles['size']}>{fileSize}</span>
      </div>
      <Button
        color="ghost"
        className={styles['delete-svg-container']}
        size="small"
        onClick={() => deleteCurrentFile(file)}
      >
        <svg
          className="icon"
          viewBox="0 0 1024 1024"
          width="13"
          fill="#808080"
        >
          <path d="M925.468404 822.294069 622.19831 512.00614l303.311027-310.331931c34.682917-27.842115 38.299281-75.80243 8.121981-107.216907-30.135344-31.369452-82.733283-34.259268-117.408013-6.463202L512.000512 399.25724 207.776695 87.993077c-34.675754-27.796066-87.272669-24.90625-117.408013 6.463202-30.178323 31.414477-26.560936 79.375815 8.121981 107.216907l303.311027 310.331931L98.531596 822.294069c-34.724873 27.820626-38.341237 75.846432-8.117888 107.195418 30.135344 31.43699 82.72919 34.326806 117.408013 6.485715l304.178791-311.219137 304.177767 311.219137c34.678824 27.841092 87.271646 24.951275 117.408013-6.485715C963.808618 898.140501 960.146205 850.113671 925.468404 822.294069z"></path>
        </svg>
      </Button>
    </div>
  );
};
