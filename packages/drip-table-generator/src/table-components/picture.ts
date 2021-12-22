import { DripTableComponentConfig } from '../typing';
import { basicColumnAttrComponents } from './configs';

export default {
  $id: '$table_picture',
  'ui:type': 'image',
  type: 'string',
  group: '基础组件',
  fieldKey: 'picture_qywxDIIO',
  title: '图片组件',
  paramName: '',
  default: '',
  attrSchema: [
    ...basicColumnAttrComponents,
    {
      name: 'dataIndex',
      required: true,
      'ui:title': '字段选择',
      'ui:type': 'auto-complete',
      'ui:props': {
        from: 'dataFields',
      },
      type: 'string',
    },
    {
      name: 'ui:props.imgWidth',
      'ui:title': '图片宽度',
      'ui:type': 'number',
      'ui:minium': 0.01,
      'ui:step': 0.01,
      default: 100,
    },
    {
      name: 'ui:props.imgHeight',
      'ui:title': '图片高度',
      'ui:type': 'number',
      'ui:minium': 0.01,
      'ui:step': 0.01,
      default: 100,
    },
    {
      name: 'ui:props.previewImg',
      'ui:title': '是否预览图片',
      'ui:type': 'switch',
      type: 'boolean',
      default: true,
    },
  ],
  icon: '<svg t="1627276571182" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4622" width="48" height="48"><path d="M422.912 404.672c0 46.72-37.888 84.672-84.672 84.672-46.656 0-84.672-37.888-84.672-84.672C253.568 357.824 291.584 320 338.24 320 385.024 320 422.912 357.824 422.912 404.672zM820.544 768c0 0-34.944-274.432-139.648-274.432-104.768 0-139.712 134.912-209.408 134.912-69.952 0-69.952-33.728-139.776-33.728C261.888 594.752 192 768 192 768L820.544 768 820.544 768zM896 128 128 128l0 704 768 0L896 128M896 64c35.392 0 64 28.672 64 64l0 704c0 35.392-28.608 64-64 64L128 896c-35.328 0-64-28.608-64-64L64 128c0-35.328 28.672-64 64-64L896 64 896 64z" p-id="4623"></path></svg>',
} as DripTableComponentConfig;
