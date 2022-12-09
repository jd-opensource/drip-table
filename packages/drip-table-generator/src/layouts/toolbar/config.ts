import { DripTableGeneratorContext } from '@/context';

export const themeList: { value: string; label: string; style: Partial<DripTableGeneratorContext['globalConfigs']>; image: string }[] = [
  {
    value: 'default',
    label: '默认主题',
    style: {
      innerStyle: {
        borderWidth: '1px',
        borderColor: '#ff0',
      },
    },
    image: 'https://img13.360buyimg.com/imagetools/jfs/t1/191238/14/31485/7337/63930326Eea63cce5/1256bf0ea55740d2.png',
  },
  {
    value: 'radius',
    label: '圆角主题',
    style: {
      innerStyle: {
        borderColor: '#ffffff',
      },
      headerStyle: {
        marginBottom: '12px',
        backgroundColor: '#f60',
        borderRadius: '6px',
      },
      headerCellStyle: {
        borderWidth: '0px',
        padding: '2px 6px',
        backgroundColor: '#fff6f0',
      },
      rowGap: 12,
      rowRadius: 6,
      rowStyle: {
        boxShadow: '#2c2c2c 0 4px 8px -4px',
      },
      rowHoverStyle: {
        backgroundColor: '#9e9e90',
      },
      tableCellStyle: {
        backgroundColor: '#6e6e60',
        borderColor: '#6e6e60',
      },
    },
    image: 'https://img10.360buyimg.com/imagetools/jfs/t1/55534/27/22905/8130/63930326E957cee9c/dbd33844cab3fa9d.png',
  },
];
