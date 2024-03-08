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
import Switch from '@/components/react-components/switch';

import { DripTableComponentProps } from '../component';

export type DTCSwitchColumnSchema = DripTableColumnSchema<'switch', {
  style?: React.CSSProperties;
  /**
   * 暗纹提示
   */
  placeholder?: string;
  /**
   * 值回显强制与数据绑定，默认为true
   */
  bindValue?: boolean;
  /**
   * 事件名，给用户区分事件用
   */
  event?: string;
}>;

export interface DTCSwitchEvent {
  type: 'drip-switch-change';
  payload: {
    name: string;
    value: boolean;
  };
}

interface DTCSwitchProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, DTCSwitchColumnSchema> { }

interface DTCSwitchState {}

export default class DTCSwitch<RecordType extends DripTableRecordTypeBase> extends React.PureComponent<DTCSwitchProps<RecordType>, DTCSwitchState> {
  public static componentName: DTCSwitchColumnSchema['component'] = 'switch';
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
      <Switch
        style={options.style}
        disabled={this.disabled}
        defaultChecked={this.value}
        checked={options.bindValue === false ? void 0 : this.value}
        onChange={(value) => {
          if (this.props.preview) {
            return;
          }
          if (options.event) {
            this.props.fireEvent({
              type: 'drip-switch-change',
              payload: {
                name: options.event,
                value,
              },
            });
          }
        }}
      />
    );
  }
}
