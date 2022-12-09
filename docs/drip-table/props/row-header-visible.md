# 行头插槽是否显示 rowHeaderVisible

- 描述：行头插槽是否显示
- 类型：

    ```typescript
    type RowHeaderVisible = (
      record: RecordType,
      index: number,
      tableInfo: DripTableTableInformation<RecordType, ExtraOptions>,
    ) => boolean;
    ```

- 默认值：`undefined`

## 使用方法

- 同 [通用插槽渲染器 Schema 配置项文档](/drip-table/scheam/header) 。

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";
import "drip-table/dist/index.css";

const schema = {
  rowSelection: true,
  rowHeader: {
    style: {
      background: "#dfe8ff",
      border: "1px solid #dfe8ff",
      marginBottom: '5px',
      paddingLeft: '10px',
    },
    elements: [{
      type: 'text',
      text: '🛒 行头部插槽',
    }],
  },
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      hidable: true,
      options: { mode: "single", maxRow: 1 },
    },
    {
      key: "mock_2",
      title: "商品详情",
      align: "center",
      dataIndex: "description",
      component: "text",
      hidable: true,
      options: { mode: "single", ellipsis: true, maxRow: 1 },
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
  {
    id: 2,
    name: "商品二",
    price: 7999,
    status: "onSale",
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
  {
    id: 3,
    name: "商品三",
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
      rowHeaderVisible={(record, index, parent) => index !== 1}
    />
  );
};

export default Demo;
```
