/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import DripTable, { DripTableBuiltInColumnSchema, DripTableColumnSchema, DripTableDriver, DripTableExtraOptions, DripTableProps, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, DripTableSchema } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import React from 'react';

import { filterAttributes, generateColumn } from '@/utils';
import { GlobalStore } from '@/store';
import { useGlobalData } from '@/hooks';

import styles from './index.module.less';

interface Props {
  driver: DripTableDriver;
  customComponents?: DripTableProps<DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, React.Key>, DripTableExtraOptions>['components'];
}

const PreviewTable = (props: Props & { store: GlobalStore }) => {
  const {
    slots,
    ajv,
    ext,
    footer,
    subtableTitle,
    subtableFooter,
    rowExpandable,
    expandedRowRender,
  } = useGlobalData();

  const [state] = props.store;

  const schema: DripTableSchema<(DripTableColumnSchema | DripTableBuiltInColumnSchema)> = {
    ...filterAttributes(state.globalConfigs, '$version'),
    columns: state.columns.map(col => generateColumn(col)),
  };
  const totalPage = state.globalConfigs?.pagination && state.globalConfigs?.pagination.pageSize ? state.previewDataSource.length : 1;
  return (
    <div className={styles['table-preview-wrapper']}>
      <DripTable<DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, React.Key>, DripTableExtraOptions>
        driver={(props.driver || DripTableDriverAntDesign)}
        schema={schema}
        total={totalPage}
        dataSource={state.previewDataSource}
        components={props.customComponents}
        {...{
          slots,
          ajv,
          ext,
          footer,
          subtableTitle,
          subtableFooter,
          rowExpandable,
          expandedRowRender,
        }}
      />
    </div>
  );
};

export default PreviewTable;
