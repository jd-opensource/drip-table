# 标签组件 tag

进行标记和分类的小标签。

## 何时使用

 - 用于标记事物的属性和维度。
 - 进行分类。

## 代码演示

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
  {
    id: 2,
    name: "商品二",
    price: 3899,
    status: 0,
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png',
  },
];

const Demo = () => {
  const [imageHeight, setImageHeight] = React.useState(96);
  const [imageWidth, setImageWidth] = React.useState(96);
  const schema = {
    columns: [
      {
        key: 'mock_1',
        title: '自定义样式',
        align: 'center',
        hidable: true,
        dataIndex: 'name',
        component: 'tag',
        options: {
          color: '#f50',
          borderColor: '#f50',
          backgroundColor: '#fff1f0',
          radius: 16
        },
      },
      {
        key: 'mock_2',
        title: '带前缀后缀',
        align: 'center',
        hidable: true,
        dataIndex: 'price',
        component: 'tag',
        options: {
          prefix: '价格：',
          suffix: '元',
        },
      },
      {
        key: 'mock_3',
        title: '自定义枚举值展示',
        align: 'center',
        hidable: true,
        dataIndex: 'status',
        component: 'tag',
        options: {
          tagOptions: [
            { label: '售卖中', value: 1, color: 'success' },
            { label: '已下架', value: 0, color: 'error' }
          ]
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
| color | 字体颜色,预设五种状态颜色，可以通过设置 `status` 为 `success`、 `processing`、`error`、`default`、`warning` 来代表不同的状态。 | string | 否 | - | - |
| borderColor | 边框颜色 | string | 否 | - | - |
| backgroundColor | 背景色 | string | 否 | - | - |
| radius | 圆角半径 | number | 否 | - | - |
| prefix | 前缀 | string | 否 | - | - |
| suffix | 后缀 | string | 否 | - | - |
| content | 静态文案 | string | 否 | - | - |
| tagOptions | 静态文案, 其中 `color` 字段解释同上 | { label: string; value: string \| number; color: string }[] | 否 | - | - |
