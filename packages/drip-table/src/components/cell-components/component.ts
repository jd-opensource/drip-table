/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import React from 'react';

import type { SandboxCreateEvaluator, SandboxEvaluate, SandboxSafeEvaluate } from '@/utils/sandbox';
import type { DripTableColumnSchema, DripTableExtraOptions, DripTableProps, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, EventLike } from '@/types';

import type { DripTableBuiltInComponentEvent } from '.';
import type { FinalizeString } from './utils';

export interface DripTableComponentProps<
  RecordType extends DripTableRecordTypeBase,
  ColumnSchema extends DripTableColumnSchema,
  ComponentEvent extends EventLike = never,
  ComponentExtraData = unknown,
> {
  /**
   * 当前渲染列参数
   */
  schema: ColumnSchema;
  /**
   * 当前渲染行数据结构（`list[i]`）
   */
  record: RecordType;
  /**
   * 当前渲染行数据下标（`i of list[i]`）
   */
  recordIndex: number;
  /**
   * 已弃用，请使用 `record` 字段
   * @deprecated
   */
  data: RecordType;
  /**
   * 当前渲染单元格数据（`record[schema.dataIndex]`）
   */
  value: unknown;
  /**
   * 获取该行其他渲染单元格数据（`record[dataIndex]`）
   */
  indexValue: (dataIndex: ColumnSchema['dataIndex'], defaultValue?: unknown) => unknown;
  /**
   * 手动渲染组件 Schema
   */
  renderSchema: (schema: DripTableColumnSchema, record: RecordType, recordIndex: number) => React.ReactNode;
  /**
   * 沙箱生成器
   */
  createEvaluator: SandboxCreateEvaluator;
  /**
   * 沙箱执行器
   */
  evaluate: SandboxEvaluate;
  /**
   * 安全沙箱执行器
   */
  safeEvaluate: SandboxSafeEvaluate;
  /**
   * 格式化模板字符串
   */
  finalizeString: FinalizeString;
  /**
   * 是否处于禁用状态
   */
  disable?: boolean;
  /**
   * 是否可通过点击进入编辑模式
   */
  editable?: boolean;
  /**
   * 单元格数据改变事件（例如编辑模式）
   */
  onChange?: (value: unknown) => void;
  /**
   * 最外层额外透传的数据
   */
  ext?: ComponentExtraData;
  /**
   * 透传 DripTable 属性里的 components 字段 (用于提供给组合组件渲染使用)
   */
  components?: DripTableProps<DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, NonNullable<React.Key>>, DripTableExtraOptions>['components'];
  /**
   * 透传 DripTable 属性里的 icons 字段 (用于提供给组合组件渲染使用)
   */
  icons?: DripTableProps<DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, NonNullable<React.Key>>, DripTableExtraOptions>['icons'];
  /**
   * 是否处于预览模式（不响应事件）
   */
  preview?: boolean | {
    /**
     * 自定义列渲染函数
     */
    columnRenderer?: (columnSchema: ColumnSchema, columnElement: JSX.Element) => JSX.Element;
  };
  onClick?: (name: string) => void;
  /**
   * 自定义事件触发器
   */
  fireEvent: (event: ComponentEvent | DripTableBuiltInComponentEvent) => void;
}
