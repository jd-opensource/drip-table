---
order: 14
title: 列固定 filters
---

## 列固定 columns.fixed

- 描述：是否固定列
- 类型：`'left' | 'right' | boolean`
- 默认值：`undefined`
- 说明：`true` 等同于 `'left'`。

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
  scroll: {
    x: 1280,
  },
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      width: 200,
      fixed: true,
      description: "商品名称就是商品的名称。",
      component: "text",
      options: { mode: "single", maxRow: 1 },
    },
    {
      key: "mock_2",
      title: "商品详情",
      align: "center",
      width: 500,
      dataIndex: "description",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_3",
      title: "商品价格",
      width: 200,
      align: "center",
      dataIndex: "price",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_3",
      title: "商品状态",
      width: 200,
      fixed: 'right',
      align: "center",
      dataIndex: "status",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
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
