/**
 * transform: true
 * inline: true
 */

import React, { useEffect, useState, useRef } from 'react';
import { Button, message, Tabs } from 'antd';
import { CloseCircleTwoTone } from '@ant-design/icons';
import DripTable, { DripTableProvider, DripTableContainerHandle } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import { JsonEditor } from 'jsoneditor-react';
import 'antd/dist/antd.css';
import 'jsoneditor-react/es/editor.min.css';
import 'drip-table/index.css';

import { mockData, initSchema, SampleRecordType } from '../../global-configs';
import { CustomComponentEvent, CustomComponents } from './custom-components';

import styles from './sample.module.less';

const Demo = () => {
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dataSource, setDataSource] = useState(mockData);
  const [pageDataSource, setPageDataSource] = useState(dataSource);
  const [schema, setSchema] = useState(initSchema);
  const [editVisible, setEditVisible] = useState(false);
  const [allSelected, setAllSelected] = useState(false);
  const dripTable: React.MutableRefObject<DripTableContainerHandle | null> = useRef(null);

  useEffect(
    () => {
      setPageDataSource(dataSource.slice((pageNum - 1) * pageSize, Math.min(pageNum * pageSize, dataSource.length)));
    },
    [dataSource, pageSize, pageNum],
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
      500,
    );
    setLoading(true);
  };

  function selectAllRecord() {
    const tableInstance = dripTable.current;
    const allKeys = pageDataSource.map((rec, idx) => idx);
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
        <Button style={{ marginRight: '5px' }} type="primary" onClick={() => { setEditVisible(!editVisible); }}>编辑</Button>
        <Button style={{ marginRight: '5px' }} type="primary" onClick={selectAllRecord}>
          { allSelected && '取消' }
          全选
        </Button>
      </div>
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
          onSelectionChange={(selectedKeys, selectedRows) => {
            setAllSelected(selectedRows.length >= pageDataSource.length);
          }}
          onSearch={(searchParams) => console.log(searchParams)}
          onAddButtonClick={event => console.log(event)}
        />
      </DripTableProvider>
      <div className={styles['popup-wrapper']} style={{ height: editVisible ? '70vh' : '0' }} />
      <div className={styles['popup-layer']} style={{ height: editVisible ? '70%' : '0' }}>
        <div style={{ position: 'absolute', right: '10px', top: '8px', zIndex: 1 }}>
          <CloseCircleTwoTone style={{ fontSize: '24px' }} onClick={() => { setEditVisible(!editVisible); }} />
        </div>
        <div className={styles['popup-main']}>
          <Tabs className={styles['popup-tabs']} size="small">
            <Tabs.TabPane key="SCHEMA" tab="SCHEMA" className={styles['json-edit-tab']}>
              <JsonEditor
                value={schema}
                onChange={(d: typeof schema) => {
                  setSchema(d);
                  setPageSize(d.configs.pagination ? d.configs.pagination.pageSize || 0 : 10);
                }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane key="DATA" tab="DATA" className={styles['json-edit-tab']}>
              <JsonEditor
                value={dataSource}
                onChange={(d: typeof dataSource) => { setDataSource(d); }}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Demo;
