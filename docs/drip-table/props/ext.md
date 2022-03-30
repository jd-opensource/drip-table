# ext

- 描述：自定义单元格组件附加透传数据，一般用于传递通用业务数据、环境变量
- 类型：`NonNullable<ExtraOptions['CustomComponentExtraData']>`
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
  $schema: "http://json-schema.org/draft/2019-09/schema#",
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
        tooltip: true,
        ellipsis: true,
        maxRow: 1,
      },
    },
    {
      key: "mock_3",
      title: "Custom Component",
      align: "center",
      component: "custom::Sample",
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
    <DripTable
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={dataSource}
      components={{
        custom: {
          Sample: (props) => <div>Extra Data: {props.ext.someExtraData}</div>,
        },
      }}
      ext={{ someExtraData: 'extra value' }}
    />
  );
};

export default Demo;
```
