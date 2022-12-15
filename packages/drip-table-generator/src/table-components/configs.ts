/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { DTGComponentPropertySchema } from '../typing';

export const StyleAttrConfigs = (prefix: string, group: string, filterStyles?: string[]) => [
  {
    name: `${prefix}.width`,
    group,
    'ui:title': '宽度',
    'ui:type': 'input',
    'ui:description': {
      title: '控制表格宽度，默认单位为“px”，支持手动指定单位后缀。为了编辑器的样式完整，编辑模式下不会生效。',
      trigger: 'hover',
      type: 'icon',
    },
    type: 'string',
    default: '',
  },
  {
    name: `${prefix}.minWidth`,
    group,
    'ui:title': '最小宽度',
    'ui:type': 'input',
    'ui:description': {
      title: '控制表格最小宽度，默认单位为“px”，支持手动指定单位后缀。',
      trigger: 'hover',
      type: 'icon',
    },
    type: 'string',
    default: '',
  },
  {
    name: `${prefix}.maxWidth`,
    group,
    'ui:title': '最大宽度',
    'ui:type': 'input',
    'ui:description': {
      title: '控制表格最大宽度，默认单位为“px”，支持手动指定单位后缀。',
      trigger: 'hover',
      type: 'icon',
    },
    type: 'string',
    default: '',
  },
  {
    name: `${prefix}.height`,
    group,
    'ui:title': '高度',
    'ui:type': 'input',
    'ui:description': {
      title: '控制表格高度，默认单位为“px”，支持手动指定单位后缀。为了编辑器的样式完整，编辑模式下不会生效。',
      trigger: 'hover',
      type: 'icon',
    },
    type: 'string',
    default: '',
  },
  {
    name: `${prefix}.minHeight`,
    group,
    'ui:title': '最小高度',
    'ui:type': 'input',
    'ui:description': {
      title: '控制表格最小高度，默认单位为“px”，支持手动指定单位后缀。',
      trigger: 'hover',
      type: 'icon',
    },
    type: 'string',
    default: '',
  },
  {
    name: `${prefix}.maxHeight`,
    group,
    'ui:title': '最大高度',
    'ui:type': 'input',
    'ui:description': {
      title: '控制表格最大高度，默认单位为“px”，支持手动指定单位后缀。',
      trigger: 'hover',
      type: 'icon',
    },
    type: 'string',
    default: '',
  },
  {
    name: `${prefix}.backgroundColor`,
    group,
    'ui:title': '背景颜色',
    'ui:type': 'color-picker',
    'ui:props': {},
    type: 'string',
    default: '#ffffff',
  },
  {
    name: `${prefix}.borderWidth`,
    group,
    'ui:title': '边框宽度',
    'ui:type': 'input',
    'ui:description': {
      title: '控制表格边框宽度，默认单位为“px”，支持手动指定单位后缀。',
      trigger: 'hover',
      type: 'icon',
    },
    type: 'string',
    default: '1px',
  },
  {
    name: `${prefix}.borderColor`,
    group,
    'ui:title': '边框颜色',
    'ui:type': 'color-picker',
    'ui:props': {},
    type: 'string',
    default: '#ffffff',
  },
  {
    name: `${prefix}.borderStyle`,
    group,
    'ui:title': '边框样式',
    'ui:type': 'select',
    'ui:props': {
      options: [
        { label: '点状', value: 'dotted' },
        { label: '实线', value: 'solid' },
        { label: '双线', value: 'double' },
        { label: '虚线', value: 'dashed' },
      ],
    },
    type: 'string',
    default: 'solid',
  },
  {
    name: `${prefix}.borderRadius`,
    group,
    'ui:title': '圆角半径',
    'ui:type': 'style-numbers',
    'ui:description': {
      title: '设置元素的外边框圆角，该属性可以有1到4个值。e.g.:1px 1px',
      trigger: 'hover',
      type: 'icon',
    },
    'ui:props': {
      count: 4,
      dimensions: ['px', '%', 'pt', 'vw', 'cm', 'in', 'pc', 'em'],
    },
    type: 'string',
    default: '',
  },
  {
    name: `${prefix}.padding`,
    group,
    'ui:title': '内边距',
    'ui:type': 'style-numbers',
    'ui:description': {
      title: '控制表格所有内边距属性，该属性可以有1到4个值。e.g.:1px 1px',
      trigger: 'hover',
      type: 'icon',
    },
    'ui:props': {
      count: 4,
      dimensions: ['px', '%', 'pt', 'vw', 'cm', 'in', 'pc', 'em'],
    },
    type: 'string',
    default: '',
  },
  {
    name: `${prefix}.margin`,
    group,
    'ui:title': '外边距',
    'ui:type': 'style-numbers',
    'ui:description': {
      title: '控制表格所有外边距属性，该属性可以有1到4个值。e.g.:1px 1px',
      trigger: 'hover',
      type: 'icon',
    },
    'ui:props': {
      count: 4,
      dimensions: ['px', '%', 'pt', 'vw', 'cm', 'in', 'pc', 'em'],
    },
    type: 'string',
    default: '',
  },
  {
    name: `${prefix}.boxShadow`,
    group,
    'ui:title': '阴影',
    'ui:type': 'box-shadow',
    'ui:description': {
      title: '用于在元素的框架上添加阴影效果，该属性可设置的值包括阴影的 X轴偏移量、Y轴偏移量、模糊半径、扩散半径和颜色',
      trigger: 'hover',
      type: 'icon',
    },
    'ui:props': {
      defaultColor: '#ffffff',
      count: 4,
      dimensions: ['px', 'cm', 'em'],
    },
    type: 'string',
    default: '',
  },
].filter(item => (filterStyles ? filterStyles.includes(item.name.replace(`${prefix}.`, '')) : item)) as DTGComponentPropertySchema[];

