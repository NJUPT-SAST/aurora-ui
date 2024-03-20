import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Radio, type RadioProps } from './Radio';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: RadioProps = {
  size: 'medium',
  color: 'primary',
};

export const DefaultRadio: Story = {
  args: {
    ...defaultProps,
    children: 'hello',
  },
};

export const ExampleRadio: Story = {
  args: {
    ...defaultProps,
  },
};
