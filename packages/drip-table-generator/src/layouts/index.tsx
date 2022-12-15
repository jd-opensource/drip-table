/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DripTableExtraOptions } from 'drip-table';
import React from 'react';

import { DataSourceTypeAbbr, DripTableGeneratorProps } from '../typing';
import AttributesLayout from './attributes-layout';
import ComponentsBar from './components-bar';
import TableWorkStation from './table-workstation';
import Toolbar from './toolbar';

import styles from './index.module.less';

const GeneratorLayout = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions>) => (
  <div style={props.style} className={styles.container}>
    { props.showToolLayout === false ? null : <Toolbar {...props} style={props.toolbarStyle} onExportSchema={props.onExportSchema} /> }
    <div className={styles.wrapper}>
      <div className={styles.navbar} style={{ height: props.style?.height ? `calc(${props.style?.height} - 48px)` : void 0 }}>
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
