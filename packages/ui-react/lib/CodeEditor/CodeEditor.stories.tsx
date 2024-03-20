import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { CodeEditor, type CodeEditorProps } from './CodeEditor';
import { OptionProps } from '../Select';

const test = (Item: OptionProps, content: string) => {
  console.log('item', Item);
  console.log('content', content);
};

const testLanguage = (value: string) => {
  console.log('language', value);
};

const refreshTest = () => {
  console.log('hello');
};

const meta = {
  title: 'Components/CodeEditor',
  component: CodeEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CodeEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: CodeEditorProps = {
  width: 600,
  height: 700,
  languageList: [
    { value: 'c', label: 'C', key: 3 },
    { value: 'javascript', label: 'JavaScript', key: 5 },
    { value: 'java', label: 'Java', key: 7 },
  ],
  onchange: test,
  onLanguageChange: testLanguage,
  defaultValue: `/**
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
  onRefresh: refreshTest,
};

export const DefaultCodeEditor: Story = {
  args: {
    ...defaultProps,
  },
};

export const ExampleCodeEditor: Story = {
  args: {
    ...defaultProps,
  },
};
