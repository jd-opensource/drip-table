/**
 * ## DUMI CONFIG ##
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */

import { Button, Row } from 'antd';
import { DripTableSchema } from 'drip-table';
import DripTableGenerator, { DripTableGeneratorHandler } from 'drip-table-generator';
import React from 'react';

import { mockData } from '../../demo-data';

const initialSchema: DripTableSchema = {
  pagination: false,
  columns: [
  ],
};

function Demo() {
  const generator: React.MutableRefObject<DripTableGeneratorHandler | null> = React.useRef(null);

  return (
    <React.Fragment>
      <Row>
        <Button type="primary" onClick={() => { console.log(generator.current?.getSchemaValue()); }}>获取schema</Button>
      </Row>
      <DripTableGenerator
        ref={generator}
        customComponents={{}}
        style={{ height: 720 }}
        schema={initialSchema}
        dataSource={mockData}
        onExportSchema={(schema) => { console.log(schema); }}
      />
    </React.Fragment>
  );
}

export default Demo;
