import { DripTableColumnSchema, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, DripTableSchema } from 'drip-table';
import React, { createContext } from 'react';

export type DripTableColumn<ExtraColumnSchema extends DripTableColumnSchema = never> = DripTableSchema<ExtraColumnSchema>['columns'][number] & {
  /** 列排序用 */
  index: number;
};

export type GlobalSchema<ExtraColumnSchema extends DripTableColumnSchema = never> = Omit<DripTableSchema<ExtraColumnSchema>, 'columns'>;

export interface DripTableGeneratorContext<ExtraColumnSchema extends DripTableColumnSchema = never> {
  /** 生成的列配置 */
  columns: DripTableColumn<ExtraColumnSchema>[];
  /** 当前选中的列 */
  currentColumn?: DripTableColumn<ExtraColumnSchema>;
  /** 当前选中列内部选中路径 */
  currentColumnPath?: number[];
  /** 暂存需要添加至列中的组件配置 */
  columnToAdd?: DripTableColumn<ExtraColumnSchema>;
  /** 全局配置项 */
  globalConfigs: GlobalSchema<ExtraColumnSchema>;
  /** 表格数据，generator 不解析具体数据结构，仅仅透传给 drip-table */
  previewDataSource: DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, React.Key>[];
  /** 中间工作区域属于编辑（edit）模式还是预览（preview）模式 */
  mode: 'edit' | 'preview';
  /** 属性栏类型，根据类型展示不同的抽屉 */
  drawerType?: 'datasource' | 'global' | 'column' | 'column-item';
  /** 更新 Context 方法 */
  setState: (states: Partial<Omit<DripTableGeneratorContext<ExtraColumnSchema>, 'setState'>>, callback?: (states?: Omit<DripTableGeneratorContext<ExtraColumnSchema>, 'setState'>) => void) => void;
}

export const GeneratorContext = createContext<DripTableGeneratorContext<DripTableColumnSchema>>({
  columns: [],
  currentColumn: void 0,
  currentColumnPath: [],
  globalConfigs: {
    pagination: false,
    header: false,
  },
  previewDataSource: [],
  mode: 'edit',
  setState: () => false,
});
