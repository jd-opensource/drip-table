/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import React from 'react';

import { DripTableExtraOptions, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable } from '@/types';
import { stringify } from '@/utils/operator';

import { TableLayoutComponentProps } from '../types';

import styles from './index.module.less';

const CardLayout = <
RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: TableLayoutComponentProps<RecordType, ExtraOptions>): JSX.Element => {
  const { tableProps, tableInfo, tableState, setTableState } = props;
  return (
    <div className={styles.main}>
      CARD LAYOUT
      { stringify({ tableProps, tableInfo, tableState, setTableState }) }
    </div>
  );
};

export default CardLayout;
