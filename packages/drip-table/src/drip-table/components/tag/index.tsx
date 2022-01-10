/**
 * This file is part of the drip-table project.
 * @link     : https://ace.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import React from 'react';

import { DripTableRecordTypeBase } from '@/types';
import { indexValue } from '@/drip-table/utils';

import { DripTableComponentProps, DripTableComponentSchema } from '../component';

export interface DTCTagSchema extends DripTableComponentSchema {
  'ui:type': 'tag';
  /** 字体颜色 */
  color?: string;
  /** 边框颜色 */
  borderColor?: string;
  /** 背景色 */
  backgroundColor?: string;
  /** 圆角半径 */
  radius?: number;
  /** 前缀 */
  prefix?: string;
  /** 后缀 */
  suffix?: string;
  /** 静态文案 */
  content?: string;
  /** 枚举 */
  tagOptions?: { label: string; value: string | number }[];
}

interface DTCTagProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, DTCTagSchema> { }

interface DTCTagState { }

export default class DTCTag<RecordType extends DripTableRecordTypeBase> extends React.PureComponent<DTCTagProps<RecordType>, DTCTagState> {
  private get value() {
    const schema = this.props.schema;
    const dataIndex = schema.dataIndex;
    return indexValue(this.props.data, dataIndex, '');
  }

  public render() {
    const Tag = this.props.driver.components.Tag;
    const schema = this.props.schema;
    const value = this.value;
    return (
      <div>
        { schema.prefix || '' }
        <Tag
          color={schema.color}
          style={{
            color: schema.color,
            borderColor: schema.borderColor,
            backgroundColor: schema.backgroundColor,
            borderRadius: schema.radius,
          }}
        >
          { schema.content || schema.tagOptions?.find(item => item.value === value)?.label || value }
        </Tag>
        { schema.suffix || '' }
      </div>
    );
  }
}
