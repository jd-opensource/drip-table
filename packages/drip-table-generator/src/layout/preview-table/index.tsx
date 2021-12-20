/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import React from 'react';
import DripTable, { ColumnConfig, DripTableDriver, DripTableProps, DripTableRecordTypeBase, DripTableSchema } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import { GlobalStore } from '@/store';

import styles from './index.module.less';

interface Props {
  driver: DripTableDriver<DripTableRecordTypeBase>;
  customComponents: DripTableProps<DripTableRecordTypeBase>['components'];
}

const PreviewTable = (props: Props & { store: GlobalStore }) => {
  const [state] = props.store;

  const schema: DripTableSchema = {
    $schema: 'http://json-schema.org/draft/2019-09/schema#',
    configs: {
      ...state.globalConfigs,
    },
    columns: state.columns as ColumnConfig[],
  };
  const totalPage = state.globalConfigs?.pagination && state.globalConfigs?.pagination.pageSize ? state.previewDataSource.length : 1;
  return (
    <div className={styles['table-preview-wrapper']}>
      <DripTable
        driver={(props.driver || DripTableDriverAntDesign)}
        schema={schema}
        total={totalPage}
        dataSource={state.previewDataSource}
        components={props.customComponents}
      />
    </div>
  );
};

export default PreviewTable;
