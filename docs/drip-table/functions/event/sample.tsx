/**
 * transform: true
 * inline: true
 */

import { message } from 'antd';
import DripTable, { DripTableProvider } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import React from 'react';

import { initSchema, mockData, SampleRecordType } from '../../../demo-data';
import { CustomComponentSchema } from '../../sample/custom-components';
import { CustomComponentEvent, CustomComponents } from './custom-components';

const Demo = () => {
  const [loading, setLoading] = React.useState(false);
  const [filters, setFilters] = React.useState<{ key: string; values: unknown[] }[] | undefined>(void 0);
  const [pageNum, setPageNum] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [dataBase, setDataBase] = React.useState(mockData);
  const [totalNum, setTotalNum] = React.useState(dataBase.length);
  const [dataSource, setDataSource] = React.useState(dataBase);
  const [schema] = React.useState(initSchema);
  const dripTable = React.useRef(null);

  React.useEffect(
    () => {
      setDataBase(mockData);
    },
    [mockData],
  );

  React.useEffect(
    () => {
      const filteredDataSource = dataBase.filter(ds => !filters?.length || filters.some(f => f.values.includes(ds[f.key])));
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

  return (
    <React.Fragment>
      <DripTableProvider ref={dripTable}>
        <DripTable<SampleRecordType, {
          CustomComponentSchema: CustomComponentSchema;
          CustomComponentEvent: CustomComponentEvent;
        }>
          driver={DripTableDriverAntDesign}
          schema={schema}
          loading={loading}
          total={totalNum}
          dataSource={dataSource}
          components={{ custom: CustomComponents }}
          slots={{
            default: props => <div data-slot-type={props.slotType} />,
          }}
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
          onFilterChange={(...args) => { console.log('onFilterChange', ...args); }}
          onPageChange={(...args) => { console.log('onPageChange', ...args); }}
          onChange={(nextPagination, nextFilters) => {
            console.log('onChange', nextPagination, nextFilters);
            fetchPageData(nextFilters, nextPagination.pageSize ?? pageSize, nextPagination.current ?? pageNum);
          }}
        />
      </DripTableProvider>
    </React.Fragment>
  );
};

export default Demo;
