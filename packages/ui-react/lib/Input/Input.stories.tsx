import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Input, type InputProps } from './Input';
import { User } from 'lucide-react';

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
  argTypes: {},
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: InputProps = {
  disabled: false,
  onChange: test,
  isBorder: true,
};

export const DefaultInput: Story = {
  args: {
    ...defaultProps,
  },
};

export const ExampleInput: Story = {
  args: {
    ...defaultProps,
    label: (
      <User
        height={18}
        width={18}
      />
    ),
    placeholder: 'hello',
  },
};
