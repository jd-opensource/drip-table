/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import React from 'react';

import { DripTableContext, DripTableStoreContext } from './context';

// 使用最顶层组件的 setState
export const useTable = () => React.useContext(DripTableContext);

// 组件最顶层传入的所有props
export const useStore = () => React.useContext(DripTableStoreContext);

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
