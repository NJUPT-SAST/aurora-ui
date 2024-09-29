import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Carousel, type CarouselProps } from './Carousel';

const test = (value: number) => {
  console.log('select number', value);
};

const styles = {
  width: '290px',
  height: '290px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  fontSize: '40px',
  fontWeight: '1000',
  boxShadow: '0px 1px 3px #e3e3e6',
};

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: CarouselProps = {};

export const DefaultCarousel: Story = {
  args: {
    ...defaultProps,
    selectedIndex: 1,
    width: 300,
    height: 300,
    carouselItems: [
      { children: <div style={styles}>1</div> },
      { children: <div style={styles}>2</div> },
      { children: <div style={styles}>3</div> },
      { children: <div style={styles}>4</div> },
      { children: <div style={styles}>5</div> },
    ],
    onChange: test,
    defaultSelectedIndex: 2,
    className: 'test',
    style:{
      width:'500px',
      height:'500px'
    }
  },
};

export const ExampleCarousel: Story = {
  args: {
    ...defaultProps,
    carouselItems: [
      { children: <div>1</div> },
      { children: <div>2</div> },
      { children: <div>3</div> },
      { children: <div>4</div> },
      { children: <div>5</div> },
    ],
  },
};
