---
order: 2
title: 图片组件
---

## 图片组件 image

图片展示组件

## 何时使用

 - 需要展示图片时使用。

## 代码演示

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import { Row, Col, InputNumber } from 'antd';
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
    status: "onSale",
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
        key: "mock_1",
        title: "可全屏预览图片",
        dataIndex: "pictureUrl",
        component: "image",
        options: {
          preview: true,
          imageWidth: imageWidth,
          imageHeight: imageHeight,
        },
      },
      {
        key: "mock_2",
        title: "可悬浮预览图片",
        dataIndex: "pictureUrl",
        component: "image",
        options: {
          popover: true,
          preview: false,
          imageWidth: imageWidth,
          imageHeight: imageHeight,
        },
      },
      {
        key: "mock_3",
        title: "图片组件默认底图",
        dataIndex: "imgUrl",
        component: "image",
        options: {
          imagePlaceholder: "https://gw.alipayobjects.com/zos/alicdn/MNbKfLBVb/Empty.svg",
          imageWidth: imageWidth,
          imageHeight: imageHeight,
        },
      },
    ],
  };

  return (
    <React.Fragment>
      <Row style={{ marginBottom: 18 }}>
        <Col style={{ marginRight: 18, lineHeight: '32px' }}>图片宽度</Col>
        <Col><InputNumber value={imageWidth} min={10} max={500} onChange={(v) => setImageWidth(v)} /></Col>
        <Col span={1}></Col><Col style={{ marginRight: 18, lineHeight: '32px' }}>图片高度</Col>
        <Col><InputNumber value={imageHeight} min={10} max={500} onChange={(v) => setImageHeight(v)} /></Col>
      </Row>
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
| preview | 是否支持全屏预览 | boolean | 否 | true | -- |
| popover | 是否支持悬浮框预览 | boolean | 否 | false | -- |
| imageWidth | 图片宽度 | number | 否 | 无 | -- |
| imageHeight | 图片高度 | number | 否 | 无 | -- |
| imagePlaceholder | 默认兜底图，图片展示有误时兜底展示用 | string | 否 | -- | -- |
