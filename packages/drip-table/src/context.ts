/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import { createContext } from 'react';

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
  tableSize: 'default';
  checkPassed: boolean;
  selectedRowKeys: React.Key[];
  setTableState: CallableFunction;
}

export const DripTableContext = createContext<IDripTableContext>({
  loading: false,
  api: null,
  tab: 0,
  extraData: null,
  pagination: {
    current: 1,
    total: 0,
    pageSize: 10,
  },
  tableSize: 'default',
  checkPassed: true,
  selectedRowKeys: [],
  _CTX_SOURCE: 'CONTEXT',
  setTableState: () => false,
});

export const DripTableStoreContext = createContext({});
