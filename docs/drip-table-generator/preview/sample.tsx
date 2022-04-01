/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */

import 'antd/dist/antd.css';
import 'drip-table/dist/index.css';
import 'drip-table-generator/dist/index.css';
import './sample.module.less';

import { CloudSyncOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { DripTableExtraOptions, DripTableSchema } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import DripTableGeneratorProvider, { DripTableGeneratorHandler, DripTableGeneratorProps } from 'drip-table-generator';
import React from 'react';

import { mockData, SampleRecordType, SubtableDataSourceKey } from '../../demo-data';
import components from './component-settings';
import { CustomGlobalConfigPanel } from './custom-global-settings';
import TextComponent from './text-component';

const DripTableGenerator = DripTableGeneratorProvider as React.ForwardRefExoticComponent<
DripTableGeneratorProps<SampleRecordType,
Omit<DripTableExtraOptions, 'SubtableDataSourceKey'> & { SubtableDataSourceKey: SubtableDataSourceKey }
> & React.RefAttributes<DripTableGeneratorHandler>>;
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
      type: 'string',
      dataIndex: 'name',
    },
    {
      key: 'mock_1',
      dataIndex: '',
      title: '自定义',
      description: '',
      component: 'render-html',
      width: '200px',
      options: {
        render: "if (rec.id == 1) {\n  return '<span style=\\\"padding: 2px 4px;color:#52c41a; border: 1px solid #b7eb8f; border-radius: 10px; background: #f6ffed\\\">进行中</span>';\n}\nif (rec.id == 2) {\n  return '<span style=\\\"padding: 2px 4px;color:#000; border: 1px solid #000; border-radius: 10px; background: #f6ffed\\\">已完成</span>';\n}\nreturn '';",
      },
      type: 'string',
    },
  ],
};

const Demo = () => (
  <DripTableGenerator
    mockDataSource
    style={{ height: 756 }}
    driver={DripTableDriverAntDesign}
    schema={initialSchema}
    dataSource={mockData}
    dataFields={['id', 'name', 'status', 'description', 'ext.state']}
    onExportSchema={(schema) => { message.success('已导出'); console.log(schema); }}
    customComponents={{ custom: { TextComponent } }}
    customComponentPanel={components}
    customGlobalConfigPanel={CustomGlobalConfigPanel}
    ajv={false}
    slots={{
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
    }}
    subtableTitle={(record, index, parent, subtable) => <div style={{ textAlign: 'center' }}>{ `“表格(id:${parent.id})”行“${record.name}”的子表 （${subtable.dataSource.length} 条）` }</div>}
    subtableFooter={(record, index, parent, subtable) => (
      subtable.id === 'sample-table-sub-level-1'
        ? (
          <div
            style={{ cursor: 'pointer', textAlign: 'center', userSelect: 'none' }}
            onClick={() => {
              message.info(`加载更多“表格(id:${parent.id})”行“${record.name}”(${index})的子表数据，已有 ${subtable.dataSource.length} 条`);
              console.log('expandable-footer-click', record, index, parent, subtable);
            }}
          >
            <CloudSyncOutlined />
            <span style={{ marginLeft: '5px' }}>加载更多</span>
          </div>
        )
        : void 0
    )}
    rowExpandable={(record, parent) => parent.id === 'sample-table' && record.id === 5}
    expandedRowRender={(record, index, parent) => (<div style={{ textAlign: 'center', margin: '20px 0' }}>{ `“表格(id:${parent.id})”行“${record.name}”的展开自定义渲染` }</div>)}

  />
);

export default Demo;
