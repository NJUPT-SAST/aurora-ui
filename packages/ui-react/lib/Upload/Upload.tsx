import React, { type ChangeEventHandler } from 'react';
import styles from './Upload.module.scss';
import { Button } from '..';

export interface UploadProps {}

export const Upload = React.forwardRef<HTMLInputElement, UploadProps>(() => {
  const handleFilesInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const fileInput = e.target as HTMLInputElement;
    const files = fileInput.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        console.log(files[i]);
      }
    }
  };
  return (
    <Button
      color="ghost"
      className={styles['upload-container']}
      shadow="regular"
    >
      <input
        type="file"
        className={styles['file-input']}
        id="input"
        onChange={handleFilesInput}
        multiple
      />
      <label
        className={styles['upload-label']}
        htmlFor="input"
      >
        Upload
      </label>
    </Button>
  );
});

Upload.displayName = 'Upload';
