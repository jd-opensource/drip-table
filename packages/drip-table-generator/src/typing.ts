import { DripTableColumnSchema, DripTableDriver, DripTableExtraOptions, DripTableProps, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, DripTableSchema } from 'drip-table';
import React, { CSSProperties, ReactNode } from 'react';

import { CustomComponentProps } from './components/CustomForm/components';
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
  'ui:externalComponent'?: new <P extends CustomComponentProps>(props: P) => React.PureComponent<P>;
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

export interface DripTableGeneratorPanel<T> {
  mode: 'add' | 'replace';
  configs: T[];
  orders?: string[];
}

type DripTableExtraProps<
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
> = Omit<DripTableProps<DripTableRecordTypeWithSubtable<RecordType, ExtraOptions['SubtableDataSourceKey']>, ExtraOptions>, 'dataSource' | 'schema' | 'driver' | 'components' | 'total'>;

export interface DripTableGeneratorProps<
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
> extends DripTableExtraProps<RecordType, ExtraOptions> {
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
  noDataFeedBack?: string | ReactNode;
  schema?: DripTableSchema<ExtraOptions['CustomColumnSchema']>;
  customComponents?: DripTableProps<DripTableRecordTypeWithSubtable<RecordType, ExtraOptions['SubtableDataSourceKey']>, {
    CustomColumnSchema: ExtraOptions['CustomColumnSchema'];
    CustomComponentEvent: ExtraOptions['CustomComponentEvent'];
    CustomComponentExtraData: ExtraOptions['CustomComponentExtraData'];
  }>['components'];
  customComponentPanel?: DripTableGeneratorPanel<DripTableComponentAttrConfig>;
  customGlobalConfigPanel?: DripTableGeneratorPanel<DTGComponentPropertySchema>;
  customAttributeComponents?: Record<string, new <P extends CustomComponentProps>(props: P) => React.PureComponent<P>>;
  slotsSchema?: {
    [componentType: string]: DTGComponentPropertySchema[];
  };
  onExportSchema?: (schema: DripTableSchema<ExtraOptions['CustomColumnSchema']>) => void;
}
