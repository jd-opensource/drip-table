/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { DTGComponentPropertySchema } from '../typing';

export const GlobalAttrFormConfigs: DTGComponentPropertySchema[] = [
  {
    name: 'size',
    'ui:title': '表格尺寸',
    'ui:type': 'radio',
    'ui:props': {
      options: [
        { label: '默认', value: 'default' },
        { label: '大号', value: 'large' },
        { label: '中等', value: 'middle' },
        { label: '小号', value: 'small' },
      ],
    },
    type: 'string',
    default: 'default',
  },
  {
    name: 'innerBordered',
    'ui:title': '是否展示内部边框',
    'ui:type': 'switch',
    'ui:props': {},
    type: 'boolean',
    default: false,
  },
  {
    name: 'ellipsis',
    'ui:title': '是否平均列宽',
    'ui:type': 'switch',
    'ui:props': {},
    type: 'boolean',
    default: false,
  },
  {
    name: 'bordered',
    'ui:title': '是否展示边框',
    'ui:type': 'switch',
    'ui:props': {},
    type: 'boolean',
    default: false,
  },
  {
    name: 'header',
    'ui:title': '是否展示标题栏',
    'ui:type': 'switch',
    'ui:props': {},
    type: 'boolean',
    default: false,
  },
  {
    name: 'header.title.type',
    'ui:title': '标题栏是否展示标题',
    'ui:type': 'switch',
    'ui:props': {
      checkedValue: 'title',
      unCheckedValue: 'null',
    },
    type: 'string',
    visible: (value: unknown, formData?: Record<string, unknown>) => formData?.header === true,
  },
  {
    name: 'header.title.title',
    'ui:title': '标题名称',
    'ui:type': 'input',
    'ui:props': {
      placeholder: '请输入标题',
    },
    type: 'string',
    visible: (value: unknown, formData?: Record<string, unknown>) => formData?.header === true && formData['header.title.type'] === 'title',
  },
  {
    name: 'header.title.width',
    'ui:title': '标题宽度',
    'ui:type': 'number',
    'ui:props': {
      minimum: 1,
      maximum: 24,
    },
    type: 'number',
    visible: (value: unknown, formData?: Record<string, unknown>) => formData?.header === true && formData['header.title.type'] === 'title',
  },
  {
    name: 'header.search.type',
    'ui:title': '标题栏是否展示搜索',
    'ui:type': 'switch',
    'ui:props': {
      checkedValue: 'search',
      unCheckedValue: 'null',
    },
    type: 'string',
    visible: (value: unknown, formData?: Record<string, unknown>) => formData?.header === true,
  },
  {
    name: 'header.search.wrapperWidth',
    'ui:title': '搜索栏宽度',
    'ui:type': 'number',
    'ui:props': {
      minimum: 1,
      maximum: 24,
    },
    type: 'number',
    visible: (value: unknown, formData?: Record<string, unknown>) => formData?.header === true && formData['header.search.type'] === 'search',
  },
  {
    name: 'header.search.placeholder',
    'ui:title': '搜索框提示文案',
    'ui:type': 'input',
    'ui:props': {
      placeholder: '请输入',
    },
    type: 'string',
    visible: (value: unknown, formData?: Record<string, unknown>) => formData?.header === true && formData['header.search.type'] === 'search',
  },
  {
    name: 'header.search.searchBtnText',
    'ui:title': '搜索按钮文案',
    'ui:type': 'input',
    'ui:props': {
      placeholder: '请输入',
    },
    type: 'string',
    visible: (value: unknown, formData?: Record<string, unknown>) => formData?.header === true && formData['header.search.type'] === 'search',
  },
  {
    name: 'header.search.width',
    'ui:title': '搜索框宽度',
    'ui:type': 'input',
    'ui:props': {
      placeholder: '请输入',
    },
    type: 'string',
    visible: (value: unknown, formData?: Record<string, unknown>) => formData?.header === true && formData['header.search.type'] === 'search',
  },
  {
    name: 'header.search.allowClear',
    'ui:title': '搜索框清除按钮',
    'ui:type': 'switch',
    'ui:props': {},
    type: 'boolean',
    visible: (value: unknown, formData?: Record<string, unknown>) => formData?.header === true && formData['header.search.type'] === 'search',
  },
  {
    name: 'header.search.typeVisible',
    'ui:title': '是否展示选择框',
    'ui:type': 'switch',
    'ui:props': {},
    type: 'boolean',
    visible: (value: unknown, formData?: Record<string, unknown>) => formData?.header === true && formData['header.search.type'] === 'search',
  },
  {
    name: 'header.search.typeOptions',
    'ui:title': '选择框配置',
    'ui:type': 'custom::ArrayComponent',
    'ui:props': {
      items: [
        {
          name: 'label',
          'ui:title': '文案',
          'ui:type': 'input',
          default: '',
        },
        {
          name: 'value',
          'ui:title': '值',
          'ui:type': 'input',
          default: '',
        },
      ],
    },
    default: [],
    type: 'array',
    visible: (value: unknown, formData?: Record<string, unknown>) => formData?.header === true && formData['header.search.type'] === 'search' && formData['header.search.typeVisible'] === true,
  },
  {
    name: 'pagination',
    'ui:title': '是否展示分页',
    'ui:type': 'switch',
    'ui:props': {},
    type: 'boolean',
    default: false,
  },
  {
    name: 'pagination.pageSize',
    'ui:title': '分页大小',
    'ui:type': 'number',
    'ui:props': {
      placeholder: '请输入',
    },
    type: 'number',
    minimum: 1,
    visible: (value: unknown, formData?: Record<string, unknown>) => formData?.pagination === true,
  },
  {
    name: 'pagination.position',
    'ui:title': '分页位置',
    'ui:type': 'radio',
    'ui:props': {
      options: [
        { label: '左下角', value: 'bottomLeft' },
        { label: '正下方', value: 'bottomCenter' },
        { label: '右下角', value: 'bottomRight' },
      ],
    },
    type: 'string',
    visible: (value: unknown, formData?: Record<string, unknown>) => formData?.pagination === true,
  },
];

export const defaultComponentIcon = `
<svg t="1627123986728" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3506" width="48" height="48"><path d="M917.376 243.456L500.8 4.8a34.144 34.144 0 0 0-34.336 0.096l0.16-0.096L50.112 243.52a33.952 33.952 0 0 0-17.088 29.376v477.44c0 12.16 6.528 23.296 17.088 29.44l416.512 238.72a34.88 34.88 0 0 0 34.336-0.064l-0.16 0.096 416.576-238.72c10.272-5.952 17.088-16.896 17.088-29.44V272.928c0-12.544-6.816-23.488-16.928-29.344l-0.16-0.096z m-51.264 487.36l-382.4 219.136-382.336-219.136V292.48l382.336-219.136 382.4 219.136v438.272zM198.784 360.512a33.76 33.76 0 0 0 12.384 46.304l0.16 0.096 237.824 136.32V812.8c0 18.816 15.232 33.92 34.176 33.92h0.256a33.92 33.92 0 0 0 33.92-33.92v-269.184l238.656-136.832a33.92 33.92 0 0 0 12.48-46.528l0.096 0.16a34.4 34.4 0 0 0-46.88-12.32l0.16-0.096-238.272 136.512-238.208-136.512a34.464 34.464 0 0 0-46.624 12.384l-0.096 0.16z" p-id="3507"></path></svg>
`;
