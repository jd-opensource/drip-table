/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import React from 'react';

import { DripTableColumnSchema, DripTableRecordTypeBase, SchemaObject } from '@/types';
import Tag from '@/components/react-components/tag';
import Tooltip from '@/components/react-components/tooltip';

import { DripTableComponentProps } from '../component';

export type DTCTagColumnSchema = DripTableColumnSchema<'tag', {
  /**
   * 字体颜色
   */
  color?: string | 'success' | 'processing' | 'error' | 'default' | 'warning';
  /**
   * 边框颜色
   */
  borderColor?: string;
  /**
   * 背景色
   */
  backgroundColor?: string;
  /**
   * 圆角半径
   */
  radius?: number;
  /**
   * 前缀
   */
  prefix?: string;
  /**
   * 后缀
   */
  suffix?: string;
  /**
   * 静态文案
   */
  content?: string;
  /**
   * 枚举
   */
  tagOptions?: {
    label: string;
    value: string | number;
    color?: string;
    borderColor?: string;
    backgroundColor?: string;
  }[];
  /**
   * 最大显示数量
   */
  maxDisplay?: number;
}>;

interface DTCTagProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, DTCTagColumnSchema> { }

interface DTCTagState { }

export default class DTCTag<RecordType extends DripTableRecordTypeBase> extends React.PureComponent<DTCTagProps<RecordType>, DTCTagState> {
  public static componentName: DTCTagColumnSchema['component'] = 'tag';
  public static schema: SchemaObject = {
    type: 'object',
    properties: {
      color: { type: 'string' },
      borderColor: { type: 'string' },
      backgroundColor: { type: 'string' },
      radius: { type: 'number' },
      prefix: { type: 'string' },
      suffix: { type: 'string' },
      content: { type: 'string' },
      tagOptions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            label: { type: 'string' },
            value: { typeof: ['string', 'number'] },
            color: { type: 'string' },
            borderColor: { type: 'string' },
            backgroundColor: { type: 'string' },
          },
          required: ['label', 'value'],
        },
      },
      maxDisplay: { type: 'number' },
    },
  };

  private get value() {
    return this.props.value;
  }

  private renderTag(value: unknown) {
    const options = this.props.schema.options;
    const tagOption = options.tagOptions?.find(item => item.value === value);
    return (
      <Tag
        color={tagOption ? tagOption.color : options.color}
        style={{
          color: tagOption ? tagOption.color : options.color,
          borderColor: tagOption ? tagOption.borderColor : options.borderColor,
          backgroundColor: tagOption ? tagOption.backgroundColor : options.backgroundColor,
          borderRadius: options.radius,
        }}
      >
        { options.content || tagOption?.label || String(value ?? '') }
      </Tag>
    );
  }

  public render() {
    const options = this.props.schema.options;
    const values = Array.isArray(this.value) ? this.value : [this.value];
    const maxDisplay = options.maxDisplay ?? 0;
    const displayValues = maxDisplay >= 0 ? values.filter((_, i) => i < maxDisplay) : values;
    const collapseValues = maxDisplay >= 0 ? values.filter((_, i) => i >= maxDisplay) : values;
    return (
      <div>
        { options.prefix || '' }
        { displayValues.map(v => this.renderTag(v)) }
        {
          collapseValues.length > 0
            ? (
              <Tooltip
                title={(
                  <div>
                    { collapseValues.map(v => this.renderTag(v)) }
                  </div>
                )}
              >
                <div style={{ display: 'inline-block' }}>
                  <Tag
                    color={options.color}
                    style={{
                      color: options.color,
                      borderColor: options.borderColor,
                      backgroundColor: options.backgroundColor,
                      borderRadius: options.radius,
                    }}
                  >
                    { `+${collapseValues.length}` }
                  </Tag>
                </div>
              </Tooltip>
            )
            : null
        }
        { options.suffix || '' }
      </div>
    );
  }
}
