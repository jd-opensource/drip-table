/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DripTableExtraOptions, DripTableRecordTypeBase } from 'drip-table';
import React from 'react';

import { GeneratorContext } from '@/context';
import { DripTableGeneratorProps } from '@/typing';

import EditableTableFooter from './editable-footer';
import EditableTableHeader from './editable-header';
import EditableTable from './editable-table';
import PreviewTable from './table-preview';

import styles from './index.module.less';

interface TableWorkStationProps<
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
> {
  driver: DripTableGeneratorProps<RecordType, ExtraOptions>['driver'];
  customComponents: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponents'];
  customComponentPanel: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'] | undefined;
  slots: DripTableGeneratorProps<RecordType, ExtraOptions>['slots'];
}

const TableWorkStation = <
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
>(props: TableWorkStationProps<RecordType, ExtraOptions>) => {
  const states = React.useContext(GeneratorContext);
  return (
    <div className={styles['generator-workstation']}>
      { states.mode === 'edit'
        ? (
          <React.Fragment>
            <EditableTableHeader driver={props.driver} slots={props.slots} />
            <EditableTable
              customComponentPanel={props.customComponentPanel}
              customComponents={props.customComponents}
              driver={props.driver}
            />
            <EditableTableFooter driver={props.driver} slots={props.slots} />
          </React.Fragment>
        )
        : (
          <PreviewTable />
        ) }
    </div>
  );
};

export default TableWorkStation;
