---
title: 行列合并 span
toc: content
---

## 行列合并设置项 span

- 描述：行列合并设置项
- 类型：```string```
- 默认值：`undefined`

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
  id: 'sample-table-root',
  rowKey: "id",
  bordered: true,
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
      title: "商品状态",
      align: "center",
      dataIndex: "status",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_4",
      title: "商品价格",
      align: "center",
      dataIndex: "price",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
  ],
  span: `
  if (props.record.id == 3 && props.column.key == 'mock_2') {
    return { rowSpan: 2, colSpan: 2 }
  }
  `,
};

const dataSource = [
  {
    id: 1,
    name: "商品一",
    price: 7999,
    status: "onSale",
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
  {
    id: 2,
    name: '商品二',
    price: 6488,
    status: 'onSale',
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
  {
    id: 3,
    name: '商品三',
    description: '商品三、商品四绑定销售中（onSale）',
    status: 'onSale',
    price: 2099,
  },
  {
    id: 4,
    name: '商品四',
    description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。',
    status: 'onSale',
    price: 5999,
  },
  {
    id: 5,
    name: '商品五',
    description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。',
    status: 'onSale',
    price: 109.9,
  },
  {
    id: 6,
    name: '商品六',
    description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。',
    status: 'onSale',
    price: 1312.4,
  },
];

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
