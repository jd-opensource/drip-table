/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { DTGComponentPropertySchema } from '../typing';

const AlignConfigs = {
  'ui:type': 'radio',
  'ui:props': {
    options: [
      { label: '左对齐', value: 'flex-start' },
      { label: '右对齐', value: 'flex-end' },
      { label: '居中对齐', value: 'center' },
      { label: '两端对齐', value: 'space-between' },
      { label: '等间对齐', value: 'space-around' },
    ],
  },
};

const SlotItemConfigs = [
  {
    name: 'type',
    'ui:title': '类型',
    'ui:type': 'select',
    'ui:props': {
      options: [
        { label: '列展示筛选器', value: 'display-column-selector' },
        { label: '空白栏', value: 'spacer' },
        { label: '文本框', value: 'text' },
        { label: '自定义插槽', value: 'slot' },
        { label: '搜索框', value: 'search' },
        { label: '添加按钮', value: 'insert-button' },
      ],
    },
  },
  {
    name: 'selectorButtonType',
    'ui:title': '列选择器按钮类型',
    'ui:type': 'radio',
    'ui:props': {
      options: [
        { label: '主按钮', value: 'primary' },
        { label: '虚线按钮', value: 'dashed' },
      ],
    },
    type: 'string',
    default: 'primary',
    visible: (value: string, formData?: Record<string, unknown>) => formData?.type === 'display-column-selector',
  },
  {
    name: 'selectorButtonText',
    'ui:title': '列选择器按钮名称',
    'ui:type': 'input',
    'ui:props': {
      placeholder: '请输入按钮名称',
    },
    type: 'string',
    visible: (value: string, formData?: Record<string, unknown>) => formData?.type === 'display-column-selector',
  },
  {
    name: 'style.width',
    'ui:title': '宽度',
    'ui:type': 'input',
    'ui:props': {
      placeholder: '请输入宽度',
    },
    type: 'string',
    visible: (value: string, formData?: Record<string, unknown>) => formData?.type === 'spacer',
  },
  {
    name: 'slot',
    'ui:title': '插槽名称',
    'ui:type': 'select',
    'ui:props': {
      placeholder: '请选择插槽名称',
      optionsParam: '$$SLOT_NAME_OPTIONS$$',
    },
    type: 'string',
    visible: (value: string, formData?: Record<string, unknown>) => formData?.type === 'slot',
  },
  {
    name: 'text',
    'ui:title': '标题名称',
    'ui:type': 'input',
    'ui:props': {
      placeholder: '请输入标题名称',
    },
    type: 'string',
    visible: (value: string, formData?: Record<string, unknown>) => formData?.type === 'text',
  },
  {
    name: 'align',
    'ui:title': '对齐方式',
    ...AlignConfigs,
    type: 'string',
    visible: (value: string, formData?: Record<string, unknown>) =>
      formData?.type === 'text' || formData?.type === 'search' || formData?.type === 'insert-button',
  },
  {
    name: 'span',
    'ui:title': '跨度',
    'ui:type': 'input',
    'ui:props': {
      placeholder: '请输入"1-24", 或者"flex-auto"',
    },
    type: 'string',
    visible: (value: string, formData?: Record<string, unknown>) => formData?.type === 'text',
  },
  {
    name: 'wrapperStyle.width',
    'ui:title': '搜索框宽度',
    'ui:type': 'input',
    'ui:props': {
      placeholder: '请输入宽度',
    },
    type: 'string',
    visible: (value: string, formData?: Record<string, unknown>) => formData?.type === 'search',
  },
  {
    name: 'placeholder',
    'ui:title': '搜索框提示语',
    'ui:type': 'input',
    'ui:props': {
      placeholder: '请输入提示语',
    },
    type: 'string',
    visible: (value: string, formData?: Record<string, unknown>) => formData?.type === 'search',
  },
  {
    name: 'allowClear',
    'ui:title': '是否支持清空',
    'ui:type': 'switch',
    'ui:props': {},
    type: 'boolean',
    visible: (value: string, formData?: Record<string, unknown>) => formData?.type === 'search',
  },
  {
    name: 'searchButtonText',
    'ui:title': '搜索按钮文本',
    'ui:type': 'input',
    'ui:props': {
      placeholder: '请输入',
    },
    type: 'string',
    visible: (value: string, formData?: Record<string, unknown>) => formData?.type === 'search',
  },
  {
    name: 'searchKeys',
    'ui:title': '搜索分类过滤',
    'ui:type': 'array-list',
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
    type: 'array',
    visible: (value: string, formData?: Record<string, unknown>) => formData?.type === 'search',
  },
  {
    name: 'searchKeyDefaultValue',
    'ui:title': '默认搜索维度',
    'ui:type': 'input',
    'ui:props': {
      placeholder: '请输入搜索维度',
    },
    type: 'string',
    visible: (value: string, formData?: Record<string, unknown>) => formData?.type === 'search',
  },
  {
    name: 'insertButtonText',
    'ui:title': '添加按钮文案',
    'ui:type': 'input',
    'ui:props': {
      placeholder: '请输入',
    },
    type: 'string',
    visible: (value: string, formData?: Record<string, unknown>) => formData?.type === 'insert-button',
  },
  {
    name: 'showIcon',
    'ui:title': '是否展示图标',
    'ui:type': 'switch',
    'ui:props': {},
    type: 'boolean',
    visible: (value: string, formData?: Record<string, unknown>) => formData?.type === 'insert-button',
  },
];

