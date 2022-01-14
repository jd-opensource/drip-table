/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */

import 'antd/dist/antd.css';
import 'drip-table-generator/index.css';
import './sample.module.less';

import { message } from 'antd';
import { DripTableDriver, DripTableRecordTypeBase, DripTableSchema } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import DripTableGenerator from 'drip-table-generator';
import React from 'react';

import { mockData } from '../../demo-data';
import components from './component-settings';
import TextComponent from './TextComponent';

const initialSchema: DripTableSchema = {
  $schema: 'http://json-schema.org/draft/2019-09/schema#',
  pagination: false,
  columns: [
    {
      key: 'mock_2',
      title: '商品名称',
      width: '96px',
      'ui:type': 'text',
      'ui:props': {
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
      'ui:type': 'render-html',
      width: '200px',
      'ui:props': {
        render: "if (rec.id == 1) {\n  return '<span style=\\\"padding: 2px 4px;color:#52c41a; border: 1px solid #b7eb8f; border-radius: 10px; background: #f6ffed\\\">进行中</span>';\n}\nif (rec.id == 2) {\n  return '<span style=\\\"padding: 2px 4px;color:#000; border: 1px solid #000; border-radius: 10px; background: #f6ffed\\\">已完成</span>';\n}\nreturn '';",
      },
      type: 'string',
    },
  ],
};

const Demo = () => (
  <DripTableGenerator
    style={{ height: 756 }}
    driver={DripTableDriverAntDesign as unknown as DripTableDriver<DripTableRecordTypeBase>}
    schema={initialSchema}
    dataSource={mockData.slice(0, 4)}
    dataFields={['id', 'name', 'status', 'description', 'ext.state']}
    onExportSchema={(schema) => { message.success('已导出'); }}
    customComponents={{ custom: { TextComponent } }}
    customComponentPanel={components}
  />
);

export default Demo;
