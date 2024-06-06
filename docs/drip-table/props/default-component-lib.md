---
title: 默认组件库名称 defaultComponentLib
toc: content
---

## 表格默认组件库名称 defaultComponentLib

- 描述：表格默认组件库名称
- 类型：`string`
- 默认值：`undefined`

```tsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable, { DripTableComponentProps, DripTableRecordTypeBase } from "drip-table";

// 自定义组件表格渲染列 Schema 类型定义。
type CustomTextColumnSchema = DripTableColumnSchema<'custom::text', {
}>;
// 自定义组件属性接口定义。
interface CustomTextComponentProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, CustomTextColumnSchema> { }

// 自定义组件库实现。
const CustomTextComponent = <RecordType extends DripTableRecordTypeBase>(props: CustomTextComponentProps<RecordType>) => (
  <div>CustomText: {props.value}</div>
);
CustomTextComponent.componentName = 'text';
CustomTextComponent.schema = { // https://ajv.js.org/json-schema.html
  type: 'object',
  properties: {},
};

// 对所有自定义组件做集合处理，准备提供给 DripTable 使用。
const customComponents = {
  [CustomTextComponent.componentName]: CustomTextComponent,
};
type CustomColumnSchema = CustomTextColumnSchema;

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
      schema={schema}
      dataSource={dataSource}
      components={{ custom: customComponents }}
      defaultComponentLib="custom"
    />
  );
};

export default Demo;
```
