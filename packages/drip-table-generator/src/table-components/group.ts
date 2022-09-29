import { DripTableComponentAttrConfig } from '../typing';
import { basicColumnAttrComponents } from './configs';

export default {
  $id: '$display_group',
  'ui:type': 'group',
  type: 'string',
  group: '容器组件',
  fieldKey: 'group_qywxDIIO',
  title: '组合组件',
  paramName: '',
  default: '',
  attrSchema: [
    ...basicColumnAttrComponents('组合组件'),
    {
      name: 'options.layout',
      group: '组件属性',
      required: true,
      'ui:title': '每行列数',
      'ui:type': 'select',
      'ui:props': {
        placeholder: '请输入每行列数，以逗号隔开',
        mode: 'tags',
        tokenSeparators: ['.', ',', '，'],
      },
      type: 'array',
      items: {
        type: 'number',
      },
      default: [1, 1],
      validate: (value: string[]): string => {
        if (Array.isArray(value) && value.length > 0) {
          let errorCount = 0;
          value.forEach((item) => {
            if (Number.isNaN(Number(item))) {
              errorCount += 1;
            }
          });
          if (errorCount > 0) { return '请输入正确的数字'; }
        }
        return '';
      },
    },
    {
      name: 'options.gutter',
      group: '组件属性',
      required: true,
      'ui:title': '栅格间隔',
      'ui:type': 'select',
      'ui:props': {
        placeholder: '请输入栅格间隔，以逗号隔开',
        mode: 'tags',
        tokenSeparators: ['.', ',', '，'],
      },
      type: 'array',
      items: {
        type: 'number',
      },
      default: void 0,
      validate: (value: string[]): string => {
        if (Array.isArray(value) && value.length > 0) {
          let errorCount = 0;
          value.forEach((item) => {
            if (Number.isNaN(Number(item))) {
              errorCount += 1;
            }
          });
          if (errorCount > 0) { return '请输入正确的数字'; }
        }
        if (value?.length > 2) { return '栅格必须是[水平间距, 垂直间距]格式'; }
        return '';
      },
    },
    {
      name: 'options.horizontalAlign',
      group: '组件属性',
      'ui:title': '水平排列方式',
      'ui:type': 'select',
      'ui:props': {
        options: [
          { label: '左对齐', value: 'start' },
          { label: '右对齐', value: 'end' },
          { label: '居中对齐', value: 'center' },
          { label: '间隔相等', value: 'space-around' },
          { label: '两端对齐', value: 'space-between' },
        ],
      },
      type: 'string',
      default: 'start',
    },
    {
      name: 'options.wrap',
      group: '组件属性',
      required: true,
      'ui:title': '允许自动换行',
      'ui:type': 'switch',
      'ui:props': {},
      type: 'boolean',
      default: false,
    },
  ],
  icon: '<svg t="1646389531860" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3304" width="48" height="48"><path d="M410.24 496.16H206.24c-40.8 0-73.44-33.12-73.44-73.44V218.24c0-40.8 33.12-73.44 73.44-73.44h204c40.8 0 73.44 33.12 73.44 73.44v204c0 40.8-33.12 73.92-73.44 73.92zM206.24 192.8c-13.92 0-25.44 11.52-25.44 25.44v204c0 13.92 11.52 25.44 25.44 25.44h204c13.92 0 25.44-11.52 25.44-25.44V218.24c0-13.92-11.52-25.44-25.44-25.44H206.24zM826.4 496.16H622.4c-40.8 0-73.44-33.12-73.44-73.44V218.24c0-40.8 33.12-73.44 73.44-73.44h204c40.8 0 73.44 33.12 73.44 73.44v204c0.48 40.8-32.64 73.92-73.44 73.92zM622.4 192.8c-13.92 0-25.44 11.52-25.44 25.44v204c0 13.92 11.52 25.44 25.44 25.44h204c13.92 0 25.44-11.52 25.44-25.44V218.24c0-13.92-11.52-25.44-25.44-25.44H622.4zM410.24 876.8H206.24c-40.8 0-73.44-33.12-73.44-73.44v-204c0-40.8 33.12-73.44 73.44-73.44h204c40.8 0 73.44 33.12 73.44 73.44v204c0 40.32-33.12 73.44-73.44 73.44z m-204-303.36c-13.92 0-25.44 11.52-25.44 25.44v204c0 13.92 11.52 25.44 25.44 25.44h204c13.92 0 25.44-11.52 25.44-25.44v-204c0-13.92-11.52-25.44-25.44-25.44H206.24zM840.8 873.92H608c-31.2 0-56.64-25.44-56.64-56.64v-232.32c0-31.2 25.44-56.64 56.64-56.64h232.32c31.2 0 56.64 25.44 56.64 56.64v232.32c0.48 31.2-24.96 56.64-56.16 56.64z" p-id="3305"></path></svg>',
} as DripTableComponentAttrConfig;
