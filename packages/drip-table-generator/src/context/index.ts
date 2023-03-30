/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { DripTableColumnSchema, DripTableExtraOptions, DripTableSchema } from 'drip-table';
import { createContext } from 'react';

import { DataSourceTypeAbbr } from '../typing';

export interface DTGTableConfig {
  tableId: string;
  columns: DripTableSchema<DripTableColumnSchema>['columns'];
  configs: Omit<DripTableSchema<DripTableColumnSchema>, 'columns' | 'subtable'>;
  hasSubTable: boolean;
  dataSourceKey: string;
}

export type DripTableGeneratorStates = Omit<DripTableGeneratorContext,
'setState'
| 'updateTableConfig'
| 'updateTableConfigs'
| 'setTableConfigs'
| 'setTableColumns'>;

export interface DripTableGeneratorContext {
  /**
   * 当前选中的表格ID
   */
  currentTableID?: string;
  currentColumnID?: string;
  currentComponentID?: string;
  /**
   * 表格数据，generator 不解析具体数据结构，仅仅透传给 drip-table
   */
  previewDataSource: DataSourceTypeAbbr<NonNullable<DripTableExtraOptions['SubtableDataSourceKey']>>[];
  /**
   * 属性栏类型，根据类型展示不同的抽屉
   */
  drawerType?: 'datasource' | 'global' | 'column' | 'column-item';
  /**
   * 表格工作区展示模式
   */
  mode: 'edit' | 'preview';
  /**
   * 所有表格配置
   *
   * @type {DTGTableConfig[]}
   * @memberOf DTGTableConfigsContext
   */
  tableConfigs: DTGTableConfig[];
  /**
   * 更新某一项配置
   */
  updateTableConfig: (config: DTGTableConfig, index: number, callback?: (configs: DTGTableConfig[]) => void) => void;
  updateTableConfigs: (configs: DTGTableConfig[], callback?: (configs: DTGTableConfig[]) => void) => void;
  setTableConfigs: (config: DTGTableConfig['configs'], index: number, callback?: (configs: DTGTableConfig[]) => void) => void;
  setTableColumns: (columns: DTGTableConfig['columns'], index: number, callback?: (configs: DTGTableConfig[]) => void) => void;

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
  tableConfigs: [],
  updateTableConfig: () => false,
  updateTableConfigs: () => false,
  setTableConfigs: () => false,
  setTableColumns: () => false,
  setState: () => false,
});
