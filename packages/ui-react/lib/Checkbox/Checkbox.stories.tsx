import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Checkbox, type CheckboxProps } from './Checkbox';

const test = (value) => {
  console.log(value);
};

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: CheckboxProps = {
  label: '你好 世界👋',
  disabled: false,
  onChecked: test,
};

export const DefaultCheckbox: Story = {
  args: {
    ...defaultProps,
  },
};

export const ExampleCheckbox: Story = {
  args: {
    ...defaultProps,
  },
};
