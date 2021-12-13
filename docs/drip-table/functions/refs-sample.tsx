/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */

import React, { useState, useRef } from 'react';
import { Button, message } from 'antd';
import DripTable, { DripTableContainerHandle, DripTableProps, DripTableProvider } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import 'antd/dist/antd.css';

import { mockData, initSchema, SampleRecordType } from '../../global-configs';

const schema = {
  ...initSchema,
  columns: [...initSchema.columns].filter(cfg => !cfg['ui:type'].startsWith('custom::') && cfg['ui:type'] !== 'render-html')
}

const simpleData = mockData.filter(item => item.id < 10);

const Demo = () => {
  const [allSelected, setAllSelected] = useState(false);
  const dripTable: React.MutableRefObject<DripTableContainerHandle | null> = useRef(null);

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
        <Button style={{ marginRight: '5px' }} type="primary" onClick={selectAllRecord}>{allSelected && '取消'}全选</Button>
      </div>
      <DripTableProvider ref={dripTable}>
        <DripTable<SampleRecordType>
          driver={DripTableDriverAntDesign as DripTableProps<SampleRecordType>['driver']}
          schema={schema}
          total={simpleData.length}
          dataSource={simpleData}
          onEvent={(event, record, index) => {
            if (event.type === 'drip-link-click') {
              const name = event.payload;
              message.info(`你点击了第${index + 1}行“${record.name} (ID: ${record.id})”的"${name}"事件按钮。`);
              console.log(name, record, index);
            } else if (event.type) {
              message.info(`自定义事件“${event.type}”触发于行“${record.name} (ID: ${record.id})”的自定义组件。`);
              console.log(event, record, index);
            }
          }}
          onSelectionChange={(selectedKeys, selectedRows) => {
            setAllSelected(selectedRows.length >= simpleData.length);
          }}
        />
      </DripTableProvider>
    </React.Fragment>
  );
};

export default Demo;
