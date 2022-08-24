import { DripTableComponentAttrConfig } from '../typing';
import { basicColumnAttrComponents } from './configs';

export default {
  $id: '$table_richtext',
  'ui:type': 'rich-text',
  type: 'string',
  group: '自定义组件',
  fieldKey: 'rich-text',
  title: '富文本组件',
  paramName: '',
  default: '',
  attrSchema: [
    ...basicColumnAttrComponents('富文本'),
    {
      name: 'options.tooltip',
      group: '组件属性',
      'ui:title': '设置tooltip内容(支持{{rec}}模版写法)',
      'ui:type': 'text',
      'ui:props': {
        checkedChildren: '是',
        unCheckedChildren: '否',
      },
      type: 'string',
    },
    {
      name: 'options.render',
      group: '内容编辑',
      'ui:title': '',
      'ui:type': 'rich-text-editor',
      'ui:layout': {
        labelCol: 1,
        wrapperCol: 20,
        extraRow: true,
        customHelpMsg: true,
      },
      'ui:props': {
        style: {
          height: 370,
          marginTop: '-16px',
        },
      },
      'ui:wrapperStyle': { minWidth: 680 },
      type: 'string',
      default: '<p><strong>{{rec.name}}</strong></p>',
    },
    {
      name: 'options.render',
      group: '代码编辑',
      'ui:title': '',
      'ui:type': 'text',
      'ui:layout': {
        labelCol: 0,
        wrapperCol: 24,
      },
      'ui:props': {
        style: {
          width: '100%',
        },
        autoSize: true,
        rows: 6,
      },
      type: 'string',
      default: '<p><strong>{{rec.name}}</strong></p>',
    },
  ],
  icon: '<svg t="1627277503592" class="icon" viewBox="0 0 1097 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5523" width="48" height="48"><path d="M352.585143 799.414857l-28.562286 28.562286a18.285714 18.285714 0 0 1-26.294857 0L31.451429 561.700571a18.285714 18.285714 0 0 1 0-26.294857l266.276571-266.276571a18.285714 18.285714 0 0 1 26.294857 0l28.562286 28.562286a18.285714 18.285714 0 0 1 0 26.294857L128 548.571429l224.585143 224.585142a18.285714 18.285714 0 0 1 0 26.294858z m337.700571-609.718857l-213.138285 737.718857a18.139429 18.139429 0 0 1-22.272 12.580572l-35.437715-9.728a18.505143 18.505143 0 0 1-12.580571-22.857143L619.995429 169.691429a18.139429 18.139429 0 0 1 22.272-12.580572l35.437714 9.728a18.505143 18.505143 0 0 1 12.580571 22.857143z m375.442286 372.004571L799.451429 827.977143a18.285714 18.285714 0 0 1-26.294858 0l-28.562285-28.562286a18.285714 18.285714 0 0 1 0-26.294857l224.585143-224.585143-224.585143-224.585143a18.285714 18.285714 0 0 1 0-26.294857l28.562285-28.562286a18.285714 18.285714 0 0 1 26.294858 0l266.276571 266.276572a18.285714 18.285714 0 0 1 0 26.294857z" fill="" p-id="5524"></path></svg>',
} as DripTableComponentAttrConfig;
