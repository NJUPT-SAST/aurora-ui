import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Dialog, type DialogProps } from './Dialog';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  // tags: ['autodocs'],
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
    header: <span>考试已经结束</span>,
    mainContent: <span>请问您还需要提交吗</span>,
    footer: (
      <div style={{ display: 'flex', gap: 10, justifyContent: 'end' }}>
        <Button>确定</Button>
      </div>
    ),
  },
};
