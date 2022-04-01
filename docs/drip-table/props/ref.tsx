/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */

import 'antd/dist/antd.css';

import { Button, message } from 'antd';
import DripTable, { DripTableInstance } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import React, { useRef, useState } from 'react';

import { initSchema, mockData, SampleRecordType } from '../../demo-data';

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
      <DripTable<SampleRecordType>
        ref={dripTable}
        driver={DripTableDriverAntDesign}
        schema={schema}
        slots={{
          default: props => <div data-slot-type={props.slotType} />,
        }}
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
    </React.Fragment>
  );
};

export default Demo;
