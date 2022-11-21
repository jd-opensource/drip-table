/**
 * This file is part of the drip-table launch.
 * @link     : https://drip-table.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';

import { DripTableColumnSchema, DripTableRecordTypeBase, SchemaObject } from '@/types';
import { indexValue } from '@/utils/operator';

import { DripTableComponentProps } from '../component';
import { finalizeString } from '../utils';

type LabeledOptions = {
  label: string;
  value: string | number;
  disabled?: boolean | string;
}
export type DTCSelectColumnSchema = DripTableColumnSchema<'select', {
  /** 允许清空值 */
  allowClear?: boolean;
  /** 展示边框，默认为 true */
  bordered?: boolean;
  style?: React.CSSProperties;
  /** 多选和标签模式 */
  mode?: 'multiple' | 'tags';
  /** 暗纹提示 */
  placeholder?: string;
  /** 弹出框位置 */
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  /** 尺寸大小 */
  size?: 'large' | 'middle' | 'small';
  /**
   * 值回显强制与数据绑定，默认为true
   */
  bindValue?: boolean;
  /** 展示箭头，默认为 true */
  showArrow?: boolean;
  /** 允许搜索，默认为 false */
  showSearch?: boolean;
  /** 后缀图标 */
  suffixIcon?: string;
  /** 事件名，给用户区分事件用 */
  event?: string;
  /** 是否禁用，给用户区分事件用 */
  disabled?: string | boolean;
  /** 默认值 */
  defaultValue?: string | number | (string | number)[];
  /** 自定义options */
  options?: LabeledOptions[];
  /** 从接口请求拿取 options */
  url?: string;
  /** 接口请求配置，目前仅支持 JSON 格式 */
  request?: {
    method: 'GET' | 'POST';
    headers?: HeadersInit;
    credentials?: 'include' | 'same-origin' | 'omit';
    body?: string | Record<string, unknown>;
  };
  /** 接口返回数据格式配置, dataIndex 和 mapper 二者选其一 */
  response?: {
    dataIndex?: string | number | (string | number)[];
    mapper?: string;
  };
}>;

export interface DTCSelectEvent {
  type: 'drip-select-change';
  payload: {
    name: string;
    value: string | number | (string | number)[];
  };
}

interface DTCSelectProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, DTCSelectColumnSchema> { }

interface DTCSelectState {
  loading?: boolean;
  options?: LabeledOptions[];
}

