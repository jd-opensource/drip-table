# 富文本组件

**通过在线富文本编辑器编辑渲染内容生成单元格组件。**

支持以双花括号的形式作为字符串模板来获取当前行数据

#### 参数 `rec`

- 描述: `模板字段`
- 类型: `Record`
- 默认值: `null`
用于获取表格数据的一条记录，数据格式取决于用户传入的数据格式。

示例：

```js
return `<a href="http://ace.jd.com/#/launch?config=${rec.price}" target="_blank">${rec.name}</a>`;
```

代码示例：
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
      "key": "rich-text_1814cd20c31-11e8",
      "dataIndex": "",
      "title": "富文本组件",
      "description": "",
      "component": "rich-text",
      "options": {
        "render": "<p><img src=\"{{rec.pictureUrl}}\"></p><p><strong>商品名:</strong> {{rec.name}}</p>"
      },
      "align": "center"
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