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
const evaluatorCache = new Map<string, ReturnType<FunctionConstructor>>();
let timerEvaluatorGC = 0;
const evaluatorGC = () => { evaluatorCache.clear(); };
const resetEvaluatorGC = () => {
  if (timerEvaluatorGC) {
    window.clearTimeout(timerEvaluatorGC);
  }
  timerEvaluatorGC = window.setTimeout(evaluatorGC, 2000);
};

/**
 * 通过 JavaScript 代码字符串创建函数
 *
 * @param script JavaScript 代码段
 * @param contextKeys 执行上下文变量名
 * @returns 创建的函数
 * @throws Error 创建异常
 */
export const createEvaluator = (script: string, contextKeys: string[] = []) => {
  const key = script + JSON.stringify(contextKeys);
  let evaluator = evaluatorCache.has(key)
    ? evaluatorCache.get(key)
    : void 0;
  if (!evaluator) {
    // 包裹二阶函数，用于兼容微前端
    script = `return function(${contextKeys.join(', ')}) { ${script}\n}`;
    evaluator = new Function('window', script)(window);
    if (evaluator) { evaluatorCache.set(key, evaluator); }
  }
  resetEvaluatorGC();
  return evaluator;
};
export type SandboxCreateEvaluator = typeof createEvaluator;

export type SandboxEvaluate =
/**
 * 指定上下文，执行 JavaScript 代码段
 *
 * @param creator 通过 JavaScript 代码字符串创建函数
 * @param script JavaScript 代码段
 * @param context 上下文变量键值对
 * @returns 代码段返回结果
 * @throws Error 代码执行异常
 */
<T = unknown>(script: string, context: Record<string, unknown>) => T;

export type SandboxSafeEvaluate =
/**
 * 指定上下文，执行 JavaScript 代码段，抑制错误
 *
 * @param script JavaScript 代码段
 * @param context 上下文变量键值对
 * @param defaultValue 异常时的默认返回值
 * @returns 代码段返回结果，异常时返回默认结果
 */
<T = unknown>(script: string, context: Record<string, unknown>, defaultValue?: T) => T | undefined;

export type SandboxFunctionPreprocess =
/**
 * Schema 中函数通用预处理
 */
(event: (...args: unknown[]) => void, props: Record<string, unknown>) => (() => void);
