/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import classnames from 'classnames';
import React, { useRef } from 'react';

import { ColumnConfig, DripTableDriver, DripTableReactComponentProps, DripTableRecordTypeBase, DripTableSchema, EventLike } from '@/types';
import ErrorBoundary from '@/components/ErrorBoundary';
import RichText from '@/components/RichText';
import { useState, useTable } from '@/hooks';

import DripTableBuiltInComponents, { DripTableBuiltInComponentEvent, DripTableComponentProps, DripTableComponentSchema } from './components';
import Header from './header';
import VirtualTable from './virtual-table';

import styles from './index.module.css';

export interface DripTableProps<RecordType extends DripTableRecordTypeBase, CustomComponentEvent extends EventLike = never, Ext = unknown> {
  /**
   * 底层组件驱动
   */
  driver: DripTableDriver<RecordType>;
  /**
   * 样式表类名
   */
  className?: string;
  /**
   * 自定义样式表
   */
  style?: React.CSSProperties;
  /**
   * 表单 Schema
   */
  schema: DripTableSchema;
  /**
   * 表格行主键
   */
  rowKey?: string;
  /**
   * 数据源
   */
  dataSource: RecordType[];
  /**
   * 当前选中的行键
   */
  selectedRowKeys?: React.Key[];
  /**
   * 当前显示的列键
   */
  displayColumnKeys?: React.Key[];
  /**
   * 附加数据
   */
  ext?: Ext;
  /**
   * 数据源总条数
   */
  total?: number;
  /**
   * 当前页码
   */
  currentPage?: number;
  /**
   * 加载中
   */
  loading?: boolean;
  /**
   * 组件库
   */
  components?: {
    [libName: string]: {
      [componentName: string]:
      new (props: DripTableComponentProps<RecordType, DripTableComponentSchema, CustomComponentEvent, Ext>)
      => React.PureComponent<DripTableComponentProps<RecordType, DripTableComponentSchema, CustomComponentEvent, Ext>>;
    };
  };
  /** 生命周期 */
  componentDidMount?: () => void;
  componentDidUpdate?: () => void;
  componentWillUnmount?: () => void;
  /**
   * 点击行
   */
  onRowClick?: (record: RecordType | RecordType[], index?: number | string | (number | string)[]) => void;
  /**
   * 双击行
   */
  onRowDoubleClick?: (record: RecordType | RecordType[], index?: number | string | (number | string)[]) => void;
  /**
   * 选择行变化
   */
  onSelectionChange?: (selectedKeys: React.Key[], selectedRows: RecordType[]) => void;
  /**
   * 搜索触发
   */
  onSearch?: (searchParams: { searchKey?: number | string; searchStr: string } | Record<string, unknown>) => void;
  /**
   * 点击添加按钮触发
   */
  onInsertButtonClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  /**
   * 过滤器触发
   */
  onFilter?: (column: ColumnConfig) => void;
  /**
   * 页码/页大小变化
   */
  onPageChange?: (currentPage: number, pageSize: number) => void;
  /**
   * 用户修改展示的列时
   */
  onDisplayColumnKeysChange?: (displayColumnKeys: React.Key[]) => void;
  /**
   * 通用事件机制
   */
  onEvent?: (event: DripTableBuiltInComponentEvent | CustomComponentEvent, record: RecordType, index: number) => void;
}

