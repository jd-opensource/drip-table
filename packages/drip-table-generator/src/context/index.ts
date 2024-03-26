/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { DripTableExtraOptions } from 'drip-table';
import { createContext } from 'react';

import { DataSourceTypeAbbr } from '../typing';

export type DripTableGeneratorStates = Omit<DripTableGeneratorContext, 'setState'>;

export interface DripTableGeneratorContext {
  /**
   * 当前选中的表格ID
   */
  currentTableID?: string;
  currentColumnID?: string;
  currentHoverColumnID?: string;
  /**
   * 获取当前选中的子组件的路径
   */
  currentComponentPath?: number[];
  currentComponentID?: string;
  // 浮窗组件特有，表示当前选中的是浮窗内组件还是单元格内组件
  currentComponentType?: 'popover' | 'content';
  /**
   * 表格数据，generator 不解析具体数据结构，仅仅透传给 drip-table
   */
  previewDataSource: DataSourceTypeAbbr<NonNullable<DripTableExtraOptions['SubtableDataSourceKey']>>[];
  /**
   * 属性栏类型，根据类型展示不同的抽屉
   */
  drawerType?: 'table' | 'column' | 'column-item';
  /**
   * 表格工作区展示模式
   */
  mode: 'edit' | 'preview';
  /**
   * 更新 Context 方法
   */
  setState: (
    states: Partial<DripTableGeneratorStates>,
    callback?: (states?: DripTableGeneratorStates) => void
  ) => void;
}

export const GeneratorContext = createContext<DripTableGeneratorContext>({
  previewDataSource: [],
  mode: 'edit',
  setState: () => false,
});
