---
order: 9
title: 弹出网页组件
---

## 弹出网页组件 pop-up-page

弹出网页用于页面弹出一个内嵌的网页。

## 何时使用

该组件为button组件和modal组合而成，标记了一个操作命令，响应用户点击行为，触发后弹出一个modal框，其中展示浏览的网页。

## 代码演示

### 设置弹出网页样式

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import { message } from 'antd';
import React from "react";
import DripTable from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";
import "drip-table/dist/index.css";
const dataSource = [
  {
    id: 1,
    name: "商品一",
    price: 7999,
    status: 1,
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png',
  },
];
const Demo = () => {
  const schema = {
    columns: [
      {
        key: 'mock_1',
        title: '设置弹框网页链接',
        align: 'center',
        hidable: true,
        dataIndex: 'operate',
        component: 'pop-up-page',
        options: {
          title: 'drip-table',
          link: 'http://drip-table.jd.com',
          label: '弹网页',
          buttonType: 'text',
        },
      },
      {
        key: 'mock_2',
        title: '弹框网页设置宽高',
        align: 'center',
        hidable: true,
        dataIndex: 'operate',
        component: 'pop-up-page',
        options: {
          title: 'drip-table',
          label: '弹网页',
          width: '50%',
          height: '700px',
          buttonType: 'text',
        },
      },
      {
        key: 'mock_3',
        title: '弹框网页设置最大高度',
        align: 'center',
        hidable: true,
        dataIndex: 'operate',
        component: 'pop-up-page',
        options: {
          title: 'drip-table',
          label: '弹网页',
          maxHeight: '730px',
          height: '800px',
          buttonType: 'text',
        },
      },
      {
        key: 'mock_4',
        title: '弹框网页设置按钮样式',
        align: 'center',
        hidable: true,
        dataIndex: 'operate',
        component: 'pop-up-page',
        options: {
          title: 'drip-table',
          width: '600px',
          height: '600px',
          link: 'http://drip-table.jd.com',
          label: '弹网页',
          buttonType: 'primary',
          shape: 'round',
        },
      },
    ],
  };
  return (
    <React.Fragment>
      <DripTable
        driver={DripTableDriverAntDesign}
        schema={schema}
        dataSource={dataSource}
      />
    </React.Fragment>
  );
};
export default Demo;
```


## API

| 参数名 | 描述 | 类型 | 是否必填 | 默认值 | 详情 |
| ----- | ---- | ---- | ------ | ---- | ---- |
| title | 弹窗标题	 | string | 否 | - | - |
| auxiliaryDesc | 辅助文字	 | string | 否 | - | - |
| embeddedSafetyPadding | 嵌入安全边距	 | string | 否 | - | - |
| link | 弹窗内嵌链接	 | string | 否 | - | - |
| width | 弹窗宽度	 | number ｜ string | 否 | - | - |
| maxWidth | 弹窗最大宽度	 | number ｜ string | 否 | - | 不设的话默认1152px |
| height | 弹窗高度 | number ｜ string | 否 | - | - |
| maxHeight | 弹窗标题	 | number ｜ string | 否 | - | 不设的话默认730px|
| label | 按钮展示文案 | string | 否 | - | - |
| buttonType | 设置按钮类型	 | `primary` \| `dashed` \| `link` \| `text` \| `default` | 否 | - | - |
| shape | 设置按钮形状 | `circle` \| `round` | 否 | - | - |
| size | 设置按钮大小	 | `large` \| `middle` \| `small` | 否 | - | - |
