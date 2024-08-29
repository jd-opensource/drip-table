---
title: 函数预处理 schemaFunctionPreprocessor
toc: content
---

## 表格 Schema 函数预处理 schemaFunctionPreprocessor

- 描述：表格 Schema 中的函数预处理
- 类型：

  ```typescript
  (event: unknown, props: Record<string, unknown>) => (() => void);
  ```

- 默认值：`undefined`

```tsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from "react";
import { message } from "antd";
import DripTable, { DripTableComponentProps, DripTableRecordTypeBase } from "drip-table";

// 自定义组件表格渲染列 Schema 类型定义。
type SampleColumnSchema = DripTableColumnSchema<'custom::Sample', {
  onClick: () => void;
}>;
// 自定义组件属性接口定义。
interface SampleComponentProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, SampleColumnSchema> { }

// 自定义组件实现。
const SampleComponent = <RecordType extends DripTableRecordTypeBase>(props: SampleComponentProps<RecordType>) => (
  <div onClick={props.schema.options.onClick}>Sample: CLICK ME</div>
);
SampleComponent.componentName = 'Sample';
SampleComponent.schema = { // https://ajv.js.org/json-schema.html
  type: 'object',
  properties: {
    onClick: { instanceof: 'Function' },
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
        onClick: (() => {
          const onClick = (props) => {
            return () => {
              message.info(`触发CLICK事件，注入参数：${JSON.stringify(props)}`);
              console.log('ON CLICK! props injected: ', props);
            };
          };
          onClick.bTwiceEvent = true;
          return onClick;
        })(),
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
      schemaFunctionPreprocessor={(event, props) => {
        if (event.bTwiceEvent) {
          return event(props);
        }
        return event;
      }}
    />
  );
};

export default Demo;
```