const HeaderAttrConfigs: DTGComponentPropertySchema[] = [
  {
    name: 'header',
    group: '头部设置',
    'ui:title': '是否展示头部',
    'ui:type': 'switch',
    'ui:layout': {
      labelCol: 6,
      wrapperCol: 18,
    },
    'ui:props': {},
    type: 'boolean',
    default: false,
  },
  {
    name: 'header.items',
    group: '头部设置',
    'ui:title': '头部插槽配置',
    'ui:type': 'array-list',
    'ui:layout': {
      labelCol: 6,
      wrapperCol: 18,
    },
    'ui:props': {
      items: [...SlotItemConfigs],
    },
    type: 'boolean',
    default: false,
    visible: (value: unknown, formData?: Record<string, unknown>) => !!formData?.header,
  },
];

const FooterAttrConfigs: DTGComponentPropertySchema[] = [
  {
    name: 'footer',
    group: '底部设置',
    'ui:title': '是否展示底部',
    'ui:type': 'switch',
    'ui:layout': {
      labelCol: 6,
      wrapperCol: 18,
    },
    'ui:props': {},
    type: 'boolean',
    default: false,
  },
  {
    name: 'footer.items',
    group: '底部设置',
    'ui:title': '底部插槽配置',
    'ui:type': 'array-list',
    'ui:layout': {
      labelCol: 6,
      wrapperCol: 18,
    },
    'ui:props': {
      items: [...SlotItemConfigs],
    },
    type: 'boolean',
    default: false,
    visible: (value: unknown, formData?: Record<string, unknown>) => !!formData?.footer,
  },
];

