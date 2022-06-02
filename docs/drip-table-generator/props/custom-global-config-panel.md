# customGlobalConfigPanel

- 描述：自定义全局属性面板, 须注意的是当设置的属性为自定义全局属性，需要开启 `drip-table` 的 `ajv.additionalProperties` 选项，同样该属性支持在 `drip-table-generator` 的属性上透传。
- 类型：
```typescript
type DripTableGeneratorPanel = {
  mode: 'add' | 'replace';
  components: DripTableComponentAttrConfig[];
}
```
- 默认值：无

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import 'antd/dist/antd.css';
import 'drip-table/dist/index.css';
import 'drip-table-generator/dist/index.css';

import { Input } from 'antd';
import { DripTableExtraOptions, DripTableSchema } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import DripTableGenerator from 'drip-table-generator';
import React, { useState } from 'react';

import { CustomGlobalConfigPanel } from '../preview/custom-global-settings';

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
    <DripTableGenerator
      mockDataSource
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={dataSource}
      customGlobalConfigPanel={CustomGlobalConfigPanel}
      ajv={{ additionalProperties: true }}
    />
  );
};

export default Demo;
```
