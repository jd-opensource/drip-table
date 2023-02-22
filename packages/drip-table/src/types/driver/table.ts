/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import { DripTableFilters, DripTablePagination, DripTableRecordTypeBase } from '@/types';

export interface DripTableDriverTableProps<RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase> {
  className?: string;
  style?: React.CSSProperties;
  rowKey?: string;
  columns?: {
    width?: string | number;
    align?: 'left' | 'center' | 'right';
    className?: string;
    title?: string | JSX.Element;
    dataIndex?: string | string[];
    fixed?: 'left' | 'right' | boolean;
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
  size?: 'large' | 'middle' | 'small' | 'default';
  bordered?: boolean;
  stripe?: boolean;
  showHeader?: boolean;
  sticky?: boolean | {
    offsetHeader?: number;
    offsetScroll?: number;
    getContainer?: () => HTMLElement;
  };
  expandable?: {
    expandedRowKeys?: readonly React.Key[];
    defaultExpandedRowKeys?: readonly React.Key[];
    expandedRowRender?: (record: RecordType, index: number, indent: number, expanded: boolean) => React.ReactNode;
    expandRowByClick?: boolean;
    onExpand?: (expanded: boolean, record: RecordType) => void;
    onExpandedRowsChange?: (expandedKeys: readonly React.Key[]) => void;
    defaultExpandAllRows?: boolean;
    indentSize?: number;
    expandIconColumnIndex?: number;
    expandedRowClassName?: (record: RecordType, index: number, indent: number) => string;
    childrenColumnName?: string;
    rowExpandable?: (record: RecordType) => boolean;
    columnWidth?: number | string;
    fixed?: 'left' | 'right' | boolean;
  };
  rowSelection?: {
    selectedRowKeys?: React.Key[];
    onChange?: (selectedKeys: React.Key[], selectedRows: RecordType[]) => void;
  };
  scroll?: {
    x?: number | true | string;
    y?: number | string;
    scrollToFirstRowOnChange?: boolean;
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
  title?: (data: readonly RecordType[]) => React.ReactNode;
  footer?: (data: readonly RecordType[]) => React.ReactNode;
  onChange?: (pagination: DripTablePagination, filters: DripTableFilters) => void;
}
