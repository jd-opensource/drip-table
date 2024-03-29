---
title: 表格信息 TableInformation
toc: content
---

## DripTableTableInformation

> 通用表格信息

```typescript
/**
 * 表格信息
 */
export interface DripTableTableInformation<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  /**
   * 表格 Schema
   */
  schema: DripTableSchema<ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>;
  /**
   * 表格数据
   */
  dataSource: readonly RecordType[];
  /**
   * 所属数据（通常用于子表寻找父级行数据）
   */
  record?: RecordType;
  /**
   * 表格父级信息
   */
  parent?: DripTableTableInformation<RecordType, ExtraOptions>;
}
```
