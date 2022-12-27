---
order: 22
title: 行主键 rowKey
---

## 行主键 rowKey

- 描述：表格行主键
- 类型：`string`
- 默认值：`"key"`
- 说明：一般用于配合表格勾选项 [`header.rowSelection`](/drip-table/header/row-selection)、[`props.onRowSelectionChange`](/drip-table/props.onRowSelectionChange) 属性使用。

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import { message } from "antd";
import React from "react";
import DripTable from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";

const schema = {
  rowKey: "id",
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

const dataSource = Array(50).fill(0).map((_, i) => ({
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
      onSelectionChange={(selectedKeys, selectedRows) => {
        message.info(selectedRows.length ? `选中商品：KEYS(${selectedKeys.join(', ')})。` : '未选中商品。');
        console.log({ selectedKeys, selectedRows });
      }}
    />
  );
};

export default Demo;
```
