import { CSSProperties } from 'react';
import { DataSchema, DripTableSchema, EventLike, DripTableProps, DripTableDriver, DripTableRecordTypeBase } from 'drip-table';
import { DripTableGeneratorState } from './store';

/** 组件属性的表单配置项 */
export type DTGComponentPropertySchema = DataSchema & {
  $id?: string;
  name: string;
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
  '$id': string;
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
  icon?: string;
}

export interface DripTableGeneratorHandler extends DripTableGeneratorState {
  /**
   * 通过接口获取配置
   *
   * @returns { DripTableSchema } 返回DripTableSchema配置
   */
  getSchemaValue: () => DripTableSchema;

  /**
   * 通过接口获取预览用表格数据
   *
   * @returns {Record<string, unknown>[]} 返回预览用表格数据
   */
  getDataSource: () => Record<string, unknown>[];
}

export interface DripTableGeneratorProps<CustomComponentEvent extends EventLike = never, Ext = unknown> {
  style?: CSSProperties;
  driver: DripTableDriver<DripTableRecordTypeBase>;
  showComponentLayout?: boolean;
  componentLayoutStyle?: CSSProperties;
  rightLayoutStyle?: CSSProperties;
  showToolLayout?: boolean;
  /** generator无需关心DataSource数据类型是什么，唯一做的是直接传递给drip-table */
  dataSource: DripTableRecordTypeBase[];
  dataFields?: string[];
  schema?: DripTableSchema;
  customComponents?: DripTableProps<DripTableRecordTypeBase, CustomComponentEvent, Ext>['components'];
  customComponentPanel?: {
    mode: 'add' | 'replace';
    components: DripTableComponentAttrConfig[];
  };
  customGlobalConfigPanel?: DTGComponentPropertySchema[];
  onExportSchema?: (schema: DripTableSchema) => void;
}
