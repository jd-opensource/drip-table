/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Estherjing(qichudegensui@163.com)
 * @modifier : Estherjing(qichudegensui@163.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */
import React from 'react';

import { DripTableColumnSchema, DripTableRecordTypeBase, SchemaObject } from '@/types';
import InputNumber from '@/components/input-number';

import { DripTableComponentProps } from '../component';

export type DTCInputNumberColumnSchema = DripTableColumnSchema<'input-number', {
  step?: number | string;
  min?: number;
  max?: number;
  style?: React.CSSProperties;
  /** 展示边框，默认为 true */
  bordered?: boolean;
  /** 暗纹提示 */
  placeholder?: string;
  defaultValue?: number;
  disabled?: boolean;
  /**
   * 是否编辑态
   */
  isEdit?: boolean;
  /** 输入框大小 */
  size?: 'large' | 'middle' | 'small';
}>;

interface DTCInputNumberState {
}

interface DTCInputNumberProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, DTCInputNumberColumnSchema> { }

export default class DTCInputNumber<RecordType extends DripTableRecordTypeBase> extends React.PureComponent<DTCInputNumberProps<RecordType>, DTCInputNumberState> {
  public static componentName: DTCInputNumberColumnSchema['component'] = 'input-number';
  public static schema: SchemaObject = {
    type: 'object',
    properties: {
      step: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      min: { type: 'number' },
      max: { type: 'number' },
      style: { type: 'object' },
      bordered: { type: 'boolean' },
      placeholder: { type: 'string' },
      defaultValue: { type: 'string' },
      disabled: { type: 'boolean' },
      isEdit: { type: 'boolean' },
      size: { enum: ['large', 'middle', 'small'] },
    },
  };

  private get value() {
    const value = Number(this.props.value);
    if (value || value === 0) {
      return value;
    }
    return void 0;
  }

  private get isEdit() {
    const { isEdit = true } = this.props.schema.options;
    return isEdit || false;
  }

  public render() {
    const options = this.props.schema.options;
    if (this.props.preview || !this.isEdit) {
      return <span>{ this.value }</span>;
    }
    return (
      <InputNumber
        min={options.min}
        max={options.max}
        step={options.step}
        style={options.style}
        bordered={options.bordered}
        placeholder={options.placeholder}
        defaultValue={this.value}
        disabled={options.disabled}
        size={options.size}
      />
    );
  }
}
