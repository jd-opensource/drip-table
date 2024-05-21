---
title: 图标组件 Icon
toc: content
---

## 图标组件 icon

图标组件

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
        key: 'mock_1',
        title: '名称',
        align: 'center',
        dataIndex: 'name',
        component: 'text',
        options: {
          mode: 'single',
        },
      },
      {
        key: 'mock_2',
        title: '价格',
        align: 'center',
        dataIndex: 'price',
        component: 'text',
        options: {
          mode: 'single',
        },
      },
      {
        key: 'mock_3',
        title: '操作',
        align: 'center',
        verticalAlign: 'middle',
        dataIndex: '',
        component: 'group',
        options: {
          layout: [2],
          wrap: false,
          horizontalAlign: 'center',
          items: [
            {
              dataIndex: '',
              align: 'center',
              verticalAlign: 'middle',
              key: 'mock_icon_1',
              title: '',
              component: 'icon',
              options: {
                icon: 'CopyOutlined',
                style: {
                  padding: '0 3px',
                  color: '#2a64ff',
                  fontSize: '16px',
                },
                event: 'copy-icon',
              },
            },
            {
              dataIndex: '',
              align: 'center',
              verticalAlign: 'middle',
              key: 'mock_icon_1',
              title: '',
              component: 'icon',
              options: {
                icon: 'DeleteOutlined',
                style: {
                  padding: '0 3px',
                  color: '#ff4d4f',
                  fontSize: '16px',
                },
                event: 'delete-icon',
              },
            },
          ],
        },
      },
      {
        align: 'center',
        verticalAlign: 'middle',
        key: 'icon_18f94c13091-125a',
        dataIndex: '',
        title: '自定义HTML',
        component: 'icon',
        options: {
          event: '',
          icon: {
            html: '<svg style="width: 20px; height: 20px" t="1716187965366" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2741" width="64" height="64"><path d="M576 452.266667v422.4h-85.333333v-422.4l-89.6 89.6L341.333333 477.866667l192-192 192 192-59.733333 59.733333-89.6-85.333333z m213.333333-217.6h-512v-85.333334h512v85.333334z" fill="#444444" p-id="2742"></path></svg>',
          },
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
| icon        | 图标名称或者自定义渲染                                                            | string                                                                        | 否       | 无                         | --   |
| event       | 事件名，点击时触发，通过属性 `onEvent` 接收事件，事件类型为 `drip-icon-click`        | string                                                                        | 否       | 无                        | --   |
