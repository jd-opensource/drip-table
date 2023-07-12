/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import type { SchemaObject } from 'ajv';
import type React from 'react';

import type { AjvOptions } from '@/utils/ajv';
import type { DripTableBuiltInColumnSchema, DripTableBuiltInComponentEvent, DripTableComponentProps } from '@/components/cell-components';
import type { DripTableSlotSchema } from '@/components/react-components/slot-render';

export { SchemaObject } from 'ajv';

export interface DripTableCellDisplayControl {
  /**
   * 表格列水平对齐方式
   */
  align?: 'left' | 'center' | 'right';
  /**
   * 表格列垂直对齐方式
   */
  verticalAlign?: 'top' | 'middle' | 'bottom' | 'stretch';
}

export interface DripTableBaseColumnSchema {
  /**
   * 唯一标识，不做展示用，React 需要的 key。
   */
  key: string;
  /**
   * 表头，组件名
   */
  title: string | {
    /**
     * 表头样式
     */
    style?: Record<string, string>;
    /**
     * 表头内容
     */
    body: string | {
      /**
       * 表头内容样式
       */
      style?: Record<string, string>;
      /**
       * 表头内容富文本
       */
      content: string;
    };
    /**
     * 是否展示头部以及配置
     */
    header?: DripTableSlotSchema;
    /**
     * 是否展示尾部以及配置
     */
    footer?: DripTableSlotSchema;
  };
  /**
   * 单元格样式，传入代码字符串时按行执行语句，返回行单元格样式
   */
  style?: string | Record<string, string>;
  /**
   * 鼠标悬浮当前单元格样式，传入代码字符串时按行执行语句，返回行单元格样式
   */
  hoverStyle?: string | Record<string, string>;
  /**
   * 鼠标悬浮单元格所在行时单元格样式，传入代码字符串时按行执行语句，返回鼠标悬浮单元格所在行时样式
   */
  rowHoverStyle?: string | Record<string, string>;
  /**
   * 鼠标悬浮单元格所在列时单元格样式，传入代码字符串时按行执行语句，返回行单元格样式
   */
  columnHoverStyle?: string | Record<string, string>;
  /**
   * 表格列宽
   */
  width?: string | number;
  /**
   * 表格列水平对齐方式
   */
  align?: DripTableCellDisplayControl['align'];
  /**
   * 表格列垂直对齐方式
   */
  verticalAlign?: DripTableCellDisplayControl['verticalAlign'];
  /**
   * 表头说明
   */
  description?: string;
  /**
   * 是否固定列
   */
  fixed?: 'left' | 'right' | boolean;
}

export interface DripTableDataColumnSchema extends DripTableBaseColumnSchema {
  /**
   * 列数据在数据项中对应的路径，支持通过数组查询嵌套路径
   */
  dataIndex: string | string[];
  /**
   * 数据预处理，对单元格数据进行变换
   */
  dataTranslation?: string;
  /**
   * 默认数据
   */
  defaultValue?: unknown;
  /**
   * 是否处于隐藏状态
   */
  hidden?: boolean | string;
  /**
   * 是否处于禁用状态
   */
  disable?: boolean | string;
  /**
   * 是否可通过点击进入编辑模式
   */
  editable?: boolean | string;
  /**
   * 用户可控制该列显示隐藏
   */
  hidable?: boolean;
  /**
   * 在当前布局下是否隐藏
   */
  hideInLayout?: boolean;
  /**
   * 数据排序设置
   */
  sorter?: string;
  /**
   * 数据排序支持的方式
   */
  sortDirections?: ('descend' | 'ascend')[];
  /**
   * 数据过滤器设置
   */
  filters?: {
    text: React.ReactNode;
    value: string | number | boolean;
  }[];
  /**
   * 数据过滤器最可多选数量
   */
  filtersMaxSelect?: number;
  /**
   * 默认数据过滤器值
   */
  defaultFilteredValue?: React.Key[] | null;
}

export interface DripTableColumnSchema<T = string, P extends Record<string, unknown> = Record<string, unknown>> extends DripTableDataColumnSchema {
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
}

