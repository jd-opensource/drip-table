/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { DripTableColumnSchema, DripTableSchema } from 'drip-table';
import { createContext } from 'react';

export interface DTGTableConfig {
  tableId: string;
  columns: DripTableSchema<DripTableColumnSchema>['columns'];
  configs: Omit<DripTableSchema<DripTableColumnSchema>, 'columns' | 'subtable'>;
  hasSubTable: boolean;
  dataSourceKey: string;
}

export interface DTGTableConfigsContext {
  /**
   * 所有表格配置
   *
   * @type {DTGTableConfig[]}
   * @memberOf TableConfigsContext
   */
  tableConfigs: DTGTableConfig[];
  /**
   * 更新位置为index的表格的所有配置
   */
  updateTableConfig: (config: DTGTableConfig, index: number, callback?: (configs: DTGTableConfig[]) => void) => void;
  /**
   * 更新所有表格的所有配置
   */
  updateTableConfigs: (configs: DTGTableConfig[], callback?: (configs: DTGTableConfig[]) => void) => void;
  /**
   * 更新位置为index的表格的非列配置
   */
  setTableConfigs: (config: DTGTableConfig['configs'], index: number, callback?: (configs: DTGTableConfig[]) => void) => void;
  /**
   * 更新位置为index的表格的列配置
   */
  setTableColumns: (columns: DTGTableConfig['columns'], index: number, callback?: (configs: DTGTableConfig[]) => void) => void;
}

export const TableConfigsContext = createContext<DTGTableConfigsContext>({
  tableConfigs: [],
  updateTableConfig: () => false,
  updateTableConfigs: () => false,
  setTableConfigs: () => false,
  setTableColumns: () => false,
});
