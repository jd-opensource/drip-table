/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import { DripTableDriver, DripTableRecordTypeBase, EventLike } from '@/types';

import { DripTableBuiltInComponentEvent } from '.';

export interface DripTableComponentSchema {
  /**
   * 唯一标识，不做展示用，React 需要的 key。
   */
  key: string;
  /**
   * 组件类型
   */
  type: string;
  /**
   * 表头，组件名
   */
  title: string;
  /**
   * 表格列宽
   */
  width?: string | number;
  /**
   * 表格列对齐
   */
  align?: 'left' | 'center' | 'right';
  /**
   * 列数据在数据项中对应的路径，支持通过数组查询嵌套路径
   */
  dataIndex: string | string[];
  default?: string;
  /**
   * 表头说明
   */
  description?: string;
  /**
   * 是否固定列
   */
  fixed?: boolean;
  /**
   * 用户可控制该列显示隐藏
   */
  hidable?: boolean;
  /**
   * 数据过滤器设置
   */
  filter?: {
    text: React.ReactNode;
    value: string | number | boolean;
  }[];
  /**
   * 默认数据过滤器值
   */
  defaultFilteredValue?: React.Key[] | null;
}

export interface DripTableComponentProps<
  RecordType extends DripTableRecordTypeBase,
  Schema extends DripTableComponentSchema = DripTableComponentSchema,
  ComponentEvent extends EventLike = never,
  Ext = unknown,
> {
  /**
   * 底层渲染驱动
   */
  driver: DripTableDriver<RecordType>;
  /**
   * 当前渲染列参数
   */
  schema: Schema;
  /**
   * 当前渲染行数据结构 `list[i]`
   */
  data: RecordType;
  /**
   * 当前渲染单元格数据 `data[schema.dataIndex]`
   */
  value: unknown;
  /**
   * 额外透传数据
   */
  ext?: Ext;
  /**
   * 是否处于预览模式（不响应事件）
   */
  preview?: boolean | {
    /**
     * 自定义列渲染函数
     */
    columnRenderer?: (columnSchema: Schema, columnElement: JSX.Element) => JSX.Element;
  };
  onClick?: (name: string) => void;
  /**
   * 自定义事件触发器
   */
  fireEvent: (event: ComponentEvent | DripTableBuiltInComponentEvent) => void;
}
