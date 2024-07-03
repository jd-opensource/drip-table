---
title: 多选框组件 Checkbox
toc: content
---

## 多选框组件 Checkbox

多选框组件

## 代码演示

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import { message } from "antd";
import React from "react";
import DripTable from "drip-table";

const dataSource = [
  {
    id: 1,
    name: "未选中",
    price: 7999,
    soldOut: false,
    status: "onSale",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    pictureUrl:
      "https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png",
  },
  {
    id: 2,
    name: "默认选中",
    price: 7999,
    soldOut: true,
    status: "offSale",
    checked: true,
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    pictureUrl:
      "https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png",
  },
];

const Demo = () => {
  const schema = {
    columns: [
      {
        key: "mock_1",
        title: "名称",
        align: "center",
        hidable: true,
        dataIndex: "name",
        component: "text",
        options: {
          mode: "single",
        },
      },
      {
        key: "mock_2",
        title: "组件展示",
        align: "center",
        hidable: true,
        dataIndex: "soldOut",
        component: "checkbox",
        options: {
          event: "sold-out",
          bindValue: true,
        },
      },
      {
        key: "mock_3",
        title: "组件disable状态",
        align: "center",
        hidable: true,
        dataIndex: "soldOut",
        component: "checkbox",
        disable: true,
        options: {
          defaultChecked: true,
          event: "sold-out",
        },
      },
    ],
  };

  const [ds, setDs] = React.useState(dataSource);

  return (
    <React.Fragment>
      <DripTable
        schema={schema}
        dataSource={ds}
        onEvent={(event, tableInfo) => {
          const { record, recordIndex } = event;
          if (event.type === "drip-checkbox-change") {
            const name = event.payload.name;
            const value = event.payload.value;
            if (name == "sold-out") {
              const newDs = [...ds];
              newDs[recordIndex] = {
                ...newDs[recordIndex],
                soldOut: value,
              };
              setDs(newDs);
            }
            message.info(`第${recordIndex + 1}行“${record.name} (ID: ${record.id})”的“${name}”设置为“${value}”。`);
            console.log(name, record, recordIndex, event);
          }
        }}
      />
    </React.Fragment>
  );
};

export default Demo;
```

## API

| 参数名      | 描述                                                                             | 类型                                                                          | 是否必填 | 默认值                    | 详情 |
| ----------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------- | ------------------------- | ---- |
| style       | 自定义样式                                                                       | React.CSSProperties                                                           | 否       | 无                        | --   |
| checked   | 指定当前是否选中，默认为 false                                                | boolean                                                                       | 否       | true                      | --   |
| defaultChecked       | 初始是否选中, 默认为 false | string                                                                        | 否       | 无                        | --   |
