import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { OptionProps, Select, type SelectProps } from './Select';
import { SquareMousePointer } from 'lucide-react';

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

const defaultProps: SelectProps = { optionsList: [] };

export const DefaultSelect: Story = {
  args: {
    ...defaultProps,
    onChange: test,
    optionsList: [
      {
        label: 'nodejs',
        value: 'nihao',
        key: 3,
      },
      {
        label: 'nextjs',
        value: 'nihao',
        key: 6,
      },

      {
        label: 'nuxtjs',
        value: 'nihao',
        key: 4,
      },
      {
        label: 'nestjs',
        value: 'nihao',
        key: 5,
      },
    ],
    className: 'test',
  },
};

export const DisabledSelect: Story = {
  args: {
    ...defaultProps,
    label: (
      <SquareMousePointer
        height={18}
        width={18}
      />
    ),
    optionsList: [
      {
        label: 'nodejs',
        value: 'nihao',
        key: 3,
      },
      {
        label: 'nextjs',
        value: 'nihao',
        key: 6,
      },

      {
        label: 'nuxtjs',
        value: 'nihao',
        key: 4,
      },
      {
        label: 'nestjs',
        value: 'nihao',
        key: 5,
      },
    ],

    disabled: true,
  },
};
