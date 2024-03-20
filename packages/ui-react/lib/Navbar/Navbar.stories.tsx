import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Navbar, type NavbarProps } from './Navbar';

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: NavbarProps = {};

export const DefaultNavbar: Story = {
  args: {
    ...defaultProps,
  },
};

export const ExampleNavbar: Story = {
  args: {
    ...defaultProps,
  },
};
