---
title: 排序方式 sortDirections
toc: content
---

## 排序 columns.sortDirections

- 描述：数据排序支持的方式
- 类型：`('ascend' | 'descend')[]`
- 默认值：`undefined`

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
      dataIndex: "name",
      component: "text",
      options: { mode: "single", maxRow: 1 },
      sorter: 'return props.leftValue == props.rightValue ? 0 : props.leftValue > props.rightValue ? 1 : -1',
    },
    {
      key: "mock_2",
      title: "商品详情",
      align: "center",
      dataIndex: "description",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
      sorter: 'return props.leftRecord.description == props.rightRecord.description ? 0 : props.leftRecord.description > props.rightRecord.description ? 1 : -1',
    },
    {
      key: 'mock_3',
      title: '库存状态',
      width: 150,
      align: 'center',
      dataIndex: 'status',
      description: '这是一条提示信息',
      component: 'text',
      options: {
        mode: 'single',
        i18n: {
          onSale: '售卖中',
          soldOut: '已售罄',
        },
      },
      sorter: 'return props.leftValue == props.rightValue ? 0 : props.leftValue > props.rightValue ? 1 : -1',
      sortDirections: ['ascend'],
    },
  ],
};

const dataSource = Array(100).fill(0).map((_, i) => ({
  id: i + 1,
  name: `商品${i + 1}`,
  price: 7999,
  status: Math.random() > 0.5 ? "onSale" : "soldOut",
  description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
}));

const Demo = () => {
  const [ds, setDS] = React.useState(dataSource);
  return (
    <DripTable
      schema={schema}
      dataSource={ds}
      onChange={({ sorter }) => {
        if (sorter.comparer) {
          setDS([...dataSource].sort(sorter.comparer))
        } else {
          setDS(dataSource)
        }
        message.info(`排序：${JSON.stringify(sorter)}。`);
        console.log('onChange', sorter);
      }}
    />
  );
};

export default Demo;
```
