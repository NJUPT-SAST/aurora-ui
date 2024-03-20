import type { Meta, StoryObj } from '@storybook/react';

import { Button, type ButtonProps } from './Button';
import { showToast } from '..';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      options: ['primary', 'secondary', 'ghost', 'danger', 'border'],
      control: { type: 'select' },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
    shadow: {
      options: ['regular', 'small', 'medium', 'large', 'extraLarge', 'inner', 'none'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: ButtonProps = {
  color: 'primary',
  size: 'medium',
  disabledShadow: true,
};

export const DefaultButton: Story = {
  args: {
    ...defaultProps,
    children: 'Click Me!',
  },
};

export const DisabledButton: Story = {
  args: {
    ...defaultProps,
    children: 'Click Me!',
    disabled: true,
  },
};

export const ShowToastButton: Story = {
  args: {
    ...defaultProps,
    children: 'Click Me!',
    onClick: () => showToast({ type: 'error' }),
  },
};
