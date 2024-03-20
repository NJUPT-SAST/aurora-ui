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

const defaultProps: SelectProps = {
  optionsList: [
    { value: 'nextjs', label: 'Nextjs', key: 1 },
    { value: 'nuxtjs', label: 'Nuxtjs', key: 2 },
    { value: 'nodejs', label: 'Nodejs', key: 3 },
    { value: 'vuejs', label: 'Vuejs', key: 5 },
    { value: 'react', label: 'React', key: 4 },
  ],
  onchange: test,
  disabled: false,
  isBorder: true,
  defaultSelectKey: 1,
  placeHolder: '',
};

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
