# 组合组件

**Generator 提供了可配置组件布局再自由配置内容的组件**

组合组件通过配置组件布局，再在布局中配置内容，从而实现复杂单元格的内容展示，无需开发。

操作过程如下所示：

<video style="width: 800px; height: 500px;" id="video" controls="" preload="none" poster="封面">
  <source id="mp4" src="https://storage.360buyimg.com/launch/drip-table/group.mp4" type="video/mp4">
</video>

示例：
```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import 'antd/dist/antd.css';
import 'drip-table/dist/index.css';
import 'drip-table-generator/dist/index.css';

import { Input } from 'antd';
import { DripTableExtraOptions, DripTableSchema } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import DripTableGenerator from 'drip-table-generator';
import React, { useState } from 'react';

const schema = {
  columns: [
    {
      key: 'mock_1',
      title: '商品图名',
      width: 120,
      align: 'center',
      verticalAlign: 'middle',
      dataIndex: '',
      component: 'group',
      options: {
        layout: [1, 2],
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        gutter: [16, 8],
        wrap: false,
        items: [
          {
            component: 'image',
            options: {
              imageWidth: 86,
              imageHeight: 86,
            },
            dataIndex: 'pictureUrl',
          },
          {
            component: 'text',
            options: {
              mode: 'single',
            },
            dataIndex: 'name',
          },
          {
            component: 'text',
            options: {
              mode: 'single',
              prefix: '￥',
            },
            dataIndex: 'price',
          },
        ],
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
    pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png',
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
];

const Demo = () => {
  return (
    <DripTableGenerator
      mockDataSource
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={dataSource}
    />
  );
};

export default Demo;
```