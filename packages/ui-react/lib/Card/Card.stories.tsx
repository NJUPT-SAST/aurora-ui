import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';
import { Card, type CardProps } from './Card';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
    shadow: {
      options: ['regular', 'small', 'medium', 'large', 'extraLarge', 'inner', 'none'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: CardProps = {
  heroImage: undefined,
  size: 'medium',
  shadow: 'medium',
};

export const DefaultCard: Story = {
  args: {
    ...defaultProps,
  },
};

export const ExampleCard: Story = {
  args: {
    ...defaultProps,
    shadow: 'none',
    header: (
      <>
        <h3 style={{ color: 'rgba(128, 128, 128)' }}>这是个副标题</h3>
        <h2>这是个标题</h2>
      </>
    ),
    content: (
      <>
        <div>
          这些是内容这些是内容这些是内容这些是内容这些是内容这些是内容这些是内容这些是内容这些是内容这些是内容这些是内容这些是内容这些是内容这些是内容这些是内容这些是内容这些是内容这些是内容这些是内容这些是内容这些是内容这些是内容这些是内容这些是内容这些是内容这些是内容
        </div>
      </>
    ),
    footer: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 20,
          marginTop: '30px',
          marginBottom: '10px',
        }}
      >
        <Button color="danger">取消</Button>
        <Button>确定</Button>
      </div>
    ),
  },
};

export const ImageCard: Story = {
  args: {
    ...defaultProps,
    heroImage: '../../public/file cover - 1.png',
    header: <h1 style={{ textAlign: 'end', marginRight: '5px' }}>这是个带图片的卡片</h1>,
    size: 'small',
    shadow: 'none',
    style: { padding: '10px' },
    heroImageClassName: 'nihao',
  },
};
