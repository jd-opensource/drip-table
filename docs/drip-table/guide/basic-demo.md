---
order: 1
title: 基础实例
---

# 基础实例

> 本篇主要通过一个基础的 Demo 实例来展示如何使用 drip-table

## 代码演示

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from "react";
import { DripTable } from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";
import "drip-table/index.css";

const schema = {
  $schema: "http://json-schema.org/draft/2019-09/schema#",
  configs: {
    size: "middle",
    search: {
      placeholder: "请输入",
      searchText: "搜索",
      position: "topRight",
    },
    pagination: {
      pageSize: 10,
      position: "bottomRight",
    },
  },
  columns: [
    {
      $id: "mock_1",
      title: "商品名称",
      "ui:type": "text",
      "ui:props": {
        mode: "single",
        maxRow: 1,
      },
      type: "string",
      dataIndex: "name",
    },
    {
      $id: "mock_2",
      title: "商品详情",
      align: "center",
      "ui:type": "text",
      "ui:props": {
        mode: "single",
        tooltip: true,
        ellipsis: true,
        maxRow: 1,
      },
      type: "string",
      dataIndex: "description",
    },
    {
      $id: "mock_3",
      title: "库存状态",
      "ui:type": "text",
      "ui:props": {
        mode: "single",
      },
      type: "string",
      enumValue: ["onSale", "soldOut"],
      enumLabel: ["售卖中", "已售罄"],
      description: "这是一条提示信息",
      dataIndex: "status",
    },
    {
      $id: "mock_4",
      title: "商品价格",
      width: 80,
      "ui:type": "text",
      "ui:props": {
        mode: "single",
        prefix: "￥",
      },
      type: "number",
      dataIndex: "price",
    },
    {
      $id: "mock_5",
      title: "操作",
      "ui:type": "links",
      "ui:props": {
        mode: "multiple",
        operates: [
          { name: "order", label: "预定", href: "./#order", target: "_blank" },
          { name: "view", label: "查看", href: "./#view" },
          { name: "remove", label: "删除", href: "./#remove" },
        ],
      },
      type: "string",
      dataIndex: "operate",
      width: 118,
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
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={dataSource}
    />
  );
};

export default Demo;
```
