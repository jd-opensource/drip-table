/**
 * transform: true
 * inline: true
 */

import 'antd/dist/antd.css';
import 'jsoneditor-react/es/editor.min.css';
import 'drip-table/index.css';

import { CloseCircleTwoTone } from '@ant-design/icons';
import { Button, message, Tabs } from 'antd';
import DripTable, { DripTableContainerHandle, DripTableProvider } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import { JsonEditor } from 'jsoneditor-react';
import React from 'react';

import { initSchema, mockData, SampleRecordType } from '../../demo-data';
import { CustomComponentEvent, CustomComponents, CustomComponentSchema } from './custom-components';

import styles from './sample.module.less';

const Demo = () => {
  const [loading, setLoading] = React.useState(false);
  const [filters, setFilters] = React.useState<{ key: string; values: unknown[] }[] | undefined>(void 0);
  const [pageNum, setPageNum] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [dataBase, setDataBase] = React.useState(mockData);
  const [totalNum, setTotalNum] = React.useState(dataBase.length);
  const [dataSource, setDataSource] = React.useState(dataBase);
  const [schema, setSchema] = React.useState(initSchema);
  const [editVisible, setEditVisible] = React.useState(false);
  const [allSelected, setAllSelected] = React.useState(false);
  const dripTable: React.MutableRefObject<DripTableContainerHandle | null> = React.useRef(null);

  React.useEffect(
    () => {
      setDataBase(mockData);
    },
    [mockData],
  );

  React.useEffect(
    () => {
      const filteredDataSource = dataBase.filter(ds => !filters?.length || filters.some(f => f.values?.includes(ds[f.key])));
      setTotalNum(filteredDataSource.length);
      setDataSource(filteredDataSource.slice((pageNum - 1) * pageSize, Math.min(pageNum * pageSize, filteredDataSource.length)));
    },
    [dataBase, filters, pageSize, pageNum],
  );

  const fetchPageData = (nextFilters: Record<string, string[]>, nextPageSize: number, nextPageNum: number) => {
    if (loading) {
      return;
    }
    setTimeout(
      () => {
        setLoading(false);
        setFilters(Object.entries(nextFilters).map(([key, values]) => ({ key, values })));
        setPageSize(nextPageSize);
        setPageNum(nextPageNum);
      },
      500,
    );
    setLoading(true);
  };

  function selectAllRecord() {
    const tableInstance = dripTable.current;
    const allKeys = dataSource.map((rec, idx) => idx);
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
        <DripTable<SampleRecordType, CustomComponentSchema, CustomComponentEvent>
          driver={DripTableDriverAntDesign}
          schema={schema}
          loading={loading}
          total={totalNum}
          dataSource={dataSource}
          components={{ custom: CustomComponents }}
          onEvent={(event, record, index) => {
            if (event.type === 'drip-link-click') {
              const name = event.payload;
              message.info(`你点击了第${index + 1}行“${record.name} (ID: ${record.id})”的"${name}"事件按钮。`);
              console.log(name, record, index);
            } else if (event.type === 'custom') {
              message.info(`自定义事件“${event.name}”触发于行“${record.name} (ID: ${record.id})”的自定义组件。`);
              console.log(event, record, index);
            } else if (event.type === 'drip-button-click' && event.payload === 'showMore') {
              message.info('点击加载更多');
              console.log(event, record, index);
            }
          }}
          onFilterChange={(...args) => { console.log('onFilterChange', ...args); }}
          onPageChange={(...args) => { console.log('onPageChange', ...args); }}
          onChange={(nextPagination, nextFilters) => {
            console.log('onChange', nextPagination, nextFilters);
            fetchPageData(nextFilters, nextPagination.pageSize ?? pageSize, nextPagination.current ?? pageNum);
          }}
          onSelectionChange={(selectedKeys, selectedRows) => {
            setAllSelected(selectedRows.length >= dataSource.length);
          }}
          onSearch={searchParams => console.log(searchParams)}
          onInsertButtonClick={event => console.log(event)}
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
                  setPageSize(d.pagination ? d.pagination.pageSize || 0 : 10);
                }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane key="DATA" tab="DATA" className={styles['json-edit-tab']}>
              <JsonEditor
                value={dataBase}
                onChange={(d: typeof dataBase) => { setDataBase(d); }}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Demo;