const DripTable = <RecordType extends DripTableRecordTypeBase, CustomComponentEvent extends EventLike = never, Ext = unknown>
  (props: DripTableProps<RecordType, CustomComponentEvent, Ext>): JSX.Element => {
  const Table = props.driver.components?.Table;
  const Popover = props.driver.components?.Popover;
  const QuestionCircleOutlined = props.driver.icons?.QuestionCircleOutlined;
  type TableColumn = NonNullable<DripTableReactComponentProps<typeof Table>['columns']>[number];

  const initialState = useTable();
  const pagination = props.schema?.configs?.pagination || void 0;
  const [tableState, setTableState] = initialState._CTX_SOURCE === 'CONTEXT' ? useState(initialState) : [initialState, initialState.setTableState];
  const rootRef = useRef<HTMLDivElement>(null); // ProTable组件的ref

  React.useEffect(() => {
    setTableState(state => ({
      pagination: {
        ...state.pagination,
        pageSize: pagination?.pageSize || 10,
      },
    }));
  }, [pagination?.pageSize]);

  React.useEffect(() => {
    setTableState(state => ({
      displayColumnKeys: props.displayColumnKeys || props.schema.columns.filter(c => c.hidable).map(c => c.key),
    }));
  }, [props.displayColumnKeys]);

  const {
    rowKey = 'key',
  } = props;
  const dataSource = props.dataSource.map((item, index) => ({
    ...item,
    [rowKey]: typeof item[rowKey] === 'undefined' ? index : item[rowKey],
  }));

  const columns = React.useMemo(() => props.schema.columns
    ?.filter(column => !column.hidable || tableState.displayColumnKeys.includes(column.key))
    || [],
  [props.schema.columns, tableState.displayColumnKeys]);

  /**
   * 根据组件类型，生成表格渲染器
   * @param schema Schema
   * @returns 表格
   */
  const renderGenerator = (schema: ColumnConfig): (value: unknown, record: RecordType, index: number) => JSX.Element | string | null => {
    const BuiltInComponent = DripTableBuiltInComponents[schema['ui:type']] as new() => React.PureComponent<DripTableComponentProps<RecordType>>;
    if (BuiltInComponent) {
      return (value, record, index) => (
        <BuiltInComponent
          driver={props.driver}
          value={value}
          data={record}
          schema={{ ...schema, ...schema['ui:props'] }}
          ext={props.ext}
          fireEvent={event => props.onEvent?.(event, record, index)}
        />
      );
    }
    const [libName, componentName] = schema['ui:type'].split('::');
    if (libName && componentName) {
      const ExtraComponent = props.components?.[libName]?.[componentName];
      if (ExtraComponent) {
        return (value, record, index) => (
          <ExtraComponent
            driver={props.driver}
            value={value}
            data={record}
            schema={schema}
            ext={props.ext}
            fireEvent={event => props.onEvent?.(event, record, index)}
          />
        );
      }
    }
    return value => JSON.stringify(value);
  };

  /**
   * 根据列 Schema，生成表格列配置
   * @param schemaColumn Schema Column
   * @returns 表格列配置
   */
  const columnGenerator = (schemaColumn: ColumnConfig): TableColumn => {
    let width = String(schemaColumn.width).trim();
    if ((/^[0-9]+$/uig).test(width)) {
      width += 'px';
    }
    const column: TableColumn = {
      width,
      align: schemaColumn.align,
      title: schemaColumn.title,
      dataIndex: schemaColumn.dataIndex,
      fixed: schemaColumn.fixed,
    };
    if (schemaColumn.description) {
      column.title = (
        <div>
          <span style={{ marginRight: '6px' }}>{ schemaColumn.title }</span>
          <Popover placement="top" title="" content={<RichText html={schemaColumn.description} />}>
            <QuestionCircleOutlined />
          </Popover>
        </div>
      );
    }
    if (props.schema.configs.ellipsis) {
      column.ellipsis = true;
    }
    if (!column.render) {
      column.render = renderGenerator(schemaColumn);
    }
    return column;
  };

  const tableProps: Parameters<DripTableDriver<RecordType>['components']['Table']>[0] = {
    rowKey,
    columns: columns.map(columnGenerator),
    dataSource,
    pagination: props.schema.configs.pagination === false
      ? false as const
      : {
        onChange: (page, pageSize) => {
          if (pageSize === void 0) {
            pageSize = tableState.pagination.pageSize;
          }
          setTableState({ pagination: { ...tableState.pagination, current: page, pageSize } });
          props.onPageChange?.(page, pageSize);
        },
        size: props.schema.configs.pagination?.size === void 0 ? 'small' : props.schema.configs.pagination.size,
        pageSize: tableState.pagination.pageSize,
        total: props.total === void 0 ? dataSource.length : props.total,
        current: props.currentPage || tableState.pagination.current,
        position: [props.schema.configs.pagination?.position || 'bottomRight'],
        showLessItems: props.schema.configs.pagination?.showLessItems,
        showQuickJumper: props.schema.configs.pagination?.showQuickJumper,
        showSizeChanger: props.schema.configs.pagination?.showSizeChanger,
      },
    loading: props.loading,
    size: props.schema.configs.size,
    bordered: props.schema.configs.bordered,
    innerBordered: props.schema.configs.innerBordered,
    // ellipsis: schema.configs.ellipsis,
    sticky: props.schema.configs.virtual ? false : props.schema.configs.sticky,
    rowSelection: props.schema.configs.rowSelection && !props.schema.configs.virtual
      ? {
        selectedRowKeys: props.selectedRowKeys || tableState.selectedRowKeys,
        onChange: (selectedKeys, selectedRows) => {
          setTableState({ selectedRowKeys: [...selectedKeys] });
          props.onSelectionChange?.(selectedKeys, selectedRows);
        },
      }
      : void 0,
  };

  return (
    <ErrorBoundary driver={props.driver}>
      <div
        className={classnames(styles['drip-table-wrapper'], props.className)}
        style={props.style}
        ref={rootRef}
      >
        {
          props.schema.configs.header
            ? (
              <Header
                tableProps={props}
                tableState={tableState}
                setTableState={setTableState}
              />
            )
            : null
          }
        {
          props.schema.configs.virtual
            ? (
              <VirtualTable
                {...tableProps}
                driver={props.driver}
                scroll={{ y: props.schema.configs.scrollY || 300, x: '100vw' }}
              />
            )
            : <Table {...tableProps} />
        }
      </div>
    </ErrorBoundary>
  );
};

export default DripTable;
