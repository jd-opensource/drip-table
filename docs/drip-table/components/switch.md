---
title: 开关组件 Switch
toc: content
---

## 开关组件 switch

开关组件

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
    name: "商品一",
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
    name: "商品二",
    price: 7999,
    soldOut: true,
    status: "offSale",
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
        title: "是否售罄",
        align: "center",
        hidable: true,
        dataIndex: "soldOut",
        component: "switch",
        options: {
          event: "sold-out",
          bindValue: false,
        },
      },
      {
        key: "mock_3",
        title: "是否售罄（绑定数据）",
        align: "center",
        hidable: true,
        dataIndex: "soldOut",
        component: "switch",
        options: {
          event: "sold-out",
          bindValue: true,
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
          if (event.type === "drip-switch-change") {
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
            console.log(name, record, recordIndex);
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
| bindValue   | 值回显强制与数据绑定，默认为 true                                                | boolean                                                                       | 否       | true                      | --   |
| event       | 事件名，点击时触发，通过属性 `onEvent` 接收事件，事件类型为 `drip-switch-change` | string                                                                        | 否       | 无                        | --   |
