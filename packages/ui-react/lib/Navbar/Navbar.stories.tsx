import '../typings/svg.d.ts';
/// <reference path="../typings/svg.d.ts" />
import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Navbar, type NavbarProps } from './Navbar';
import logoSvg from '../assets/Logo.svg';
import { Home, LayoutList, Award } from 'lucide-react';

const test = (value: string) => {
  console.log(value);
};

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
    items: [
      {
        itemKey: 'Home',
        text: '首页',
        icon: <Home />,
      },
      {
        itemKey: 'Library',
        text: '题库题库',
        icon: <LayoutList />,
      },
      {
        itemKey: 'Rank',
        text: '排名',
        icon: <Award />,
      },
    ],
    footer: <>test</>,
    header: (
      <img
        src={logoSvg}
        alt="Logo"
        height={36}
      />
    ),
    defaultSelectedKey: 'Rank',
    selectedKey: 'Library',
    onchange: test,
  },
};

export const ExampleNavbar: Story = {
  args: {
    ...defaultProps,
    defaultSelectedKey: 'Home',
  },
};
