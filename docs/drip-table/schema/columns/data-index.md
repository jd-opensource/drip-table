---
order: 3
title: 列索引 dataIndex
---

## 列索引 columns.dataIndex

- 描述：列数据在数据项中对应的路径，支持通过数组查询嵌套路径
- 类型：`string | string[]`
- 默认值：必填

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
import "drip-table/dist/index.min.css";

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
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
      title: "商品价格 (CNY)",
      width: 200,
      align: "center",
      dataIndex: ["price", "cny"],
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_4",
      title: "商品价格 (USD)",
      width: 200,
      align: "center",
      dataIndex: ["price", "usd"],
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
  ],
};

const dataSource = Array(10).fill(0).map((_, i) => ({
  id: i,
  name: "商品" + i,
  price: { cny: 7999, usd: 1192 },
  status: "onSale",
  description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
}));

const Demo = () => {
  return (
    <DripTable
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={dataSource}
    />
  );
};

export default Demo;
```
