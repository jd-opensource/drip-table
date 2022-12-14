import React from 'react';

import { DripTableGeneratorContext } from '@/context';

export const themeList: {
  value: string;
  label: string | React.ReactNode;
  style: Partial<DripTableGeneratorContext['globalConfigs']>;
  columnStyle?: (column: DripTableGeneratorContext['columns'][number], index: number) => Partial<DripTableGeneratorContext['columns'][number]>;
  image: string;
}[] = [
  {
    value: 'default',
    label: '默认主题',
    style: {
      bordered: true,
      innerStyle: {
        borderWidth: '1px',
        borderColor: '#ff0',
      },
      rowHeader: {},
    },
    columnStyle: (column, index) => ({
      title: typeof column.title === 'object'
        ? {
          body: column.title.body,
          style: {},
        }
        : column.title,
      style: {},
    }),
    image: 'https://img13.360buyimg.com/imagetools/jfs/t1/191238/14/31485/7337/63930326Eea63cce5/1256bf0ea55740d2.png',
  },
  {
    value: 'radius',
    label: '黑夜主题',
    style: {
      bordered: true,
      innerStyle: {
        color: '#ffffff',
      },
      rowHeader: {},
    },
    columnStyle: (column, index) => ({
      title: typeof column.title === 'string'
        ? {
          body: column.title,
          style: { border: '1px solid #2c2c2c', color: '#ffffff' },
        }
        : {
          ...column.title,
          style: { border: '1px solid #2c2c2c', color: '#ffffff' },
        },
      style: { border: '1px solid #2c2c2c' },
    }),
    image: 'https://img10.360buyimg.com/imagetools/jfs/t1/55534/27/22905/8130/63930326E957cee9c/dbd33844cab3fa9d.png',
  },
];
