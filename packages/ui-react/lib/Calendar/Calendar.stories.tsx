import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Calendar, type CalendarProps } from './Calendar';

const test = (value: Date) => {
  console.log('select date', value);
};

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: CalendarProps = {
  onChange: test,
  defaultSelected: undefined,
};

export const DefaultCalendar: Story = {
  args: {
    ...defaultProps,
  },
};

export const ExampleCalendar: Story = {
  args: {
    ...defaultProps,
    onChange: test,
  },
};
