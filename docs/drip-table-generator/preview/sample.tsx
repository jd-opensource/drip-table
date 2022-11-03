/**
 * ## DUMI CONFIG ##
 * transform: true
 * defaultShowCode: false
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
      type: 'string',
      dataIndex: 'name',
    },
    {
      key: 'mock_1',
      dataIndex: '',
      title: '自定义',
      description: '',
      component: 'render-html',
      width: '120px',
      options: {
        render: "if (rec.id % 2 == 1) {\n  return '<span style=\\\"padding: 2px 4px;color:#52c41a; border: 1px solid #b7eb8f; border-radius: 10px; background: #f6ffed\\\">进行中</span>';\n}\nif (rec.id % 2 == 0) {\n  return '<span style=\\\"padding: 2px 4px;color:#000; border: 1px solid #000; border-radius: 10px; background: #f6ffed\\\">已完成</span>';\n}\nreturn '';",
      },
      type: 'string',
    },
    {
      key: 'mock_3',
      dataIndex: '',
      title: '链接',
      description: '',
      component: 'link',
      width: '120px',
      options: {
        mode: 'single',
        label: 'google',
        href: 'www.google.com',
        target: '',
        event: '',
        operates: [],
        tooltip: 'toolip示例{{rec.name}}',
      },
      align: 'center',
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
    {
      key: 'mock_5',
      dataIndex: 'startDate',
      title: '日期',
      width: '120px',
      description: '',
      component: 'date-picker',
      options: {
        mode: 'basic',
        format: 'YYYY-MM-DD',

      },
      align: 'center',
    },
    {
      key: 'mock_6',
      title: '状态选择',
      width: '140px',
      dataIndex: 'status',
      component: 'select',
      options: {
        style: { width: 100 },
        options: [{ label: '售卖中', value: 'onSale' }, { label: '已售罄', value: 'soldOut' }],
        event: 'statusToggle',
      },
    },
    {
      key: 'mock_7',
      title: '按钮',
      width: '120px',
      dataIndex: '',
      component: 'button',
      options: {
        mode: 'single',
        label: '确认',
        shape: 'round',
        buttonType: 'primary',
      },
    },
    {
      key: 'mock_8',
      title: '弹出网页',
      width: '120px',
      dataIndex: '',
      component: 'pop-up-page',
      options: {
        title: 'drip-table',
        label: '弹网页',
        buttonType: 'text',
        link: 'https://drip-table.jd.com/',
        width: '50%',
        height: '700px',
      },
    },
  ],
};

type ExtraOptions = Omit<DripTableExtraOptions, 'CustomColumnSchema' | 'SubtableDataSourceKey'> & {
  CustomColumnSchema: TextColumnSchema;
  SubtableDataSourceKey: SubtableDataSourceKey;
}
const Demo = () => (
  <DripTableGenerator<SampleRecordType, ExtraOptions>
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
    slots={{
      'header-slot-sample': React.memo((props) => {
        const [state, setState] = React.useState({ count: 0 });
        return (
          <div className={props.className} style={{ border: '1px solid #1890ff', borderRadius: '3px' }}>
            <Button type="primary" onClick={() => setState(st => ({ count: st.count + 1 }))}>{ props.title }</Button>
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
    subtableTitle={(record, index, tableInfo) => <div style={{ textAlign: 'center' }}>{ `“表格(id:${tableInfo.parent.schema.id})”行“${record.name}”的子表 （${tableInfo.dataSource.length} 条）` }</div>}
    subtableFooter={(record, index, tableInfo) => (
      tableInfo.schema.id === 'sample-table-sub-level-1'
        ? (
          <div
            style={{ cursor: 'pointer', textAlign: 'center', userSelect: 'none' }}
            onClick={() => {
              message.info(`加载更多“表格(id:${tableInfo.parent.schema.id})”行“${record.name}”(${index})的子表数据，已有 ${tableInfo.dataSource.length} 条`);
              console.log('expandable-footer-click', record, index, tableInfo);
            }}
          >
            <CloudSyncOutlined />
            <span style={{ marginLeft: '5px' }}>加载更多</span>
          </div>
        )
        : void 0
    )}
    rowExpandable={(record, parent) => parent.schema.id === 'sample-table' && record.id === 5}
    expandedRowRender={(record, index, parent) => (<div style={{ textAlign: 'center', margin: '20px 0' }}>{ `“表格(id:${parent.schema.id})”行“${record.name}”的展开自定义渲染` }</div>)}
    ajv={{ additionalProperties: true }}
  />
);

export default Demo;
