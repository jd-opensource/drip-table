/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import React from 'react';

import type { SetStateAction } from '@/utils/hooks';
import type { DripTableExtraOptions, DripTableProps, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, DripTableTableInformation, ExtractDripTableExtraOption } from '@/types';

import { FinalizeString } from './components/cell-components/utils';
import type { SandboxCreateExecutor, SandboxExecute, SandboxSafeExecute } from './utils/sandbox';

export interface IDripTableContext<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>> = DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, never>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
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
    pendingChanging: boolean;
    pagination: {
      current: number;
      total: number;
      pageSize: number;
    };
    paginationChanged: boolean;
    sorter: {
      key: string | null;
      direction: 'ascend' | 'descend' | null;
      comparer: ((a: RecordType, b: RecordType) => number) | null;
    };
    sorterChanged: boolean;
    filters: Record<string, (boolean | React.Key)[] | null>;
    filtersChanged: boolean;
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
  /**
   * 创建沙箱函数
   */
  createExecutor: SandboxCreateExecutor;
  /**
   * 沙箱函数执行器
   */
  execute: SandboxExecute;
  /**
   * 安全的沙箱函数执行器
   */
  safeExecute: SandboxSafeExecute;
  /**
   * 格式化模板字符串
   */
  finalizeString: FinalizeString;
}

export const createTableState = (): IDripTableContext['state'] => ({
  loading: false,
  api: null,
  tab: 0,
  extraData: null,
  pendingChanging: false,
  pagination: {
    current: 1,
    total: 0,
    pageSize: 10,
  },
  paginationChanged: false,
  sorter: {
    key: null,
    direction: null,
    comparer: null,
  },
  sorterChanged: false,
  filters: {},
  filtersChanged: false,
  tableSize: 'default',
  checkPassed: true,
  selectedRowKeys: [],
  displayColumnKeys: [],
  layout: 'table',
});

export const DripTableContext = React.createContext<IDripTableContext>({
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
  createExecutor: () => void 0,
  execute: <T = unknown>() => void 0 as T,
  safeExecute: () => void 0,
  finalizeString: () => '',
});

export const useTableContext = <
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>> = DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, never>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>() => React.useContext(DripTableContext) as unknown as IDripTableContext<RecordType, ExtraOptions>;
