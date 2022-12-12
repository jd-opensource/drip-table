/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

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
