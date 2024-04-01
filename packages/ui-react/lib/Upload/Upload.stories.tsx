import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Upload, type UploadProps } from './Upload';

const meta = {
  title: 'Components/Upload',
  component: Upload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Upload>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: UploadProps = {
  action: 'http://localhost:3333/upload',
};

export const DefaultUpload: Story = {
  args: {
    ...defaultProps,
  },
};

export const MultipleUpload: Story = {
  args: {
    ...defaultProps,
    multiple: true,
  },
};
