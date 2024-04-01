import React, { useEffect, useState, type CSSProperties, type ChangeEventHandler } from 'react';
import styles from './Upload.module.scss';
import { Button, Card } from '..';
import { UploadItem } from './UploadItem';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

export interface UploadProps extends React.HtmlHTMLAttributes<HTMLInputElement> {
  /**
   *	html Native attribute that accepts the type of file being uploaded.
      The value of accept is the MIME types string or file extension (.jpg, etc.) that you are allowed to select for the file
   */
  accept?: string;
  /**
   *File upload address, required
   */
  action: string;
  /**
   * classname: the classname of the upload
   */
  className?: string;
  /**
   * disabled
   */
  disabled?: boolean;
  /**
   * onChange
   */
  onchange?: (allFiles: File[], addNewFiles: File[]) => void;
  /**
   * Callback on upload errors
   */
  onerror?: (value: Error) => void;
  /**
   * onSuccess, Callback after successful upload
   */
  onsuccess?: (responseBody: object) => void;
  /**
   * Customized rendering of fileCard layout css style
   */
  fileCardsLayout?: CSSProperties;
  /**
   * the fetch header
   */
  headers?: HeadersInit;
  /**
   * method	,the method of the request
   */
  method?: string;
  /**
   * customRequests, Customizing the asynchronous request method used for uploads
   */
  customRequest?: () => void;
  /**
   * Whether to allow multiple files to be selected at once
   */
  multiple?: boolean;
  /**
   * formdate
   */
  formData?: FormData;
}

const customEase = [0.215, 0.61, 0.355, 1];

export const Upload = React.forwardRef<HTMLInputElement, UploadProps>(
  (
    {
      accept,
      action,
      className,
      disabled = false,
      onchange,
      onerror,
      onsuccess,
      fileCardsLayout,
      headers,
      method = 'post',
      customRequest,
      multiple = false,
      formData = new FormData(),
      ...rest
    },
    ref,
  ) => {
    const [uploadFiles, setUploadFiles] = useState<File[]>([]);
    const [addUploadFiles, setAddUploadFiles] = useState<File[]>([]);

    const handleFilesInput: ChangeEventHandler<HTMLInputElement> = (e) => {
      const fileInput = e.target as HTMLInputElement;
      const files: FileList | null = fileInput.files;
      console.log(fileInput.files);

      if (files) {
        // turn the fileList to files array
        const filesListArray = Array.from(files);
        setUploadFiles([...uploadFiles, ...filesListArray]);
        setAddUploadFiles([...filesListArray]);
      }
    };

    useEffect(() => {
      onchange && onchange(uploadFiles, addUploadFiles);
    }, [uploadFiles, onchange, addUploadFiles]);

    const handleUpload = (files: File[]) => {
      files[0] && formData.append('file', files[0]);
      fetch(action, {
        method: method,
        body: formData,
        headers: headers,
        mode: 'no-cors',
      })
        .then((res: object) => {
          console.log(res);
          onsuccess && onsuccess(res);
        })
        .catch((error: Error) => {
          console.error(error);
          onerror && onerror(error);
        });
    };

    useEffect(() => {
      for (let index = 0; index < addUploadFiles.length; index++) {
        customRequest ? customRequest() : handleUpload(addUploadFiles);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addUploadFiles, customRequest]);

    return (
      <div className={className}>
        <Button
          color="ghost"
          className={styles['upload-button']}
          shadow="regular"
          disabled={disabled}
        >
          <input
            type="file"
            className={styles['file-input']}
            id="input"
            onChange={handleFilesInput}
            multiple={multiple}
            accept={accept}
            ref={ref}
            {...rest}
            disabled={disabled}
          />
          <label
            className={`${styles['upload-label']} ${disabled ? styles['disabled-label'] : ''}`}
            htmlFor="input"
          >
            Upload
          </label>
        </Button>
        {uploadFiles.length !== 0 && (
          <div
            className={styles['upload-items-container']}
            style={fileCardsLayout}
          >
            <LayoutGroup>
              <AnimatePresence>
                {uploadFiles.map((file, index) => (
                  <motion.div
                    key={file.name}
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.4 }}
                    transition={{ duration: 0.2, ease: customEase }}
                    layout
                  >
                    <Card
                      id={`upload-item-${index}`}
                      className={styles['upload-item']}
                      mainContent={
                        <UploadItem
                          name={file.name}
                          size={file.size}
                          file={file}
                          deleteCurrentFile={(value: File) =>
                            setUploadFiles(uploadFiles.filter((file) => file !== value))
                          }
                        />
                      }
                      header={null}
                      footer={null}
                      padding={8}
                      width={300}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </LayoutGroup>
          </div>
        )}
      </div>
    );
  },
);

Upload.displayName = 'Upload';
