import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Input, type InputProps } from './Input';

const test = (value: string) => {
  console.log('change input value', value);
};

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      options: ['text', 'password'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: InputProps = {
  width: 250,
  disabled: false,
  onchange: test,
  defaultValue: 'hello world!',
  isBorder: true,
  className: 'test',
};

export const DefaultInput: Story = {
  args: {
    ...defaultProps,
  },
};

export const ExampleInput: Story = {
  args: {
    ...defaultProps,
    label: <button>userName</button>,
    placeholder: 'hello',
  },
};
