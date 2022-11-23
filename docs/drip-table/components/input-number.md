# 数字组件 input-number

通过鼠标或键盘，输入范围内的数值。

## 何时使用
当需要获取标准数值时。

## 代码演示

### 数字组件
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
        title: '数字组件设步数',
        align: 'center',
        hidable: true,
        dataIndex: 'operate',
        component: 'input-number',
        options: {
          step: 5,
          min: 0,
        },
      },
      {
        key: 'mock_2',
        title: '数字组件设最大值',
        align: 'center',
        hidable: true,
        dataIndex: 'operate',
        component: 'input-number',
        options: {
          step: 1,
          min: 0,
          max: 20,
        },
      }
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
| step | 步数 | string/number | 1 | - | - |
| min | 最小值 | number | 0 | - | - |
| max | 最大值 | number | - | - | - |
