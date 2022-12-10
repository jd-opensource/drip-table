import { DripTableGeneratorContext } from '@/context';

export const themeList: { value: string; label: string; style: Partial<DripTableGeneratorContext['globalConfigs']>; image: string }[] = [
  {
    value: 'default',
    label: '默认主题',
    style: {
      bordered: true,
      innerStyle: {
        borderWidth: '1px',
        borderColor: '#ff0',
      },
      headerStyle: void 0,
      headerCellStyle: void 0,
      rowGap: void 0,
      rowRadius: void 0,
      rowStyle: void 0,
      rowHoverStyle: void 0,
      tableCellStyle: void 0,
    },
    image: 'https://img13.360buyimg.com/imagetools/jfs/t1/191238/14/31485/7337/63930326Eea63cce5/1256bf0ea55740d2.png',
  },
  {
    value: 'radius',
    label: '圆角主题',
    style: {
      bordered: true,
      innerStyle: {
        borderRadius: '4px',
        borderWidth: '0px',
      },
      headerStyle: {
        marginBottom: '16px',
        borderRadius: '4px',
      },
      headerCellStyle: {
        borderWidth: '0px',
        padding: '12px 16px',
        backgroundColor: '#f6f7f9',
      },
      rowGap: 18,
      rowRadius: 4,
      rowStyle: {},
      rowHoverStyle: {},
      tableCellStyle: {
        borderTop: '1px solid #f0f1f4',
        borderColor: '#f0f1f4',
      },
    },
    image: 'https://img10.360buyimg.com/imagetools/jfs/t1/55534/27/22905/8130/63930326E957cee9c/dbd33844cab3fa9d.png',
  },
];
