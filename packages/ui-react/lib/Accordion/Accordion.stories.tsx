import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Accordion, type AccordionProps } from './Accordion';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: AccordionProps = {
  accordionTrigger: <span>你好 👋</span>,
  accordionContent: <span>世界 🌍</span>,
  disabled: false,
  width: 300,
};

export const DefaultAccordion: Story = {
  args: {
    ...defaultProps,
  },
};

export const ExampleAccordion: Story = {
  args: {
    ...defaultProps,
    accordionTrigger: <span>知识基础知识竞赛</span>,
    accordionContent: (
      <>
        <Button>enter</Button>
      </>
    ),
  },
};
