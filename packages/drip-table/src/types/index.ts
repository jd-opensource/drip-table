/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import React from 'react';

import { type DripTableGenericRenderElement } from '@/components/generic-render';

import { type DripTableBuiltInColumnSchema } from '../drip-table/components';

export { SchemaObject } from 'ajv';

export interface DripTableColumnSchema<T = string, P extends Record<string, unknown> = Record<string, unknown>> {
  /**
   * 组件类型标识符，自定义开发的业务组件以`命名空间::组件名称`格式填写；通过 components 属性传入组件库实现
   */
  component: T;
  /**
   * 对应组件类型的配置项
   */
  options: P;
  /**
   * @deprecated 已废弃，请使用 component 属性
   */
  'ui:type'?: T;
  /**
   * @deprecated 已废弃，请使用 options 属性
   */
  'ui:props'?: P;
  /**
   * 唯一标识，不做展示用，React 需要的 key。
   */
  key: string;
  /**
   * 表头，组件名
   */
  title: string;
  /**
   * 列数据在数据项中对应的路径，支持通过数组查询嵌套路径
   */
  dataIndex: string | string[];
  /**
   * 默认数据
   */
  defaultValue?: unknown;
  /**
   * 表格列宽
   */
  width?: string | number;
  /**
   * 表格列水平对齐方式
   */
  align?: 'left' | 'center' | 'right';
  /**
   * 表格列垂直对齐方式
   */
  verticalAlign?: 'top' | 'middle' | 'bottom';
  /**
   * 表头说明
   */
  description?: string;
  /**
   * 是否固定列
   */
  fixed?: 'left' | 'right' | boolean;
  /**
   * 用户可控制该列显示隐藏
   */
  hidable?: boolean;
  /**
   * 数据过滤器设置
   */
  filters?: {
    text: React.ReactNode;
    value: string | number | boolean;
  }[];
  /**
   * 默认数据过滤器值
   */
  defaultFilteredValue?: React.Key[] | null;
}

export type DripTableID = string | number | undefined;

export interface DripTableSchema<
  CustomColumnSchema extends DripTableColumnSchema = never,
  SubtableDataSourceKey extends React.Key = never,
> {
  /**
   * 表格标识符，当存在子表嵌套渲染、回调时可用于区分不同层级表格
   */
  id?: DripTableID;
  /**
   * 自定义表格类名
   */
  className?: string;
  /**
   * 自定义表格样式
   */
  style?: React.CSSProperties;
  /**
   * 内部表格组件类名
   */
  innerClassName?: string;
  /**
   * 内部表格组件样式
   */
  innerStyle?: React.CSSProperties;
  /**
   * 是否展示表格边框
   */
  bordered?: boolean;
  /**
   * 是否显示表头
   */
  showHeader?: boolean;
  /**
   * 是否展示头部以及配置
   */
  header?: {
    /**
     * 头部自定义样式
     */
    style?: React.CSSProperties;
    /**
     * 头部展示元素配置
     */
    elements?: DripTableGenericRenderElement[];
  } | boolean;
  /**
   * 是否展示尾部以及配置
   */
  footer?: {
    /**
     * 尾部自定义样式
     */
    style?: React.CSSProperties;
    /**
     * 尾部展示元素配置
     */
    elements?: DripTableGenericRenderElement[];
  };
  /**
   * 是否展示分页以及配置
   */
  pagination?: false | {
    size?: 'small' | 'default';
    pageSize: number;
    position?: 'bottomLeft' | 'bottomCenter' | 'bottomRight';
    showTotal?: boolean | string;
    total?: number;
    showLessItems?: boolean;
    showQuickJumper?: boolean;
    showSizeChanger?: boolean;
    hideOnSinglePage?: boolean;
  };
  size?: 'small' | 'middle' | 'large' | 'default';
  /**
   * 粘性头部
   */
  sticky?: boolean;
  /**
   * 固定列、固定表头滚动设置
   */
  scroll?: {
    x?: number | true | string;
    y?: number | string;
    scrollToFirstRowOnChange?: boolean;
  };
  /**
   * 是否支持选择栏
   */
  rowSelection?: boolean;
  /**
   * 是否平均列宽
   */
  ellipsis?: boolean;
  /**
   * 是否开启虚拟滚动
   */
  virtual?: boolean;
  /**
   * 虚拟列表滚动高度
   * @deprecated 请使用 scroll.y
   */
  scrollY?: number;
  /**
   * 列定义
   */
  columns: (CustomColumnSchema | DripTableBuiltInColumnSchema)[];
  /**
   * 表格行主键
   */
  rowKey?: string;
  /**
   * 子表设置项
   */
  subtable?: {
    /**
     * 父表获取子表数据源键名
     */
    dataSourceKey: SubtableDataSourceKey;
  } & DripTableSchema<CustomColumnSchema, SubtableDataSourceKey>;
}

export type DripTableRecordTypeBase = Record<string, unknown>;

export type DripTableRecordTypeWithSubtable<
  RecordType extends DripTableRecordTypeBase,
  SubtableDataSourceKey extends React.Key
> = RecordType & { [key in SubtableDataSourceKey]?: RecordType[]; }

export interface DripTableExtraOptions {
  CustomColumnSchema: DripTableColumnSchema;
  CustomComponentEvent: EventLike;
  CustomComponentExtraData: unknown;
  SubtableDataSourceKey: React.Key;
}

export interface DripTableTableInformation<RecordType extends DripTableRecordTypeBase> {
  id: DripTableID;
  dataSource: readonly RecordType[];
}

export interface DripTablePagination {
  onChange?: (page: number, pageSize?: number) => void;
  size?: 'small' | 'default';
  pageSize?: number;
  total?: number;
  showTotal?: (total: number, range?: [number, number]) => string;
  current?: number;
  position?: ('topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight')[];
  showLessItems?: boolean;
  showQuickJumper?: boolean;
  showSizeChanger?: boolean;
  hideOnSinglePage?: boolean;
}

export type DripTableFilters = Record<string, (React.Key | boolean)[] | null>;

export type { DripTableDriver, DripTableReactComponent, DripTableReactComponentProps } from './driver';

export type EventLike<T = { type: string }> = T extends { type: string } ? T : never;
export interface DripTableCustomEvent<TN> extends EventLike<{ type: 'custom' }> { name: TN }
