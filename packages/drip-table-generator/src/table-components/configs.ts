/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { DTGComponentPropertySchema } from '../typing';

export const basicColumnAttrComponents: DTGComponentPropertySchema[] = [
  {
    name: 'title',
    'ui:title': '表头名称',
    'ui:type': 'text',
    type: 'string',
    default: '',
  },
  {
    name: 'width',
    'ui:title': '表格列宽',
    'ui:type': 'text',
    'ui:description': {
      title: '控制表格该列宽度，默认单位为“px”，支持手动指定单位后缀。',
      trigger: 'hover',
      type: 'icon',
    },
    type: 'string',
  },
  {
    name: 'align',
    'ui:title': '对齐方式',
    'ui:type': 'radio',
    'ui:props': {
      options: [
        { label: '居中对齐', value: 'center' },
        { label: '靠左对齐', value: 'left' },
        { label: '靠右对齐', value: 'right' },
      ],
    },
    type: 'string',
    default: 'center',
  },
];
