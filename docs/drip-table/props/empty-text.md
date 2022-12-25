---
order: 19
title: 空表提示 emptyText
---

## 空表提示 emptyText

- 描述：表格无数据时提示语
- 类型：`(tableInfo: DripTableInformation) => React.ReactNode`
- 默认值：`undefined`

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";
import { Empty } from 'antd';
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";
import "drip-table/dist/index.css";

const schema = {
  emptyText: "暂无数据",
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

const dataSource = [];

const Demo = () => {
  return (
    <DripTable
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={dataSource}
      emptyText={(tableInfo) => <Empty description={tableInfo.schema.emptyText} />}
    />
  );
};

export default Demo;
```
