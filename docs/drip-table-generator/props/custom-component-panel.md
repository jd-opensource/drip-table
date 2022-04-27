# customComponentPanel

- 描述：自定义组件属性面板
- 类型：
```typescript
type DripTableGeneratorPanel = {
  mode: 'add' | 'replace';
  configs: DripTableComponentAttrConfig[];
  orders?: string[];
}
```
- 默认值：无

### `DripTableComponentAttrConfig` 参数
**当自定义表单后，需要通过该参数配置相应的配置信息展示在页面的组件栏中**

| 属性               | 描述                                                                                  | 类型                                   | 默认值  | 必填 |
| ------------------ | ------------------------------------------------------------------------------------- | -------------------------------------- | ------- | ---- |
| key             | 唯一标识 | `string`                               | -       | 否   |
| ui:type             | 组件类型 | `string`                               | -       | 否   |
| type             | 数据类型 | `string`                               | -       | 否   |
| group             | 组名称 | `string`                               | -       | 否   |
| title             | 组件名称 | `string`                               | -       | 否   |
| attrSchema             | 属性配置 | `AttrSchema[]`                               | -       | 否   |
| `[...props]`  | 其他属性 | `unknown` | - |

#### `DripTableComponentAttrConfig` 中 `AttrSchema` 参数
| 属性               | 描述                                                                                  | 类型                                   | 默认值  | 必填 |
| ------------------ | ------------------------------------------------------------------------------------- | -------------------------------------- | ------- | ---- |
| name             | 属性名 | `string`                               | -       | 否   |
| required             | 属性是否必填 | `boolean`                               | `false`       | 否   |
| ui:title             | 属性标题 | `string`                               | -       | 是   |
| ui:type             | 属性组件类型, 默认属性组件类型包括：`input`、 `text`、 `switch`、 `number`、 `checkbox`、 `radio`、 `select`、 `cascader`、 `render-html`、 `array-list`、 `color-picker`。当组件类型为 `custom::` 开头时可以通过`ui:externalComponent` 属性传入外部组件。 | `string`                               | -       | 是   |
| ui:externalComponent             | 外部组件 | `React.ComponentClass \| React.FunctionComponent`                               | -       | 否   |
| ui:props             | 属性组件的属性 | `Record`                               | -       | 否   |
| type             | 属性数据类型 | `string`                               | -       | 否   |
| `[...props]`  | 其他属性 | `unknown` | - |


### 示例

```tsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import 'antd/dist/antd.css';
import 'drip-table/dist/index.css';
import 'drip-table-generator/dist/index.css';

import { Input } from 'antd';
import { DripTableExtraOptions, DripTableSchema } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import DripTableGenerator from 'drip-table-generator';
import React, { useState } from 'react';

import TextComponent from '../preview/text-component';

const componentsPanelSetting: DripTableGeneratorProps['customComponentPanel'] = {
  mode: 'replace',
  configs: [
    {
      'ui:type': 'text',
      type: 'string',
      group: '基础组件库',
      fieldKey: 'mock_builtin_text',
      title: '内置文本',
      attrSchema: [
        {
          name: 'options.mode',
          required: true,
          group: '组件属性',
          'ui:title': '渲染模式',
          'ui:type': 'radio',
          'ui:props': {
            options: [
              { label: '单行模式', value: 'single' },
              { label: '多行模式', value: 'multiple' },
            ]
          },
          default: 'single',
        },
        {
          name: 'dataIndex',
          required: true,
          group: '组件属性',
          'ui:title': '字段选择',
          'ui:type': 'auto-complete',
          'ui:props': {
            placeholder: '请输入文本',
            optionsParam: '$$FIELD_KEY_OPTIONS$$',
          },
        },
        {
          name: 'options.fontSize',
          required: true,
          group: '组件样式',
          'ui:title': '字体大小',
          'ui:type': 'input',
          'ui:props': {
            placeholder: '请输入字体大小',
          },
        },
      ],
    },
    {
      'ui:type': 'custom::TextComponent',
      type: 'string',
      group: '业务组件库',
      fieldKey: 'mock_custom_text',
      title: '自定义文本',
      attrSchema: [
        {
          name: 'dataIndex',
          required: true,
          group: '自定义组',
          'ui:title': '字段选择',
          'ui:type': 'auto-complete',
          'ui:props': {
            optionsParam: '$$FIELD_KEY_OPTIONS$$',
          },
          type: 'string',
        },
        {
          name: 'options.fontSize',
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
          name: 'options.noDataValue',
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
          name: 'options.description',
          group: '自定义组',
          'ui:title': '组件说明',
          'ui:type': 'render-html',
          default: '<span style="color:red;">这是一条说明</span>',
          type: 'string',
        },
      ],
    },
  ],
  orders: ['业务组件库', '基础组件库'],
}

const dataSource = [
  {
    id: 1,
    name: "商品一",
    price: 7999,
    status: "onSale",
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
];

const Demo = () => {
  return (
    <DripTableGenerator
      mockDataSource
      driver={DripTableDriverAntDesign}
      dataSource={dataSource}
      customComponents={{ custom: { TextComponent } }}
      customComponentPanel={componentsPanelSetting}
    />
  );
};

export default Demo;
```
