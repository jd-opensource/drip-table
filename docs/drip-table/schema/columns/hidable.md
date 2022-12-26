---
order: 18
title: 列可隐藏 hidable
---

## 列可隐藏 columns.hidable

- 描述：用户可控制该列显示隐藏
- 类型：`boolean`
- 默认值：`false`
- 说明：用于搭配隐藏列按钮 [`header.elements.GenericRenderDisplayColumnSelectorElement`](/drip-table/schema/header/elements#%E5%B1%95%E7%A4%BA%E5%88%97%E9%80%89%E6%8B%A9%E5%99%A8-genericrenderdisplaycolumnselectorelement)、隐藏列事件 [`props.onDisplayColumnKeysChange`](/drip-table/props/on-display-column-keys-change) 使用。

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
import "drip-table/dist/index.min.css";

const schema = {
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
      hidable: true,
      dataIndex: "description",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_3",
      title: "商品价格",
      align: "center",
      hidable: true,
      dataIndex: "price",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
  ],
  header: {
    elements: [
      { type: 'display-column-selector' },
    ],
  },
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
      onDisplayColumnKeysChange={(displayColumnKeys) => {
        message.info(`修改展示列：${JSON.stringify(displayColumnKeys)}。`)
        console.log('onDisplayColumnKeysChange', displayColumnKeys);
      }}
    />
  );
};

export default Demo;
```
