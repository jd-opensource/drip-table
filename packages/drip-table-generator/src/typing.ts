import { DripTableColumnSchema, DripTableExtraOptions, DripTableProps, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, DripTableSchema } from 'drip-table';
import React, { CSSProperties, ReactNode } from 'react';

import { CustomComponentProps } from './components/CustomForm/components';
import { DripTableGeneratorTemplate } from './layouts/toolbar/templates';

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
/**
 * 组件属性的表单配置项
 */
export type DTGComponentPropertySchema<
ComponentType = string,
ComponentProps extends DTGAttributeComponentProps = DTGAttributeComponentProps,
> = DataSchema & {
  name: string;
  group: string;
  subGroup?: string;
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

/**
 * 组件配置项
 */
export interface DripTableComponentAttrConfig {
  /**
   * 组件类型
   */
  'ui:type': string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'integer' | 'null' | 'array';
  fieldKey?: string;
  /**
   * 模板名称 | 表头名称
   */
  title: string;
  /**
   * 组件所属分组
   */
  group: string;
  dataIndex?: (string | number)[];
  /**
   * 属性表单配置 - 用于生成column的表单
   */
  attrSchema: DTGComponentPropertySchema[];
  /**
   * 展示用icon
   */
  icon?: React.ReactSVG | string;
}

export interface DripTableGeneratorPanel<T> {
  mode: 'add' | 'replace';
  configs: T[];
  orders?: string[];
}

export interface DTGCustomThemeOptions<
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  /**
   * 主题选项中文名
   */
  label: string | React.ReactNode;
  /**
   * 主题选项英文名，也是主题的唯一键值
   */
  value: string;
  /**
   * 主题缩略图
   */
  image: string;
  /**
   * drip-table 的 schema 配置: 全局配置以及全局样式
   */
  style: NonColumnsPartialDTSchemaTypeAbbr<ExtraOptions> | ((schema: NonColumnsPartialDTSchemaTypeAbbr<ExtraOptions>) => NonColumnsPartialDTSchemaTypeAbbr<ExtraOptions>);
  /**
   * drip-table 的 schema 配置: 设置列的样式
   */
  columnStyle?: (column: DripTableSchema<NonNullable<ExtraOptions['CustomColumnSchema']>>['columns'][number], index: number) => Partial<DripTableSchema<NonNullable<ExtraOptions['CustomColumnSchema']>>['columns'][number]>;
  /**
   * 子表格自定义主题配置
   * id 对应的是子表格ID
   */
  subtable?: Omit<DTGCustomThemeOptions<RecordType, ExtraOptions>, 'label' | 'value' | 'image'> & { id: string };
}

export type NonColumnsPartialDTSchemaTypeAbbr<ExtraOptions extends Partial<DripTableExtraOptions> = never> = Partial<Omit<DripTableSchema<NonNullable<ExtraOptions['CustomColumnSchema']>>, 'columns'>>

export type DataSourceTypeAbbr<SubtableDataSourceKey extends React.Key> = DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, SubtableDataSourceKey>;
export interface DripTableGeneratorProps<
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> extends DripTableProps<RecordType, ExtraOptions> {
  /**
   * 全局样式
   */
  style?: CSSProperties;
  /**
   * @deprecated 已废弃
   * 展示组件栏
   */
  showComponentLayout?: boolean;
  /**
   * @deprecated 已废弃
   * 组件栏自定义样式
   */
  componentLayoutStyle?: CSSProperties;
  /**
   * @deprecated 已废弃
   * 右侧属性栏展示形式
   */
  rightLayoutMode?: 'drawer' | 'fixed';
  /**
   * @deprecated 已废弃
   * 右侧属性栏自定义样式
   */
  rightLayoutStyle?: CSSProperties;
  /**
   * @deprecated 已废弃
   * 展示工具栏
   */
  showToolLayout?: boolean;
  /**
   * @deprecated 已废弃
   * 工具栏样式
   */
  toolbarStyle?: CSSProperties;
  /**
   * @deprecated 已废弃
   * 默认主题
   */
  defaultTheme?: string;
  /**
   * @deprecated 已废弃
   * 自定义主题选项
   */
  customThemeOptions?: DTGCustomThemeOptions<RecordType, ExtraOptions>[];
  /**
   * @deprecated 已废弃
   * 默认打开编辑模式还是预览模式
   */
  defaultMode?: 'edit' | 'preview';
  /**
   * 模式：modal-弹出框；page-页面模式, 默认页面模式
   */
  mode?: 'modal' | 'page';
  width?: number;
  height?: number;
  /**
   * 是否展示 模板 按钮
   */
  showTemplate?: boolean;
  /**
   * 自定义模板，可传入多个，如果key一样的话，后面的会替代前面的
   */
  customTemplates?: DripTableGeneratorTemplate[];
  /**
   * 是否展示 保存 按钮
   */
  save?: boolean;
  dataFields?: string[];
  mockDataSource?: boolean;
  noDataFeedBack?: string | ReactNode;
  customComponents: DripTableProps<RecordType, ExtraOptions>['components'];
  customComponentPanel?: DripTableGeneratorPanel<DripTableComponentAttrConfig>;
  customGlobalConfigPanel?: DripTableGeneratorPanel<DTGComponentPropertySchema>;
  customAttributeComponents?: Record<string, new <P extends CustomComponentProps>(props: P) => React.PureComponent<P>>;
  slotsSchema?: {
    [componentType: string]: DTGComponentPropertySchema[];
  };
  onExportSchema?: (schema: DripTableSchema<DripTableColumnSchema>) => void;
  onSchemaChange?: (schema: DripTableSchema<DripTableColumnSchema>) => void;
  onDataSourceChange?: (dataSource: DripTableProps<RecordType, ExtraOptions>['dataSource']) => void;
  onClose?: () => void;
  onSave?: (schema: DripTableSchema<DripTableColumnSchema>) => void;
}
