---
title: 虚拟滚动 virtual
toc: content
---

## 虚拟滚动 virtual

- 描述：是否开启虚拟滚动
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

const schema = {
  virtual: true,
  scroll: {
    y: 500,
  },
  pagination: false,
  rowSelection: true,
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      width: 200,
      align: "center",
      dataIndex: "name",
      component: "text",
      options: { mode: "single", maxRow: 1 },
    },
    {
      key: "mock_2",
      title: "商品详情",
      width: 400,
      align: "center",
      dataIndex: "description",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_3",
      title: "商品价格",
      width: 100,
      align: "center",
      dataIndex: "price",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    ...Array(50).fill(0).map((_, i) => ({
      key: `mock_${4 + i}`,
      title: `商品价格 (+${i + 1})`,
      width: 100,
      align: "center",
      dataIndex: "price",
      component: "text",
      dataTranslation: `return props.value + ${i + 1}`,
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    })),
  ],
};

const dataSource = Array(100).fill(0).map((_, i) => ({
  id: i,
  name: "商品" + i,
  price: 5999 + Math.floor(Math.random() * 3000),
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