export type ExtractDripTableColumnSchema<T, TKey extends string> = T extends DripTableColumnSchema<TKey, infer P>
  ? DripTableColumnSchema<T, P>
  : never;

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
   * 是否显示表头，注意：这是表格标题栏所在头部 (<thead>) 而不是 drip-table 自定义的头部
   */
  showHeader?: boolean;
  /**
   * 是否展示头部以及配置
   */
  header?: DripTableSlotSchema | boolean;
  /**
   * 是否展示尾部以及配置
   */
  footer?: DripTableSlotSchema;
  /**
   * 是否展示分页以及配置
   */
  pagination?: false | {
    size?: 'small' | 'default';
    pageSize: number;
    position?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
    showTotal?: boolean | string;
    total?: number;
    showLessItems?: boolean;
    showQuickJumper?: boolean;
    showSizeChanger?: boolean;
    pageSizeOptions?: string[] | number[];
    hideOnSinglePage?: boolean;
  };
  size?: 'small' | 'middle' | 'large' | 'default';
  /**
   * 冻结表头
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
  rowSelection?: boolean | {
    /**
     * 选择栏水平对齐方式
     */
    align: DripTableCellDisplayControl['align'];
    /**
     * 选择栏垂直对齐方式
     */
    verticalAlign: DripTableCellDisplayControl['verticalAlign'];
  };
  /**
   * 是否支持行拖拽
   */
  rowDraggable?: boolean;
  /**
   * 是否可通过点击进入编辑模式
   */
  editable?: boolean;
  /**
   * @deprecated 已废弃，平均列宽请使用 tableLayout="fixed"
   */
  ellipsis?: boolean;
  /**
   * 表格元素的 table-layout 属性，设为 fixed 表示内容不会影响列的布局。
   * auto: 表格及单元格的宽度取决于其包含的内容。
   * fixed: 表格和列的宽度通过表格的宽度来设置。
   * 注意：对于固定表头/列会使得表格布局为 fixed。
   */
  tableLayout?: 'auto' | 'fixed';
  /**
   * 是否开启虚拟滚动
   */
  virtual?: boolean;
  /**
   * 行高，用于虚拟滚动渲染
   */
  rowHeight?: number;
  /**
   * 是否配置间隔斑马纹
   */
  stripe?: boolean;
  /**
   * 虚拟列表滚动高度
   * @deprecated 请使用 scroll.y
   */
  scrollY?: number;
  /**
   * 列定义
   */
  columns: (CustomColumnSchema | DripTableBuiltInColumnSchema<CustomColumnSchema>)[];
  /**
   * 表格行主键
   */
  rowKey?: string;
  /**
   * 表格行插槽渲染模式的插槽ID所在字段的字段名
   */
  rowSlotKey?: string;
  /**
   * 行头部插槽
   */
  rowHeader?: DripTableSlotSchema;
  /**
   * 行尾部插槽
   */
  rowFooter?: DripTableSlotSchema;
  /**
   * 行列合并配置
   */
  span?: string
  | [
    rowIndex: number,
    columnIndex: number,
    rowSpan: number,
    columnSpan: number,
  ][]
  | {
    rectangles?: [
      rowIndex: number,
      columnIndex: number,
      rowSpan: number,
      columnSpan: number,
    ][];
    generator?: string;
  };
  /**
   * 空表展示文案富文本
   */
  emptyText?: string;
  /**
   * 子表设置项
   */
  subtable?: {
    /**
     * 父表获取子表数据源键名
     */
    dataSourceKey: SubtableDataSourceKey;
  } & DripTableSchema<CustomColumnSchema, SubtableDataSourceKey>;
  /**
   * 卡片布局配置 会对table布局进行覆盖
   */
  layout?: {
    card?: {
      /**
       * 会与覆盖最外层的columns并合并
       */
      columns: DripTableSchema<CustomColumnSchema, SubtableDataSourceKey>['columns'];
      /**
       * 一行多少个
       */
      rowSize: number;
    };
  };
  /**
   * 默认布局模式
   */
  defaultTableLayout?: 'table' | 'card';
  /**
   * 附加透传配置项
   */
  ext?: unknown;
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

export type ExtractDripTableExtraOption<ExtraOptions extends Partial<DripTableExtraOptions> | undefined, K extends keyof DripTableExtraOptions>
  = ExtraOptions extends Partial<DripTableExtraOptions> ? (ExtraOptions[K] extends never ? never : NonNullable<ExtraOptions[K]>) : never;

/**
 * 表格信息
 */
export interface DripTableTableInformation<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  /**
   * 表格全局唯一临时标识符
   */
  uuid: string;
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

/**
 * 单行事件
 */
export type DripTableRowEvent<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> = (
  record: RecordType,
  index: number,
  tableInfo: DripTableTableInformation<RecordType, ExtraOptions>,
) => void;

/**
 * 单行功能函数
 */
