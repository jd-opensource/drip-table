/**
 * ## DUMI CONFIG ##
 * transform: true
 * inline: true
 */

import 'jsoneditor-react/es/editor.min.css';

import * as AntIcons from '@ant-design/icons';
import { Button, message, Switch, Tabs } from 'antd';
import DripTable, { DripTableFilters, DripTableInstance } from 'drip-table';
import { JsonEditor } from 'jsoneditor-react';
import React from 'react';

import { initSchema, mockData, SampleRecordType, SubtableDataSourceKey } from '../../demo-data';
import { CustomColumnSchema, CustomComponentEvent, CustomComponents } from './custom-components';

import styles from './demo.module.less';

const { createFromIconfontCN, IconProvider, setTwoToneColor, getTwoToneColor, ...Icons } = AntIcons;

console.log(createFromIconfontCN, IconProvider, setTwoToneColor, getTwoToneColor);

function Demo() {
  const [loading, setLoading] = React.useState(false);
  const [filters, setFilters] = React.useState<{ key: string; values: unknown[] }[] | undefined>(void 0);
  const [pageNum, setPageNum] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(20);
  const [dataBase, setDataBase] = React.useState(mockData);
  const [totalNum, setTotalNum] = React.useState(dataBase.length);
  const [dataSource, setDataSource] = React.useState(dataBase);
  const [schema, setSchema] = React.useState(initSchema);
  const [editVisible, setEditVisible] = React.useState(false);
  const [allSelected, setAllSelected] = React.useState(false);
  const dripTable: React.MutableRefObject<DripTableInstance | null> = React.useRef(null);

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

  const fetchPageData = (nextFilters: DripTableFilters, nextPageSize: number, nextPageNum: number) => {
    if (loading) {
      return;
    }
    setTimeout(
      () => {
        setLoading(false);
        setFilters(
          Object.entries(nextFilters)
            .map(([key, values]) => ({ key, values: values || [] }))
            .filter(p => p.values.length > 0),
        );
        setPageSize(nextPageSize);
        setPageNum(nextPageNum);
      },
      500,
    );
    setLoading(true);
  };

  function selectAllRecord() {
    const tableInstance = dripTable.current;
    if (tableInstance) {
      const allRowKeys = dataSource.map(rec => rec[schema.rowKey] as React.Key);
      const selectedKeys = tableInstance.selectedRowKeys;
      if (selectedKeys.length < allRowKeys.length) {
        tableInstance.select(allRowKeys);
        setAllSelected(true);
      } else {
        tableInstance.select([]);
        setAllSelected(false);
      }
    }
  }

  return (
    <React.Fragment>
      <div style={{ padding: '0 0 30px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Button style={{ marginRight: '5px' }} type="primary" onClick={selectAllRecord}>
            { allSelected && '取消' }
            全选
          </Button>
          <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            <label style={{ paddingLeft: '5px' }}>分页：</label>
            <Switch style={{ marginRight: '5px' }} checked={!!schema.pagination} onChange={(v) => { setSchema({ ...schema, pagination: v ? initSchema.pagination : false }); }} />
            <label style={{ paddingLeft: '5px' }}>行选择：</label>
            <Switch style={{ marginRight: '5px' }} checked={!!schema.rowSelection} onChange={(v) => { setSchema({ ...schema, rowSelection: v }); }} />
            <label style={{ paddingLeft: '5px' }}>斑马纹：</label>
            <Switch style={{ marginRight: '5px' }} checked={schema.stripe} onChange={(v) => { setSchema({ ...schema, stripe: v }); }} />
            <label style={{ paddingLeft: '5px' }}>拖拽换行：</label>
            <Switch style={{ marginRight: '5px' }} checked={schema.rowDraggable} onChange={(v) => { setSchema({ ...schema, rowDraggable: v }); }} />
          </div>
        </div>
        <Button style={{ display: 'inline-flex', alignItems: 'right' }} type="primary" onClick={() => { setEditVisible(!editVisible); }}>JSON 编辑</Button>
      </div>
      <DripTable<SampleRecordType, {
        CustomColumnSchema: CustomColumnSchema;
        CustomComponentEvent: CustomComponentEvent;
        CustomComponentExtraData: never;
        SubtableDataSourceKey: SubtableDataSourceKey;
      }>
        ref={dripTable}
        schema={schema}
        loading={loading}
        total={totalNum}
        dataSource={dataSource}
        components={React.useMemo(() => ({ custom: CustomComponents }), [])}
        icons={Icons}
        slots={React.useMemo(() => ({
          'header-slot-sample': React.memo((props) => {
            const [state, setState] = React.useState({ count: 0 });
            return (
              <div className={props.className} style={{ border: '1px solid #1890ff', borderRadius: '3px' }}>
                <Button type="primary" onClick={() => setState(st => ({ count: st.count + 1 }))}>Header Slot Sample</Button>
                <span style={{ padding: '0 8px', color: '#1890ff' }}>{ `Count: ${state.count}` }</span>
              </div>
            );
          }),
          default: props => <div>{ `未知插槽类型：${props.slotType}` }</div>,
        }), [])}
        subtableTitle={React.useMemo(() => function SubtableTitle(record, index, tableInfo) {
          return <div style={{ textAlign: 'center' }}>{ `“表格(id:${tableInfo.parent?.schema.id})”行“${tableInfo.parent?.record?.name}”的子表 （${tableInfo.dataSource.length} 条）` }</div>;
        }, [])}
        subtableFooter={React.useMemo(() => function SubtableFooter(record, index, tableInfo) {
          return tableInfo.schema.id === 'sample-table-sub-level-1'
            ? (
              <div
                style={{ cursor: 'pointer', textAlign: 'center', userSelect: 'none' }}
                onClick={() => {
                  message.info(`加载更多“表格(id:${tableInfo.parent?.schema.id})”行“${record.name}”(${index})的子表数据，已有 ${tableInfo.dataSource.length} 条`);
                  console.log('expandable-footer-click', record, index, tableInfo);
                }}
              >
                <AntIcons.CloudSyncOutlined />
                <span style={{ marginLeft: '5px' }}>加载更多</span>
              </div>
            )
            : void 0;
        }, [])}
        rowExpandable={React.useMemo(() => (record, index, parent) => parent.schema.id === 'sample-table' && record.id === 5, [])}
        expandedRowRender={React.useMemo(() => function ExpandedRowRender(record, index, parent) {
          return <div style={{ textAlign: 'center', margin: '20px 0' }}>{ `“表格(id:${parent.schema.id})”行“${record.name}”的展开自定义渲染` }</div>;
        }, [])}
        rowSelectable={React.useMemo(() => record => record.id !== 1, [])}
        onEvent={React.useMemo(() => (event, tableInfo) => {
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
            message.info(`自定义事件 “${event.type}”(payload:${JSON.stringify('payload' in event ? event.payload : void 0)}) ${from}自定义组件。`);
            console.log(event, record, recordIndex);
          }
        }, [])}
        onFilterChange={React.useMemo(() => (...args) => { console.log('onFilterChange', ...args); }, [])}
        onPageChange={React.useMemo(() => (...args) => { console.log('onPageChange', ...args); }, [])}
        onChange={React.useMemo(() => ({ pagination: nextPagination, filters: nextFilters }) => {
          console.log('onChange', nextPagination, nextFilters);
          fetchPageData(nextFilters, nextPagination.pageSize ?? pageSize, nextPagination.current ?? pageNum);
        }, [fetchPageData])}
        onDataSourceChange={React.useMemo(() => (ds) => {
          setDataSource(ds);
        }, [])}
        onSelectionChange={React.useMemo(() => (selectedKeys, selectedRows) => {
          setAllSelected(selectedRows.length >= dataSource.length);
        }, [dataSource])}
        onSearch={React.useMemo(() => searchParams => console.log(searchParams), [])}
        onInsertButtonClick={React.useMemo(() => event => console.log(event), [])}
      />
      <div className={styles['popup-wrapper']} style={{ height: editVisible ? '70vh' : '0' }} />
      <div className={styles['popup-layer']} style={{ height: editVisible ? '70%' : '0' }}>
        <div style={{ position: 'absolute', right: '10px', top: '8px', zIndex: 1 }}>
          <AntIcons.CloseCircleTwoTone style={{ fontSize: '24px' }} onClick={() => { setEditVisible(!editVisible); }} />
        </div>
        <div className={styles['popup-main']}>
          <Tabs className={styles['popup-tabs']} size="small">
            <Tabs.TabPane key="SCHEMA" tab="SCHEMA" className={styles['json-edit-tab']}>
              <JsonEditor
                value={schema}
                onChange={(d) => {
                  setSchema(d);
                  setPageSize(d.pagination ? d.pagination.pageSize || 0 : 10);
                }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane key="DATA" tab="DATA" className={styles['json-edit-tab']}>
              <JsonEditor
                value={dataBase}
                onChange={(d) => { setDataBase(d); }}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Demo;
