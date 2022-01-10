/**
 * This file is part of the jd-mkt5 launch.
 * @link     : https://ace.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import React from 'react';
import { DripTableRecordTypeBase } from '@/types';

import { DripTableComponentProps, DripTableComponentSchema } from '../component';

export interface DTCButtonSchema extends DripTableComponentSchema {
  'ui:type': 'button';
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
  buttons?: {
    label?: string;
    event?: string;
    buttonType?: 'primary' | 'dashed' | 'text' | 'link';
    shape?: 'circle' | 'round';
    size?: 'large' | 'middle' | 'small';
    danger?: boolean;
    ghost?: boolean;
    icon?: string;
  }[];
}

export interface DTCButtonEvent {
  type: 'drip-button-click';
  payload: string;
}

interface DTCButtonProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, DTCButtonSchema> { }

interface DTCButtonState {}

export default class DTCButton<RecordType extends DripTableRecordTypeBase> extends React.PureComponent<DTCButtonProps<RecordType>, DTCButtonState> {
  private get configured() {
    const schema = this.props.schema;
    if (schema.mode === 'multiple') {
      if (schema.buttons) {
        return true;
      }
      return false;
    }
    return true;
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
    const Button = this.props.driver.components.Button;
    const { schema } = this.props;
    if (!this.configured) {
      return <div style={{ color: 'red' }}>属性配置错误</div>;
    }
    if (schema.mode === 'single') {
      return (
        <Button
          type={schema.buttonType}
          size={schema.size}
          shape={schema.shape}
          danger={schema.danger}
          ghost={schema.ghost}
          icon={schema.icon ? this.getIcon(schema.icon) : void 0}
          onClick={() => {
            if (this.props.preview) { return; }
            if (schema.event) {
              this.props.fireEvent({ type: 'drip-button-click', payload: schema.event });
            }
          }}
        >
          { schema.label }
        </Button>
      );
    }
    if (schema.mode === 'multiple') {
      return schema.buttons?.map((config, index) => (
        <Button
          key={index}
          style={{ marginLeft: schema.margin, marginRight: schema.margin }}
          type={config.buttonType}
          size={config.size}
          shape={config.shape}
          danger={config.danger}
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
