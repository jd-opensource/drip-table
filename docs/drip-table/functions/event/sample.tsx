/**
 * transform: true
 * inline: true
 */

import React, { useEffect, useState, useRef } from 'react';
import { message } from 'antd';
import DripTable, { DripTableProvider } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';

import { mockData, initSchema, SampleRecordType } from '../../../global-configs';
import { CustomComponentEvent, CustomComponents } from './custom-components';

const Demo = () => {
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(10);
  const [dataSource] = useState(mockData);
  const [pageDataSource, setPageDataSource] = useState(dataSource);
  const [schema] = useState(initSchema);
  const dripTable = useRef(null);

  useEffect(
    () => {
      setPageDataSource(dataSource.slice((pageNum - 1) * pageSize, Math.min(pageNum * pageSize, dataSource.length)));
    },
    [dataSource, pageSize, pageNum]
  );

  const fetchPageData = (nextPageNum: number) => {
    if (loading) {
      return;
    }
    setTimeout(
      () => {
        setLoading(false);
        setPageNum(nextPageNum);
      },
      500
    );
    setLoading(true);
  }

  return (
    <React.Fragment>
      <DripTableProvider ref={dripTable}>
        <DripTable<SampleRecordType, CustomComponentEvent>
          driver={DripTableDriverAntDesign}
          schema={schema}
          loading={loading}
          total={mockData.length}
          dataSource={pageDataSource}
          components={{ custom: CustomComponents }}
          onEvent={(event, record, index) => {
            if (event.type === 'drip-link-click') {
              const name = event.payload;
              message.info(`你点击了第${index + 1}行“${record.name} (ID: ${record.id})”的"${name}"事件按钮。`);
              console.log(name, record, index);
            } else if (event.type === 'custom') {
              message.info(`自定义事件“${event.name}”触发于行“${record.name} (ID: ${record.id})”的自定义组件。`);
              console.log(event, record, index);
            }
          }}
          onPageChange={(page, pageSize) => { fetchPageData(page); }}
        />
      </DripTableProvider>
    </React.Fragment>
  );
};

export default Demo;
