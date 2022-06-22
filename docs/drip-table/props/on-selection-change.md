# onSelectionChange

- 描述：选择行变化，配合 [`rowSelection`](/drip-table/props/schema/row-selection) 使用
- 类型：

```typescript
type OnSelectionChange = (
  selectedKeys: React.Key[],
  selectedRows: RecordType[],
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
  rowSelection: true,
};

const dataSource = [
  {
    id: 1,
    name: "商品一",
    price: 7999,
    status: "onSale",
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
  {
    id: 2,
    name: "商品二",
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
      onSelectionChange={(selectedKeys, selectedRows) => {
        message.info(selectedRows.length ? `选中商品：${selectedRows.map(r => r.name).join('、')}。` : '未选中商品。');
        console.log({ selectedKeys, selectedRows });
      }}
    />
  );
};

export default Demo;
```
