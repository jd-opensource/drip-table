/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import React from 'react';

import type { DripTableExtraOptions, DripTableProps, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, DripTableTableInformation, ExtractDripTableExtraOption } from './types';

export type SetStateAction<S> = Partial<S> | ((prevState: S) => Partial<S>);

/**
 * 使用状态对象，设置属性时可传入部分
 * @param initState 初始状态
 * @returns [状态对象, 状态转移函数]
 */
export const useState = <T>(initState: T): [T, (action: SetStateAction<T>) => void] => React.useReducer(
  (state: T, action: SetStateAction<T>): T => {
    const data = typeof action === 'function'
      ? action(state)
      : action;
    return { ...state, ...data };
  },
  initState,
);

export interface IDripTableContext<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>> = DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, never>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  readonly _CTX_SOURCE: 'CONTEXT' | 'PROVIDER';
  /**
   * 表格属性
   */
  props: DripTableProps<RecordType, ExtraOptions>;
  /**
   * 表格基本信息
   */
  info: DripTableTableInformation<RecordType, ExtraOptions>;
  /**
   * 表格状态
   */
  state: {
    loading: boolean;
    api: CallableFunction | CallableFunction[] | null;
    tab: number; // 如果api是数组，需要在最顶层感知tab，来知道到底点击搜索调用的是啥api
    extraData: null; // 需要用到的 dataSource 以外的扩展返回值
    pagination: {
      current: number;
      total: number;
      pageSize: number;
    };
    filters: Record<string, (boolean | React.Key)[] | null>;
    sortColumnKey: string | null;
    sortDirection: 'ascend' | 'descend' | null;
    tableSize: 'default';
    layout: 'table' | 'card' | 'calendar';
    checkPassed: boolean;
    selectedRowKeys: React.Key[];
    displayColumnKeys: React.Key[];
  };
  /**
   * 设置表格状态
   */
  setState: (state: SetStateAction<IDripTableContext['state']>) => void;
}

export const createTableState = (): IDripTableContext['state'] => ({
  loading: false,
  api: null,
  tab: 0,
  extraData: null,
  pagination: {
    current: 1,
    total: 0,
    pageSize: 10,
  },
  filters: {},
  sortColumnKey: null,
  sortDirection: null,
  tableSize: 'default',
  checkPassed: true,
  selectedRowKeys: [],
  displayColumnKeys: [],
  layout: 'table',
});

export const DripTableContext = React.createContext<IDripTableContext>({
  _CTX_SOURCE: 'CONTEXT',
  props: {
    schema: { columns: [] },
    dataSource: [],
  },
  info: {
    uuid: '',
    schema: { columns: [] },
    dataSource: [],
  },
  state: createTableState(),
  setState: () => void 0,
});

export const useTableContext = <
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>> = DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, never>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>() => React.useContext(DripTableContext) as unknown as IDripTableContext<RecordType, ExtraOptions>;
