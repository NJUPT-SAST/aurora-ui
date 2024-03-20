import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { DatePicker, type DatePickerProps } from './DatePicker';

const test = (value: Date) => {
  console.log('selectDate', value);
};

function generateRandomDate() {
  const startTimestamp = new Date(2000, 0, 1).getTime(); // 开始日期的时间戳，这里设置为2000年1月1日
  const endTimestamp = new Date().getTime(); // 当前日期的时间戳，作为结束日期

  const randomTimestamp = Math.random() * (endTimestamp - startTimestamp) + startTimestamp;
  const randomDate = new Date(randomTimestamp);

  return randomDate;
}

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: DatePickerProps = {
  onchange: test,
};

export const DefaultDatePicker: Story = {
  args: {
    ...defaultProps,
  },
};

export const RandomDefaultDatePicker: Story = {
  args: {
    ...defaultProps,
    defaultPickDate: new Date(),
  },
};

export const RandomDatePicker: Story = {
  args: {
    pickDate: generateRandomDate(),
  },
};
