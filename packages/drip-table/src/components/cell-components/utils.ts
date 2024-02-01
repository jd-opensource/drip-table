/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import get from 'lodash/get';

import { DripTableRecordTypeBase } from '@/types';
import { indexValue } from '@/utils/operator';
import { execute } from '@/utils/sandbox';

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
 * @returns 最终字符串
 */
export const finalizeString = (mode: 'plain' | 'key' | 'pattern' | 'script', text: string, record: DripTableRecordTypeBase, recordIndex?: number) => {
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

/**
 * 抑制事件处理函数默认行为
 * @param e 事件对象
 * @returns boolean
 */
export const preventEvent = (e: React.BaseSyntheticEvent) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
};

/**
 * 获取对象的经过数据处理后的最终值 WHAT THE HELL IS THIS??
 * @param data 基础对象
 * @param indexes 下标或下标数组
 * @param defaultValue 默认值
 * @param dataProcess 数据处理的语句
 * @returns 值
 */
export const dataProcessIndex = (data: unknown, indexes: string | number | readonly (string | number)[] | undefined, defaultValue: unknown = void 0, dataProcess?: string) => {
  const value = indexValue(data, indexes, defaultValue);
  if (dataProcess) {
    try {
      return execute(dataProcess, { rec: data, value });
    } catch (error) {
      return error instanceof Error
        ? `{{Render Error: ${error.message}}}`
        : '{{Unknown Render Error}}';
    }
  }
  return value;
};

/**
 * 获取数据处理的运行结果 WHAT THE HELL IS THIS??
 * @param data 基础对象
 * @param indexes 下标或下标数组
 * @param funcText 数据处理的语句
 * @returns 值
 */
export const dataProcessValue = (data: unknown, indexes: string | number | readonly (string | number)[] | undefined, funcText?: string) => {
  const value = indexValue(data, indexes, '');
  if (funcText) {
    try {
      return execute(funcText, { rec: data, value });
    } catch (error) {
      return error instanceof Error
        ? `{{Render Error: ${error.message}}}`
        : '{{Unknown Render Error}}';
    }
  }
};
