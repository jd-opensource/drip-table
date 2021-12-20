/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */

import React from 'react';
import { Button, Row } from 'antd';
import { DripTableSchema } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import DripTableGenerator, { DripTableGeneratorHandler } from 'drip-table-generator';
import 'antd/dist/antd.css';
import 'drip-table-generator/index.css';

import { mockData } from '../../global-configs';
import components from './component-settings';
import TextComponent from './TextComponent';

import './sample.module.less';

const initialSchema: DripTableSchema = {
  "$schema": "http://json-schema.org/draft/2019-09/schema#",
  "configs": {
      "pagination": false
  },
  "columns": [
    {
      "$id": "mock_2",
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
        "$id": "mock_1",
        "dataIndex": "",
        "title": "自定义",
        "description": "",
        "ui:type": "render-html",
        "width": '200px',
        "ui:props": {
            "render": "if (rec.id == 1) {\n  return '<span style=\\\"padding: 2px 4px;color:#52c41a; border: 1px solid #b7eb8f; border-radius: 10px; background: #f6ffed\\\">进行中</span>';\n}\nif (rec.id == 2) {\n  return '<span style=\\\"padding: 2px 4px;color:#000; border: 1px solid #000; border-radius: 10px; background: #f6ffed\\\">已完成</span>';\n}\nreturn '';"
        },
        "type": "string"
    },
  ]
}


const Demo = (props: { showHeader: boolean }) => {
  const generator: React.MutableRefObject<DripTableGeneratorHandler | null> = React.useRef(null);

  const views = {
    demoHeader: props.showHeader !== false,
  }

  return (
    <React.Fragment>
      { views.demoHeader &&  (
        <Row className="sample-header-extra-container">
          <Button className="header-button" type="primary"  onClick={() => { console.log(generator.current?.getSchemaValue()); }}>获取schema</Button>
          <Button className="header-button" type="primary"  onClick={() => { console.log(generator.current?.getDataSource()); }}>获取dataSource</Button>
        </Row>
      )}
      <DripTableGenerator
        ref={generator}
        style={{ height: 640 }}
        driver={DripTableDriverAntDesign}
        schema={initialSchema}
        dataSource={mockData.slice(0, 4)}
        dataFields={['id', 'name', 'status', 'description', 'ext.state']}
        onExportSchema={schema => { console.log(schema); }}
        customComponents={{ custom: { TextComponent } }}
        customComponentPanel={components}
      />
    </React.Fragment>
  );
};

export default Demo;
