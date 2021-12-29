import { DripTableComponentAttrConfig } from '../typing';
import { basicColumnAttrComponents } from './configs';

export default {
  $id: '$table_tag',
  'ui:type': 'tag',
  type: 'string',
  group: '基础组件',
  fieldKey: 'tag_qywxDIIO',
  title: '标签组件',
  paramName: '',
  default: '',
  attrSchema: [
    ...basicColumnAttrComponents,
    {
      name: 'dataIndexMode',
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
    },
    {
      name: 'dataIndex',
      required: true,
      'ui:title': '字段选择',
      'ui:type': 'auto-complete',
      'ui:props': {
        from: 'dataFields',
      },
      type: 'string',
      visible: (_1: string, formData: Record<string, unknown>) => formData.dataIndexMode !== 'nested',
    },
    {
      name: 'dataIndex',
      required: true,
      'ui:title': '字段选择',
      'ui:type': 'select',
      'ui:props': {
        from: 'dataFields',
        mode: 'tags',
        tokenSeparators: ['.', ',', '，'],
      },
      type: 'array',
      visible: (_1: string, formData: Record<string, unknown>) => formData.dataIndexMode === 'nested',
    },
    {
      name: 'prefix',
      'ui:title': '前缀文案',
      'ui:type': 'input',
      type: 'string',
      default: '',
    },
    {
      name: 'suffix',
      'ui:title': '后缀文案',
      'ui:type': 'input',
      type: 'string',
      default: '',
    },
    {
      name: 'color',
      required: false,
      'ui:title': '字体颜色',
      'ui:type': 'custom::ColorPicker',
      'ui:props': {},
      type: 'string',
    },
    {
      name: 'borderColor',
      required: false,
      'ui:title': '边框颜色',
      'ui:type': 'custom::ColorPicker',
      'ui:props': {},
      type: 'string',
    },
    {
      name: 'backgroundColor',
      required: false,
      'ui:title': '背景颜色',
      'ui:type': 'custom::ColorPicker',
      'ui:props': {},
      type: 'string',
    },
    {
      name: 'radius',
      required: false,
      'ui:title': '圆角半径',
      'ui:type': 'number',
      'ui:props': {
        minimum: 0,
        maximum: 24,
      },
      type: 'string',
    },
    {
      name: 'tagOptions',
      required: false,
      'ui:title': '枚举值',
      'ui:type': 'custom::ArrayComponent',
      'ui:props': {
        items: [
          {
            name: 'value',
            'ui:title': '属性值',
            'ui:type': 'input',
            type: 'string',
            default: '',
          },
          {
            name: 'label',
            'ui:title': '展示文案',
            'ui:type': 'input',
            type: 'string',
            default: '',
          },
        ],
      },
      type: 'string',
    },
  ],
  icon: '<svg t="1637755462372" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2309" width="14" height="14"><path d="M323.008 786.752c-52.928 0-96-43.072-96-96s43.072-96 96-96 96 43.072 96 96S375.936 786.752 323.008 786.752zM323.008 658.752c-17.632 0-32 14.336-32 32s14.368 32 32 32 32-14.336 32-32S340.64 658.752 323.008 658.752z" p-id="2310"></path><path d="M416.096 927.072 284.224 927.072c-159.936 0-186.912-59.232-186.912-192l0-140.8c0-74.272 14.304-96.256 70.72-150.976l327.04-319.904c36.576-35.488 105.888-35.392 142.304-0.096l263.072 256.032c18.336 17.792 28.864 43.552 28.864 70.656 0 27.296-10.656 53.28-29.248 71.264l-290.016 294.592C544.544 880.416 497.216 927.072 416.096 927.072zM566.24 159.488c-10.496 0-20.16 3.52-26.528 9.696l-327.04 319.936c-49.952 48.48-51.36 54.528-51.36 105.152l0 140.8c0 110.272 8.352 128 122.912 128l131.872 0c52.672 0 83.744-28.48 148.992-92.8l26.656-26.144 263.232-268.256c6.784-6.592 10.336-15.808 10.336-25.888 0-9.888-3.424-18.88-9.472-24.736l-263.072-256.032C586.432 163.04 576.736 159.488 566.24 159.488z" p-id="2311"></path></svg>',
} as DripTableComponentAttrConfig;
