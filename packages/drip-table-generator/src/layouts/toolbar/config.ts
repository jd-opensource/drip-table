import React from 'react';

import { DripTableGeneratorContext } from '@/context';

export const themeList: { value: string; label: string | React.ReactNode; style: Partial<DripTableGeneratorContext['globalConfigs']>; image: string }[] = [
  {
    value: 'default',
    label: '默认主题',
    style: {
      bordered: true,
      innerStyle: {
        borderWidth: '1px',
        borderColor: '#ff0',
      },
      headerStyle: {},
      headerCellStyle: {},
      rowHoverStyle: {},
      tableCellStyle: {},
      rowHeader: {},
    },
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
      headerStyle: {},
      headerCellStyle: {
        backgroundColor: '#2c2c2c',
      },
      tableCellStyle: {
        backgroundColor: '#2c2c2c',
      },
      rowHeader: {},
    },
    image: 'https://img10.360buyimg.com/imagetools/jfs/t1/55534/27/22905/8130/63930326E957cee9c/dbd33844cab3fa9d.png',
  },
];
