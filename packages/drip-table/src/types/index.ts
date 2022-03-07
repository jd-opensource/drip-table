/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import React from 'react';

import { type DripTableBuiltInColumnSchema, type DripTableComponentSchema } from '../drip-table/components';
import { type DripTableHeaderElement } from '../drip-table/header';

export type DripTableColumnSchema<T, C extends DripTableComponentSchema> = {
  /**
   * 若自定义开发的业务组件以`命名空间::组件名称`格式填写；通过 components 属性传入组件库实现
   * 系统支持的通用组件目前有：文本组件、图文组件和自定义组件（通过代码实现的）
   */
  'ui:type': T;
  'ui:props'?: {
    [key: string]: unknown;
  };
} & C;

export interface DripTableSchema<CustomComponentSchema extends DripTableComponentSchema = never> {
  '$schema': 'http://json-schema.org/draft/2019-09/schema#'
  | 'http://json-schema.org/draft-07/schema#'
  | 'http://json-schema.org/draft-06/schema#'
  | 'http://json-schema.org/draft-04/schema#';
  /**
   * 是否展示表格边框
   */
  bordered?: boolean;
  /**
   * 是否展示表格内部边框
   */
  innerBordered?: boolean;
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
    elements?: DripTableHeaderElement[];
  } | boolean;
  /**
   * 是否展示分页以及配置
   */
  pagination?: false | {
    size?: 'small' | 'default';
    pageSize: number;
    position?: 'bottomLeft' | 'bottomCenter' | 'bottomRight';
    showLessItems?: boolean;
    showQuickJumper?: boolean;
    showSizeChanger?: boolean;
  };
  /**
   * 是否需要展开行
   */
  expandable?: boolean;
  size?: 'small' | 'middle' | 'large' | undefined;
  /**
   * 粘性头部
   */
  sticky?: boolean;
  /**
   * 是否支持选择栏
   */
  rowSelection?: boolean;
  /**
   * 是否平均列宽
   */
  ellipsis?: boolean;
  /**
   * 无数据提示
   */
  placeholder?: {
    image: string;
    text: string;
  };
  /**
   * 是否开启虚拟滚动
   */
  virtual?: boolean;
  /**
   * 虚拟列表滚动高度
   */
  scrollY?: number;
  /**
   * 列定义
   */
  columns: (CustomComponentSchema | DripTableBuiltInColumnSchema)[];
  /**
   * 展开行列表信息
   */
  expandedRowColumns?: (CustomComponentSchema | DripTableBuiltInColumnSchema)[];
  /**
   * 表格尾部
   */
  footer?: (currentPageData: Record<string, any>) => JSX.Element;
}

export type DripTableRecordTypeBase = Record<string, unknown>;

export interface DripTablePagination {
  onChange?: (page: number, pageSize?: number) => void;
  size?: 'small' | 'default';
  pageSize?: number;
  total?: number;
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
