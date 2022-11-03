/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

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
 * 获取对象指定下标值
 * @param data 基础对象
 * @param indexes 下标或下标数组
 * @param defaultValue 默认值
 * @returns 值
 */
const getValue = (data: unknown, indexes: string | number | readonly (string | number)[] | undefined, defaultValue: unknown = void 0) => {
  if (typeof data !== 'object' || !data) {
    return defaultValue;
  }
  if (typeof indexes === 'string') {
    return indexes in data
      ? data[indexes]
      : defaultValue;
  }
  if (Array.isArray(indexes)) {
    for (const k of indexes) {
      if (data && typeof data === 'object' && k in data) {
        data = data[k];
      } else {
        data = defaultValue;
        break;
      }
    }
    return data;
  }
  return defaultValue;
};

/**
 * 获取对象的经过数据处理后的最终值
 * @param data 基础对象
 * @param indexes 下标或下标数组
 * @param defaultValue 默认值
 * @param dataProcess 数据处理的语句
 * @returns 值
 */
export const indexValue = (data: unknown, indexes: string | number | readonly (string | number)[] | undefined, defaultValue: unknown = void 0, dataProcess?: string) => {
  const value = getValue(data, indexes, defaultValue);
  if (dataProcess) {
    try {
      const processFunc = new Function('value', 'rec', dataProcess);
      const processedValue = processFunc(value, data);
      return processedValue;
    } catch (error) {
      return error instanceof Error
        ? `{{Render Error: ${error.message}}}`
        : '{{Unknown Render Error}}';
    }
  }
  return value;
};

/**
 * 获取数据处理的运行结果
 * @param data 基础对象
 * @param indexes 下标或下标数组
 * @param funcText 数据处理的语句
 * @returns 值
 */
export const dataProcessValue = (data: unknown, indexes: string | number | readonly (string | number)[] | undefined, funcText?: string) => {
  const value = getValue(data, indexes, '');
  if (funcText) {
    try {
      const processFunc = new Function('value', 'rec', funcText);
      const processedValue = processFunc(value, data);
      return processedValue;
    } catch (error) {
      return error instanceof Error
        ? `{{Render Error: ${error.message}}}`
        : '{{Unknown Render Error}}';
    }
  }
};

/**
 * 设置对象指定下标值
 * @param data 基础对象
 * @param indexes 下标或下标数组
 * @param value 默认值
 */
export const setValue = (data: unknown, indexes: string | string[], value: unknown) => {
  if (typeof data !== 'object' || !data) {
    return;
  }
  if (typeof indexes === 'string') {
    data[indexes] = value;
  } else if (Array.isArray(indexes)) {
    const prefixes = [...indexes];
    const key = prefixes.pop();
    for (const k of prefixes) {
      if (data && typeof data === 'object') {
        if (!data[k] || typeof data[k] !== 'object') {
          data[k] = {};
        }
        data = data[k];
      }
    }
    if (data && typeof data === 'object' && key) {
      data[key] = value;
    }
  }
};

/**
 * 格式化数字数据类型
 * @param value 原始数据
 * @param defaultValue 兜底数据
 * @returns 数字
 */
export const parseNumber = (value: string | number | undefined, defaultValue: number = 0): number => {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    const n = Number.parseFloat(value);
    if (Number.isNaN(n)) {
      return defaultValue;
    }
    return n;
  }
  return defaultValue;
};

/**
 * 复制文字到clipboard
 * @param text 要复制的文字
 * @param onSuccess 兜底数据
 * @param onError 兜底数据
 */
export function copyTextToClipboard(text: string, onSuccess: () => void, onError: (error: Error) => void) {
  if (!navigator.clipboard) {
    onError(new Error('浏览器不支持复制功能 请手动复制'));
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    onSuccess();
    return void 0;
  }, () => {
    onError(new Error('复制失败'));
  });
}
