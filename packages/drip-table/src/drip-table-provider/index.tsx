/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import React from 'react';

import { DripTableExtraOptions, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable } from '@/types';
import { DripTableContext, IDripTableContext } from '@/context';
import DripTable, { DripTableProps } from '@/drip-table';
import { useState, useTable } from '@/hooks';

/**
 * 暴露给外部直接操作实例的接口
 */
export interface DripTableWrapperContext extends IDripTableContext {
  /**
   * 通过接口选择行
   *
   * @param indexes 行号数组
   */
  select: (indexes: number[]) => void;
}

// 组件提供给外部的公共接口
const createTableContext = <
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: DripTableProps<RecordType, ExtraOptions>): DripTableWrapperContext => {
  const initialState = useTable();
  const [state, setState] = useState(initialState);

  const select = (indexes: number[]) => {
    let selectedKeys: React.Key[] = [];
    const { dataSource, schema: { rowKey } } = props;
    if (dataSource && rowKey) {
      indexes.forEach((index) => {
        const data = dataSource[index];
        if (data) {
          const value = data[rowKey];
          const key = typeof value === 'string' || typeof value === 'number'
            ? value
            : index;
          selectedKeys.push(key);
        }
      });
    } else {
      selectedKeys = [...indexes];
    }
    setState({ selectedRowKeys: selectedKeys });
  };

  const handler: DripTableWrapperContext = {
    ...state,
    setTableState: setState,
    select,
    _CTX_SOURCE: 'PROVIDER', // context 来源于 drip-table-provider
  };
  return handler;
};

const DripTableWrapper: <
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> (props: React.PropsWithoutRef<DripTableProps<RecordType, ExtraOptions>> & React.RefAttributes<DripTableWrapperContext>) =>
(React.ReactElement | null) = React.forwardRef((props, ref) => {
  const ConfigProvider = props.driver.components.ConfigProvider;
  const context = createTableContext(props);
  React.useImperativeHandle(ref, () => context);
  return (
    <ConfigProvider locale={props?.driver.locale}>
      <DripTableContext.Provider {...props} value={context}>
        <DripTable {...props} />
      </DripTableContext.Provider>
    </ConfigProvider>
  );
});

export default DripTableWrapper;
