/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import { DripTableFilters, DripTablePagination, DripTableRecordTypeBase } from '@/types';

export interface DripTableDriverTableProps<RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase> {
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
  expandable?: object,
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
  showHeader?: boolean;
  footer?: (currentPageData: Record<string, any>) => JSX.Element;
}

declare function DripTableDriverTable<RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase>(props: DripTableDriverTableProps<RecordType>): JSX.Element;

export type DripTableDriverTable = typeof DripTableDriverTable;
