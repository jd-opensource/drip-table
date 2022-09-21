/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DripTableExtraOptions, DripTableRecordTypeBase } from 'drip-table';
import React from 'react';

import { DripTableGeneratorProps } from '../typing';
import AttributesLayout from './attributes-layout';
import ComponentsBar from './components-bar';
import TableWorkStation from './table-workstation';
import Toolbar from './toolbar';

import styles from './index.module.less';

const GeneratorLayout = <
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions>) => (
  <div style={props.style}>
    { props.showToolLayout === false ? null : <Toolbar style={props.toolbarStyle} onExportSchema={props.onExportSchema} /> }
    <div className={styles.wrapper}>
      <ComponentsBar customComponentPanel={props.customComponentPanel} />
      <TableWorkStation
        customComponentPanel={props.customComponentPanel}
        customComponents={props.customComponents}
        driver={props.driver}
        slots={props.slots}
      />
      <AttributesLayout
        {...props}
      />
    </div>
  </div>
  );

export default GeneratorLayout;
