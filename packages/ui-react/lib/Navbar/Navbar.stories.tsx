import '../typings/svg.d.ts';
/// <reference path="../typings/svg.d.ts" />
import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Navbar, type NavbarProps } from './Navbar';
import logoSvg from '../assets/Logo.svg';
import { Home, LayoutList } from 'lucide-react';

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
    style: {
      width: '1000px',
    },
    contentItems: [
      {
        navbarItemKey: 'Home',
        navbarItemContent: 'Home',
        navbarItemIcon: <Home />,
      },
      {
        navbarItemKey: 'Library',
        navbarItemContent: 'Library',
        navbarItemIcon: <LayoutList />,
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
    defaultSelectedKey: 'Home',
    onChange: test,
  },
};

export const ExampleNavbar: Story = {
  args: {
    ...defaultProps,
    defaultSelectedKey: 'Home',
  },
};
