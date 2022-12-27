---
order: 23
title: 行插槽键名 rowSlotKey
---

## 行插槽键名 rowSlotKey

- 描述：行插槽键名
- 类型：`string`
- 默认值：`undefined`
- 说明：需要配合表格插槽 [`slots`](/drip-table/props/slots) 属性使用，详细参见：[`DripTableSlot 通用插槽功能`](/drip-table/slot)。

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
  rowSlotKey: "@@slotTypeXXXMustNotInNormalData@@",
  rowSelection: true,
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
  ],
};

const dataSource = [];
for (let i = 1; i < 5; i++) {
  dataSource.push({
    id: `${i}`,
    shopId: Math.floor(Math.random() * 8999999999999 + 1000000000000),
    itemCount: 5,
    price: 7999 * 5,
    '@@slotTypeXXXMustNotInNormalData@@': 'CustomRowSlotComponent',
  });
  for (let j = 1; j < 5; j++) {
    dataSource.push({
      id: `${i}-${j}`,
      name: `商品 ${i}-${j}`,
      price: 7999,
      status: "onSale",
      description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    });
  }
};

const Demo = () => {
  return (
    <DripTable
      style={{ margin: '10px' }}
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={dataSource}
      onSelectionChange={(selectedKeys, selectedRows) => {
        message.info(selectedRows.length ? `选中商品：KEYS(${selectedKeys.join(', ')})。` : '未选中商品。');
        console.log({ selectedKeys, selectedRows });
      }}
      slots={{
        CustomRowSlotComponent: (props) => (
          <div className={props.className} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px 15px 15px', background: '#fafafa' }}>
            <div style={{ 'font-weight': '600', color: 'black', 'font-size': '16px' }}>🛒<span style={{ marginLeft: '8px' }}>订单号：{props.record.shopId}</span></div>
            <div>包含{props.record.itemCount}个商品，价格：{props.record.price}元</div>
          </div>
        ),
      }}
    />
  );
};

export default Demo;
```
