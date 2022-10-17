/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { DTGComponentPropertySchema } from '../typing';

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
  {
    name: 'width',
    group: '组件属性',
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
    'ui:title': '对齐方式',
    'ui:type': 'radio',
    'ui:props': {
      mode: 'button',
      buttonStyle: 'solid',
      size: 'small',
      options: [
        { label: '居中', value: 'center' },
        { label: '左对齐', value: 'left' },
        { label: '右对齐', value: 'right' },
      ],
    },
    type: 'string',
    default: 'center',
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
    'ui:layout': { labelCol: 10, wrapperCol: 14 },
    type: 'boolean',
  },
];

export const dataIndexColumnAttrComponents: (
  modeDiffFn?: (value: unknown, formData?: Record<string, unknown>) => boolean,
  directDiffFn?: (value: unknown, formData?: Record<string, unknown>) => boolean,
  nestedDiffFn?: (value: unknown, formData?: Record<string, unknown>) => boolean,
  dataIndex?: string,
) => DTGComponentPropertySchema[] = (modeDiffFn, directDiffFn, nestedDiffFn, dataIndex) => [
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