const PaginationAttrConfigs: DTGComponentPropertySchema[] = [
  {
    name: 'pagination',
    group: '分页配置',
    'ui:title': '是否展示分页',
    'ui:type': 'switch',
    'ui:props': {},
    type: 'boolean',
    default: false,
  },
  {
    name: 'pagination.position',
    group: '分页配置',
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
  {
    name: 'pagination.size',
    group: '分页配置',
    'ui:title': '分页器尺寸',
    'ui:type': 'radio',
    'ui:props': {
      options: [
        { label: '默认', value: 'default' },
        { label: '小号', value: 'small' },
      ],
    },
    type: 'string',
    default: 'default',
    visible: (value: unknown, formData?: Record<string, unknown>) => formData?.pagination === true,
  },
  {
    name: 'pagination.pageSize',
    group: '分页配置',
    'ui:title': '每页行数',
    'ui:type': 'number',
    'ui:props': {
      placeholder: '请输入',
    },
    type: 'number',
    minimum: 1,
    visible: (value: unknown, formData?: Record<string, unknown>) => formData?.pagination === true,
  },
  {
    name: 'pagination.showTotal',
    group: '分页配置',
    'ui:title': '是否展示总条目',
    'ui:type': 'input',
    'ui:description': {
      type: 'icon',
      trigger: 'hover',
      title: '输入文本，总条目用 `{{total}}` 替换',
    },
    'ui:props': {
      placeholder: '请输入',
    },
    type: 'string',
    visible: (value: unknown, formData?: Record<string, unknown>) => formData?.pagination === true,
  },
  {
    name: 'pagination.showQuickJumper',
    group: '分页配置',
    'ui:title': '是否展示快速跳转',
    'ui:type': 'switch',
    'ui:description': {
      type: 'icon',
      trigger: 'hover',
      title: '是否可以快速跳转至某页',
    },
    'ui:props': {},
    type: 'boolean',
    default: false,
    visible: (value: unknown, formData?: Record<string, unknown>) => formData?.pagination === true,
  },
  {
    name: 'pagination.showSizeChanger',
    group: '分页配置',
    'ui:title': '是否展示切换器',
    'ui:description': {
      type: 'text',
      trigger: 'hover',
      title: '是否展示 pageSize 切换器，当 total 大于 50 时默认为 true',
    },
    'ui:type': 'switch',
    'ui:props': {},
    type: 'boolean',
    default: false,
    visible: (value: unknown, formData?: Record<string, unknown>) => formData?.pagination === true,
  },
];

export const GlobalAttrFormConfigs: DTGComponentPropertySchema[] = [
  {
    name: 'size',
    group: '全局属性',
    'ui:title': '表格尺寸',
    'ui:type': 'radio',
    'ui:props': {
      options: [
        { label: '大号', value: 'large' },
        { label: '中等', value: 'middle' },
        { label: '小号', value: 'small' },
      ],
    },
    type: 'string',
    default: 'middle',
  },
  {
    name: 'bordered',
    group: '全局属性',
    'ui:title': '是否展示边框',
    'ui:type': 'switch',
    'ui:props': {},
    type: 'boolean',
    default: false,
  },
  {
    name: 'sticky',
    group: '全局属性',
    'ui:title': '是否粘性头部',
    'ui:type': 'switch',
    'ui:props': {},
    type: 'boolean',
    default: false,
  },
  {
    name: 'rowSelection',
    group: '全局属性',
    'ui:title': '行是否可选择',
    'ui:type': 'switch',
    'ui:props': {},
    type: 'boolean',
    default: false,
  },
  {
    name: 'virtual',
    group: '全局属性',
    'ui:title': '是否进入虚拟列表',
    'ui:type': 'switch',
    'ui:props': {},
    type: 'boolean',
    default: false,
  },
  {
    name: 'scrollX',
    group: '全局属性',
    'ui:title': '水平滚动宽度限制',
    'ui:type': 'number',
    'ui:props': {
      min: 1,
    },
    type: 'number',
  },
  {
    name: 'scrollY',
    group: '全局属性',
    'ui:title': '虚拟滚动高度',
    'ui:type': 'number',
    'ui:props': {
      min: 1,
    },
    type: 'number',
    visible: (value: unknown, formData?: Record<string, unknown>) => formData?.virtual === true,
  },
  ...HeaderAttrConfigs,
  ...PaginationAttrConfigs,
  ...FooterAttrConfigs,
];

export const defaultComponentIcon = `
<svg t="1627123986728" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3506" width="48" height="48"><path d="M917.376 243.456L500.8 4.8a34.144 34.144 0 0 0-34.336 0.096l0.16-0.096L50.112 243.52a33.952 33.952 0 0 0-17.088 29.376v477.44c0 12.16 6.528 23.296 17.088 29.44l416.512 238.72a34.88 34.88 0 0 0 34.336-0.064l-0.16 0.096 416.576-238.72c10.272-5.952 17.088-16.896 17.088-29.44V272.928c0-12.544-6.816-23.488-16.928-29.344l-0.16-0.096z m-51.264 487.36l-382.4 219.136-382.336-219.136V292.48l382.336-219.136 382.4 219.136v438.272zM198.784 360.512a33.76 33.76 0 0 0 12.384 46.304l0.16 0.096 237.824 136.32V812.8c0 18.816 15.232 33.92 34.176 33.92h0.256a33.92 33.92 0 0 0 33.92-33.92v-269.184l238.656-136.832a33.92 33.92 0 0 0 12.48-46.528l0.096 0.16a34.4 34.4 0 0 0-46.88-12.32l0.16-0.096-238.272 136.512-238.208-136.512a34.464 34.464 0 0 0-46.624 12.384l-0.096 0.16z" p-id="3507"></path></svg>
`;
