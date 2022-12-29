/**
 * ## DUMI CONFIG ##
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */

import './demo.module.less';

import { CloudSyncOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { DripTableSchema } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import DripTableGenerator from 'drip-table-generator';
import React from 'react';

import { mockData, SampleRecordType, SubtableDataSourceKey } from '../../demo-data';
import components from './component-settings';
import { CustomGlobalConfigPanel } from './custom-global-settings';
import TextComponent, { TextColumnSchema } from './text-component';

const initialSchema: DripTableSchema = {
  pagination: false,
  columns: [
    {
      key: 'mock_2',
      title: '商品名称',
      width: '96px',
      component: 'text',
      options: {
        mode: 'single',
        maxRow: 2,
      },
      dataIndex: 'name',
    },
    {
      key: 'mock_4',
      dataIndex: 'pictureUrl',
      title: '图片',
      description: '',
      width: '120px',
      component: 'image',
      options: {
        imageWidth: 86,
        imageHeight: 86,
      },
      align: 'center',
    },
  ],
};

const Demo = () => (
  <DripTableGenerator<SampleRecordType, {
    CustomColumnSchema: TextColumnSchema;
    CustomComponentEvent: never;
    CustomComponentExtraData: never;
    SubtableDataSourceKey: SubtableDataSourceKey;
  }>
    mockDataSource
    style={{ height: '756px' }}
    driver={DripTableDriverAntDesign}
    schema={initialSchema}
    dataSource={mockData.slice(0, 1)}
    dataFields={['id', 'name', 'status', 'description', 'ext.state']}
    onExportSchema={(schema) => { message.success('已导出'); console.log(schema); }}
    customComponents={{ custom: { TextComponent } }}
    customComponentPanel={components}
    customGlobalConfigPanel={CustomGlobalConfigPanel}
    slots={{
      'header-slot-sample': React.memo((props) => {
        const [state, setState] = React.useState({ count: 0 });
        return (
          <div className={props.className} style={{ border: '1px solid #1890ff', borderRadius: '3px' }}>
            <Button type="primary" onClick={() => setState(st => ({ count: st.count + 1 }))}>{ (props as unknown as { title: string }).title }</Button>
            <span style={{ padding: '0 8px', color: '#1890ff' }}>{ `Count: ${state.count}` }</span>
          </div>
        );
      }),
      default: props => <div>{ `未知插槽类型：${props.slotType}` }</div>,
    }}
    slotsSchema={{
      'header-slot-sample': [{
        name: 'title',
        group: '',
        'ui:title': '自定义属性透传',
        'ui:type': 'input',
        'ui:props': {},
        type: 'string',
      }],
    }}
    subtableTitle={(record, index, tableInfo) => <div style={{ textAlign: 'center' }}>{ `“表格(id:${tableInfo.parent?.schema.id})”行“${record.name}”的子表 （${tableInfo.dataSource.length} 条）` }</div>}
    subtableFooter={(record, index, tableInfo) => (
      tableInfo.schema.id === 'sample-table-sub-level-1'
        ? (
          <div
            style={{ cursor: 'pointer', textAlign: 'center', userSelect: 'none' }}
            onClick={() => {
              message.info(`加载更多“表格(id:${tableInfo.parent?.schema.id})”行“${record.name}”(${index})的子表数据，已有 ${tableInfo.dataSource.length} 条`);
              console.log('expandable-footer-click', record, index, tableInfo);
            }}
          >
            <CloudSyncOutlined />
            <span style={{ marginLeft: '5px' }}>加载更多</span>
          </div>
        )
        : void 0
    )}
    rowExpandable={(record, index, parent) => parent.schema.id === 'sample-table' && record.id === 5}
    expandedRowRender={(record, index, parent) => (<div style={{ textAlign: 'center', margin: '20px 0' }}>{ `“表格(id:${parent.schema.id})”行“${record.name}”的展开自定义渲染` }</div>)}
  />
);

export default Demo;
