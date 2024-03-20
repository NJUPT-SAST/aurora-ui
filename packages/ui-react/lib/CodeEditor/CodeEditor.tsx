import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import styles from './CodeEditor.module.scss';
import { Button, Card, Select, type OptionProps } from '..';

export interface CodeEditorProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  /**
   * width of the code area
   */
  width?: number;
  /**
   * height of the code area
   */
  height?: number;
  /**
   * languageList, the languageList of the code-Editor
   */
  languageList?: OptionProps[];
  /**
   * onchange , the onchange of the code-editor
   */
  onchange?: (language: OptionProps, content: string) => void;
  /**
   * defaultValue, the default value of the codeEditor
   */
  defaultValue?: string;
  /**
   * value, the value of the codeEditor
   */
  value?: string;
  /**
   * onLanguageChange, Callbacks when the selected language changes
   */
  onLanguageChange?: (value: string) => void;
  /**
   * onRefresh , the refresh button click callback
   */
  onRefresh?: () => void;
}

export const CodeEditor = React.forwardRef<HTMLDivElement, CodeEditorProps>(
  (
    {
      width = 400,
      height = 500,
      onRefresh,
      languageList = [
        { value: 'c', label: 'C', key: 3 },
        { value: 'javascript', label: 'JavaScript', key: 5 },
        { value: 'java', label: 'Java', key: 7 },
      ],
      defaultValue = `/**
      * Definition for a binary tree node.
      * struct TreeNode {
      *     int val;
      *     struct TreeNode *left;
      *     struct TreeNode *right;
      * };
      */
     /**
      * Note: The returned array must be malloced, assume caller calls free().
      */
     int* preorderTraversal(struct TreeNode* root, int* returnSize) {
         
     }`,
      value,
      onchange,
      onLanguageChange,
      ...rest
    },
    ref,
  ) => {
    const [selectLanguage, setSelectLanguage] = useState<string | undefined>();
    const [content, setContent] = useState<string | undefined>(defaultValue);

    useEffect(() => {
      value && setContent(value);
    }, [value]);

    const handleSelect = (value: OptionProps) => {
      const newSelectLanguage = languageList.find((item) => item.key === value.key);
      setSelectLanguage(newSelectLanguage?.value);
    };

    const handleCodeContent = (value: string | undefined) => {
      setContent(value);
    };

    useEffect(() => {
      const selectItem = languageList.find((item) => item.value === selectLanguage);
      selectItem && content && onchange && onchange(selectItem, content);
    }, [content, selectLanguage, onchange, languageList]);

    useEffect(() => {
      onLanguageChange && selectLanguage && onLanguageChange(selectLanguage);
    }, [selectLanguage, onLanguageChange]);

    const handleRefresh = () => {
      setContent(defaultValue);
      onRefresh && onRefresh();
    };

    return (
      <>
        <div
          {...rest}
          ref={ref}
        >
          <Card
            gap={0}
            padding={0}
            className={styles['base']}
            style={{ width: `${width}px`, height: `${height}px` }}
            header={
              <>
                <div className={styles['header-container']}>
                  <svg
                    viewBox="0 0 640 512"
                    width={14}
                  >
                    <path d="M399.1 1.1c-12.7-3.9-26.1 3.1-30 15.8l-144 464c-3.9 12.7 3.1 26.1 15.8 30s26.1-3.1 30-15.8l144-464c3.9-12.7-3.1-26.1-15.8-30zm71.4 118.5c-9.1 9.7-8.6 24.9 1.1 33.9L580.9 256 471.6 358.5c-9.7 9.1-10.2 24.3-1.1 33.9s24.3 10.2 33.9 1.1l128-120c4.8-4.5 7.6-10.9 7.6-17.5s-2.7-13-7.6-17.5l-128-120c-9.7-9.1-24.9-8.6-33.9 1.1zm-301 0c-9.1-9.7-24.3-10.2-33.9-1.1l-128 120C2.7 243 0 249.4 0 256s2.7 13 7.6 17.5l128 120c9.7 9.1 24.9 8.6 33.9-1.1s8.6-24.9-1.1-33.9L59.1 256 168.4 153.5c9.7-9.1 10.2-24.3 1.1-33.9z"></path>
                  </svg>
                  <span>Code</span>
                </div>
              </>
            }
            mainContent={
              <>
                <div className={styles['select-container']}>
                  <Select
                    isBorder={false}
                    width={150}
                    title="Choose Language"
                    optionsList={languageList}
                    defaultSelectKey={languageList[0]?.key}
                    onchange={handleSelect}
                  ></Select>
                  <Button
                    color="ghost"
                    className={styles['refresh-button']}
                    onClick={handleRefresh}
                  >
                    <svg
                      viewBox="0 0 512 512"
                      width={14}
                    >
                      <path d="M40 224c-13.3 0-24-10.7-24-24V56c0-13.3 10.7-24 24-24s24 10.7 24 24v80.1l20-23.5C125 63.4 186.9 32 256 32c123.7 0 224 100.3 224 224s-100.3 224-224 224c-50.4 0-97-16.7-134.4-44.8c-10.6-8-12.7-23-4.8-33.6s23-12.7 33.6-4.8C179.8 418.9 216.3 432 256 432c97.2 0 176-78.8 176-176s-78.8-176-176-176c-54.3 0-102.9 24.6-135.2 63.4l-.1 .2 0 0L93.1 176H184c13.3 0 24 10.7 24 24s-10.7 24-24 24H40z"></path>
                    </svg>
                  </Button>
                </div>
                <div className={styles['divider']}></div>
                <div
                  className={styles['editor-container']}
                  id="editor"
                >
                  <Editor
                    onChange={handleCodeContent}
                    defaultLanguage={languageList[0]?.value}
                    language={selectLanguage}
                    value={content}
                  />
                </div>
              </>
            }
            footer={<></>}
          ></Card>
        </div>
      </>
    );
  },
);

CodeEditor.displayName = 'CodeEditor';
