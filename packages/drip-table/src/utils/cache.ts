/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

interface CacheItem {
  hasValue: boolean;
  value: unknown;
  children: Map<unknown, CacheItem>;
}

const createItem = () => ({
  hasValue: false,
  value: void 0,
  children: new Map<unknown, CacheItem>(),
});

/**
 * 支持嵌套的缓存对象
 */
class RecursiveCache<T = unknown> {
  private root: CacheItem = createItem();

  /**
   * 设置缓存值
   *
   * @param kvs 递归键名数组 + 值
   */
  public set(...kvs: unknown[]) {
    const keys = kvs;
    const value = keys.pop();
    let item = this.root;
    for (const key of keys) {
      let child = item.children.get(key);
      if (!child) {
        child = createItem();
        item.children.set(key, child);
      }
      item = child;
    }
    item.value = value;
    item.hasValue = true;
  }

  /**
   * 检查缓存值是否存在
   *
   * @param keys 递归键名数组
   * @returns 是否存在值
   */
  public has(...keys: unknown[]) {
    let item = this.root;
    for (const key of keys) {
      const child = item.children.get(key);
      if (!child) {
        return false;
      }
      item = child;
    }
    return item.hasValue;
  }

  /**
   * 获取缓存值
   *
   * @template T 数据类型
   * @param keys 递归键名数组
   * @returns 值
   */
  public get(...keys: unknown[]): T | undefined {
    let item = this.root;
    for (const key of keys) {
      const child = item.children.get(key);
      if (!child) {
        return void 0;
      }
      item = child;
    }
    if (!item.hasValue) {
      return void 0;
    }
    return item.value as T | undefined;
  }

  /**
   * 清除缓存
   */
  public clear() {
    this.root = createItem();
  }
}

export default RecursiveCache;
