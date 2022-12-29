---
order: 23
title: 点击行触发 onRowClick
toc: content
---

## 点击行触发 onRowClick

- 描述：点击行
- 类型：

```typescript
type OnRowClick = (
  record: RecordType | RecordType[],
  index: number | string | (number | string)[],
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
import React from "react";
import DripTable from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";

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
    <DripTable
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={dataSource}
      onRowClick={(record, index) => { console.log({ record, index }); }}
    />
  );
};

export default Demo;
```
