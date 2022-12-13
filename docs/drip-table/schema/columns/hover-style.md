# 鼠标划过当前行时单元格样式 columns.hoverStyle

- 描述：鼠标划过当前行时单元格样式
- 类型：`Record<string, string> | string`
- 默认值：`undefined`

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";
import "drip-table/dist/index.css";

const schema = {
  columns: [
    {
      key: "mock_1",
      title: {
        style: "border-top: 1px solid black; borderBottom: 1px solid black; borderLeft: 1px solid black",
        body: "商品名称",
      },
      hoverStyle: {
        background: "green",
      },
      dataIndex: "name",
      component: "text",
      options: { mode: "single", maxRow: 1 },
    },
    {
      key: "mock_2",
      title: {
        style: {
          borderTop: "1px solid black",
          'border-bottom': "1px solid black",
          borderLeft: "1px solid black",
        },
        body: "商品详情",
      },
      hoverStyle: {
        background: "green",
      },
      align: "center",
      style: "border-left: 1px solid black",
      dataIndex: "description",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_3",
      title: {
        style: "border: 1px solid black",
        body: "Custom Component",
      },
      align: "center",
      style: { borderLeft: "1px solid black" },
      dataIndex: "description",
      component: "custom::Sample",
      options: {
        someCustomConfigure: "configure-sample",
      },
    },
  ],
};

const dataSource = Array(10).fill(0).map((_, i) => ({
  id: i,
  name: "商品" + i,
  price: 7999,
  status: "onSale",
  description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
}));

const SampleComponent = (props) => (
  <div>Sample: {props.schema.options.someCustomConfigure}</div>
);
SampleComponent.componentName = 'Sample';
SampleComponent.schema = { // https://ajv.js.org/json-schema.html
  properties: {
    someCustomConfigure: { type: 'string' },
  },
};

const Demo = () => {
  return (
    <DripTable
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={dataSource}
      components={{
        custom: {
          Sample: SampleComponent,
        },
      }}
    />
  );
};

export default Demo;
```
