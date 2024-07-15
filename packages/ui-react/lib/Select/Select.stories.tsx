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
  },
};

export const DisabledSelect: Story = {
  args: {
    ...defaultProps,
  },
};
