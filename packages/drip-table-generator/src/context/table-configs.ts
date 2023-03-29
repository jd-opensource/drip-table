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
   * 当前选中的表格ID
   */
  currentTableID?: string;
  currentColumnID?: string;
  currentComponentID?: string;
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
}

export const GeneratorTableConfigsContext = createContext<DTGTableConfigsContext>({
  tableConfigs: [],
  updateTableConfig: () => false,
  updateTableConfigs: () => false,
  setTableConfigs: () => false,
  setTableColumns: () => false,
});
