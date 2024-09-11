import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';
import { Sheet, type SheetProps } from './Sheet';

const meta = {
  title: 'Components/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
  },
  // tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: SheetProps = {
  visible: false,
  sheetTitle: '这是一个基本的sheet 🪗',
};

export const DefaultSheet: Story = {
  args: {
    ...defaultProps,
  },
};

export const ExampleSheet: Story = {
  args: {
    ...defaultProps,
  },
};
