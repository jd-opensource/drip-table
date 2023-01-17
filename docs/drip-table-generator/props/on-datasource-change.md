---
title: onDataSourceChange
toc: content
---

## onDataSourceChange

- 描述：导出表格数据
- 类型：`(dataSource: DripTableProps<RecordType, ExtraOptions>['dataSource']) => void`
- 默认值：无

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */

import { message, Button } from "antd";
import { DripTableExtraOptions, DripTableSchema } from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import DripTableGenerator from "drip-table-generator";
import React, { useState } from "react";

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
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
];

const Demo = () => {
  return (
    <DripTableGenerator
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={dataSource}
      onDataSourceChange={(dataSource) => {
        message.info("导出 Schema:" + JSON.stringify(dataSource), 3);
      }}
    />
  );
};

export default Demo;
```
