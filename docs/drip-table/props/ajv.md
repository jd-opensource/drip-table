# ajv

- 描述：Schema 校验配置项，`false`表示不校验配置数据
- 类型：

```typescript
type AjvOptions = {
  /**
   * Schema 校验时是否允许多余的数据
   */
  additionalProperties?: boolean;
} | false;
```

- 默认值：`undefined`

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
      mode: "single",
      options: {
        tooltip: true,
        ellipsis: true,
        maxRow: 1,
      },
      someExtraProperty: false, // 多余的字段
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
      ajv={{ additionalProperties: true }}
      xxx={1} // 多余的数据
    />
  );
};

export default Demo;
```
