---
title: 排序触发 onSorterChange
toc: content
---

## 排序变动触发 onSorterChange

- 描述：排序配置变化
- 类型：

```typescript
type onSorterChange = (
  sorter: DripTableSorter,
  tableInfo: DripTableTableInformation<RecordType, ExtraOptions>,
) => void;
```

- 默认值：`undefined`
- 说明：[`DripTableTableInformation<RecordType, ExtraOptions>`](/drip-table/types/table-information)

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
      options: {
        mode: "single",
        maxRow: 1,
      },
      sorter: 'return props.leftValue == props.rightValue ? 0 : props.leftValue > props.rightValue ? 1 : -1',
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
    {
      key: 'mock_3',
      title: '库存状态',
      width: 150,
      align: 'center',
      dataIndex: 'status',
      description: '这是一条提示信息',
      hidable: true,
      filters: [
        { text: '售卖中', value: 'onSale' },
        { text: '已售罄', value: 'soldOut' },
      ],
      defaultFilteredValue: ['onSale', 'soldOut'],
      component: 'text',
      options: {
        mode: 'single',
        i18n: {
          onSale: '售卖中',
          soldOut: '已售罄',
        },
      },
    },
  ],
};

const dataSource = Array(100).fill(0).map((_, i) => ({
  id: i + 1,
  name: `商品${i + 1}`,
  price: 7999,
  status: "onSale",
  description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
}));

const Demo = () => {
  return (
    <DripTable
      schema={schema}
      dataSource={dataSource}
      onSorterChange={(sorter) => {
        message.info(`排序：${JSON.stringify(sorter)}。`);
        console.log('onChange', sorter);
      }}
    />
  );
};

export default Demo;
```
