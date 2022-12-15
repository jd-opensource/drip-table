# 冻结表头 sticky

- 描述：冻结表头和滚动条设置项
- 类型：

  ```typescript
  interface Sticky {
    offsetHeader?: number;
    offsetScroll?: number;
    getContainer?: () => HTMLElement;
  }
  ```

- 默认值：`undefined`
- 说明：该属性仅为冻结表头环境配置，多用于页面存在导航栏或内部滚动等场景，需要配合 [`schema.sticky`](/drip-table/schema/sticky) 设置项开启表格冻结表头开关才能使用。

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
  sticky: true,
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      options: { mode: "single", maxRow: 1 },
    },
    {
      key: "mock_2",
      title: "商品详情",
      align: "center",
      dataIndex: "description",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
  ],
};

const dataSource = Array(10).fill(0).map((_, i) => ({
  id: i,
  name: "商品" + i,
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
      sticky={{
        offsetHeader: 64,
        offsetScroll: 0,
        getContainer: () => document.documentElement,
      }}
    />
  );
};

export default Demo;
```
