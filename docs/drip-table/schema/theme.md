---
title: 主题配置 theme
toc: content
---

## 主题配置 theme

- 描述：配置主题相关
- 类型：`Record<string, string>`
- 默认值：`undefined`

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import { message } from "antd";
import * as Icons from "@ant-design/icons";
import React from "react";
import DripTable from "drip-table";
import { initSchema, mockData } from '../../demo-data';

const schema = {
  theme: {
    primaryColor: '#FF6666',
    primaryActiveColor: '#FF0033',
    primaryShadowColor: '#FF003333',
    textColor: '#d18888',
    borderColor: '#CC9999',
    backgroundColor: '#FFCCCC',
  },
  columns: initSchema.columns.filter(c => !c.component.startsWith('custom::')),
  pagination: initSchema.pagination,
  scroll: initSchema.scroll,
};

const dataSource = mockData;

const Demo = () => {
  return (
    <DripTable
      schema={schema}
      dataSource={dataSource}
      icons={Icons}
    />
  );
};

export default Demo;
```
