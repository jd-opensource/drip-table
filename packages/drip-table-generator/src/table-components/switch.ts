import { DripTableComponentAttrConfig } from '../typing';
import { dataIndexColumnAttrComponents, generateColumnAttrComponentsByNames, styleAttributesSchema, titleConfig } from './configs';

export default {
  $id: '$display_switch',
  'ui:type': 'switch',
  type: 'string',
  group: '基础组件',
  fieldKey: 'switch_qywxDIIO',
  title: '开关组件',
  paramName: '',
  default: '',
  attrSchema: generateColumnAttrComponentsByNames([
    titleConfig('开关'),
    ...dataIndexColumnAttrComponents('switch', {
      layout: { labelCol: 8, wrapperCol: 16 },
    }),
    {
      name: 'options.bindValue',
      group: '属性',
      'ui:layout': { labelCol: 6, wrapperCol: 18 },
      'ui:title': '数据绑定',
      'ui:description': {
        type: 'icon',
        trigger: 'hover',
        title: '值回显强制与数据绑定，默认为 true',
      },
      'ui:type': 'switch',
      'ui:props': {
        uncheckedChildren: '否',
        checkedChildren: '是',
      },
      default: false,
      type: 'boolean',
    },
    {
      name: 'options.event',
      group: '属性',
      'ui:layout': { labelCol: 6, wrapperCol: 18 },
      'ui:title': '事件名称',
      'ui:description': {
        title: '事件类型为"drip-switch-change", 事件机制详见<a href="https://drip-table.jd.com/drip-table/props/on-event" target="_blank">官网文档</a>',
        trigger: 'hover',
        type: 'icon',
      },
      'ui:type': 'text',
      default: '',
      type: 'string',
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
  icon: '<svg t="1710732314730" class="icon" viewBox="0 0 1643 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4371" width="64" height="64"><path d="M1131.861333 0H512a512 512 0 0 0 0 1024h619.861333a512 512 0 0 0 0-1024z m0 887.466667H512a375.466667 375.466667 0 0 1 0-750.933334h619.861333a375.466667 375.466667 0 0 1 0 750.933334z" fill="#4F4A4A" p-id="4372"></path><path d="M1104.554667 278.528a247.125333 247.125333 0 1 0 245.76 245.76 247.125333 247.125333 0 0 0-245.76-245.76z" fill="#4F4A4A" p-id="4373"></path></svg>',
} as DripTableComponentAttrConfig;
