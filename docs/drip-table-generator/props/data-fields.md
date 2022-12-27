---
order: 5
title: dataFields
---

## dataFields

- 描述：接口API默认字段名
- 类型：`string[]`
- 默认值：`[]`

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */


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
  const [dataFields, setDataFields] = useState([]);
  return (
    <>
      <Input
        value={dataFields.join(",")}
        onChange={(event) => setDataFields(event.target.value.split(',')) }
        placeholder="请输入字段名，多个字段名用逗号隔开"
        style={{ margin: '8px 0' }}
      />
      <DripTableGenerator
        driver={DripTableDriverAntDesign}
        schema={schema}
        dataSource={dataSource}
        dataFields={dataFields}
      />
    </>
  );
};

export default Demo;
```
