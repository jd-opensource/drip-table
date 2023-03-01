---
title: 列禁用 disable
toc: content
---

## 列禁用 columns.disable

- 描述：根据行数据控制当前单元格组件是否禁用
- 类型：`boolean | string`
- 默认值：`false`
- 说明：当传入脚本字符串控制时，可通过 `props.record` 获取当前行数据，通过 `props.recordIndex` 获取当前行号，通过 `props.value` 获取当前单元格数据。

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
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      disable: true,
      dataIndex: "name",
      component: "text",
      options: { mode: "single", maxRow: 1 },
    },
    {
      key: "mock_2",
      title: "商品详情",
      align: "center",
      disable: 'return [2, 5, 7].includes(props.record.id)',
      dataIndex: "description",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_3",
      title: "商品操作",
      align: "center",
      disable: 'return [2, 5, 7].includes(props.record.id)',
      dataIndex: "price",
      component: 'button',
      options: {
        mode: 'single',
        label: '新增',
        icon: 'PlusOutlined',
      },
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
