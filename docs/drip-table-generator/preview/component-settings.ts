import { DripTableGeneratorProps } from 'drip-table-generator';

const CustomGeneratorComponentPanel: DripTableGeneratorProps['customComponentPanel'] = {
  mode: 'add',
  components: [
    {
      'ui:type': 'custom::TextComponent',
      type: 'string',
      group: '业务组件',
      fieldKey: 'text_qywxDIIO',
      title: '业务文本',
      attrSchema: [
        {
          name: 'dataIndex',
          required: true,
          group: '自定义组',
          'ui:title': '字段选择',
          'ui:type': 'select',
          'ui:props': {
            optionsParam: '$$FIELD_KEY_OPTIONS$$',
          },
          type: 'string',
        },
        {
          name: 'ui:props.fontSize',
          group: '自定义组',
          'ui:title': '字体大小',
          'ui:type': 'number',
          'ui:description': {
            trigger: 'hover',
            type: 'icon',
            title: '控制表格该列默认字体大小，默认单位为“px”，支持手动指定单位后缀。',
          },
          default: 12,
          minimum: 12,
          type: 'number',
        },
        {
          name: 'ui:props.noDataValue',
          group: '自定义组',
          'ui:title': '兜底文案',
          'ui:type': 'input',
          'ui:description': {
            trigger: 'hover',
            type: 'icon',
            title: '当数据不下发时展示的兜底文案',
          },
          default: '',
          visible: 'return formData.dataIndex',
          type: 'string',
        },
        {
          name: 'description',
          group: '自定义组',
          'ui:title': '组件说明',
          'ui:type': 'render-html',
          default: '<span style="color:red;">这是一条说明</span>',
          type: 'string',
        },
      ],
    },
  ],
};

export default CustomGeneratorComponentPanel;
