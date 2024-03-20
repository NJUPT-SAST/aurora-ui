import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Checkbox, type CheckboxProps } from './Checkbox';

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
  label: 'SAST',
  disabled: false,
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
