import { DripTableComponentAttrConfig } from '../typing';
import { basicColumnAttrComponents } from './configs';

export default {
  $id: '$display_popuppage',
  'ui:type': 'pop-up-page',
  type: 'string',
  group: '基础组件',
  fieldKey: 'pop-up-page',
  title: '弹出网页',
  paramName: '',
  default: '',
  attrSchema: [
    ...basicColumnAttrComponents('弹出网页'),
    {
      name: 'options.link',
      group: '组件属性',
      'ui:title': 'iframe链接',
      'ui:type': 'input',
      'ui:props': {
        style: { width: '100%' },
        placeholder: 'http://xxx.jd.com?name={{rec.name}}&age={{$age$}}',
      },
      type: 'string',
      default: '',
      required: true,
    },
    {
      name: 'options.title',
      group: '样式配置',
      'ui:title': '弹窗标题',
      'ui:type': 'input',
      'ui:props': {
        placeholder: '弹窗标题',
        style: { width: 140 },
      },
    },
    {
      name: 'options.auxiliaryDesc',
      group: '样式配置',
      'ui:title': '辅助文字',
      'ui:type': 'input',
      'ui:props': {
        placeholder: '辅助文字',
        style: { width: 140 },
      },
    },
    {
      name: 'options.embeddedSafetyPadding',
      group: '样式配置',
      'ui:title': '嵌入安全边距',
      'ui:type': 'input',
      'ui:props': {
        placeholder: '嵌入安全边距',
        style: { width: 140 },
      },
    },
    {
      name: 'options.width',
      group: '样式配置',
      'ui:title': '弹窗宽度',
      'ui:type': 'input',
      'ui:props': {
        placeholder: 'e.g.600px|50%',
        style: { width: 140 },
      },
    },
    {
      name: 'options.maxWidth',
      group: '样式配置',
      'ui:title': '弹窗最大宽度',
      'ui:type': 'input',
      'ui:props': {
        placeholder: 'e.g.1152px|unset',
        style: { width: 140 },
      },
      'ui:description': {
        trigger: 'hover',
        type: 'icon',
        title: '支持配置弹窗最大宽度，可设置像素值或者设置为unset，不设置默认为1152px',
      },
    },
    {
      name: 'options.height',
      group: '样式配置',
      'ui:title': '弹窗高度',
      'ui:type': 'input',
      'ui:props': {
        placeholder: 'e.g.500px|50%',
        style: { width: 140 },
      },
    },
    {
      name: 'options.maxHeight',
      group: '样式配置',
      'ui:title': '弹窗最大高度',
      'ui:type': 'input',
      'ui:props': {
        placeholder: 'e.g.730px|unset',
        style: { width: 140 },
      },
      'ui:description': {
        trigger: 'hover',
        type: 'icon',
        title: '支持配置弹窗最大高度，可设置像素值或者设置为unset，不设置默认为730px',
      },
    },
    {
      name: 'options.label',
      group: '样式配置',
      'ui:title': '按钮文案',
      'ui:type': 'input',
      'ui:props': {
        style: { width: 140 },
      },
      default: '弹网页',
    },
    {
      name: 'options.buttonType',
      group: '样式配置',
      'ui:title': '按钮类型',
      'ui:type': 'select',
      'ui:props': {
        options: [
          { label: 'default', value: void 0 },
          { label: 'primary', value: 'primary' },
          { label: 'dashed', value: 'dashed' },
          { label: 'text', value: 'text' },
          { label: 'link', value: 'link' },
        ],
        style: { width: 140 },
      },
      default: 'text',
    },
    {
      name: 'options.size',
      group: '样式配置',
      'ui:title': '按钮尺寸',
      'ui:type': 'select',
      'ui:props': {
        options: [
          { label: 'large', value: 'large' },
          { label: 'middle', value: 'middle' },
          { label: 'small', value: 'small' },
        ],
        style: { width: 140 },
      },
      default: 'middle',
    },
    {
      name: 'options.shape',
      group: '样式配置',
      'ui:title': '按钮形状',
      'ui:type': 'select',
      'ui:props': {
        options: [
          { label: 'circle', value: 'circle' },
          { label: 'round', value: 'round' },
        ],
        style: { width: 140 },
      },
      default: '',
    },
  ],
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="works-ext-icon works-ext-icon-layout"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>',
} as DripTableComponentAttrConfig;
