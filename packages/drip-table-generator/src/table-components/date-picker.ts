import { DripTableComponentAttrConfig } from '../typing';
import { basicColumnAttrComponents, dataIndexColumnAttrComponents } from './configs';

export default {
  $id: '$display_datepicker',
  'ui:type': 'date-picker',
  type: 'string',
  group: '基础组件',
  fieldKey: 'date-picker',
  title: '日期组件',
  paramName: '',
  default: '',
  attrSchema: [
    {
      name: 'options.mode',
      group: '组件属性',
      'ui:title': '模式',
      'ui:type': 'radio',
      'ui:props': {
        options: [
          { label: '基本日期', value: 'basic' },
          { label: '日期范围', value: 'range' },
        ],
      },
      type: 'string',
      default: 'single',
    },
    {
      name: 'options.format',
      group: '组件属性',
      'ui:title': '日期格式',
      'ui:type': 'input',
      default: 'YYYY-MM-DD',
    },
    ...basicColumnAttrComponents('日期'),
    ...dataIndexColumnAttrComponents(
      (_1, formData) => formData?.['options.mode'] === 'basic',
      (_1, formData) => formData?.['options.mode'] === 'basic' && formData?.dataIndexMode === 'direct',
      (_1, formData) => formData?.['options.mode'] === 'basic' && formData?.dataIndexMode === 'nested',
    ),
    {
      name: 'options.parts',
      group: '组件属性',
      'ui:title': '日期范围配置',
      'ui:type': 'array-list',
      'ui:props': {
        items: [
          ...dataIndexColumnAttrComponents(),
        ],
      },
      default: [] as unknown[],
      visible: (_1: unknown[], formData: Record<string, unknown>) => formData['options.mode'] === 'range',
    },
  ],
  icon: '<svg t="1661938776486" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2378" width="200" height="200"><path d="M416.087 607.831l95.987 0 0-96-95.987 0L416.087 607.831zM544.078 735.828l96 0 0-95.994-96 0L544.078 735.828zM416.087 735.828l95.987 0 0-95.994-95.987 0L416.087 735.828zM288.084 607.831l96 0 0-96-96 0L288.084 607.831zM288.084 735.828l96 0 0-95.994-96 0L288.084 735.828zM544.078 607.831l96 0 0-96-96 0L544.078 607.831zM672.081 479.831l96 0 0-95.997-96 0L672.081 479.831zM832.078 191.833 224.077 191.833c-17.674 0-31.994 14.326-31.994 32.003l0 575.998c0 17.674 14.32 32 31.994 32l608.001 0c17.674 0 32.003-14.326 32.003-32L864.081 223.837C864.082 206.16 849.752 191.833 832.078 191.833zM832.082 767.832c0 17.674-14.326 32-32 32L256.08 799.832c-17.674 0-32-14.326-32-32L224.08 351.831c0-17.674 14.326-32 32-32l544.001 0c17.674 0 32 14.326 32 32L832.081 767.832zM672.081 607.831l96 0 0-96-96 0L672.081 607.831zM544.078 479.831l96 0 0-95.997-96 0L544.078 479.831z" p-id="2379"></path></svg>',
} as DripTableComponentAttrConfig;
