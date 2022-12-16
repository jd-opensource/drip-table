# 行收起触发 onRowCollapse

- 描述：行收起触发
- 类型：

```typescript
type OnRowDoubleClick = (
  record: RecordType | RecordType[],
  tableInfo: DripTableTableInformation<RecordType, ExtraOptions>,
) => void;
```

- 默认值：`undefined`
- 说明：[`DripTableTableInformation<RecordType, ExtraOptions>`](/drip-table/types/table-information)

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";
import { message, Spin } from 'antd';
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";
import "drip-table/dist/index.css";

const schema = {
  id: 'sample-table',
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      options: {
        mode: "single",
        maxRow: 1,
      },
    },
    {
      key: "mock_2",
      title: "商品详情",
      align: "center",
      dataIndex: "description",
      component: "text",
      options: {
        mode: "single",
        ellipsis: true,
        maxRow: 1,
      },
    },
  ],
  subtable: {
    id: 'sample-table-sub-level-1',
    dataSourceKey: 'subtableLevel1',
    rowKey: "id",
    rowSelection: true,
    columns: [
      {
        key: 'mock_1',
        title: '页面名称',
        align: 'center',
        dataIndex: 'name',
        component: 'text',
        options: {
          mode: 'single',
          maxRow: 1,
        },
      },
      {
        key: 'mock_2',
        title: '开始/结束时间',
        align: 'center',
        hidable: true,
        dataIndex: 'description',
        component: 'text',
        options: {
          mode: 'single',
          ellipsis: true,
          maxRow: 3,
        },
      },
    ],
    showHeader: false,
    bordered: true,
    subtable: {
      id: 'sample-table-sub-level-2',
      dataSourceKey: 'subtableLevel2',
      rowKey: "id",
      rowSelection: true,
      columns: [
        {
          key: 'mock_1',
          title: '页面名称',
          align: 'center',
          dataIndex: 'name',
          component: 'text',
          options: {
            mode: 'single',
            maxRow: 1,
          },
        },
        {
          key: 'mock_2',
          title: '开始/结束时间',
          align: 'center',
          hidable: true,
          dataIndex: 'description',
          component: 'text',
          options: {
            mode: 'single',
            ellipsis: true,
            maxRow: 3,
          },
        },
      ],
      showHeader: false,
      bordered: true,
      subtable: {
        id: 'sample-table-sub-level-3',
        dataSourceKey: 'subtableLevel3',
        rowKey: "id",
        rowSelection: true,
        columns: [
          {
            key: 'mock_1',
            title: '页面名称',
            align: 'center',
            dataIndex: 'name',
            component: 'text',
            options: {
              mode: 'single',
              maxRow: 1,
            },
          },
          {
            key: 'mock_2',
            title: '开始/结束时间',
            align: 'center',
            hidable: true,
            dataIndex: 'description',
            component: 'text',
            options: {
              mode: 'single',
              ellipsis: true,
              maxRow: 3,
            },
          },
        ],
        showHeader: false,
        bordered: true,
      },
    },
  },
};

const recursiveSetArray = (root, path, setter) => {
  const res = [...root];
  let current = res;
  for (let i = 0; i < path.length; i++) {
    const p = path[i];
    if (i < path.length - 1) {
      current[p] = Array.isArray(current[p])
        ? [...current[p]]
        : {...current[p]};
    } else {
      current[p] = setter(current[p]);
    }
    current = current[p];
  }
  return res;
};

const Demo = () => {
  const [dataSource, setDataSource] = React.useState([
    {
      id: '1',
      name: "商品一",
      price: 7999,
      status: "onSale",
      description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    },
    {
      id: '2',
      name: "商品二",
      price: 7999,
      status: "onSale",
      description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    },
    {
      id: '3',
      name: "商品三",
      price: 7999,
      status: "onSale",
      description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    },
    {
      id: '4',
      name: "商品四",
      price: 7999,
      status: "onSale",
      description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    },
  ]);

  return (
    <DripTable
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={dataSource}
      rowExpandable={(record, index, parent) => ['sample-table', 'sample-table-sub-level-1'].includes(parent.schema.id) && record.id !== '3'}
      expandedRowRender={(record, index, parent) => (
        record[`subtableLevel${record.id.split('-').length}`]
          ? null
          : (
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <Spin spinning tip="Loading..." />
            </div>
          )
      )}
      onRowExpand={(record, index, parent) => {
        if (record.subtableLevel1) {
          return;
        }
        // mock async data request
        setTimeout(() => {
          setDataSource((ds) => recursiveSetArray(
            ds,
            [].concat(
              ...record.id
                .split('-')
                .map(s => Number(s) - 1)
                .map((i, l) => l === 0 ? i : [`subtableLevel${l}`, i])
            ),
            (rec) => Object.assign({}, rec, {
              [`subtableLevel${record.id.split('-').length}`]: [
                {
                  id: `${rec.id}-1`,
                  name: `子商品 ${rec.id}-1`,
                  description: `子商品 ${rec.id}-1 的描述`,
                },
                {
                  id: `${rec.id}-2`,
                  name: `子商品 ${rec.id}-2`,
                  description: `子商品 ${rec.id}-2 的描述`,
                },
              ],
            })
          ));
        }, 2000);
      }}
      onRowCollapse={(record, index, parent) => {
        message.info(`行 ${record.id} 折叠！`);
      }}
    />
  );
};

export default Demo;
```
