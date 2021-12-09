/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import { useReducer, useContext, SetStateAction } from 'react';
import { DripTableContext, DripTableStoreContext } from './context';

// 使用最顶层组件的 setState
export const useTable = () => useContext(DripTableContext);

// 组件最顶层传入的所有props
export const useStore = () => useContext(DripTableStoreContext);

/**
 * 使用状态对象，设置属性时可传入部分
 * @param initState 初始状态
 * @returns [状态对象, 状态转移函数]
 */
export const useState = <T>(initState: T): [T, (action: SetStateAction<Partial<T>>) => void] => useReducer(
  (state: T, action: SetStateAction<Partial<T>>): T => {
    const data = typeof action === 'function'
      ? action(state)
      : action;
    return { ...state, ...data };
  },
  initState,
);
