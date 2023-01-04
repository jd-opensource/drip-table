/**
 * ## DUMI CONFIG ##
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */

import { Button, message } from 'antd';
import DripTable, { DripTableInstance } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import React, { useRef, useState } from 'react';

import { initSchema, mockData, SampleRecordType, SubtableDataSourceKey } from '../../demo-data';
import { CustomColumnSchema } from '../demo/custom-components';

const schema = {
  ...initSchema,
  columns: [...initSchema.columns].filter(cfg => !cfg.component.startsWith('custom::') && cfg.component !== 'render-html'),
};

const simpleData = mockData.filter(item => item.id < 10);

const Demo = () => {
  const [allSelected, setAllSelected] = useState(false);
  const dripTable: React.MutableRefObject<DripTableInstance | null> = useRef(null);

  function selectAllRecord() {
    const tableInstance = dripTable.current;
    const allKeys = simpleData.map((rec, idx) => idx);
    if (tableInstance) {
      const selectedKeys = tableInstance.selectedRowKeys;
      if (selectedKeys.length < allKeys.length) {
        tableInstance.select(allKeys);
        setAllSelected(true);
      } else {
        tableInstance.select([]);
        setAllSelected(false);
      }
    }
  }

  return (
    <React.Fragment>
      <div style={{ padding: '0 30px 30px', textAlign: 'left' }}>
        <Button style={{ marginRight: '5px' }} type="primary" onClick={selectAllRecord}>
          { allSelected && '取消' }
          全选
        </Button>
      </div>
      <DripTable<SampleRecordType, {
        CustomColumnSchema: CustomColumnSchema;
        CustomComponentEvent: never;
        CustomComponentExtraData: never;
        SubtableDataSourceKey: SubtableDataSourceKey;
      }>
        ref={dripTable}
        driver={DripTableDriverAntDesign}
        schema={schema}
        slots={{
          default: props => <div data-slot-type={props.slotType} />,
        }}
        total={simpleData.length}
        dataSource={simpleData}
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
          } else if (event.type) {
            if (from) {
              from = `触发与${from}的`;
            }
            message.info(`自定义事件 “${event.type}”(payload:${JSON.stringify(event.payload)}) ${from}自定义组件。`);
            console.log(event, record, recordIndex);
          }
        }}
        onSelectionChange={(selectedKeys, selectedRows) => {
          setAllSelected(selectedRows.length >= simpleData.length);
        }}
      />
    </React.Fragment>
  );
};

export default Demo;
