import { DripTableBuiltInColumnSchema, DripTableColumnSchema, DripTableExtraOptions, DripTableSchema } from 'drip-table';
import { createContext } from 'react';

import { DataSourceTypeAbbr } from './typing';

export type DripTableColumn<ExtraColumnSchema extends DripTableColumnSchema = never> = (DripTableBuiltInColumnSchema | DripTableSchema<ExtraColumnSchema>['columns'][number]) & {
  /** 列排序用 */
  index: number;
};

export type GlobalSchema<ExtraColumnSchema extends DripTableColumnSchema = never> = Omit<DripTableSchema<ExtraColumnSchema>, 'columns'>;

export interface DripTableGeneratorContext {
  /** 生成的列配置 */
  columns: DripTableColumn<DripTableColumnSchema>[];
  /** 当前选中的列 */
  currentColumn?: DripTableColumn<DripTableColumnSchema>;
  /** 当前选中列内部选中路径 */
  currentColumnPath?: number[];
  /** 暂存需要添加至列中的组件配置 */
  columnToAdd?: DripTableColumn<DripTableColumnSchema>;
  /** 全局配置项 */
  globalConfigs: GlobalSchema<DripTableColumnSchema>;
  /** 表格数据，generator 不解析具体数据结构，仅仅透传给 drip-table */
  previewDataSource: DataSourceTypeAbbr<NonNullable<DripTableExtraOptions['SubtableDataSourceKey']>>[];
  /** 中间工作区域属于编辑（edit）模式还是预览（preview）模式 */
  mode: 'edit' | 'preview';
  /** 属性栏类型，根据类型展示不同的抽屉 */
  drawerType?: 'datasource' | 'global' | 'column' | 'column-item';
  /** 更新 Context 方法 */
  setState: (states: Partial<Omit<DripTableGeneratorContext, 'setState'>>, callback?: (states?: Omit<DripTableGeneratorContext, 'setState'>) => void) => void;
}

export const GeneratorContext = createContext<DripTableGeneratorContext>({
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
