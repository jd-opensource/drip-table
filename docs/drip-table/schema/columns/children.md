---
title: 列拆分 children
toc: content
---

## 列拆分 columns.children

- 描述：拆分当前列为多个子列
- 类型：`DripTableSchema['columns']`
- 默认值：`undefined`

### 常规

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import { message } from "antd";
import React from "react";
import DripTable from "drip-table";

const schema = {
  bordered: true,
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      width: "200px",
      options: { mode: "single", maxRow: 1 },
    },
    {
      key: "mock_2",
      title: "商品属性",
      align: "center",
      children: [
        {
          key: "mock_2_1",
          title: "商品详情",
          align: "center",
          editable: false,
          dataIndex: "description",
          component: "text",
          options: { mode: "single", ellipsis: true, maxRow: 1 },
        },
        {
          key: "mock_2_2",
          title: "商品价格",
          align: "center",
          editable: 'return [2, 5, 7].includes(props.record.id)',
          dataIndex: "price",
          component: "text",
          options: { mode: "single", ellipsis: true, maxRow: 1 },
        },
      ],
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

### 虚拟滚动

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import { message } from "antd";
import React from "react";
import DripTable from "drip-table";

const schema = {
  bordered: true,
  virtual: true,
  scroll: {
    y: 300,
  },
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      width: "200px",
      options: { mode: "single", maxRow: 1 },
    },
    {
      key: "mock_2",
      title: "商品属性",
      align: "center",
      children: [
        {
          key: "mock_2_1",
          title: "商品详情",
          align: "center",
          editable: false,
          dataIndex: "description",
          component: "text",
          options: { mode: "single", ellipsis: true, maxRow: 1 },
        },
        {
          key: "mock_2_2",
          title: "商品价格",
          align: "center",
          editable: 'return [2, 5, 7].includes(props.record.id)',
          dataIndex: "price",
          component: "text",
          options: { mode: "single", ellipsis: true, maxRow: 1 },
        },
      ],
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
      schema={schema}
      dataSource={dataSource}
    />
  );
};

export default Demo;
```
