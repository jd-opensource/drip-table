---
order: 1
title: 自定义表格样式
---

# 自定义表格样式

> 如何利用 `drip-table-generator` 传递样式给 `drip-table` 实现自定义样式。

## 代码演示

```tsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable, { DripTableSchema } from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import DripTableGenerator, {
  DripTableGeneratorHandler,
} from "drip-table-generator";
import "antd/dist/antd.css";
import "drip-table-generator/dist/index.css";

const initialSchema: DripTableSchema = {
  pagination: false,
  headerStyle: {
    marginBottom: "12px",
    backgroundColor: "#f60",
    borderRadius: "6px",
  },
  headerCellStyle: {
    borderWidth: "0px",
    padding: "2px 6px",
    backgroundColor: "#fff6f0",
  },
  rowGap: 12,
  rowRadius: 6,
  rowHoverStyle: {
    backgroundColor: "#fefefe",
  },
  tableCellStyle: {
    backgroundColor: "#fefef0",
    borderColor: "#fefef0",
  },
  columns: [
    {
      key: "mock_2",
      title: "商品名称",
      width: "96px",
      component: "text",
      options: {
        mode: "single",
        maxRow: 2,
      },
      dataIndex: "name",
    },
    {
      key: "mock_3",
      dataIndex: "",
      title: "链接",
      description: "",
      component: "link",
      width: "120px",
      options: {
        mode: "single",
        label: "google",
        event: "google",
        tooltip: "toolip示例{{rec.name}}",
      },
      align: "center",
    },
  ],
  ext: {
    rowSelectable: "return rec.id % 2 === 1",
  },
};

const dataSource = [
  {
    id: 1,
    name: "商品一",
    price: 7999,
    status: "onSale",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
  {
    id: 2,
    name: "商品二",
    price: 6999,
    status: "onSale",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
];

const Demo = () => {
  return (
    <DripTableGenerator
      mockDataSource
      schema={initialSchema}
      driver={DripTableDriverAntDesign}
      dataSource={dataSource}
    />
  );
};

export default Demo;
```
