---
order: 21
title: 行高
---

# 行高 rowHeight

- 描述：表格行高（虚拟滚动）
- 类型：`boolean`
- 默认值：`false`

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
  virtual: true,
  scroll: {
    y: 500,
  },
  rowHeight: 100,
  pagination: false,
  rowSelection: {
    align: 'center',
    verticalAlign: 'stretch',
  },
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      width: 200,
      align: "center",
      dataIndex: "name",
      component: "text",
      verticalAlign: 'middle',
      options: { mode: "single", maxRow: 1 },
    },
    {
      key: "mock_2",
      title: "商品详情",
      align: "center",
      dataIndex: "description",
      component: "text",
      verticalAlign: 'middle',
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
  ],
};

const dataSource = Array(100000).fill(0).map((_, i) => ({
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
