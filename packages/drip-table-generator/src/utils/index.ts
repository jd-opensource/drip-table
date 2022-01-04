/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

window.mockCount = Number((Math.random() * 1000 + 4096).toFixed(0));
export const mockId = () => {
  window.mockCount += 1;
  return `${Date.now().toString(16)}-${window.mockCount.toString(16)}`;
};

/**
 * 获取对象指定下标值
 * @param data 基础对象
 * @param indexes 下标或下标数组
 * @param defaultValue 默认值
 * @returns 值
 */
export const get = (data: unknown, indexes: string | number | (string | number)[], defaultValue: unknown = void 0) => {
  if (typeof data !== 'object' || !data) {
    return void 0;
  }
  if (typeof indexes === 'string') {
    return data[indexes];
  }
  if (Array.isArray(indexes)) {
    return indexes.reduce((d, key) => (d ? d[key] : void 0), data);
  }
  return defaultValue;
};

/**
 * 对象属性过滤器
 * @param {Record<string, unknown>} record 原始对象
 * @param {string | string[]} excludeAttrs 需要排除掉的属性名
 * @returns {Record<string, unknown>} 返回最终对象
 */
export const filterAttributes = (record: Record<string, unknown>, excludeAttrs: string | string[]) => {
  if (typeof excludeAttrs === 'string') { excludeAttrs = [excludeAttrs]; }
  const finalObject = { ...record };
  excludeAttrs.forEach((key) => {
    delete finalObject[key];
  });
  return finalObject;
};
