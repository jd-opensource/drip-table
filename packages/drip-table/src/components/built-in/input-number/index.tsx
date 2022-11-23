/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Estherjing(qichudegensui@163.com)
 * @modifier : Estherjing(qichudegensui@163.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */
import React from 'react';

import { DripTableColumnSchema, DripTableRecordTypeBase, SchemaObject } from '@/types';
import { indexValue } from '@/utils/operator';
import InputNumber from '@/components/input-number';

import { DripTableComponentProps } from '../component';

export type DTCInputNumberColumnSchema = DripTableColumnSchema<'input-number', {
  step?: number | string;
  min?: number;
  max?: number;
  style?: React.CSSProperties;
  /**
   * 值回显强制与数据绑定，默认为true
   */
  bindValue?: boolean;
  /** 展示边框，默认为 true */
  bordered?: boolean;
  /** 暗纹提示 */
  placeholder?: string;
  defaultValue?: number;
  disabled?: boolean;
}>;

interface DTCInputNumberState {
}

interface DTCInputNumberProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, DTCInputNumberColumnSchema> { }

export default class DTCPopUpPage<RecordType extends DripTableRecordTypeBase> extends React.PureComponent<DTCInputNumberProps<RecordType>, DTCInputNumberState> {
  public static componentName: DTCInputNumberColumnSchema['component'] = 'input-number';
  public static schema: SchemaObject = {
    properties: {
      step: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      min: { type: 'number' },
      max: { type: 'number' },
      style: { type: 'object' },
      bindValue: { type: 'boolean' },
      bordered: { type: 'boolean' },
      placeholder: { type: 'string' },
      defaultValue: { type: 'string' },
      disabled: { type: 'boolean' },
    },
  };

  private get value() {
    const schema = this.props.schema;
    const dataIndex = schema.dataIndex;
    if (!this.props.data) {
      return schema.defaultValue;
    }
    return indexValue(this.props.data, dataIndex, '');
  }

  public render() {
    const options = this.props.schema.options;
    return (
      <InputNumber
        min={options.min}
        max={options.max}
        step={options.step}
        style={options.style}
        bordered={options.bordered}
        placeholder={options.placeholder}
        defaultValue={options.defaultValue}
        value={options.bindValue === false ? void 0 : this.value}
        disabled={options.disabled}
      />
    );
  }
}