export type DripTableRowCallback<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
  RetType = void,
> = (
  record: RecordType,
  index: number,
  tableInfo: DripTableTableInformation<RecordType, ExtraOptions>,
) => RetType;

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

/**
 * 指定子表格的参数
 */
export interface DripTableSubtableProps<
RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  /**
   * 数据源总条数
   */
  total?: number;
  /**
   * 指定表是否默认展开所有子表
   */
  defaultExpandAllRows?: boolean;
  /**
   * 指定表默认展开子表键列表
   */
  defaultExpandedRowKeys?: React.Key[];
  /**
   * 行展开
   */
  onRowExpand?: DripTableRowEvent<RecordType, ExtraOptions>;
  /**
   * 行收起
   */
  onRowCollapse?: DripTableRowEvent<RecordType, ExtraOptions>;
}

/**
 * 表格组件属性
 */
export interface DripTableProps<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> extends DripTableSubtableProps<RecordType, ExtraOptions> {
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
  schema: DripTableSchema<ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>;
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
   * 当前页码
   */
  currentPage?: number;
  /**
   * 加载中
   */
  loading?: boolean;
  /**
   * 冻结表头和滚动条设置项
   */
  sticky?: {
    offsetHeader?: number;
    offsetScroll?: number;
    getContainer?: () => HTMLElement;
  };
  /**
   * 子表参数匹配设置，可用于覆盖父表参数透传
   */
  subtableProps?: {
    /**
     * 根据子表 id 进行匹配
     */
    subtableID?: DripTableID;
    /**
     * 根据子表所在行 KEY 匹配
     */
    recordKeys?: unknown[];
    /**
     * 默认兜底设置
     */
    default?: boolean;
    /**
     * 子表参数
     */
    properties: DripTableSubtableProps<RecordType, ExtraOptions>;
  }[];
  /**
   * 表格单元格组件库
   */
  components?: {
    [libName: string]: {
      [componentName: string]:
      React.JSXElementConstructor<
      DripTableComponentProps<
      RecordType,
      ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>,
      ExtractDripTableExtraOption<ExtraOptions, 'CustomComponentEvent'>,
      ExtractDripTableExtraOption<ExtraOptions, 'CustomComponentExtraData'>
      >
      > & { schema?: SchemaObject };
    };
  };
  /**
   * 组件插槽，可通过 Schema 控制自定义区域渲染
   */
  slots?: {
    [componentType: string]: React.JSXElementConstructor<{
      /**
       * 插槽唯一标识符
       */
      slotType: string;
      /**
       * 插槽自定义样式类名
       */
      className?: string;
      /**
       * 插槽自定义样式
       */
      style?: React.CSSProperties;
      /**
       * 来自 Schema 实例化配置的透传属性
       */
      data?: unknown;
      /**
       * 表格 Schema 对象
       */
      schema: DripTableSchema<ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>;
      /**
       * 表格自定义传入数据
       */
      ext: ExtraOptions['CustomComponentExtraData'];
      /**
       * 表格数据源
       */
      dataSource: readonly RecordType[];
      /**
       * 插槽所在列下标
       */
      columnIndex?: number;
      /**
       * 插槽所在行数据
       */
      record?: RecordType;
      /**
       * 插槽所在行下标
       */
      recordIndex?: number;
      /**
       * 插槽子元素
       */
      children?: React.ReactNode;
      /**
       * 表格搜索触发器
       */
      onSearch: (searchParams: Record<string, unknown>) => void;
      /**
       * 自定义事件触发器
       */
      fireEvent: (event: ExtractDripTableExtraOption<ExtraOptions, 'CustomComponentEvent'> | DripTableBuiltInComponentEvent) => void;
    }>;
  };
  /**
   * 图标库
   */
  icons?: {
    [iconName: string]: React.JSXElementConstructor<React.PropsWithChildren<unknown>>;
  };
  /**
   * Schema 校验配置项
   */
  ajv?: AjvOptions | false;
  /**
   * 自定义组件附加透传数据
   */
  ext?: ExtractDripTableExtraOption<ExtraOptions, 'CustomComponentExtraData'>;
  /**
   * 顶部自定义渲染函数
   */
  title?: (data: readonly RecordType[]) => React.ReactNode;
  /**
   * 底部自定义渲染函数
   */
  footer?: (data: readonly RecordType[]) => React.ReactNode;
  /**
   * 底部自定义渲染函数
   */
  emptyText?: (tableInfo: DripTableTableInformation<RecordType, ExtraOptions>) => React.ReactNode;
  /**
   * 子表顶部自定义渲染函数
   */
  subtableTitle?: DripTableRowCallback<RecordType, ExtraOptions, React.ReactNode>;
  /**
   * 子表底部自定义渲染函数
   */
  subtableFooter?: DripTableRowCallback<RecordType, ExtraOptions, React.ReactNode>;
  /**
   * 获取指定行是否可展开
   */
  rowExpandable?: DripTableRowCallback<RecordType, ExtraOptions, boolean>;
  /**
   * 行头部插槽是否显示
   */
  rowHeaderVisible?: DripTableRowCallback<RecordType, ExtraOptions, boolean>;
  /**
   * 行尾部插槽是否显示
   */
  rowFooterVisible?: DripTableRowCallback<RecordType, ExtraOptions, boolean>;
  /**
   * 行展开自定义渲染函数
   */
  expandedRowRender?: DripTableRowCallback<RecordType, ExtraOptions, React.ReactNode>;
  /**
   * 获取指定行是否可选择
   */
  rowSelectable?: DripTableRowCallback<RecordType, ExtraOptions, boolean>;
  /**
   * 生命周期：组件加载完成
   */
  componentDidMount?: (tableInfo: DripTableTableInformation<RecordType, ExtraOptions>) => void;
  /**
   * 生命周期：组件更新完成
   */
  componentDidUpdate?: (tableInfo: DripTableTableInformation<RecordType, ExtraOptions>) => void;
  /**
   * 生命周期：组件即将卸载
   */
  componentWillUnmount?: (tableInfo: DripTableTableInformation<RecordType, ExtraOptions>) => void;
  /**
   * 点击行
   */
  onRowClick?: DripTableRowEvent<RecordType, ExtraOptions>;
  /**
   * 双击行
   */
  onRowDoubleClick?: DripTableRowEvent<RecordType, ExtraOptions>;
  /**
   * 选择行变化
   */
  onSelectionChange?: (
    selectedKeys: React.Key[],
    selectedRows: RecordType[],
    tableInfo: DripTableTableInformation<RecordType, ExtraOptions>,
  ) => void;
  /**
   * 搜索触发
   */
  onSearch?: (
    searchParams: { searchKey?: number | string; searchStr: string } | Record<string, unknown>,
    tableInfo: DripTableTableInformation<RecordType, ExtraOptions>,
  ) => void;
  /**
   * 点击添加按钮触发
   */
  onInsertButtonClick?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    tableInfo: DripTableTableInformation<RecordType, ExtraOptions>,
  ) => void;
  /**
   * 过滤器触发
   */
  onFilterChange?: (
    filters: DripTableFilters,
    tableInfo: DripTableTableInformation<RecordType, ExtraOptions>,
  ) => void;
  /**
   * 页码/页大小变化
   */
  onPageChange?: (
    currentPage: number,
    pageSize: number,
    tableInfo: DripTableTableInformation<RecordType, ExtraOptions>,
  ) => void;
  /**
   * 过滤器、分页器 等配置变化
   */
  onChange?: (
    options: {
      pagination: DripTablePagination;
      filters: DripTableFilters;
    },
    tableInfo: DripTableTableInformation<RecordType, ExtraOptions>,
  ) => void;
  /**
   * 数据源编辑变化事件
   */
  onDataSourceChange?: (
    dataSource: RecordType[],
    tableInfo: DripTableTableInformation<RecordType, ExtraOptions>,
  ) => void;
  /**
   * 用户修改展示的列时
   */
  onDisplayColumnKeysChange?: (
    displayColumnKeys: React.Key[],
    tableInfo: DripTableTableInformation<RecordType, ExtraOptions>,
  ) => void;
  /**
   * 通用事件机制
   */
  onEvent?: (
    event: (DripTableBuiltInComponentEvent | ExtractDripTableExtraOption<ExtraOptions, 'CustomComponentEvent'>) & {
      record?: RecordType;
      recordIndex?: number;
      columnIndex?: number;
    },
    tableInfo: DripTableTableInformation<RecordType, ExtraOptions>,
  ) => void;
  /**
   * 渲染子表时用于透传父级信息，仅限内部使用
   * @internal
   */
  __PARENT_INFO__?: DripTableTableInformation<RecordType, ExtraOptions>;
}

export type EventLike<T = { type: string }> = T extends { type: string } ? T : never;
export interface DripTableCustomEvent<TN> extends EventLike<{ type: 'custom' }> { name: TN }
