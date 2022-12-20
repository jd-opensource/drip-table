# 列宽 columns.width

- 描述：表格列宽
- 类型：`string | number`
- 默认值：`undefined`
- 说明：当 `width` 传入 `number` 类型时将自动转换为 `px` 单位字符串。建议留空一列不指定宽度，使其作为自适应伸缩列，否则当显示宽度与总指定列宽不一致时，多余或不足的宽度将平均分配给每一列。

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
      title: "商品名称",
      dataIndex: "name",
      width: 200,
      component: "text",
      options: { mode: "single", maxRow: 1 },
    },
    {
      key: "mock_2",
      title: "商品详情",
      align: "center",
      dataIndex: "description",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_3",
      title: "Custom Component",
      align: "center",
      dataIndex: "description",
      width: 200,
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
  type: 'object',
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
