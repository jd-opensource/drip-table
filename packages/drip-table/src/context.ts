/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import React from 'react';

import { SetStateAction } from './hooks';

export interface IDripTableContext {
  readonly _CTX_SOURCE: 'CONTEXT' | 'PROVIDER';
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
  tableSize: 'default';
  layout: 'table' | 'card' | 'calendar';
  checkPassed: boolean;
  selectedRowKeys: React.Key[];
  displayColumnKeys: React.Key[];
  setTableState: (state: SetStateAction<IDripTableContext>) => void;
}

export const DripTableContext = React.createContext<IDripTableContext>({
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
  tableSize: 'default',
  checkPassed: true,
  selectedRowKeys: [],
  displayColumnKeys: [],
  _CTX_SOURCE: 'CONTEXT',
  setTableState: () => void 0,
  layout: 'table',
});

export const DripTableStoreContext = React.createContext({});
