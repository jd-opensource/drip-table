/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import './index.less';

import { DripTableExtraOptions } from 'drip-table';
import React from 'react';

import { DataSourceTypeAbbr, DripTableGeneratorProps } from '../typing';
import AttributesLayout from './attributes-layout';
import ComponentsBar from './components-bar';
import TableWorkStation from './table-workstation';
import Toolbar from './toolbar';

const GeneratorLayout = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions>) => (
  <div style={props.style} className="jfe-drip-table-generator-layouts-container">
    { props.showToolLayout === false ? null : <Toolbar {...props} style={props.toolbarStyle} onExportSchema={props.onExportSchema} /> }
    <div className="jfe-drip-table-generator-layouts-wrapper">
      <div className="jfe-drip-table-generator-layouts-navbar">
        <ComponentsBar
          customComponentPanel={props.customComponentPanel}
          mockDataSource={props.mockDataSource}
          dataFields={props.dataFields}
        />
      </div>
      <TableWorkStation {...props} />
      <AttributesLayout {...props} />
    </div>
  </div>
  );

export default GeneratorLayout;
