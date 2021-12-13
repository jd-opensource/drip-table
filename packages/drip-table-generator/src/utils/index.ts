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
