---
order: 4
title: 内部类名 innerClassName
toc: content
---

## 内部组件类名 innerClassName

- 描述：内部表格组件类名
- 类型：`string`
- 默认值：`undefined`

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
  innerClassName: "sample-class-name",
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
    <React.Fragment>
      <DripTable
        driver={DripTableDriverAntDesign}
        schema={schema}
        dataSource={dataSource}
      />
      <style>{ '.sample-class-name { background: #ffb4b4; border: 1px solid #ffb4b4; }' }</style>
    </React.Fragment>
  );
};

export default Demo;
```
