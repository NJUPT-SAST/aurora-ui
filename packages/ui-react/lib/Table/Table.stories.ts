import type { Meta, StoryObj } from '@storybook/react';

import { Table, type TableProps } from './Table';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: TableProps = {
  pageSize: 3,
  columns: [
    {
      title: 'Title',
      dataIndex: 'name',
      width: 400,
    },
    { title: 'Size', dataIndex: 'size' },
    { title: 'Owner', dataIndex: 'owner', width: 150 },
    { title: 'Update-Time', dataIndex: 'time', width: 150 },
  ],
  dataSource: [
    {
      key: '1',
      name: 'Semi Design 设计稿.fig',
      size: '2M ',
      owner: '姜鹏志',
      time: 'hello',
    },
    {
      key: '2',
      name: 'Semi Design 分享演示文稿',
      size: '2M ',
      owner: '姜鹏志',
      time: '2020-02-02 05:12',
    },
    {
      key: '3',
      name: '设计文档',
      size: '2M ',
      owner: '姜鹏志',
      time: '2020-01-26 11:01',
    },
    {
      key: '4',
      name: 'Semi Design 2 设计稿.fig',
      size: '2M ',
      owner: '姜鹏志',
      time: '2020-02-02 05:18',
    },
    {
      key: '5',
      name: 'Semi Design 2 分享演示文稿',
      size: '2M ',
      owner: '姜鹏志',
      time: '2020-02-02 05:12',
    },
    {
      key: '6',
      name: '设计文档 2',
      size: '2M ',
      owner: '姜鹏志',
      time: '2020-01-26 11:01',
    },
  ],
};

export const DefaultTable: Story = {
  args: {
    ...defaultProps,
  },
};
