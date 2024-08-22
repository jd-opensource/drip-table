/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import { DripTableRecordTypeBase } from 'drip-table';
import get from 'lodash/get';

/**
 * 执行器缓存，优化性能
 */
const executorCache = new Map<string, ReturnType<FunctionConstructor>>();
let timerExecutorGC = 0;
const executorGC = () => { executorCache.clear(); };
const resetExecutorGC = () => {
  if (timerExecutorGC) {
    window.clearTimeout(timerExecutorGC);
  }
  timerExecutorGC = window.setTimeout(executorGC, 2000);
};

/**
 * 通过 JavaScript 代码字符串创建函数
 *
 * @param script JavaScript 代码段
 * @param contextKeys 执行上下文变量名
 * @returns 创建的函数
 * @throws Error 创建异常
 */
export const createExecutor = (script: string, contextKeys: string[] = []) => {
  const key = script + JSON.stringify(contextKeys);
  let executor = executorCache.has(key)
    ? executorCache.get(key)
    : void 0;
  if (!executor) {
    executor = new Function(...contextKeys, script);
    executorCache.set(key, executor);
  }
  resetExecutorGC();
  return executor;
};

/**
 * 指定上下文，执行 JavaScript 代码段
 *
 * @param script JavaScript 代码段
 * @param context 上下文变量键值对
 * @returns 代码段返回结果
 * @throws Error 代码执行异常
 */
export const execute = (script: string, context: Record<string, unknown> = {}) => createExecutor(script, Object.keys(context))(...Object.values(context));

/**
 * 指定上下文，执行 JavaScript 代码段，抑制错误
 *
 * @param script JavaScript 代码段
 * @param context 上下文变量键值对
 * @param defaultValue 异常时的默认返回值
 * @returns 代码段返回结果，异常时返回默认结果
 */
export const safeExecute = (script: string, context: Record<string, unknown> = {}, defaultValue: unknown = void 0) => {
  try {
    return execute(script, context);
  } catch (error) {
    console.warn(error);
  }
  return defaultValue;
};

/**
 * 格式化变量用于提供给渲染函数
 * @param v 任意数据
 * @returns 渲染字符串
 */
export const stringify = (v: unknown) => {
  if (typeof v === 'object' && v !== null) {
    try {
      v = JSON.stringify(v);
    } catch {}
  }
  if (v === void 0) {
    return '';
  }
  return String(v);
};

/**
 * 格式化模板字符串，填充变量值
 * @param mode 格式化模式
 * @param text 模板字符串
 * @param record 填充数据源对象
 * @param recordIndex 填充数据源下标
 * @param ext 透传自定义额外数据
 * @returns 最终字符串
 */
export const finalizeString = (mode: 'plain' | 'key' | 'pattern' | 'script', text: string, record: DripTableRecordTypeBase, recordIndex: number, ext: unknown): string => {
  let value = '';
  if (!mode || mode === 'plain') {
    value = stringify(text);
  } else if (mode === 'key') {
    value = stringify(get(record, text, ''));
  } else if (mode === 'pattern') {
    value = stringify(text)
      .replace(/\{\{(.+?)\}\}/guis, (s, s1) => {
        try {
          return execute(`return ${s1}`, {
            props: {
              record,
              recordIndex,
              ext,
            },
            rec: record,
          });
        } catch (error) {
          return error instanceof Error
            ? `{{Render Error: ${error.message}}}`
            : '{{Unknown Render Error}}';
        }
      });
  } else if (mode === 'script') {
    try {
      value = stringify(execute(text, {
        props: {
          record,
          recordIndex,
          ext,
        },
        rec: record,
      }));
    } catch (error) {
      value = error instanceof Error
        ? `Render Error: ${error.message}`
        : 'Unknown Render Error';
    }
  }
  return value;
};
