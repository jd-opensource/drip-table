/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2024 JD Network Technology Co., Ltd.
 */
import React from 'react';

import { DripTableColumnSchema, DripTableRecordTypeBase, SchemaObject } from '@/types';
import { safeExecute } from '@/utils/sandbox';
import Checkbox from '@/components/react-components/checkbox';

import { DripTableComponentProps } from '../component';

export type DTCCheckboxColumnSchema = DripTableColumnSchema<'checkbox', {
  style?: React.CSSProperties;
  /**
   * 指定当前是否选中，默认为false
   */
  bindValue?: boolean;
  /**
   * 初始是否选中，默认为false
   */
  defaultChecked?: boolean;
  /**
   * 事件名，给用户区分事件用
   */
  event?: string;
}>;

export interface DTCCheckboxOnChange {
  type: 'drip-checkbox-change';
  payload: {
    name: string;
    value: boolean;
  };
}

interface DTCCheckboxProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, DTCCheckboxColumnSchema> { }

interface DTCCheckboxState {}

export default class DTCCheckbox<RecordType extends DripTableRecordTypeBase> extends React.PureComponent<DTCCheckboxProps<RecordType>, DTCCheckboxState> {
  public static componentName: DTCCheckboxColumnSchema['component'] = 'checkbox';
  public static schema: SchemaObject = {
    type: 'object',
    properties: {
      style: {
        type: 'object',
        patternProperties: {
          '^.*$': {
            anyOf: [
              { type: 'string' },
              { type: 'number' },
            ],
          },
        },
      },
      placeholder: { type: 'string' },
      bindValue: { type: 'boolean' },
      defaultChecked: { type: 'boolean' },
      onchange: { type: 'string' },
      event: { type: 'string' },
    },
  };

  private get disabled(): boolean {
    const disable = this.props.schema.disable;
    if (typeof disable === 'string') {
      return safeExecute(`return ${disable}`, {
        props: {
          value: this.props.value,
          record: this.props.record,
          ext: this.props.ext,
        },
        rec: this.props.record,
      }, false);
    }
    return !!disable;
  }

  private get value() {
    return !!this.props.value;
  }

  public render() {
    const options = this.props.schema.options;
    return (
      <Checkbox
        style={options.style}
        disabled={this.disabled}
        defaultChecked={this.value}
        checked={options.bindValue === false ? void 0 : this.value}
        onChange={(e) => {
          if (this.props.preview) {
            return;
          }
          if (options.event) {
            this.props.fireEvent({
              type: 'drip-checkbox-change',
              payload: {
                name: options.event,
                value: !!(e.target as HTMLInputElement)?.checked,
              },
            });
          }
        }}
      />
    );
  }
}
