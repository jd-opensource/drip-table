import { DripTableDriver, DripTableExtraOptions, DripTableProps, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, DripTableSchema } from 'drip-table';
import React, { CSSProperties, ReactNode } from 'react';

import { CustomComponentProps } from './components/CustomForm/components';

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

export type DTGAttributeComponentProps = Record<string, unknown> & { style?: CSSProperties; className?: string };
/** 组件属性的表单配置项 */
export type DTGComponentPropertySchema<
ComponentType = string,
ComponentProps extends DTGAttributeComponentProps = DTGAttributeComponentProps,
> = DataSchema & {
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
  'ui:type': ComponentType;
  'ui:props'?: ComponentProps;
  'ui:wrapperStyle'?: CSSProperties;
  'ui:externalComponent'?: new <P extends CustomComponentProps>(props: P) => React.PureComponent<P>;
  default?: unknown;
  disabled?: boolean | string | ((value?: unknown, formData?: Record<string, unknown>) => boolean);
  visible?: boolean | string | ((value?: unknown, formData?: Record<string, unknown>, index?: number, parentIndex?: number) => boolean);
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
  /** 全局样式 */
  style?: CSSProperties;
  /** 样式主题驱动, 展示组件以及透传给 drip-table 用 */
  driver: DripTableDriver;
  /** 展示组件栏 */
  showComponentLayout?: boolean;
  /** 组件栏自定义样式 */
  componentLayoutStyle?: CSSProperties;
  /** 右侧属性栏展示形式 */
  rightLayoutMode?: 'drawer' | 'fixed';
  /** 右侧属性栏自定义样式 */
  rightLayoutStyle?: CSSProperties;
  /** 展示工具栏 */
  showToolLayout?: boolean;
  /** 工具栏样式 */
  toolbarStyle?: CSSProperties;
  /** 默认主题 */
  defaultTheme?: string;
  customThemeOptions?: {
    /** 主题选项中文名 */
    label: string | React.ReactNode;
    /** 主题选项英文名，也是主题的唯一键值 */
    value: string;
    /** drip-table 的 schema 配置，但不允许配置 columns */
    style: Partial<Omit<DripTableSchema<ExtraOptions['CustomColumnSchema']>, 'columns'>>;
    /** 主题缩略图 */
    image: string;
  }[];
  /** 默认打开编辑模式还是预览模式 */
  defaultMode?: 'edit' | 'preview';
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
  onSchemaChange?: (schema: DripTableSchema<ExtraOptions['CustomColumnSchema']>) => void;
}
