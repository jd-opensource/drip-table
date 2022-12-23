# CDN 链接组件

**CDN 链接组件允许用户在本地开发自己的业务代码，上传至 CDN 后可以通过该组件嵌入表格中。**

示例：
```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
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
      title: 'CDN 链接组件',
      width: 120,
      align: 'center',
      verticalAlign: 'middle',
      dataIndex: '',
      component: 'render-html-remote',
      options: {
        url: 'https://storage.360buyimg.com/launch/drip-table/app.js',
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
