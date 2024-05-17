/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import './index.less';

import classNames from 'classnames';
import React from 'react';

import { DripTableColumnSchema, DripTableRecordTypeBase, SchemaObject } from '@/types';

import { DripTableComponentProps } from '../component';

const prefixCls = 'jfe-drip-table-cc-status';

interface DTCStatusColumnSchemaOptions extends Record<string, unknown> {
  /**
   * 组件类名
   */
  className?: string;
  /**
   * 状态颜色
   */
  color?: string;
  /**
   * 状态前导圆圈大小
   */
  dotSize?: number;
  /**
   * 不同状态的属性
   */
  statuses?: (Omit<DTCStatusColumnSchemaOptions, 'statuses'> & {
    /**
     * 匹配的状态值
     */
    value?: unknown;
    /**
     * 展示文案
     */
    text?: string;
  })[];
}

export type DTCStatusColumnSchema = DripTableColumnSchema<'status', DTCStatusColumnSchemaOptions>;

interface DTCStatusProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, DTCStatusColumnSchema> { }

interface DTCStatusState {}

export default class DTCStatus<RecordType extends DripTableRecordTypeBase> extends React.PureComponent<DTCStatusProps<RecordType>, DTCStatusState> {
  public static componentName: DTCStatusColumnSchema['component'] = 'status';
  public static schema: SchemaObject = {
    type: 'object',
    properties: {
      className: { type: 'string' },
      color: { type: 'string' },
      dotSize: { type: 'number' },
      statuses: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            value: {},
            text: { type: 'string' },
            className: { type: 'string' },
            color: { type: 'string' },
            dotSize: { type: 'number' },
          },
        },
      },
    },
  };

  public state: DTCStatusState = {};

  private get statusOptions() {
    return this.props.schema.options.statuses?.find(s => s.value === this.props.value)
      || this.props.schema.options;
  }

  private getOptionsValue<K extends keyof DTCStatusColumnSchemaOptions>(k: K): DTCStatusColumnSchemaOptions[K] {
    return this.statusOptions[k] ?? this.props.schema.options[k];
  }

  private get dotSize() {
    const dotSize = this.getOptionsValue('dotSize');
    if (typeof dotSize === 'number') {
      return `${dotSize}px`;
    }
    return dotSize;
  }

  public render(): JSX.Element {
    return (
      <div className={classNames(`${prefixCls}-main`, this.getOptionsValue('className'))} style={{ color: this.getOptionsValue('color') }}>
        <div className={`${prefixCls}-dot`}>
          <div
            className={`${prefixCls}-dot-inner`}
            style={{
              width: this.dotSize,
              height: this.dotSize,
              backgroundColor: this.getOptionsValue('color'),
            }}
          />
        </div>
        <div className={`${prefixCls}-text`}>
          { this.getOptionsValue('text') ?? this.props.value }
        </div>
      </div>
    );
  }
}
