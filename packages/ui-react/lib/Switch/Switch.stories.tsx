import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Switch, type SwitchProps } from './Switch';

const test = (value: boolean) => {
  console.log(value);
};

const meta = {
  title: 'Components/Switch',
  component: Switch,
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
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: SwitchProps = {
  size: 'medium',
  defaultChecked: false,
  onChange: test,
  disabled: false,
};

export const DefaultSwitch: Story = {
  args: {
    ...defaultProps,
  },
};

export const ExampleSwitch: Story = {
  args: {
    ...defaultProps,
  },
};
