# 数据处理 dataProcess

- 描述：数据处理逻辑 value对应dataIndex的值，rec对应rowData的值, return语句写法案例: `return value || "暂无数据"`
- 类型：`string`
- 默认值：无

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import { message } from "antd";
import React from "react";
import DripTable from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";
import "drip-table/dist/index.css";

const schema = {
  rowKey: "id",
  rowSelection: true,
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      options: { mode: "single", maxRow: 1, dataProcess: "return value || '暂无数据'" },
    },
    {
      key: "mock_2",
      title: "商品详情",
      align: "center",
      dataIndex: "description",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1, dataProcess: "return value || rec.name" },
    },
  ],
};

const dataSource = Array(5).fill(0).map((_, i) => ({
  id: i,
  name: i === 0 ? '' : "商品" + i,
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
