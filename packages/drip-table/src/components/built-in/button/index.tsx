/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import React from 'react';

import { DripTableColumnSchema, DripTableRecordTypeBase, SchemaObject } from '@/types';

import { DripTableComponentProps } from '../component';
import { dataProcessValue, finalizeString } from '../utils';

export type DTCButtonColumnSchema = DripTableColumnSchema<'button', {
  /** 展示模式：单按钮、多按钮 */
  mode?: 'single' | 'multiple';
  label?: string;
  buttonType?: 'primary' | 'dashed' | 'text' | 'link';
  shape?: 'circle' | 'round';
  size?: 'large' | 'middle' | 'small';
  danger?: boolean;
  ghost?: boolean;
  icon?: string;
  event?: string;
  margin?: number;
  disableFunc?: string;
  visibleFunc?: string;
  buttons?: {
    label?: string;
    event?: string;
    buttonType?: 'primary' | 'dashed' | 'text' | 'link';
    shape?: 'circle' | 'round';
    size?: 'large' | 'middle' | 'small';
    danger?: boolean;
    ghost?: boolean;
    icon?: string;
    disableFunc?: string;
    visibleFunc?: string;
  }[];
}>;

export interface DTCButtonEvent {
  type: 'drip-button-click';
  payload: string;
}

interface DTCButtonProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, DTCButtonColumnSchema> { }

interface DTCButtonState {}

export default class DTCButton<RecordType extends DripTableRecordTypeBase> extends React.PureComponent<DTCButtonProps<RecordType>, DTCButtonState> {
  public static componentName: DTCButtonColumnSchema['component'] = 'button';
  public static schema: SchemaObject = {
    type: 'object',
    properties: {
      mode: { enum: ['single', 'multiple'] },
      label: { type: 'string' },
      buttonType: { enum: ['primary', 'dashed', 'text', 'link'] },
      shape: { enum: ['circle', 'round'] },
      size: { enum: ['large', 'middle', 'small'] },
      danger: { type: 'boolean' },
      ghost: { type: 'boolean' },
      icon: { type: 'string' },
      event: { type: 'string' },
      margin: { type: 'number' },
      disableFunc: { type: 'string' },
      visibleFunc: { type: 'string' },
      buttons: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            label: { type: 'string' },
            event: { type: 'string' },
            buttonType: { enum: ['primary', 'dashed', 'text', 'link'] },
            shape: { enum: ['circle', 'round'] },
            size: { enum: ['large', 'middle', 'small'] },
            danger: { type: 'boolean' },
            ghost: { type: 'boolean' },
            icon: { type: 'string' },
            disableFunc: { type: 'string' },
            visibleFunc: { type: 'string' },
          },
        },
      },
    },
  };

  private get configured() {
    const options = this.props.schema.options;
    if (options.mode === 'multiple') {
      if (options.buttons) {
        return true;
      }
      return false;
    }
    return true;
  }

  private get label() {
    const options = this.props.schema.options;
    return finalizeString('pattern', options.label || '', this.props.data);
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

  private getVisible(visibleFunc?: string): boolean {
    const { schema, data } = this.props;
    const { dataIndex } = schema;
    if (!visibleFunc) {
      return true;
    }
    return dataProcessValue(data, dataIndex, visibleFunc);
  }

  private getDisabled(disableFunc?: string): boolean {
    const { schema, data } = this.props;
    const { dataIndex } = schema;
    if (!disableFunc) {
      return this.props.disable ?? false;
    }
    return dataProcessValue(data, dataIndex, disableFunc);
  }

  public render() {
    const Button = this.props.driver.components.Button;
    const options = this.props.schema.options;
    if (!this.configured) {
      return <div style={{ color: 'red' }}>属性配置错误</div>;
    }
    if (options.mode === 'single') {
      if (!this.getVisible(options.visibleFunc)) {
        return null;
      }
      return (
        <Button
          type={options.buttonType}
          size={options.size}
          shape={options.shape}
          danger={options.danger}
          ghost={options.ghost}
          disabled={this.getDisabled(options.disableFunc)}
          icon={options.icon ? this.getIcon(options.icon) : void 0}
          onClick={() => {
            if (this.props.preview) { return; }
            if (options.event) {
              this.props.fireEvent({ type: 'drip-button-click', payload: options.event });
            }
          }}
        >
          { this.label }
        </Button>
      );
    }
    if (options.mode === 'multiple') {
      return options.buttons?.map((config, index) => this.getVisible(config.visibleFunc) && (
        <Button
          key={index}
          style={{ marginLeft: options.margin, marginRight: options.margin }}
          type={config.buttonType}
          size={config.size}
          shape={config.shape}
          danger={config.danger}
          disabled={this.getDisabled(config.disableFunc)}
          ghost={config.ghost}
          icon={config.icon ? this.getIcon(config.icon) : void 0}
          onClick={() => {
            if (this.props.preview) { return; }
            if (config.event) {
              this.props.fireEvent({ type: 'drip-button-click', payload: config.event });
            }
          }}
        >
          { config.label }
        </Button>
      ));
    }
    return null;
  }
}
