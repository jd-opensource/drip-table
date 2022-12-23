---
order: 7
title: noDataFeedBack
---

## noDataFeedBack

- 描述：自定义 Generator 无数据时的提示信息，`drip-table` 暂不支持
- 类型：`string | ReactNode`
- 默认值：无

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */

import 'drip-table/dist/index.css';
import 'drip-table-generator/dist/index.css';

import { Input } from 'antd';
import { DripTableExtraOptions, DripTableSchema } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import DripTableGenerator from 'drip-table-generator';
import React, { useState } from 'react';

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

const dataSource = [];

const Demo = () => {
  return (
    <>
      <DripTableGenerator
        mockDataSource
        driver={DripTableDriverAntDesign}
        schema={schema}
        dataSource={dataSource}
        noDataFeedBack={(<div style={{ color: 'red'}}> 表格暂无数据 </div>)}
      />
    </>
  );
};

export default Demo;
```
