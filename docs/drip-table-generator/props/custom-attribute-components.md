---
order: 3
title: customAttributeComponents
---

## customAttributeComponents

- 描述：自定义属性面板组件, 允许用户传入自定义代码来丰富属性控制面板的组件形式。
- 类型：

```ts
interface CustomComponentProps {
  theme?: DripTableDriver;
  schema: DTGComponentPropertySchema;
  value?: string;
  onChange?: (value: string) => void;
  onValidate?: (errorMessage: string) => void;
}
type customAttributeComponents = Record<string, new <P extends CustomComponentProps>(props: P) => React.PureComponent<P>>;
```

- 默认值：无

```tsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */


import { Button, Input } from 'antd';
import { DripTableExtraOptions, DripTableSchema } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import DripTableGenerator, { DripTableGeneratorPanel, DTGComponentPropertySchema } from 'drip-table-generator';
import React, { useState } from 'react';

const CustomGlobalConfigPanel: DripTableGeneratorPanel<DTGComponentPropertySchema> = {
  mode: 'add',
  configs: [
    {
      name: 'customProps1',
      group: '自定义组',
      'ui:title': '自定义属性1',
      'ui:type': 'custom::TestComponent',
      'ui:props': {
        placeholder: '请输入自定义属性',
        buttonText: '点击触发',
      },
      type: 'string',
    },
    {
      name: 'customProps2',
      group: '自定义组',
      'ui:title': '自定义属性2',
      'ui:type': 'custom::ExtraComponent',
      'ui:props': {},
      'ui:externalComponent': () => 'ui externalComponent test',
      type: 'string',
    },
  ],
};

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      options: {
        mode: "single",
        maxRow: 1,
      },
    },
    {
      key: "mock_2",
      title: "商品详情",
      align: "center",
      dataIndex: "description",
      component: "text",
      options: {
        mode: "single",
        ellipsis: true,
        maxRow: 1,
      },
    },
  ],
};

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
      schema={schema}
      dataSource={dataSource}
      customGlobalConfigPanel={CustomGlobalConfigPanel}
      customAttributeComponents={{
        TestComponent: (props) => (<div>
            <Input placeholder={props.schema['ui:props'].placeholder}/>
            <Button>{props.schema['ui:props'].buttonText}</Button>
            </div>)
      }}
      ajv={{ additionalProperties: true }}
    />
  );
};

export default Demo;
```
