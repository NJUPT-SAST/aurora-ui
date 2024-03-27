import React from 'react';
import styles from './Upload.module.scss';

export interface UploadProps {}

export const Upload = React.forwardRef<HTMLInputElement, UploadProps>(() => {
  return (
    <input
      type="file"
      className={styles['base']}
    />
  );
});

Upload.displayName = 'Upload';
