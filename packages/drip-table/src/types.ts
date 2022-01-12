/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import React from 'react';

import { type DripTableBuiltInColumnSchema, type DripTableComponentSchema } from './drip-table/components';
import { type DripTableHeaderElement } from './drip-table/header';

export type DripTableColumnSchema<T, C> = {
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
}

export type DripTableRecordTypeBase = Record<string, unknown>;

export type DripTableReactComponent<P> = (props: React.PropsWithChildren<P>) => React.ReactElement | null;
export type DripTableReactComponentProps<T> = T extends DripTableReactComponent<infer P> ? P : never;

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
}

export type DripTableFilters = Record<string, (React.Key | boolean)[] | null>;

export interface DripTableDriver<RecordType> {
  /**
   * 组件库
   */
  components: {
    Button: DripTableReactComponent<{
      style?: React.CSSProperties;
      className?: string;
      type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
      shape?: 'circle' | 'round';
      size?: 'large' | 'middle' | 'small';
      danger?: boolean;
      ghost?: boolean;
      icon?: React.ReactNode;
      onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    }>;
    Col: DripTableReactComponent<{
      className?: string;
      style?: React.CSSProperties;
      span?: number;
    }>;
    ConfigProvider: DripTableReactComponent<Record<string, unknown>>;
    Dropdown: DripTableReactComponent<{
      trigger?: ('click' | 'hover' | 'contextMenu')[];
      overlay?: JSX.Element;
      visible?: boolean;
      onVisibleChange?: (visible: boolean) => void;
    }>;
    Image: DripTableReactComponent<{
      width?: number;
      height?: number;
      src?: string;
      preview?: boolean;
      fallback?: string;
    }>;
    Input: {
      Search: DripTableReactComponent<{
        style?: React.CSSProperties;
        allowClear?: boolean;
        placeholder?: string;
        enterButton?: string | true;
        size?: 'large' | 'middle' | 'small';
        value?: string;
        onChange?: React.ChangeEventHandler<HTMLInputElement>;
        onSearch?: (value: string) => void;
      }>;
    };
    Menu: DripTableReactComponent<{
      onClick?: (data: { key: React.Key; keyPath: React.Key[]; domEvent: MouseEvent }) => void;
    }> & {
      Item: DripTableReactComponent<{
        key: React.Key;
        icon?: JSX.Element;
      }>;
    };
    Popover: DripTableReactComponent<{
      placement?: 'top';
      title?: string;
      content?: React.ReactNode;
    }>;
    Result: DripTableReactComponent<{
      status?: 'error';
      title?: string;
      extra?: string;
    }>;
    Row: DripTableReactComponent<{
      style?: React.CSSProperties;
    }>;
    Select: (
      <VT extends string | number | (string | number)[]>(props: React.PropsWithChildren<{
        className?: string;
        defaultValue?: string | number;
        mode?: 'multiple';
        value?: VT;
        onChange?: (value: VT) => void;
      }>) => React.ReactElement | null
    )
    & {
      Option: DripTableReactComponent<Record<string, unknown> & { value: string | number; children: React.ReactNode }>;
    };
    Table: DripTableReactComponent<{
      rowKey?: string;
      columns?: {
        width?: string | number;
        align?: 'left' | 'center' | 'right';
        title?: string | JSX.Element;
        dataIndex?: string | string[];
        fixed?: boolean;
        ellipsis?: boolean;
        render?: (value: unknown, record: RecordType, rowIndex: number) => React.ReactNode;
        filters?: {
          text: React.ReactNode;
          value: string | number | boolean;
        }[];
        defaultFilteredValue?: React.Key[] | null;
      }[];
      dataSource?: RecordType[];
      pagination?: false | DripTablePagination;
      loading?: boolean;
      size?: 'large' | 'middle' | 'small';
      bordered?: boolean;
      innerBordered?: boolean;
      sticky?: boolean;
      rowSelection?: {
        selectedRowKeys?: React.Key[];
        onChange?: (selectedKeys: React.Key[], selectedRows: RecordType[]) => void;
      };
      scroll?: {
        x?: string | number;
        y?: string | number;
      };
      components?: {
        body?: (data: readonly RecordType[], info: {
          scrollbarSize: number;
          ref: React.Ref<{
            scrollLeft: number;
          }>;
          onScroll: (info: {
            currentTarget?: HTMLElement;
            scrollLeft?: number;
          }) => void;
        }) => React.ReactNode;
      };
      onChange?: (pagination: DripTablePagination, filters: DripTableFilters) => void;
    }>;
    TableAdvanceSearch?: DripTableReactComponent<Record<string, unknown> & {
      driver: DripTableDriver<RecordType>;
      onSearch: (searchParams: Record<string, unknown>) => void;
    }>;
    Tag: DripTableReactComponent<{
      style?: React.CSSProperties;
      color?: string;
    }>;
    Tooltip: DripTableReactComponent<{
      title: React.ReactNode | (() => React.ReactNode);
      placement?: 'top';
    }>;
    Typography: {
      Text: DripTableReactComponent<{
        style?: React.CSSProperties;
        ellipsis?: boolean;
        copyable?: boolean | {
          text?: string;
          onCopy?: () => void;
        };
      }>;
    };
    message: {
      success: (message: string) => void;
    };
  };
  /**
   * 图标库
   */
  icons: {
    CheckOutlined: DripTableReactComponent<unknown>;
    DownOutlined: DripTableReactComponent<unknown>;
    PlusOutlined: DripTableReactComponent<unknown>;
    QuestionCircleOutlined: DripTableReactComponent<unknown>;
  };
  /**
   * 组件本地化翻译
   */
  locale: unknown;
}

export type EventLike<T = { type: string }> = T extends { type: string } ? T : never;
export interface DripTableCustomEvent<TN> extends EventLike<{ type: 'custom' }> { name: TN }
