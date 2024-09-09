import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Toast, type ToastProps } from './Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
    type: {
      options: ['info', 'success', 'warning', 'error'],
      control: { type: 'select' },
    },
    shadow: {
      options: ['regular', 'small', 'medium', 'large', 'extraLarge', 'inner', 'none'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: ToastProps = {
  size: 'medium',
  type: 'info',
};

export const DefaultToast: Story = {
  args: {
    ...defaultProps,
  },
};

export const ExampleToast: Story = {
  args: {
    ...defaultProps,
    type: 'error',
    content: <span>这里是新的内容 📚</span>,
  },
};
