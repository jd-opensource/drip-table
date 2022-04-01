import type { AjvOptions } from 'drip-table';
import { DripTableColumnSchema, DripTableDriver, DripTableExtraOptions, DripTableID, DripTableProps, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, DripTableSchema } from 'drip-table';
import { CSSProperties } from 'react';

import { DripTableGeneratorState } from './store';

export interface StringDataSchema {
  type: 'string';
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  default?: string;
  enumValue?: string[];
  enumLabel?: string[];
  transform?: ('trim' | 'toUpperCase' | 'toLowerCase')[];
}

export interface NumberDataSchema {
  type: 'number' | 'integer';
  minimum?: number;
  exclusiveMinimum?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  default?: number;
  enumValue?: number[];
  enumLabel?: string[];
}

export interface BooleanDataSchema {
  type: 'boolean';
  default?: boolean;
  checkedValue?: string | number;
  uncheckedValue?: string | number;
}

export interface NullDataSchema {
  type: 'null';
  default?: undefined | null;
}

export interface ObjectDataSchema {
  type: 'object';
  default?: Record<string, unknown>;
  properties?: {
    [key: string]: DataSchema;
  };
}

export interface ArrayDataSchema {
  type: 'array';
  items?: DataSchema | DataSchema[];
  default?: unknown[];
}

export type DataSchema =
  | StringDataSchema
  | NumberDataSchema
  | BooleanDataSchema
  | ObjectDataSchema
  | NullDataSchema
  | ArrayDataSchema;

/** 组件属性的表单配置项 */
export type DTGComponentPropertySchema = DataSchema & {
  name: string;
  group: string;
  required?: boolean;
  'ui:layout'?: {
    labelCol: number;
    wrapperCol: number;
    extraRow?: boolean;
    customHelpMsg?: boolean;
  };
  'ui:title': string;
  'ui:description'?: {
    type: 'icon' | 'text';
    trigger: 'click' | 'hover';
    title: string;
  };
  'ui:titleStyle'?: CSSProperties;
  'ui:type': string;
  'ui:props'?: Record<string, unknown> & { style?: CSSProperties; className?: string };
  'ui:wrapperStyle'?: CSSProperties;
  default?: unknown;
  disabled?: boolean | string | ((value?: unknown, formData?: Record<string, unknown>) => boolean);
  visible?: boolean | string | ((value?: unknown, formData?: Record<string, unknown>) => boolean);
  validate?: (value?: unknown, formData?: Record<string, unknown>) => string | Promise<string> | string;
}

/** 组件配置项 */
export interface DripTableComponentAttrConfig {
  /** 组件类型 */
  'ui:type': string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'integer' | 'null' | 'array';
  fieldKey?: string;
  /** 模板名称 | 表头名称 */
  title: string;
  /** 组件所属分组 */
  group: string;
  dataIndex?: (string | number)[];
  /** 属性表单配置 - 用于生成column的表单 */
  attrSchema: DTGComponentPropertySchema[];
  /** 展示用icon */
  icon?: React.ReactSVG | string;
}

export interface DripTableGeneratorHandler extends DripTableGeneratorState {
  /**
   * 通过接口获取配置
   *
   * @returns { DripTableSchema } 返回DripTableSchema配置
   */
  getSchemaValue: () => DripTableSchema<DripTableColumnSchema>;

  /**
   * 通过接口获取预览用表格数据
   *
   * @returns {Record<string, unknown>[]} 返回预览用表格数据
   */
  getDataSource: () => Record<string, unknown>[];
}

export interface DripTableGeneratorProps<
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
> {
  style?: CSSProperties;
  driver: DripTableDriver;
  showComponentLayout?: boolean;
  componentLayoutStyle?: CSSProperties;
  rightLayoutStyle?: CSSProperties;
  showToolLayout?: boolean;
  /** generator无需关心DataSource数据类型是什么，唯一做的是直接传递给drip-table */
  dataSource?: DripTableRecordTypeWithSubtable<RecordType, ExtraOptions['SubtableDataSourceKey']>[];
  dataFields?: string[];
  mockDataSource?: boolean;
  schema?: DripTableSchema<ExtraOptions['CustomColumnSchema']>;
  customComponents?: DripTableProps<DripTableRecordTypeWithSubtable<RecordType, ExtraOptions['SubtableDataSourceKey']>, {
    CustomColumnSchema: ExtraOptions['CustomColumnSchema'];
    CustomComponentEvent: ExtraOptions['CustomComponentEvent'];
    CustomComponentExtraData: ExtraOptions['CustomComponentExtraData'];
  }>['components'];
  customComponentPanel?: {
    mode: 'add' | 'replace';
    components: DripTableComponentAttrConfig[];
  };
  customGlobalConfigPanel?: {
    mode: 'add' | 'replace';
    configs: DTGComponentPropertySchema[];
  };
  /**
   * 组件插槽，可通过 Schema 控制自定义区域渲染
   */
  slots?: {
    [componentType: string]: React.JSXElementConstructor<{
      style?: React.CSSProperties;
      className?: string;
      slotType: string;
      driver: DripTableDriver;
      schema: DripTableSchema<NonNullable<ExtraOptions['CustomColumnSchema']>, NonNullable<ExtraOptions['SubtableDataSourceKey']>>;
      dataSource: readonly RecordType[];
      onSearch: (searchParams: Record<string, unknown>) => void;
    }>;
  };
  /**
   * Schema 校验配置项
   */
  ajv?: AjvOptions | false;
  /**
   * 自定义组件附加透传数据
   */
  ext?: NonNullable<ExtraOptions['CustomComponentExtraData']>;
  /**
   * 顶部自定义渲染函数
   */
  title?: (data: readonly RecordType[]) => React.ReactNode;
  /**
   * 底部自定义渲染函数
   */
  footer?: (data: readonly RecordType[]) => React.ReactNode;
  /**
   * 子表顶部自定义渲染函数
   */
  subtableTitle?: (
    record: RecordType,
    recordIndex: number,
    parentTable: {
      id: DripTableID;
      dataSource: readonly RecordType[];
    },
    subtable: {
      id: DripTableID;
      dataSource: readonly RecordType[];
    },
  ) => React.ReactNode;
  /**
   * 子表底部自定义渲染函数
   */
  subtableFooter?: (
    record: RecordType,
    recordIndex: number,
    parentTable: {
      id: DripTableID;
      dataSource: readonly RecordType[];
    },
    subtable: {
      id: DripTableID;
      dataSource: readonly RecordType[];
    },
  ) => React.ReactNode;
  /**
   * 获取指定行是否可展开
   */
  rowExpandable?: (
    record: RecordType,
    parentTable: {
      id: DripTableID;
      dataSource: readonly RecordType[];
    },
  ) => boolean;
  /**
   * 行展开自定义渲染函数
   */
  expandedRowRender?: (
    record: RecordType,
    index: number,
    parentTable: {
      id: DripTableID;
      dataSource: readonly RecordType[];
    },
  ) => React.ReactNode;
  onExportSchema?: (schema: DripTableSchema<ExtraOptions['CustomColumnSchema']>) => void;
}
