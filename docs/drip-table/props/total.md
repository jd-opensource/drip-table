# total

- 描述：数据源总条数
- 类型：`number`
- 默认值：dataSource 长度

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
      "ui:type": "text",
      mode: "single",
      maxRow: 1,
    },
    {
      key: "mock_2",
      title: "商品详情",
      align: "center",
      dataIndex: "description",
      "ui:type": "text",
      mode: "single",
      tooltip: true,
      ellipsis: true,
      maxRow: 1,
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
      total={10000}
    />
  );
};

export default Demo;
```
