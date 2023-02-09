/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { DTGComponentPropertySchema } from '../typing';

export const StyleAttrConfigs = (
  prefix: string,
  group: string,
  extraOptions?: {
    subGroup?: string;
    filterStyles?: string[];
    backgroundColor?: string;
    visible?: boolean | ((value: unknown, formData?: Record<string, unknown>) => boolean);
  },
) =>
  [
    {
      name: `${prefix}.width`,
      group,
      subGroup: extraOptions?.subGroup,
      'ui:title': '宽度',
      'ui:type': 'input',
      'ui:description': {
        title:
          '控制表格宽度，默认单位为“px”，支持手动指定单位后缀。为了编辑器的样式完整，编辑模式下不会生效。',
        trigger: 'hover',
        type: 'icon',
      },
      type: 'string',
      default: '',
      visible: extraOptions?.visible,
    },
    {
      name: `${prefix}.minWidth`,
      group,
      subGroup: extraOptions?.subGroup,
      'ui:title': '最小宽度',
      'ui:type': 'input',
      'ui:description': {
        title: '控制表格最小宽度，默认单位为“px”，支持手动指定单位后缀。',
        trigger: 'hover',
        type: 'icon',
      },
      type: 'string',
      default: '',
      visible: extraOptions?.visible,
    },
    {
      name: `${prefix}.maxWidth`,
      group,
      subGroup: extraOptions?.subGroup,
      'ui:title': '最大宽度',
      'ui:type': 'input',
      'ui:description': {
        title: '控制表格最大宽度，默认单位为“px”，支持手动指定单位后缀。',
        trigger: 'hover',
        type: 'icon',
      },
      type: 'string',
      default: '',
      visible: extraOptions?.visible,
    },
    {
      name: `${prefix}.height`,
      group,
      subGroup: extraOptions?.subGroup,
      'ui:title': '高度',
      'ui:type': 'input',
      'ui:description': {
        title:
          '控制表格高度，默认单位为“px”，支持手动指定单位后缀。为了编辑器的样式完整，编辑模式下不会生效。',
        trigger: 'hover',
        type: 'icon',
      },
      type: 'string',
      default: '',
      visible: extraOptions?.visible,
    },
    {
      name: `${prefix}.minHeight`,
      group,
      subGroup: extraOptions?.subGroup,
      'ui:title': '最小高度',
      'ui:type': 'input',
      'ui:description': {
        title: '控制表格最小高度，默认单位为“px”，支持手动指定单位后缀。',
        trigger: 'hover',
        type: 'icon',
      },
      type: 'string',
      default: '',
      visible: extraOptions?.visible,
    },
    {
      name: `${prefix}.maxHeight`,
      group,
      subGroup: extraOptions?.subGroup,
      'ui:title': '最大高度',
      'ui:type': 'input',
      'ui:description': {
        title: '控制表格最大高度，默认单位为“px”，支持手动指定单位后缀。',
        trigger: 'hover',
        type: 'icon',
      },
      type: 'string',
      default: '',
      visible: extraOptions?.visible,
    },
    {
      name: `${prefix}.backgroundColor`,
      group,
      subGroup: extraOptions?.subGroup,
      'ui:title': '背景颜色',
      'ui:type': 'color-picker',
      'ui:props': {},
      type: 'string',
      default: extraOptions?.backgroundColor || '#ffffff',
      visible: extraOptions?.visible,
    },
    {
      name: `${prefix}.borderWidth`,
      group,
      subGroup: extraOptions?.subGroup,
      'ui:title': '边框宽度',
      'ui:type': 'input',
      'ui:description': {
        title: '控制表格边框宽度，默认单位为“px”，支持手动指定单位后缀。',
        trigger: 'hover',
        type: 'icon',
      },
      type: 'string',
      default: '1px',
      visible: extraOptions?.visible,
    },
    {
      name: `${prefix}.borderColor`,
      group,
      subGroup: extraOptions?.subGroup,
      'ui:title': '边框颜色',
      'ui:type': 'color-picker',
      'ui:props': {},
      type: 'string',
      default: '#f2f2f2',
      visible: extraOptions?.visible,
    },
    {
      name: `${prefix}.borderStyle`,
      group,
      subGroup: extraOptions?.subGroup,
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
      visible: extraOptions?.visible,
    },
    {
      name: `${prefix}.borderRadius`,
      group,
      subGroup: extraOptions?.subGroup,
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
      visible: extraOptions?.visible,
    },
    {
      name: `${prefix}.padding`,
      group,
      subGroup: extraOptions?.subGroup,
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
      visible: extraOptions?.visible,
    },
    {
      name: `${prefix}.margin`,
      group,
      subGroup: extraOptions?.subGroup,
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
      visible: extraOptions?.visible,
    },
    {
      name: `${prefix}.boxShadow`,
      group,
      subGroup: extraOptions?.subGroup,
      'ui:title': '阴影',
      'ui:type': 'box-shadow',
      'ui:description': {
        title:
          '用于在元素的框架上添加阴影效果，该属性可设置的值包括阴影的 X轴偏移量、Y轴偏移量、模糊半径、扩散半径和颜色',
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
      visible: extraOptions?.visible,
    },
  ].filter(item => (extraOptions?.filterStyles
    ? extraOptions?.filterStyles.includes(item.name.replace(`${prefix}.`, ''))
    : item)) as DTGComponentPropertySchema[];

export const titleConfig = (defaultValue?: string): DTGComponentPropertySchema => ({
  name: 'title',
  group: '属性',
  'ui:title': '表头名称',
  'ui:type': 'text',
  'ui:props': {
    style: { width: '100%' },
    placeholder: '可输入文本或者HTML, 例如: <strong>表头标题</strong>',
  },
  'ui:layout': { labelCol: 6, wrapperCol: 18 },
  type: 'string',
  default: defaultValue || '',
});

const description: DTGComponentPropertySchema = {
  name: 'description',
  group: '属性',
  'ui:title': '表头提示',
  'ui:type': 'text',
  'ui:props': {
    style: { width: '100%' },
    placeholder: '可输入文本或者HTML, 例如: <strong>提示说明</strong>',
  },
  'ui:layout': { labelCol: 6, wrapperCol: 18 },
  type: 'string',
};

const width: DTGComponentPropertySchema = {
  name: 'width',
  group: '样式',
  'ui:title': '表格列宽',
  'ui:type': 'text',
  'ui:description': {
    title: '控制表格该列宽度，默认单位为“px”，支持手动指定单位后缀。',
    trigger: 'hover',
    type: 'icon',
  },
  type: 'string',
};

const align: DTGComponentPropertySchema = {
  name: 'align',
  group: '样式',
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
};

const verticalAlign: DTGComponentPropertySchema = {
  name: 'verticalAlign',
  group: '样式',
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
};

const hidable: DTGComponentPropertySchema = {
  name: 'hidable',
  group: '属性',
  'ui:layout': { labelCol: 6, wrapperCol: 18 },
  'ui:title': '该列支持隐藏',
  'ui:type': 'switch',
  'ui:props': {
    checkedChildren: '是',
    unCheckedChildren: '否',
  },
  type: 'boolean',
};

const dataTranslation: DTGComponentPropertySchema = {
  name: 'dataTranslation',
  group: '属性',
  'ui:title': '数据处理',
  'ui:type': 'data-translation',
  'ui:props': {
    style: { width: '100%' },
  },
  'ui:description': {
    title: 'props.value对应dataIndex的值，props.record对应rowData的值,return语句写法案例: `return props.value || "暂无数据"`',
    trigger: 'hover',
    type: 'icon',
  },
  'ui:layout': { labelCol: 6, wrapperCol: 18 },
  type: 'string',
};

const disableFunc: DTGComponentPropertySchema = {
  name: 'options.disableFunc',
  group: '属性',
  'ui:title': '禁用判断',
  'ui:type': 'text',
  'ui:props': {
    style: { width: '100%' },
    placeholder: 'props.value对应dataIndex的值，props.record对应rowData的值,return语句写法案例: `return props.value === 1',

  },
  'ui:description': {
    title: '根据逻辑语句返回的布尔值决定该组件是否被禁用,true为禁用,false为正常',
    trigger: 'hover',
    type: 'icon',
  },
  'ui:layout': { labelCol: 6, wrapperCol: 18 },
  type: 'string',
};
const visibleFunc: DTGComponentPropertySchema = {
  name: 'options.visibleFunc',
  group: '属性',
  'ui:title': '组件显隐条件',
  'ui:titleStyle': { minWidth: 106 },
  'ui:type': 'text',
  'ui:props': {
    style: { width: '100%' },
    placeholder: 'props.value对应dataIndex的值，props.record对应rowData的值,return语句写法案例: `return props.value === 1',

  },
  'ui:description': {
    title: '根据逻辑语句返回的布尔值决定该组件是否被隐藏,true为显示,false为隐藏',
    trigger: 'hover',
    type: 'icon',
  },
  'ui:layout': { labelCol: 6, wrapperCol: 18 },
  type: 'string',
};

export const basicColumnAttrSchema = {
  description,
  width,
  align,
  verticalAlign,
  hidable,
  dataTranslation,
  'options.disableFunc': disableFunc,
  'options.visibleFunc': visibleFunc,
};

export const dataIndexColumnAttrComponents = (
  dataIndex?: string,
  extraOptions?: {
    modeDiffFn?: (value: unknown, formData?: Record<string, unknown>) => boolean;
    directDiffFn?: (value: unknown, formData?: Record<string, unknown>) => boolean;
    nestedDiffFn?: (value: unknown, formData?: Record<string, unknown>) => boolean;
    layout?: DTGComponentPropertySchema['ui:layout'];
  },
): DTGComponentPropertySchema[] => [
  {
    name: 'dataIndexMode',
    group: '属性',
    required: true,
    'ui:layout': extraOptions?.layout,
    'ui:title': '字段读取模式',
    'ui:titleStyle': { minWidth: 96 },
    'ui:type': 'radio',
    'ui:props': {
      options: [
        { label: '直接读取', value: 'direct' },
        { label: '嵌套路径', value: 'nested' },
      ],
    },
    type: 'string',
    default: 'direct',
    visible: extraOptions?.modeDiffFn,
  },
  {
    name: 'dataIndex',
    group: '属性',
    required: true,
    'ui:layout': extraOptions?.layout,
    'ui:title': '字段选择',
    'ui:type': 'auto-complete',
    'ui:props': {
      optionsParam: '$$FIELD_KEY_OPTIONS$$',
    },
    type: 'string',
    visible: extraOptions?.directDiffFn || ((_1: unknown, formData?: Record<string, unknown>) => formData?.dataIndexMode !== 'nested'),
    default: dataIndex,
  },
  {
    name: 'dataIndex',
    group: '属性',
    required: true,
    'ui:layout': extraOptions?.layout,
    'ui:title': '字段选择',
    'ui:type': 'select',
    'ui:props': {
      optionsParam: '$$FIELD_KEY_OPTIONS$$',
      mode: 'tags',
      tokenSeparators: ['.', ',', '，'],
      style: { width: '100%' },
    },
    type: 'string',
    default: dataIndex,
    visible: extraOptions?.nestedDiffFn || ((_1: unknown, formData?: Record<string, unknown>) => formData?.dataIndexMode === 'nested'),
  },
];

export const styleAttributesSchema: DTGComponentPropertySchema[] = [
  {
    name: 'titleStyle',
    group: '样式',
    subGroup: '表头样式',
    'ui:title': '自定义表头样式',
    'ui:type': 'switch',
    'ui:props': {},
    type: 'boolean',
    default: false,
  },
  ...StyleAttrConfigs('titleStyle', '样式', {
    subGroup: '表头样式',
    backgroundColor: '#fafafa',
    filterStyles: [
      'backgroundColor',
      'borderWidth',
      'borderColor',
      'borderStyle',
      'borderRadius',
      'margin',
      'padding',
      'boxShadow',
    ],
    visible: (_1: unknown, formData?: Record<string, unknown>) => !!formData?.titleStyle,
  }),
  {
    name: 'style',
    group: '样式',
    subGroup: '单元格样式',
    'ui:title': '自定义单元格样式',
    'ui:type': 'switch',
    'ui:props': {},
    type: 'boolean',
    default: false,
  },
  ...StyleAttrConfigs('style', '样式', {
    subGroup: '单元格样式',
    filterStyles: [
      'backgroundColor',
      'borderWidth',
      'borderColor',
      'borderStyle',
      'borderRadius',
      'margin',
      'padding',
      'boxShadow',
    ],
    visible: (_1: unknown, formData?: Record<string, unknown>) => !!formData?.style,
  }),
];

export const generateColumnAttrComponentsByNames = (names: (string | DTGComponentPropertySchema)[]): DTGComponentPropertySchema[] => {
  const schema: DTGComponentPropertySchema[] = [];
  names.forEach((propName) => {
    if (typeof propName === 'string') {
      schema.push(basicColumnAttrSchema[propName]);
    } else {
      schema.push(propName);
    }
  });
  return schema;
};

export const basicColumnAttrComponents = (
  defaultValue: string,
): DTGComponentPropertySchema[] => [
  {
    name: 'title',
    group: '属性',
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
    group: '属性',
    'ui:title': '表头提示',
    'ui:type': 'text',
    'ui:props': {
      style: { width: '100%' },
      placeholder: '可输入文本或者HTML, 例如: <strong>提示说明</strong>',
    },
    'ui:layout': { labelCol: 6, wrapperCol: 18 },
    type: 'string',
  },
  ...StyleAttrConfigs('titleStyle', '样式', {
    backgroundColor: '#fafafa',
    filterStyles: [
      'backgroundColor',
      'borderWidth',
      'borderColor',
      'borderStyle',
      'borderRadius',
      'margin',
      'padding',
      'boxShadow',
    ],
  }),
  ...StyleAttrConfigs('style', '样式', {
    filterStyles: [
      'backgroundColor',
      'borderWidth',
      'borderColor',
      'borderStyle',
      'borderRadius',
      'margin',
      'padding',
      'boxShadow',
    ],
  }),
  {
    name: 'width',
    group: '样式',
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
    group: '样式',
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
    group: '样式',
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
    group: '属性',
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
