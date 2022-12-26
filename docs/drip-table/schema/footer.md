---
order: 10
title: 尾部 footer
---

## 表格尾部配置 footer

- 描述：表格尾部展示配置
- 说明：基本等同 [表格头部展示配置](/drip-table/schema/header)，唯一区别是尾部展示配置仅支持传入具体配置表，不支持传入 `boolean` 类型，详细参见：[`DripTableSlot 通用插槽功能`](/drip-table/slot)。

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
import "drip-table/dist/index.min.css";

const schema = {
  footer: {
    style: {
      height: "50px",
      background: "#dfe8ff",
      border: "1px solid #dfe8ff",
    },
    elements: [{
      type: 'html',
      html: '<span style="font-size: 20px; color: #2a64ff; border: 1px solid #2a64ff">自定义富文本样例</span>',
    }],
  },
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      hidable: true,
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
      hidable: true,
      options: {
        mode: "single",
        ellipsis: true,
        maxRow: 1,
      },
    },
  ],
};

const dataSource = [
  {
    id: 1,
    name: "商品一",
    price: 7999,
    status: "onSale",
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
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
