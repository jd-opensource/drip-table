---
title: 基础案例 Basic Demo
toc: false
---

## 基础示例

> 通过一个基础的实例来展示如何使用 `Drip Table`。

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";

const schema = {
  size: "middle",
  pagination: {
    pageSize: 10,
    position: "bottomRight",
  },
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      options: {
        mode: "single",
        maxRow: 1,
      },
    },
    {
      key: "mock_2",
      title: "商品详情",
      align: "center",
      dataIndex: "description",
      component: "text",
      options: {
        mode: "single",
        ellipsis: true,
        maxRow: 1,
      },
    },
    {
      key: "mock_3",
      title: "库存状态",
      dataIndex: "status",
      description: "这是一条提示信息",
      component: "text",
      options: {
        mode: "single",
        i18n: {
          onSale: '售卖中',
          soldOut: '已售罄',
        },
      },
    },
    {
      key: "mock_4",
      title: "商品价格",
      width: 80,
      dataIndex: "price",
      component: "text",
      options: {
        mode: "single",
        prefix: "￥",
      },
    },
    {
      key: "mock_5",
      title: "操作",
      width: 118,
      dataIndex: "operate",
      component: "link",
      options: {
        mode: "multiple",
        operates: [
          { name: "order", label: "预定", href: "./#order", target: "_blank" },
          { name: "view", label: "查看", href: "./#view" },
          { name: "remove", label: "删除", href: "./#remove" },
        ],
      },
    },
  ],
};

const dataSource = [
  {
    id: 1,
    name: "商品一",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    status: "onSale",
    price: 7999,
  },
  {
    id: 2,
    name: "商品二",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    status: "onSale",
    price: 6488,
  },
  {
    id: 3,
    name: "商品三",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    status: "onSale",
    price: 2099,
  },
  {
    id: 4,
    name: "商品四",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    status: "onSale",
    price: 5999,
  },
  {
    id: 5,
    name: "商品五",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    status: "onSale",
    price: 109.9,
  },
  {
    id: 6,
    name: "商品六",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    status: "soldOut",
    price: 178,
  },
  {
    id: 7,
    name: "商品七",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    status: "soldOut",
    price: 9999,
  },
  {
    id: 8,
    name: "商品八",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    status: "onSale",
    price: 7999,
  },
  {
    id: 9,
    name: "商品九",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    status: "onSale",
    price: 6488,
  },
  {
    id: 10,
    name: "商品十",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    status: "onSale",
    price: 2099,
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
