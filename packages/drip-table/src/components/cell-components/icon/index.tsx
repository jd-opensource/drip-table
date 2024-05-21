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
import RichText from '@/components/react-components/rich-text';

import { DripTableComponentProps } from '../component';

export type DTCIconColumnSchema = DripTableColumnSchema<'icon', {
  style?: React.CSSProperties;
  /**
   * 图标
   */
  icon: string | {
    name?: string;
    html?: string;
    render?: string;
  };
  /**
   * 事件名，给用户区分事件用
   */
  event?: string;
}>;

export interface DTCIconEvent {
  type: 'drip-icon-click';
  payload: {
    name: string;
  };
}

interface DTCIconProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, DTCIconColumnSchema> { }

interface DTCIconState {}

export default class DTCIcon<RecordType extends DripTableRecordTypeBase> extends React.PureComponent<DTCIconProps<RecordType>, DTCIconState> {
  public static componentName: DTCIconColumnSchema['component'] = 'icon';
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
      icon: {
        anyOf: [
          { type: 'string' },
          {
            type: 'object',
            properties: {
              name: { type: 'string' },
              html: { type: 'string' },
              render: { type: 'string' },
            },
          },
        ],
      },
      event: { type: 'string' },
    },
  };

  private get disabled(): boolean {
    const disable = this.props.schema.disable;
    if (typeof disable === 'string') {
      return safeExecute(`return ${disable}`, {
        props: {
          value: this.value,
          record: this.props.record,
          ext: this.props.ext,
        },
      }, false);
    }
    return !!disable;
  }

  private get value() {
    return this.props.value;
  }

  private onClick = () => {
    const options = this.props.schema.options;
    if (this.props.preview) {
      return;
    }
    if (this.disabled) {
      return;
    }
    if (options.event) {
      this.props.fireEvent({
        type: 'drip-icon-click',
        payload: {
          name: options.event,
        },
      });
    }
  };

  private renderIcon() {
    const options = this.props.schema.options;
    if (typeof options.icon === 'string') {
      const Icon = this.props.icons?.[options.icon];
      if (Icon) {
        return <Icon />;
      }
      return <RichText html={options.icon || ''} />;
    }
    if (options.icon.name) {
      const Icon = this.props.icons?.[options.icon.name];
      if (Icon) {
        return <Icon />;
      }
    }
    if (options.icon.html) {
      return <RichText html={options.icon.html || ''} />;
    }
    if (options.icon.render) {
      const html = safeExecute(options.icon.render, {
        props: {
          value: this.value,
          record: this.props.record,
          recordIndex: this.props.recordIndex,
          ext: this.props.ext,
        },
      }, '');
      return <RichText html={html ?? ''} />;
    }
    return null;
  }

  public render() {
    const options = this.props.schema.options;
    return (
      <div
        onClick={this.onClick}
        style={Object.assign({ cursor: options.event ? 'pointer' : '' }, options.style)}
      >
        { this.renderIcon() }
      </div>
    );
  }
}
