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
    <React.Fragment>
      <style>{'html { --drip-table-text-color: #d18888 }'}</style>
      <DripTable
        schema={schema}
        dataSource={dataSource}
        icons={Icons}
      />
    </React.Fragment>
  );
};

export default Demo;
```
