---
order: 15
title: 行可选择 rowSelection
toc: content
---

## 行可选择 rowSelection

- 描述：是否支持选择栏

- 类型：

```typescript
type RowSelection = boolean | {
  /**
   * 选择栏水平对齐方式
   */
  align?: 'left' | 'center' | 'right';
  /**
   * 选择栏垂直对齐方式
   */
  verticalAlign?: 'top' | 'middle' | 'bottom' | 'stretch';
};
```

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
  rowSelection: true,
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
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={dataSource}
      sticky={{ offsetHeader: 64 }}
    />
  );
};

export default Demo;
```