export default class DTCSelect<RecordType extends DripTableRecordTypeBase> extends React.PureComponent<DTCSelectProps<RecordType>, DTCSelectState> {
  public static componentName: DTCSelectColumnSchema['component'] = 'select';
  public static schema: SchemaObject = {
    properties: {
      allowClear: { type: 'boolean' },
      bordered: { type: 'boolean' },
      disabled: { anyOf: [{ type: 'string' }, { type: 'boolean' }] },
      event: { type: 'string' },
      mode: { enum: ['multiple', 'tags'] },
      options: {
        type: 'array',
        items: {
          properties: {
            label: { type: 'string' },
            value: { anyOf: [{ type: 'string' }, { type: 'number' }] },
            disabled: { anyOf: [{ type: 'string' }, { type: 'boolean' }] },
          },
          required: ['label', 'value'],
        },
      },
      placeholder: { type: 'string' },
      placement: { enum: ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'] },
      showArrow: { type: 'boolean' },
      showSearch: { type: 'boolean' },
      suffixIcon: { type: 'string' },
      bindValue: { type: 'boolean' },
      size: { enum: ['large', 'middle', 'small'] },
      style: { type: 'object' },
      defaultValue: { anyOf: [
        { type: 'string' },
        { type: 'number' },
        {
          type: 'array',
          items: { anyOf: [{ type: 'string' }, { type: 'number' }] },
        },
      ] },
      url: { type: 'string' },
      request: {
        type: 'object',
        properties: {
          method: { enum: ['GET', 'POST'] },
          headers: { type: 'object' },
          credentials: { enum: ['include', 'same-origin', 'omit'] },
          body: { anyOf: [{ type: 'string' }, { type: 'object' }] },
        },
      },
      response: {
        type: 'object',
        properties: {
          dataIndex: { anyOf: [
            { type: 'string' },
            { type: 'number' },
            {
              type: 'array',
              items: { anyOf: [{ type: 'string' }, { type: 'number' }] },
            },
          ] },
          mapper: { type: 'string' },
        },
      },
    },
  };

  public constructor(props: DTCSelectProps<RecordType>) {
    super(props);
    this.state = {};
  }

  private get disabled(): boolean {
    const options = this.props.schema.options;
    if (typeof options.disabled === 'string') {
      try {
        return !!new Function('rec', `return ${options.disabled}`)(this.props.data);
      } catch {
        return false;
      }
    }
    return !!options.disabled;
  }

  private get options(): LabeledOptions[] {
    const options = this.props.schema.options;
    if (options.options) {
      return options.options.map(item => ({
        ...item,
        disabled: this.finalizeOptionDisabled(item.disabled, item.value),
      }));
    }
    if (options.url) {
      return this.state.options || [];
    }
    return [];
  }

  private get value() {
    const schema = this.props.schema;
    const dataIndex = schema.dataIndex;
    if (!this.props.data) {
      return schema.defaultValue;
    }
    return indexValue(this.props.data, dataIndex, '');
  }

  private finalizeOptionDisabled(disabled?: boolean | string, value?: unknown): boolean {
    if (typeof disabled === 'string') {
      let isDisabled = false;
      try {
        isDisabled = !!new Function('rec', 'value', `return ${disabled}`)(this.props.data, value);
      } catch {}
      return isDisabled;
    }
    return !!disabled;
  }

  private finalizeRequestBody(body?: string | Record<string, unknown>) {
    if (typeof body === 'string') {
      let finalBodyString: string | undefined = void 0;
      try {
        finalBodyString = new Function('rec', `return ${body}`)(this.props.data);
        if (typeof finalBodyString !== 'string') {
          return void 0;
        }
      } catch {}
      return finalBodyString;
    }
    if (typeof body === 'object') {
      return JSON.stringify(body);
    }
    return body;
  }

  private finalizeOptionsResponse(response: unknown) {
    const options = this.props.schema.options;
    if (options.response?.dataIndex) {
      if (typeof options.response.dataIndex === 'string' || typeof options.response.dataIndex === 'number') {
        return (response as Record<string, unknown>)[options.response.dataIndex];
      }
      if (Array.isArray(options.response.dataIndex)) {
        let finalOptions = cloneDeep(response);
        options.response.dataIndex.forEach((key) => {
          finalOptions = (finalOptions as Record<string, unknown>)[key];
        });
        return finalOptions;
      }
      return response;
    }
    if (options.response?.mapper) {
      return new Function('response', `return ${options.response?.mapper || 'response'}`)(response);
    }
    return response;
  }

  public componentDidMount() {
    const options = this.props.schema.options;
    if (options.url && !options.options) {
      this.setState({ loading: true });
      fetch(finalizeString('pattern', options.url, this.props.data), options.request
        ? {
          method: options.request.method,
          headers: options.request.headers,
          credentials: options.request.credentials,
          body: this.finalizeRequestBody(options.request.body),
        }
        : void 0).then(res => res.json())
        .then((json) => {
          this.setState({ loading: false, options: this.finalizeOptionsResponse(json) });
          return json;
        })
        .catch((error: unknown) => {
          this.setState({ loading: false });
          console.error(error);
        });
    }
  }

  private getIcon(iconName: string) {
    const Icons = this.props.driver.icons;
    const Icon = Icons?.[iconName];
    if (Icon) {
      return (
        <Icon />
      );
    }
    return null;
  }

  public render() {
    const { Select } = this.props.driver.components;
    const options = this.props.schema.options;
    return (
      <Select
        style={options.style}
        allowClear={options.allowClear}
        mode={options.mode}
        bordered={options.bordered}
        placeholder={options.placeholder}
        placement={options.placement}
        showSearch={options.showSearch}
        showArrow={options.showArrow}
        suffixIcon={options.suffixIcon ? this.getIcon(options.suffixIcon) : void 0}
        size={options.size}
        disabled={this.disabled}
        loading={this.state.loading}
        defaultValue={options.defaultValue}
        value={options.bindValue === false ? void 0 : this.value}
        getPopupContainer={triggerNode => triggerNode}
        open={this.props.preview ? false : void 0}
        onChange={(value) => {
          if (this.props.preview) { return; }
          if (options.event) {
            this.props.fireEvent({
              type: 'drip-select-change',
              payload: {
                name: options.event,
                value,
              },
            });
          }
        }}
      >
        { this.options.map((option, index) => (
          <Select.Option key={index} disabled={option.disabled} value={option.value}>{ option.label }</Select.Option>
        )) }
      </Select>
    );
  }
}
