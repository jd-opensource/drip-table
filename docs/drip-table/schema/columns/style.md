---
title: 单元格样式 style
toc: content
---

## 单元格样式 columns.style

- 描述：单元格样式
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

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      style: { 'border-right': "1px solid black" },
      component: "text",
      options: { mode: "single", maxRow: 1 },
    },
    {
      key: "mock_2",
      title: "商品详情",
      style: "return props.recordIndex % 2 === 0 ? 'border-top: 1px solid black; border-bottom: none' : { 'border-top': 'none', borderBottom: '1px solid black' };",
      align: "center",
      dataIndex: "description",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_3",
      title: "商品价格",
      style: { borderLeft: "1px solid black" },
      align: "center",
      dataIndex: "price",
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
      schema={schema}
      dataSource={dataSource}
    />
  );
};

export default Demo;
```
