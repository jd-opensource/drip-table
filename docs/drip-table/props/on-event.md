# 通用事件机制 onEvent

- 描述：通用事件机制
- 类型：

```typescript
type OnEvent = (
  event: (DripTableBuiltInComponentEvent | NonNullable<ExtraOptions['CustomComponentEvent']>) & {
    record?: RecordType;
    recordIndex?: number;
    columnIndex?: number;
  },
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
import { Button, message } from "antd";
import React from "react";
import DripTable from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";
import "drip-table/dist/index.css";

const schema = {
  columns: [
    {
      key: "mock_1",
      title: {
        header: {
          elements: [
            { type: 'slot', slot: 'EventSample', data: { from: '商品名称表头' } },
          ],
        },
        body: "",
      },
      dataIndex: "name",
      component: "text",
      options: {
        mode: "single",
        maxRow: 1,
      },
    },
    {
      key: "mock_2",
      title: {
        header: {
          elements: [
            { type: 'slot', slot: 'EventSample', data: { from: '商品详情表头' } },
          ],
        },
        body: "",
      },
      align: "center",
      dataIndex: "description",
      component: "text",
      options: {
        mode: "single",
        ellipsis: true,
        maxRow: 1,
      },
    },
    {
      key: "mock_3",
      title: "自定义事件",
      align: "center",
      dataIndex: "description",
      component: "custom::EventSample",
    },
    {
      key: 'mock_7',
      title: '操作',
      width: 200,
      align: 'center',
      fixed: 'right',
      hidable: true,
      dataIndex: 'operate',
      component: 'link',
      options: {
        mode: 'multiple',
        operates: [
          { name: 'order', label: '订购', event: 'order' },
          { name: 'view', label: '查看', event: 'view' },
          { name: 'edit', label: '编辑', event: 'edit' },
          { name: 'remove', label: '删除', event: 'remove' },
        ],
      },
    },
  ],
  rowHeader: {
    elements: [
      {
        span: 'flex-auto',
        type: 'slot',
        slot: 'EventSample',
        data: { from: '整行' },
        style: { padding: '10px 20px' },
      },
    ],
  },
};

const dataSource = [
  {
    id: 1,
    name: "商品一",
    price: 7999,
    status: "onSale",
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
];

const Demo = () => {
  return (
    <DripTable
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={dataSource}
      components={{
        custom: {
          EventSample: (props) => (
            <div>
              <span style={{ marginRight: '5px' }}>单元格插槽</span>
              <Button onClick={() => { props.fireEvent({ type: 'custom', name: 'sample-event', payload: 'some value' }) }}>发起事件</Button>
            </div>
          ),
        },
      }}
      slots={{
        EventSample: (props) => (
          <div style={{ textAlign: 'center' }}>
            <span style={{ marginRight: '5px' }}>{props.data.from}插槽</span>
            <Button onClick={() => { props.fireEvent({ type: 'custom', name: 'sample-event', payload: 'some value' }) }}>发起事件</Button>
          </div>
        ),
      }}
      onEvent={(event, tableInfo) => {
        const { record, recordIndex, columnIndex } = event;
        let from = '';
        if (columnIndex !== void 0) {
          from += `第${columnIndex + 1}列`;
        }
        if (recordIndex !== void 0) {
          from += `第${recordIndex + 1}行`;
        }
        if (record !== void 0) {
          from += `“${record.name} (ID: ${record.id})”`;
        }
        if (event.type === 'drip-link-click') {
          const name = event.payload;
          if (from) {
            from += '的';
          }
          message.info(`你点击了${from}"${name}"事件按钮。`);
          console.log(name, record, recordIndex);
        } else if (event.type === 'custom') {
          if (from) {
            from = '触发与' + from + '的';
          }
          message.info(`自定义事件 “${event.name}”(payload:${JSON.stringify(event.payload)}) ${from}自定义组件。`);
          console.log(event, record, recordIndex);
        }
      }}
    />
  );
};

export default Demo;
```
