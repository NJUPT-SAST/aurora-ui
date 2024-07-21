import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';
import { RadioGroup, type RadioGroupProps } from './RadioGroup';

const handleRadioChange = (value: string | number | null) => {
  console.log('Selected value:', value);
};
const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: RadioGroupProps = {
  direction: 'vertical',
  defaultValue: 'nodejs',
  options: [
    { label: 'Nodejs', value: 'nodejs', color: 'danger', size: 'large' },
    { label: 'Vuejs', value: 'vuejs', color: 'warning' },
    { label: 'React', value: 'react', size: 'small' },
  ],
};

export const DefaultRadioGroup: Story = {
  args: {
    ...defaultProps,
  },
};

export const ExampleRadioGroup: Story = {
  args: {
    ...defaultProps,
    onChange: handleRadioChange,
    value: 'vuejs',
  },
};
