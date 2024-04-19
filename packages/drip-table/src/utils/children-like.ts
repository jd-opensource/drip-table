/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

type ChildrenLike<T extends ChildrenLike<T>> = {
  children?: readonly T[] | void;
} | object;

export const forEachRecursive = <T extends ChildrenLike<T>>(
  columns: readonly T[],
  callbackfn: (column: T, index: number) => void,
): void => {
  let index = -1;
  const iter = (cs: typeof columns): void => {
    cs.forEach((c) => {
      if ('children' in c && c.children?.length) {
        iter(c.children);
      } else {
        index += 1;
        callbackfn(c, index);
      }
    });
  };
  return iter(columns);
};

export const flattenRecursive = <T extends ChildrenLike<T>>(
  columns: readonly T[],
): typeof columns => {
  const res: T[] = [];
  forEachRecursive(columns, (c) => {
    res.push(c);
  });
  return res;
};

export const mapRecursive = <T extends ChildrenLike<T>>(
  columns: readonly T[],
  callbackfn: (column: T, index: number) => typeof column,
): typeof columns => {
  let index = -1;
  const iter = (cs: typeof columns): typeof columns => cs.map((c) => {
    if ('children' in c && c.children?.length) {
      return { ...c, children: iter(c.children) };
    }
    index += 1;
    return callbackfn(c, index);
  });
  return iter(columns);
};

export const filterRecursive = <T extends ChildrenLike<T>>(
  columns: readonly T[],
  callbackfn: (column: T, index: number) => unknown,
): typeof columns => {
  let index = -1;
  const iter = (cs: readonly T[]): T[] => {
    const res: T[] = [];
    cs.forEach((c) => {
      if ('children' in c && c.children?.length) {
        const children = iter(c.children);
        if (children.length > 0) {
          res.push({ ...c, children });
        }
      } else {
        index += 1;
        if (callbackfn(c, index)) {
          res.push(c);
        }
      }
    });
    return res;
  };
  return iter(columns);
};

export const findIndexRecursive = <T extends ChildrenLike<T>>(
  columns: readonly T[],
  callbackfn: (c: T) => unknown,
): number => {
  let index = -1;
  let found = false;
  forEachRecursive(columns, (c) => {
    if (found) {
      return;
    }
    index += 1;
    if (callbackfn(c)) {
      found = true;
    }
  });
  return found ? index : -1;
};
