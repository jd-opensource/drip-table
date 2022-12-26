---
order: 7
title: 插槽系统 Slot
---

## 通用插槽 Slot

- 描述：表格通用插槽渲染配置
- 类型：[`DripTableSlotSchema`](/drip-table/types/slot-schema)
- 子属性：具体详细子项配置请浏览 [**通用插槽 Slot 详细设置项**](/drip-table/slot/all)。

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
  header: {
    elements: [
      { type: 'display-column-selector', selectorButtonType: 'primary' },
      { type: 'spacer', span: 'flex-auto' },
      { type: 'search' },
      { type: 'insert-button', showIcon: true },
    ],
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
  rowHeader: {
    style: {
      background: "#dfe8ff",
      border: "1px solid #dfe8ff",
      marginTop: '5px',
      paddingLeft: '10px',
    },
    elements: [
      {
        type: 'text',
        text: '行头部插槽左',
        style: { marginLeft: '20px' },
      },
      {
        type: 'spacer',
        span: 'flex-auto',
      },
      {
        type: 'text',
        text: '行头部插槽右',
        style: { marginRight: '20px' },
      },
    ],
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
