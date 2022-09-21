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
      'ui:title': '设置提示内容',
      'ui:description': {
        title: '(支持{{rec}}模版写法)',
        type: 'icon',
        trigger: 'hover',
      },
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
  icon: '<svg t="1661412805775" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6368" width="18" height="18"><path d="M225.28 735.232h573.44c11.264 0 20.48 9.216 20.48 20.48v40.96c0 11.264-9.216 20.48-20.48 20.48H225.28c-11.264 0-20.48-9.216-20.48-20.48v-40.96c0-11.264 9.216-20.48 20.48-20.48z m0-184.32h573.44c11.264 0 20.48 9.216 20.48 20.48v40.96c0 11.264-9.216 20.48-20.48 20.48H225.28c-11.264 0-20.48-9.216-20.48-20.48v-40.96c0-11.264 9.216-20.48 20.48-20.48z m364.544-184.32H798.72c11.264 0 20.48 9.216 20.48 20.48v40.96c0 11.264-9.216 20.48-20.48 20.48H589.824c-11.264 0-20.48-9.216-20.48-20.48v-40.96c0-11.264 9.216-20.48 20.48-20.48z m-102.4 88.064L390.144 215.04c-2.048-4.096-6.144-7.168-11.264-7.168h-73.728c-4.096 0-9.216 3.072-10.24 7.168L204.8 454.656c-1.024 4.096 1.024 10.24 7.168 10.24h47.104c4.096 0 9.216-4.096 10.24-8.192l18.432-51.2h113.664l20.48 51.2c1.024 4.096 6.144 8.192 10.24 8.192h47.104c6.144 0 9.216-5.12 8.192-10.24zM309.248 344.064l29.696-75.776h6.144l32.768 75.776h-68.608z" p-id="6369"></path></svg>',
} as DripTableComponentAttrConfig;
