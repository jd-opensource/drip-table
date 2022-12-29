---
title: 自定义组件库 components
toc: content
---

## 表格单元格组件库 components

- 描述：表格单元格组件库
- 类型：

  ```typescript
  interface {
    [libName: string]: {
      [componentName: string]:
      React.JSXElementConstructor<
      DripTableComponentProps<
      RecordType,
      DripTableColumnSchema,
      NonNullable<ExtraOptions['CustomComponentEvent']>,
      NonNullable<ExtraOptions['CustomComponentExtraData']>
      >
      >;
    };
  };
  ```

- 默认值：`undefined`

```tsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable, { DripTableComponentProps, DripTableRecordTypeBase } from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";

// 自定义组件表格渲染列 Schema 类型定义。
type SampleColumnSchema = DripTableColumnSchema<'custom::Sample', {
  someCustomConfigure: string;
}>;
// 自定义组件属性接口定义。
interface SampleComponentProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, SampleColumnSchema> { }

// 自定义组件实现。
const SampleComponent = <RecordType extends DripTableRecordTypeBase>(props: SampleComponentProps<RecordType>) => (
  <div>Sample: {props.schema.options.someCustomConfigure}</div>
);
SampleComponent.componentName = 'Sample';
SampleComponent.schema = { // https://ajv.js.org/json-schema.html
  type: 'object',
  properties: {
    someCustomConfigure: { type: 'string' },
  },
};

// 对所有自定义组件做集合处理，准备提供给 DripTable 使用。
const customComponents = {
  [SampleComponent.componentName]: SampleComponent,
};
type CustomColumnSchema = SampleColumnSchema;

const schema: DripTableSchema<CustomColumnSchema> = {
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
    {
      key: "mock_3",
      title: "Custom Component",
      align: "center",
      dataIndex: "description",
      component: "custom::Sample",
      options: {
        someCustomConfigure: "configure-sample",
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
    <DripTable<{
      CustomColumnSchema: CustomColumnSchema;
    }>
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={dataSource}
      components={{ custom: customComponents }}
    />
  );
};

export default Demo;
```
