import { DripTableComponentAttrConfig } from '../typing';
import { generateColumnAttrComponentsByNames, styleAttributesSchema, titleConfig } from './configs';

const iconOptions = [
  'DownOutlined',
  'UpOutlined',
  'LeftOutlined',
  'RightOutlined',
  'CaretUpOutlined',
  'CaretDownOutlined',
  'CaretLeftOutlined',
  'CaretRightOutlined',
  'UpCircleOutlined',
  'DownCircleOutlined',
  'LeftCircleOutlined',
  'RightCircleOutlined',
  'VerticalAlignTopOutlined',
  'VerticalAlignBottomOutlined',
  'ArrowUpOutlined',
  'ArrowDownOutlined',
  'ArrowLeftOutlined',
  'ArrowRightOutlined',
  'UpSquareOutlined',
  'DownSquareOutlined',
  'LeftSquareOutlined',
  'RightSquareOutlined',
].map(key => ({ value: key, label: key, icon: key }));

export default {
  $id: '$display_links',
  'ui:type': 'link',
  type: 'string',
  group: '基础组件',
  fieldKey: 'links_qywxDIIO',
  title: '链接组件',
  paramName: '',
  default: '',
  attrSchema: generateColumnAttrComponentsByNames([
    titleConfig('链接'),
    {
      name: 'options.mode',
      group: '属性',
      'ui:layout': { labelCol: 6, wrapperCol: 18 },
      'ui:title': '模式',
      'ui:type': 'radio',
      'ui:props': {
        options: [
          { label: '单链接', value: 'single' },
          { label: '多链接', value: 'multiple' },
        ],
      },
      type: 'string',
      default: 'single',
    },
    {
      name: 'options.label',
      group: '属性',
      'ui:layout': { labelCol: 6, wrapperCol: 18 },
      'ui:title': '链接文案',
      'ui:type': 'text',
      'ui:props': { style: { width: '100%' } },
      type: 'string',
      default: '链接',
      visible: (_1: unknown, formData?: Record<string, unknown>) => formData?.['options.mode'] === 'single',
    },
    {
      name: 'options.href',
      group: '属性',
      'ui:layout': { labelCol: 6, wrapperCol: 18 },
      'ui:title': '链接地址',
      'ui:description': {
        title: '可以直接填写链接地址或者带字符串模板的地址，参数为rec，例如: http://api.jd.com/api_name?param={{rec.id}}',
        trigger: 'hover',
        type: 'icon',
      },
      'ui:type': 'text',
      'ui:props': { style: { width: '100%' } },
      type: 'string',
      default: 'http://api.example.com/api_path',
      visible: (_1: unknown, formData?: Record<string, unknown>) => formData?.['options.mode'] === 'single',
    },
    {
      name: 'options.target',
      group: '属性',
      'ui:layout': { labelCol: 6, wrapperCol: 18 },
      'ui:title': '打开方式',
      'ui:type': 'auto-complete',
      'ui:props': {
        style: { width: '100%' },
        options: [
          { label: '新页面打开', value: '_blank' },
          { label: '当前页打开', value: '_self' },
          { label: '父集框架中打开', value: '_parent' },
          { label: '整个窗口中打开', value: '_top' },
        ],
      },
      type: 'string',
      visible: (_1: unknown, formData?: Record<string, unknown>) => formData?.['options.mode'] === 'single',
    },
    {
      name: 'options.event',
      group: '属性',
      'ui:layout': { labelCol: 6, wrapperCol: 18 },
      'ui:title': '事件名称',
      'ui:description': {
        title: '事件类型为"drip-link-click", 事件机制详见<a href="https://drip-table.jd.com/drip-table/props/on-event" target="_blank">官网文档</a>',
        trigger: 'hover',
        type: 'icon',
      },
      'ui:type': 'text',
      'ui:props': { style: { width: '100%' } },
      type: 'string',
      default: '',
      visible: (_1: unknown, formData?: Record<string, unknown>) => formData?.['options.mode'] === 'single',
    },
    {
      name: 'options.operates',
      group: '属性',
      'ui:layout': { labelCol: 12, wrapperCol: 24 },
      'ui:title': '多链接配置',
      'ui:type': 'array-list',
      'ui:props': {
        mode: 'narrow',
        style: { border: '1px solid #3e3e3e', borderRadius: 2 },
        items: [
          {
            name: 'label',
            'ui:title': '链接文案',
            'ui:description': {
              title: '支持字符串模板写法{{rec.id}}',
              trigger: 'hover',
              type: 'icon',
            },
            'ui:type': 'input',
            type: 'string',
          },
          {
            name: 'href',
            'ui:title': '链接地址',
            'ui:type': 'input',
            'ui:description': {
              title: '可以直接填写链接地址或者带字符串模板的地址，参数为rec，例如: http://api.jd.com/api_name?param={{rec.id}}',
              trigger: 'hover',
              type: 'icon',
            },
            type: 'string',
          },
          {
            name: 'target',
            'ui:title': '打开方式',
            'ui:type': 'auto-complete',
            'ui:props': {
              options: [
                { label: '新页面打开', value: '_blank' },
                { label: '当前页打开', value: '_self' },
                { label: '父集框架中打开', value: '_parent' },
                { label: '整个窗口中打开', value: '_top' },
              ],
            },
            type: 'string',
            default: '',
          },
          {
            name: 'event',
            'ui:title': '事件名称',
            'ui:description': {
              title: '事件类型为"drip-link-click", 事件机制详见<a href="https://drip-table.jd.com/drip-table/props/on-event" target="_blank">官网文档</a>',
              trigger: 'hover',
              type: 'icon',
            },
            'ui:type': 'input',
            type: 'string',
            default: '',
          },
          {
            name: 'disable',
            group: '属性',
            'ui:title': '禁用条件',
            'ui:type': 'text',
            'ui:description': {
              title: '可以直接填写 true/false 或者代码片段，参数为rec',
              trigger: 'hover',
              type: 'icon',
            },
          },
          {
            name: 'visibleFunc',
            group: '属性',
            'ui:title': '显隐条件',
            'ui:type': 'text',
            'ui:props': {
              style: { width: '100%' },
              placeholder: 'value对应dataIndex的值，rec对应rowData的值,return语句写法案例: `return value === 1',

            },
            'ui:description': {
              title: '根据逻辑语句返回的布尔值决定该组件是否被隐藏,true为显示,false为隐藏',
              trigger: 'hover',
              type: 'icon',
            },
            type: 'string',
          },
        ],
      },
      default: [],
      type: 'array',
      visible: (_1: unknown, formData?: Record<string, unknown>) => formData?.['options.mode'] === 'multiple',
    },
    'dataTranslation',
    'disable',
    'hidden',
    {
      name: 'options.tooltip',
      group: '属性',
      'ui:layout': { labelCol: 6, wrapperCol: 18 },
      'ui:title': '提示内容',
      'ui:titleStyle': { minWidth: 106 },
      'ui:description': {
        title: '(支持{{rec}}模版写法)',
        type: 'icon',
        trigger: 'hover',
      },
      'ui:type': 'text',
      'ui:props': { style: { width: '100%' } },
      type: 'string',
    },
    {
      name: 'options.maxTiledCount',
      group: '属性',
      'ui:layout': { labelCol: 7, wrapperCol: 17 },
      'ui:title': '最大平铺展示数',
      'ui:titleStyle': { minWidth: 106 },
      'ui:type': 'number',
      'ui:props': {
        min: 1,
        step: 1,
      },
      type: 'number',
      visible: (_1: unknown, formData?: Record<string, unknown>) => formData?.['options.mode'] === 'multiple',
    },
    {
      name: 'options.dropdownText',
      group: '属性',
      'ui:layout': { labelCol: 6, wrapperCol: 18 },
      'ui:title': '展示框文案',
      'ui:titleStyle': { minWidth: 106 },
      'ui:type': 'text',
      type: 'string',
      visible: (_1: unknown, formData?: Record<string, unknown>) => formData?.['options.mode'] === 'multiple',
    },
    {
      name: 'options.textColor',
      group: '属性',
      'ui:layout': { labelCol: 6, wrapperCol: 18 },
      'ui:title': '文案颜色',
      'ui:titleStyle': { minWidth: 106 },
      'ui:type': 'color-picker',
      type: 'string',
      visible: (_1: unknown, formData?: Record<string, unknown>) => formData?.['options.mode'] === 'multiple',
    },
    {
      name: 'options.suffixIcon',
      group: '属性',
      'ui:layout': { labelCol: 6, wrapperCol: 18 },
      'ui:title': '后缀图标',
      'ui:description': {
        title: '更多图标可参考<a href="https://ant.design/components/icon-cn/" target="_blank">ANTD官网图标库</a>',
        trigger: 'hover',
        type: 'icon',
      },
      'ui:type': 'auto-complete',
      'ui:props': {
        options: iconOptions,
      },
      type: 'string',
      visible: (_1: unknown, formData?: Record<string, unknown>) => formData?.['options.mode'] === 'multiple',
    },
    {
      name: 'options.trigger',
      group: '属性',
      'ui:layout': { labelCol: 6, wrapperCol: 18 },
      'ui:title': '下拉触发方式',
      'ui:titleStyle': { minWidth: 106 },
      'ui:type': 'radio',
      'ui:props': {
        options: [{ label: '鼠标悬浮', value: 'hover' }, { label: '鼠标点击', value: 'click' }],
      },
      type: 'string',
      default: 'hover',
      visible: (_1: unknown, formData?: Record<string, unknown>) => formData?.['options.mode'] === 'multiple',
    },
    {
      name: 'options.placement',
      group: '属性',
      'ui:layout': { labelCol: 7, wrapperCol: 17 },
      'ui:title': '菜单弹出位置',
      'ui:type': 'select',
      'ui:props': {
        options: [
          { label: '左上角', value: 'topLeft' },
          { label: '正上方', value: 'top' },
          { label: '右上角', value: 'topRight' },
          { label: '左下角', value: 'bottomLeft' },
          { label: '正下方', value: 'bottom' },
          { label: '右下角', value: 'bottomRight' },
        ],
      },
      type: 'string',
      visible: (_1: unknown, formData?: Record<string, unknown>) => formData?.['options.mode'] === 'multiple',
    },
    'hidable',
    'fixed',
    'sorter',
    'sortDirections',
    'filters',
    'filtersMaxSelect',
    'defaultFilteredValue',
    'description',
    // styles
    'width',
    'align',
    'verticalAlign',
    {
      name: 'options.lineHeight',
      group: '样式',
      'ui:title': '行高',
      'ui:description': {
        title: '默认单位为“px”，支持手动指定单位后缀。',
        type: 'icon',
        trigger: 'hover',
      },
      'ui:type': 'text',
      'ui:props': { style: { width: '100%' } },
      type: 'string',
    },
    ...styleAttributesSchema,
  ]),
  icon: '<svg t="1627278690307" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6409" width="48" height="48"><path d="M341.333333 512a42.666667 42.666667 0 0 0 42.666667 42.666667h256a42.666667 42.666667 0 0 0 0-85.333334H384a42.666667 42.666667 0 0 0-42.666667 42.666667z" p-id="6410"></path><path d="M384 682.666667H307.626667A176.213333 176.213333 0 0 1 128 527.786667 170.666667 170.666667 0 0 1 298.666667 341.333333h85.333333a42.666667 42.666667 0 0 0 0-85.333333H307.626667a262.4 262.4 0 0 0-262.826667 222.293333A256 256 0 0 0 298.666667 768h85.333333a42.666667 42.666667 0 0 0 0-85.333333zM981.333333 479.573333A262.826667 262.826667 0 0 0 715.093333 256h-64.426666C616.106667 256 597.333333 275.2 597.333333 298.666667a42.666667 42.666667 0 0 0 42.666667 42.666666h76.373333A176.213333 176.213333 0 0 1 896 496.213333 170.666667 170.666667 0 0 1 725.333333 682.666667h-85.333333a42.666667 42.666667 0 0 0 0 85.333333h85.333333a256 256 0 0 0 256-288.426667z" p-id="6411"></path></svg>',
} as DripTableComponentAttrConfig;
