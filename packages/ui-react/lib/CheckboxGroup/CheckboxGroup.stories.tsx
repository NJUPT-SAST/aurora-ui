import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { CheckboxGroup, type CheckboxGroupProps } from './CheckboxGroup';

const test = (value: string[]) => {
  console.log('selectValue', value);
};

const meta = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CheckboxGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: CheckboxGroupProps = {
  options: [
    { label: 'nodejs', key: 1, value: 'node' },
    { label: 'nestjs', key: 2, value: 'nest' },
    { label: 'nextjs', key: 3, value: 'next' },
  ],
  direction: 'column',
};

export const DefaultCheckboxGroup: Story = {
  args: {
    ...defaultProps,
    onChange: test,
  },
};

export const ExampleCheckboxGroup: Story = {
  args: {
    ...defaultProps,
  },
};
