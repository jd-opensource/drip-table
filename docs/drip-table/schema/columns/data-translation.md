# 列数据处理 columns.dataTranslation

- 描述：列数据预处理，对单元格数据进行变换
- 类型：`string`
- 默认值：`undefined`

- 说明：处理逻辑通过`return`返回结果，可通过`props`获取传入数据：

    ```typescript
    type Props {
      /** 原始单元格数据 */
      value: unknown;
      /** 原始行数据 */
      record：RecordType;
      /** 原始行号 */
      recordIndex：number;
    }
    ```

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
      options: { mode: "single", maxRow: 1 },
    },
    {
      key: "mock_2",
      title: "商品详情",
      align: "center",
      dataIndex: "description",
      dataTranslation: "return '[' + props.record.count + '件] ' + value",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_3",
      title: "商品单价",
      width: 200,
      align: "center",
      dataIndex: "price",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_4",
      title: "商品总价",
      width: 200,
      align: "center",
      dataIndex: "price",
      dataTranslation: "return props.value * props.record.count",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
  ],
};

const dataSource = Array(10).fill(0).map((_, i) => ({
  id: i,
  name: "商品" + i,
  price: 7999,
  count: 3,
  status: "onSale",
  description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
}));

const Demo = () => {
  return (
    <DripTable
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={dataSource}
    />
  );
};

export default Demo;
```
