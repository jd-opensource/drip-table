---
title: 浮窗组件 Popover
toc: content
---

## 浮窗组件 popover

浮窗组件

## 代码演示

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import { message } from "antd";
import * as Icons from '@ant-design/icons';
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
        key: "mock_3",
        title: "名称",
        align: "center",
        verticalAlign: "middle",
        dataIndex: "",
        component: "popover",
        options: {
          placement: 'top',
          popover: {
            "key": "18e5af30cb0-12e6",
            "title": "",
            "width": 140,
            "align": "center",
            "verticalAlign": "middle",
            "dataIndex": "",
            "component": "group",
            "options": {
              "layout": [
                1,
                1
              ],
              "horizontalAlign": "center",
              "verticalAlign": "middle",
              "gutter": [
                8,
                8
              ],
              "wrap": false,
              "items": [
                {
                  "key": "mock_1_1",
                  "title": "",
                  "component": "image",
                  "options": {
                    "imageWidth": 86,
                    "imageHeight": 86
                  },
                  "dataIndex": "pictureUrl"
                },
                {
                  "key": "mock_1_2",
                  "title": "",
                  "component": "text",
                  "options": {
                    "mode": "single"
                  },
                  "dataIndex": "name"
                }
              ]
            }
          },
          content: {
            key: "mock_1",
            title: "名称",
            align: "center",
            dataIndex: "name",
            component: "text",
            options: {
              mode: "single",
              showTooltip: false,
            },
          },
        },
      },
      {
        key: "mock_2",
        title: "价格",
        align: "center",
        dataIndex: "price",
        component: "text",
        options: {
          mode: "single",
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
        icons={Icons}
        onEvent={(event, tableInfo) => {
          const { record, recordIndex } = event;
          if (event.type === "drip-icon-click") {
            const name = event.payload.name;
            message.info(`第${recordIndex + 1}行“${record.name} (ID: ${record.id})”的“${name}”图标被点击。`);
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

| 参数名      | 描述                                                                             | 类型                                                                          | 是否必填 | 默认值                      | 详情 |
| ----------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------- | ------------------------- | ---- |
| style       | 自定义样式                                                                       | React.CSSProperties                                                           | 否       | 无                         | --   |
