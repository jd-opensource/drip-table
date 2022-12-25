---
order: 12
title: 垂直对齐 verticalAlign
---

## 垂直对齐 columns.verticalAlign

- 描述：表格列垂直对齐
- 类型：`'top' | 'middle' | 'bottom' | 'stretch'`
- 默认值：`'top'`

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
  columns: [
    {
      key: "mock_0",
      title: "default",
      dataIndex: "name",
      component: "text",
      verticalAlign: "top",
      options: { mode: "single", maxRow: 1 },
    },
    {
      key: "mock_1",
      title: "top",
      dataIndex: "name",
      component: "text",
      verticalAlign: "top",
      options: { mode: "single", maxRow: 1 },
    },
    {
      key: "mock_2",
      title: "middle",
      dataIndex: "name",
      component: "text",
      verticalAlign: "middle",
      options: { mode: "single", maxRow: 1 },
    },
    {
      key: "mock_3",
      title: "bottom",
      dataIndex: "name",
      component: "text",
      verticalAlign: "bottom",
      options: { mode: "single", maxRow: 1 },
    },
    {
      key: "mock_4",
      title: "stretch",
      dataIndex: "name",
      component: "text",
      verticalAlign: "stretch",
      options: { mode: "single", maxRow: 1 },
    },
  ],
};

const dataSource = Array(100).fill(0).map((_, i) => ({
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
