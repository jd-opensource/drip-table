import { DripTableComponentAttrConfig } from '../typing';
import { basicColumnAttrComponents } from './configs';

export default {
  $id: '$display_inputnumber',
  'ui:type': 'input-number',
  type: 'string',
  group: '基础组件',
  fieldKey: 'input-number',
  title: '数字组件',
  paramName: '',
  default: '',
  attrSchema: [
    ...basicColumnAttrComponents('数字'),
    {
      name: 'options.bindValue',
      group: '组件属性',
      'ui:title': '值回显强制与数据绑定',
      'ui:layout': { labelCol: 12, wrapperCol: 8 },
      'ui:type': 'switch',
      'ui:props': {},
      type: 'boolean',
      default: true,
    },
    {
      name: 'options.disabled',
      group: '组件属性',
      'ui:title': '是否禁用',
      'ui:type': 'switch',
      'ui:props': {},
      type: 'boolean',
    },
    {
      name: 'options.step',
      group: '组件属性',
      'ui:title': '步数',
      'ui:type': 'text',
      default: '1',
    },
    {
      name: 'options.min',
      group: '组件属性',
      'ui:title': '最小值',
      'ui:type': 'text',
      default: '0',
    },
    {
      name: 'options.max',
      group: '组件属性',
      'ui:title': '最大值',
      'ui:type': 'text',
    },
  ],
  icon: '<svg width="16" height="16" viewBox="0 0 16 16" style="shape-rendering:geometricPrecision" class="primaryDisplayTypeIcon"><path fill-rule="evenodd" fill="#949494" d="M4,10 L4,6.06298828 L2.01023277,6.06298828 C1.44124014,6.06298828 0.979980469,5.60514432 0.979980469,5.03149414 C0.979980469,4.46181566 1.446147,4 2.01023277,4 L4,4 L4,2.04301188 C4,1.50175979 4.43942184,1.06298828 4.98999023,1.06298828 C5.53674674,1.06298828 5.97998047,1.51091265 5.97998047,2.04301188 L5.97998047,4 L10.0200195,4 L10.0200195,2.04301188 C10.0200195,1.50175979 10.4594414,1.06298828 11.0100098,1.06298828 C11.5567663,1.06298828 12,1.51091265 12,2.04301188 L12,4 L13.9605924,4 C14.5295851,4 14.9908447,4.45784396 14.9908447,5.03149414 C14.9908447,5.60117262 14.5246782,6.06298828 13.9605924,6.06298828 L12,6.06298828 L12,10 L13.9605924,10 C14.5295851,10 14.9908447,10.457844 14.9908447,11.0314941 C14.9908447,11.6011726 14.5246782,12.0629883 13.9605924,12.0629883 L12,12.0629883 L12,14.0199764 C12,14.5612285 11.5605782,15 11.0100098,15 C10.4632533,15 10.0200195,14.5520756 10.0200195,14.0199764 L10.0200195,12.0629883 L5.97998047,12.0629883 L5.97998047,14.0199764 C5.97998047,14.5612285 5.54055863,15 4.98999023,15 C4.44323373,15 4,14.5520756 4,14.0199764 L4,12.0629883 L2.01023277,12.0629883 C1.44124014,12.0629883 0.979980469,11.6051443 0.979980469,11.0314941 C0.979980469,10.4618157 1.446147,10 2.01023277,10 L4,10 Z M5.97998047,10 L10.0200195,10 L10.0200195,6.06298828 L5.97998047,6.06298828 L5.97998047,10 Z"></path></svg>',
} as DripTableComponentAttrConfig;
