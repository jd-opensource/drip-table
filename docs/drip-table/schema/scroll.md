---
order: 14
title: 滚动设置 scroll
---

## 滚动设置 scroll

- 描述：固定列、固定表头滚动设置
- 类型：

```typescript
interface Scroll {
  x?: number | true | string;
  y?: number | string;
  scrollToFirstRowOnChange?: boolean;
}
```

- 默认值：`undefined`
- 说明：一般用于配合固定列 [`schema.columns.fixed`](/drip-table/schema/columns/fixed) 属性使用。

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
  scroll: {
    x: 1280,
    y: 400,
    scrollToFirstRowOnChange: true,
  },
  pagination: {
    pageSize: 50,
  },
  columns: [
    {
      key: "mock_0",
      title: "固定列",
      width: 100,
      dataIndex: "id",
      component: "text",
      fixed: true,
      options: { mode: "single", maxRow: 1 },
    },
    {
      key: "mock_1",
      title: "商品名称",
      width: 200,
      dataIndex: "name",
      component: "text",
      options: { mode: "single", maxRow: 1 },
    },
    {
      key: "mock_2",
      title: "商品详情",
      width: 300,
      align: "center",
      dataIndex: "description",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_3",
      title: "商品详情",
      width: 300,
      align: "center",
      dataIndex: "description",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_4",
      title: "商品详情",
      width: 300,
      align: "center",
      dataIndex: "description",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
  ],
};

const dataSource = Array(50).fill(0).map((_, i) => ({
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
      sticky={{ offsetHeader: 64 }}
    />
  );
};

export default Demo;
```
