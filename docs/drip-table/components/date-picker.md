---
order: 8
title: 日期组件 Date Picker
---

## 日期组件 dataPicker

用于选择单个日期或者日期番位。

## 何时使用

需要渲染时间戳或者对时间进行操作时，可使用日期组件。

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
    startDate: '2022-09-23',
    endDate: '2022-09-30',
    demoPic: 'https://img11.360buyimg.com/n1/jfs/t1/159786/31/30814/90307/6343dea0E9d5574ae/12d488e175b2525f.jpg.avif',
    dateRange: ['2022-09-23', '2022-09-30'],
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png',
  },
];

const Demo = () => {
  const schema = {
    columns: [
      {
        key: 'date-picker_182e8eea517-1239',
        dataIndex: 'startDate',
        title: '日期',
        width: 120,
        description: '',
        component: 'date-picker',
        options: {
          mode: 'basic',
          format: 'YYYY-MM-DD',

        },
        align: 'center',
      },
      {
        key: 'date-picker_182e8eea517-1240',
        dataIndex: 'dateRange',
        width: 120,
        title: '日期范围',
        description: '',
        component: 'date-picker',
        options: {
          mode: 'range',
          format: 'YYYY-MM-DD',
        },
        align: 'center',
      },
    ]
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
| mode | 单日期或者日期范围 | `basic` \| `range` | 是 | `basic` | - |
| format | 日期format | string | 否 | YYYY-MM-DD | - |
