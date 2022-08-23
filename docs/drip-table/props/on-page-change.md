# 页码变化触发 onPageChange

- 描述：页码/页大小变化
- 类型：`(currentPage: number, pageSize: number) => void`

```typescript
type OnPageChange = (
  currentPage: number,
  pageSize: number,
  tableInfo: DripTableTableInformation<RecordType, ExtraOptions>,
) => void;
```

- 默认值：`undefined`
- 更多内容：[`DripTableTableInformation<RecordType, ExtraOptions>`](/drip-table/types/table-information)

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
import "drip-table/dist/index.css";

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
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={dataSource}
      onPageChange={(current, pageSize) => {
        message.info(`分页器改变：current = ${current}, pageSize = ${pageSize}。`);
        console.log('onPageChange', current, pageSize);
      }}
    />
  );
};

export default Demo;
```
