---
title: 自定义列头筛选器 renderHeaderCellFilter
toc: content
---

## 自定义列头筛选器 renderHeaderCellFilter

- 描述：使用自定义列头筛选器替换表格列头筛选器。
- 类型：`React.ComponentType`
- 默认值：`undefined`

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";
import { Button, Popover, message } from "antd";
import { FilterFilled } from "@ant-design/icons";

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      options: { mode: "single", maxRow: 1 },
    },
    {
      key: "mock_2",
      title: "商品详情",
      align: "center",
      dataIndex: "description",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: 'mock_3',
      title: '库存状态',
      width: 150,
      align: 'center',
      dataIndex: 'status',
      description: '这是一条提示信息',
      hidable: true,
      filters: [
        { text: '售卖中', value: 'onSale' },
        { text: '已售罄', value: 'soldOut' },
      ],
      component: 'text',
      options: {
        mode: 'single',
        i18n: {
          onSale: '售卖中',
          soldOut: '已售罄',
        },
      },
    },
  ],
};

const dataSource = Array(200).fill(0).map((_, i) => ({
  id: i,
  name: "商品" + i,
  price: 7999,
  status: i % 2 === 0 ? "onSale" : "soldOut",
  description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
}));

const Demo = () => {
  const [ds, setDS] = React.useState(dataSource);
  return (
    <DripTable
      schema={schema}
      dataSource={ds}
      onChange={({ pagination, filters }) => {
        if (filters.status?.length) {
          setDS(dataSource.filter(d => filters.status.includes(d.status)));
        } else {
          setDS(dataSource);
        }
        message.info(`过滤器：${JSON.stringify(filters)}，分页器：current = ${pagination.current}, pageSize = ${pagination.pageSize}。`);
        console.log('onChange', pagination, filters);
      }}
      renderHeaderCellFilter={(props) => (
        <Popover
          content={(
            <div style={ { maxWidth: '300px' } }>
              <div>自定义表头筛选器：</div>
              <div style={ { maxWidth: '250px', wordBreak: 'break-all' } }>{ JSON.stringify(props) }</div>
              {
                props.columnSchema.filters.map(v => (
                  <Button
                    key={v.value}
                    style={ { margin: '5px 5px 0 0' } }
                    onClick={() => {
                      const filter = props.filter.length == 0
                        ? props.columnSchema.filters.map(v => v.value)
                        : props.filter;
                      if (filter.indexOf(v.value) >= 0) {
                        props.setFilter([...filter.filter(vv => vv !== v.value)]);
                      } else {
                        props.setFilter([...filter, v.value]);
                      }
                    }}
                    type={props.filter.length === 0 || props.filter.indexOf(v.value) >= 0 ? 'primary' : void 0}
                  >{ v.text }</Button>
                ))
              }
            </div>
          )}
          trigger="click"
        >
          <FilterFilled />
        </Popover>
      )}
    />
  );
};

export default Demo;
```
