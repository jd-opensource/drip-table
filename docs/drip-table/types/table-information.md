---
order: 1
title: 表格信息 TableInformation
---

## DripTableTableInformation

[> 返回上层](/drip-table/types)

> 通用表格信息

```typescript
/**
 * 表格信息
 */
export interface DripTableTableInformation<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  /**
   * 表格 Schema
   */
  schema: DripTableSchema<NonNullable<ExtraOptions['CustomColumnSchema']>, NonNullable<ExtraOptions['SubtableDataSourceKey']>>;
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
