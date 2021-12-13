import { useReducer, useContext, SetStateAction } from 'react';
import { Ctx } from './context';

// 使用最顶层组件的 props
export const useGlobalData = () => useContext(Ctx);

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