export const basicColumnAttrComponents = (defaultValue: string): DTGComponentPropertySchema[] => [
  {
    name: 'title',
    group: '表头配置',
    'ui:title': '表头名称',
    'ui:type': 'text',
    'ui:props': {
      style: { width: '100%' },
      placeholder: '可输入文本或者HTML, 例如: <strong>表头标题</strong>',
    },
    'ui:layout': { labelCol: 6, wrapperCol: 18 },
    type: 'string',
    default: defaultValue || '',
  },
  {
    name: 'description',
    group: '表头配置',
    'ui:title': '表头提示',
    'ui:type': 'text',
    'ui:props': {
      style: { width: '100%' },
      placeholder: '可输入文本或者HTML, 例如: <strong>提示说明</strong>',
    },
    'ui:layout': { labelCol: 6, wrapperCol: 18 },
    type: 'string',
  },
  ...StyleAttrConfigs('titleStyle', '表头配置', ['backgroundColor', 'borderWidth', 'borderColor', 'borderStyle', 'borderRadius', 'margin', 'padding', 'boxShadow']),
  ...StyleAttrConfigs('style', '列样式', ['backgroundColor', 'borderWidth', 'borderColor', 'borderStyle', 'borderRadius', 'margin', 'padding', 'boxShadow']),
  {
    name: 'width',
    group: '样式配置',
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
    group: '样式配置',
    'ui:title': '水平对齐方式',
    'ui:type': 'radio',
    'ui:props': {
      mode: 'button',
      buttonStyle: 'solid',
      size: 'small',
      options: [
        { label: '左对齐', value: 'left' },
        { label: '居中', value: 'center' },
        { label: '右对齐', value: 'right' },
      ],
    },
    type: 'string',
    default: 'left',
  },
  {
    name: 'verticalAlign',
    group: '样式配置',
    'ui:title': '垂直对齐方式',
    'ui:type': 'radio',
    'ui:props': {
      mode: 'button',
      buttonStyle: 'solid',
      size: 'small',
      options: [
        { label: '顶部', value: 'top' },
        { label: '居中', value: 'middle' },
        { label: '底部', value: 'bottom' },
        { label: '拉伸', value: 'stretch' },
      ],
    },
    type: 'string',
    default: 'top',
  },
  {
    name: 'hidable',
    group: '组件属性',
    'ui:title': '该列是否支持隐藏',
    'ui:type': 'switch',
    'ui:props': {
      checkedChildren: '是',
      unCheckedChildren: '否',
    },
    'ui:layout': { labelCol: 8, wrapperCol: 14 },
    type: 'boolean',
  },
];

export const dataIndexColumnAttrComponents: (
  dataIndex?: string,
  modeDiffFn?: (value: unknown, formData?: Record<string, unknown>) => boolean,
  directDiffFn?: (value: unknown, formData?: Record<string, unknown>) => boolean,
  nestedDiffFn?: (value: unknown, formData?: Record<string, unknown>) => boolean,
) => DTGComponentPropertySchema[] = (dataIndex, modeDiffFn, directDiffFn, nestedDiffFn) => [
  {
    name: 'dataIndexMode',
    group: '组件属性',
    required: true,
    'ui:title': '字段读取模式',
    'ui:type': 'radio',
    'ui:props': {
      options: [
        { label: '直接读取', value: 'direct' },
        { label: '嵌套路径', value: 'nested' },
      ],
    },
    type: 'string',
    default: 'direct',
    visible: modeDiffFn,
  },
  {
    name: 'dataIndex',
    group: '组件属性',
    required: true,
    'ui:title': '字段选择',
    'ui:type': 'auto-complete',
    'ui:props': {
      optionsParam: '$$FIELD_KEY_OPTIONS$$',
      style: { width: 120 },
    },
    type: 'string',
    visible: directDiffFn || ((_1: unknown, formData?: Record<string, unknown>) => formData?.dataIndexMode === 'direct'),
  },
  {
    name: 'dataIndex',
    group: '组件属性',
    required: true,
    'ui:title': '字段选择',
    'ui:type': 'select',
    'ui:props': {
      optionsParam: '$$FIELD_KEY_OPTIONS$$',
      mode: 'tags',
      tokenSeparators: ['.', ',', '，'],
      style: { width: 120 },
    },
    type: 'string',
    default: dataIndex,
    visible: nestedDiffFn || ((_1: unknown, formData?: Record<string, unknown>) => formData?.dataIndexMode === 'nested'),
  },
];
