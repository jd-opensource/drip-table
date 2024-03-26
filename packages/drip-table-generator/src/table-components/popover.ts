import { DripTableComponentAttrConfig } from '../typing';
import { generateColumnAttrComponentsByNames, styleAttributesSchema, titleConfig } from './configs';

export default {
  $id: '$display_popover',
  'ui:type': 'popover',
  type: 'string',
  group: '容器组件',
  fieldKey: 'popover_qywxDIIO',
  title: '浮窗组件',
  paramName: '',
  default: '',
  attrSchema: generateColumnAttrComponentsByNames([
    titleConfig('浮窗'),
    {
      name: 'options.placement',
      group: '属性',
      'ui:layout': { labelCol: 6, wrapperCol: 18 },
      'ui:title': '浮窗位置',
      'ui:type': 'radio',
      'ui:props': {
        mode: 'button',
        buttonStyle: 'solid',
        size: 'small',
        options: [
          { label: '顶部', value: 'top' },
          { label: '左侧', value: 'left' },
          { label: '右侧', value: 'right' },
          { label: '底部', value: 'bottom' },
          { label: '顶部左侧', value: 'topLeft' },
          { label: '顶部右侧', value: 'topRight' },
          { label: '底部左侧', value: 'bottomLeft' },
          { label: '底部右侧', value: 'bottomRight' },
          { label: '左上', value: 'leftTop' },
          { label: '左下', value: 'leftBottom' },
          { label: '右上', value: 'rightTop' },
          { label: '右下', value: 'rightBottom' },
        ],
      },
      type: 'string',
      default: 'top',
    },
    {
      name: 'options.trigger',
      group: '属性',
      'ui:layout': { labelCol: 6, wrapperCol: 18 },
      'ui:title': '悬浮框触发器',
      'ui:type': 'radio',
      'ui:props': {
        options: [
          { label: '点击', value: 'click' },
          { label: '悬浮', value: 'hover' },
        ],
      },
      type: 'string',
      default: 'hover',
    },
    'dataTranslation',
    'disable',
    'hidden',
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
    ...styleAttributesSchema,
  ]),
  icon: '<svg t="1711349774802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="25070" width="64" height="64"><path d="M896 128a42.666667 42.666667 0 0 1 42.666667 42.666667v298.666666h-85.333334V213.333333H170.666667v597.333334h256v85.333333H128a42.666667 42.666667 0 0 1-42.666667-42.666667V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667h768z m0 426.666667a42.666667 42.666667 0 0 1 42.666667 42.666666v256a42.666667 42.666667 0 0 1-42.666667 42.666667h-341.333333a42.666667 42.666667 0 0 1-42.666667-42.666667v-256a42.666667 42.666667 0 0 1 42.666667-42.666666h341.333333z m-42.666667 85.333333h-256v170.666667h256v-170.666667z" fill="#08090A" p-id="25071"></path></svg>',
} as DripTableComponentAttrConfig;
