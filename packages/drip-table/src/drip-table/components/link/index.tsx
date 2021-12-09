/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import React from 'react';
import { DripTableComponentProps, DripTableComponentSchema } from '../component';

export interface DTCLinkSchema extends DripTableComponentSchema {
  'ui:type': 'link';
  mode: 'single' | 'multiple';
  name?: string;
  label?: string;
  href?: string;
  event?: string;
  target?: string;
  operates?: {
    name?: string;
    label?: string;
    href?: string;
    event?: string;
    target?: string;
  }[];
}

export interface DTCLinkEvent {
  type: 'drip-link-click';
  payload: string;
}

interface DTCLinkProps<RecordType> extends DripTableComponentProps<RecordType, DTCLinkSchema> { }

interface DTCLinkState {}

export default class DTCLink<RecordType> extends React.PureComponent<DTCLinkProps<RecordType>, DTCLinkState> {
  private get configured() {
    const schema = this.props.schema;
    if (schema.mode === 'multiple') {
      if (schema.operates) {
        return true;
      }
      return false;
    }
    if (schema.mode === 'single' && (schema.href || schema.event)) {
      return true;
    }
    return false;
  }

  public render(): JSX.Element {
    const { schema } = this.props;
    if (!this.configured) {
      return <div style={{ color: 'red' }}>属性配置错误</div>;
    }
    if (schema.mode === 'single') {
      const event = schema.event;
      if (event) {
        return (
          <a
            onClick={() => {
              if (this.props.preview) {
                return;
              }
              this.props.fireEvent({ type: 'drip-link-click', payload: event });
            }}
          >
            { schema.label }
          </a>
        );
      }
      return <a href={schema.href} target={schema.target}>{ schema.label }</a>;
    }
    return (
      <div>
        {
          schema.operates?.map((config, index) => {
            const event = config.event;
            if (event) {
              return (
                <a
                  style={{ marginRight: '5px' }}
                  key={config.name || index}
                  onClick={() => {
                    if (this.props.preview) {
                      return;
                    }
                    this.props.fireEvent({ type: 'drip-link-click', payload: event });
                  }}
                >
                  { config.label }
                </a>
              );
            }
            return <a style={{ marginRight: '5px' }} key={config.name || index} href={config.href} target={config.target}>{ config.label }</a>;
          })
        }
      </div>
    );
  }
}
