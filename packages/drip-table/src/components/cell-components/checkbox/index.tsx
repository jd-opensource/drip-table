/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2024 JD Network Technology Co., Ltd.
 */
import React from 'react';

import {
  DripTableColumnSchema,
  DripTableRecordTypeBase,
  SchemaObject,
} from '@/types';
import Checkbox from '@/components/react-components/checkbox';

import { DripTableComponentProps } from '../component';

export type DTCCheckboxColumnSchema = DripTableColumnSchema<'checkbox', {
  style?: React.CSSProperties;
  mode: 'single' | 'group';
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
  // 标签
  label?: string;
  // 选项
  options?: {
    label: string;
    value: string | number | boolean;
    disabled?: boolean | string;
  }[];
}>;

interface DTCCheckboxOnChange {
  type: 'drip-checkbox-change';
  payload: {
    name: string;
    value: boolean | (string | number | boolean)[];
  };
}

export type DTCCheckboxEvent = DTCCheckboxOnChange;

interface DTCCheckboxProps<RecordType extends DripTableRecordTypeBase>
  extends DripTableComponentProps<RecordType, DTCCheckboxColumnSchema> { }

interface DTCCheckboxState {
  checkedValues: (string | number | boolean)[] | undefined;
}

export default class DTCCheckbox<
  RecordType extends DripTableRecordTypeBase
> extends React.PureComponent<DTCCheckboxProps<RecordType>, DTCCheckboxState> {
  public static componentName: DTCCheckboxColumnSchema['component'] = 'checkbox';

  public static schema: SchemaObject = {
    type: 'object',
    properties: {
      style: {
        type: 'object',
        patternProperties: {
          '^.*$': {
            anyOf: [{ type: 'string' }, { type: 'number' }],
          },
        },
      },
      placeholder: { type: 'string' },
      bindValue: { type: 'boolean' },
      defaultChecked: { type: 'boolean' },
      onchange: { type: 'string' },
      event: { type: 'string' },
      label: { type: 'string' },
      mode: { enum: ['single', 'group'] },
      options: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            label: { type: 'string' },
            value: {
              anyOf: [
                { type: 'string' },
                { type: 'number' },
                { type: 'boolean' },
              ],
            },
            disabled: {
              anyOf: [{ type: 'string' }, { type: 'boolean' }],
            },
          },
        },
      },
    },
  };

  public state: DTCCheckboxState = {
    checkedValues: [],
  };

  private get disabled(): boolean {
    const disable = this.props.schema.disable;
    if (typeof disable === 'string') {
      return !!this.props.safeEvaluate(
        `return ${disable}`,
        {
          props: {
            value: this.props.value,
            record: this.props.record,
            ext: this.props.ext,
          },
          rec: this.props.record,
        },
        false,
      );
    }
    return !!disable;
  }

  private get value() {
    const options = this.props.schema.options ?? {};
    if (options.mode === 'group') {
      return this.props.value as string | number | boolean;
    }
    return !!this.props.value;
  }

  public componentDidMount(): void {
    const options = this.props.schema.options ?? {};
    if (options.mode === 'group') {
      this.setState({
        checkedValues: this.props.value as (string | number | boolean)[],
      });
    }
  }

  public render() {
    const { record, recordIndex, ext } = this.props;
    const options = this.props.schema.options ?? {};
    if (options.mode === 'group') {
      return (options.options || []).map((option, index) => (
        <Checkbox
          key={index}
          label={this.props.finalizeString(
            'pattern',
            option.label ?? '',
            record,
            recordIndex,
            ext,
          )}
          checked={this.state.checkedValues?.includes(option.value)}
          disabled={
            typeof option.disabled === 'string'
              ? this.props.safeEvaluate(option.disabled, {
                props: { record, recordIndex, ext },
              })
              : option.disabled
          }
          onChange={(e) => {
            if (this.props.preview) {
              return;
            }
            const checked = (e.target as HTMLInputElement)?.checked;
            this.setState((preState) => {
              const checkedValues = [...preState.checkedValues ?? []];
              if (checked) {
                checkedValues.push(option.value);
              } else {
                const valueIndex = checkedValues.indexOf(option.value);
                checkedValues.splice(valueIndex, 1);
              }
              if (options.event) {
                this.props.fireEvent({
                  type: 'drip-checkbox-change',
                  payload: {
                    name: options.event,
                    value: checkedValues,
                  },
                });
              }
              return {
                checkedValues,
              };
            });
          }}
        />
      ));
    }
    return (
      <Checkbox
        style={options.style}
        disabled={this.disabled}
        defaultChecked={this.value as boolean}
        checked={options.bindValue === false ? void 0 : (this.value as boolean)}
        label={this.props.finalizeString(
          'pattern',
          options.label ?? '',
          record,
          recordIndex,
          ext,
        )}
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
