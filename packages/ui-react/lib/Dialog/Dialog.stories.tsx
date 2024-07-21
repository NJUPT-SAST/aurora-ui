import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Dialog, type DialogProps } from './Dialog';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: DialogProps = {
  size: 'medium',
  visible: true,
};

export const DefaultDialog: Story = {
  args: {
    ...defaultProps,
  },
};

export const ExampleDialog: Story = {
  args: {
    ...defaultProps,
    size: 'medium',
    header: <h3>考试已经结束</h3>,
    content: <div style={{ marginBottom: '30px' }}>现在提交不再生效, 请问您还需要提交吗</div>,
  },
};
