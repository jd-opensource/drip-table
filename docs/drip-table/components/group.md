---
title: 组合组件 Group
toc: content
---

## 组合组件 group

组合组件

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
        component: "group",
        options: {
          layout: [2],
          wrap: false,
          horizontalAlign: "center",
          items: [
            {
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
          ],
        },
      },
      {
        align: "center",
        verticalAlign: "middle",
        key: "group_18f7a40dffd-1271",
        dataIndex: "",
        title: "详情",
        component: "group",
        options: {
          layout: [1, 1],
          wrap: false,
          horizontalAlign: "center",
          items: [
            {
              dataIndex: ["name"],
              align: "center",
              verticalAlign: "middle",
              key: "text_18f7a41408a-1276",
              title: "",
              component: "text",
              options: {
                mode: "single",
                showTooltip: false,
                format: "{{rec}}",
                parts: [
                  {
                    dataIndexMode: "direct",
                    dataIndex: "id",
                  },
                ],
                clipboard: true,
              },
            },
            {
              dataIndex: ["description"],
              align: "center",
              verticalAlign: "middle",
              key: "text_18f7a4195e3-127b",
              title: "",
              component: "text",
              options: {
                mode: "single",
                showTooltip: false,
                format: "{{rec}}",
                parts: [
                  {
                    dataIndexMode: "direct",
                    dataIndex: "id",
                  },
                ],
                maxRow: 3,
              },
            },
          ],
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
      {
        key: "mock_3",
        title: "操作",
        align: "center",
        verticalAlign: "middle",
        dataIndex: "",
        component: "group",
        options: {
          layout: [2],
          wrap: false,
          horizontalAlign: "center",
          items: [
            {
              dataIndex: "",
              align: "center",
              verticalAlign: "middle",
              key: "mock_icon_1",
              title: "",
              component: "icon",
              options: {
                icon: "CopyOutlined",
                style: {
                  padding: "0 3px",
                  color: "#2a64ff",
                  fontSize: "16px",
                },
                event: "copy-icon",
              },
            },
            {
              dataIndex: "",
              align: "center",
              verticalAlign: "middle",
              key: "mock_icon_1",
              title: "",
              component: "icon",
              options: {
                icon: "DeleteOutlined",
                style: {
                  padding: "0 3px",
                  color: "#ff4d4f",
                  fontSize: "16px",
                },
                event: "delete-icon",
              },
            },
          ],
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
