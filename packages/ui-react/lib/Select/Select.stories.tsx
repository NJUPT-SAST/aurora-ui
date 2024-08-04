import type { Meta, StoryObj } from '@storybook/react';

import { OptionProps, Select, type SelectProps } from './Select';

const test = (option: OptionProps) => {
  console.log('selectOption', option);
};

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: SelectProps = {};

export const DefaultSelect: Story = {
  args: {
    ...defaultProps,
  },
};

export const DisabledSelect: Story = {
  args: {
    ...defaultProps,
  },
};
