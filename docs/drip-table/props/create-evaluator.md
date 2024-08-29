---
title: 自定义沙箱 createEvaluator
toc: content
---

## 自定义沙箱函数创建 createEvaluator

- 描述：自定义沙箱函数创建

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";

const schema = {
  pagination: {
    size: 'small',
    pageSize: 2,
    position: 'bottomCenter',
  },
  columns: [
    {
      key: "mock_1",
      title: "序号",
      dataIndex: "name",
      component: "text",
      width: "200px",
      align: "center",
      options: {
        mode: "custom",
        format:
          "{{$custom}} {{props.recordIndex + 1}}",
      },
    },
    {
      key: "mock_2",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      options: {
        mode: "custom",
        format:
          "这是一个自定义渲染，商品名称为“{{props.record.name}}”，价格为“{{props.record.price}}元”。",
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
  {
    id: 2,
    name: "商品二",
    price: 7999,
    status: "onSale",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
  {
    id: 3,
    name: "商品三",
    price: 7999,
    status: "onSale",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
  {
    id: 4,
    name: "商品四",
    price: 7999,
    status: "onSale",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
];

const Demo = () => {
  return (
    <React.Fragment>
      <DripTable
        schema={schema}
        dataSource={dataSource}
        createEvaluator={(script, contextKeys = []) => {
          script = `return function(${contextKeys.join(', ')}) { ${script} }`;
          return new Function('window', '$custom', script)(window, 'CUSTOM VALUE');
        }}
      />
    </React.Fragment>
  );
};

export default Demo;
```
