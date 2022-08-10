/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import React from 'react';

import { DripTableColumnSchema, DripTableRecordTypeBase, SchemaObject } from '@/types';

import { DripTableComponentProps } from '../component';
import { finalizeString } from '../utils';

import styles from './index.module.less';

export type DTCLinkColumnSchema = DripTableColumnSchema<'link', {
  mode?: 'single' | 'multiple';
  name?: string;
  label?: string;
  href?: string;
  event?: string;
  target?: string;
  disabled?: boolean | string;
  operates?: {
    name?: string;
    label?: string;
    href?: string;
    event?: string;
    target?: string;
    disabled?: boolean | string;
  }[];
  /** 多选模式下最大平铺展示数量，如果配置，其余均通过更多收起 */
  maxTiledCount?: number;
  dropdownText?: string;
  textColor?: string;
  trigger?: 'hover' | 'click';
  placement?: 'bottom' | 'bottomLeft' | 'bottomRight' | 'top' | 'topLeft' | 'topRight';
}>;

export interface DTCLinkEvent {
  type: 'drip-link-click';
  payload: string;
}

interface DTCLinkProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, DTCLinkColumnSchema> { }

interface DTCLinkState {}

export default class DTCLink<RecordType extends DripTableRecordTypeBase> extends React.PureComponent<DTCLinkProps<RecordType>, DTCLinkState> {
  public static componentName: DTCLinkColumnSchema['component'] = 'link';
  public static schema: SchemaObject = {
    properties: {
      mode: { enum: ['single', 'multiple'] },
      name: { type: 'string' },
      label: { type: 'string' },
      href: { type: 'string' },
      event: { type: 'string' },
      target: { type: 'string' },
      disabled: { anyOf: [{ type: 'string' }, { type: 'boolean' }] },
      operates: {
        type: 'array',
        items: {
          properties: {
            name: { type: 'string' },
            label: { type: 'string' },
            href: { type: 'string' },
            event: { type: 'string' },
            target: { type: 'string' },
            disabled: { anyOf: [{ type: 'string' }, { type: 'boolean' }] },
          },
        },
      },
      maxTiledCount: { type: 'number' },
      dropdownText: { type: 'string' },
      textColor: { type: 'string' },
      trigger: { enum: ['hover', 'click'] },
      placement: { enum: ['bottom', 'bottomLeft', 'bottomRight', 'top', 'topLeft', 'topRight'] },
    },
  };

  private get configured() {
    const options = this.props.schema.options;
    if (options.mode === 'multiple') {
      if (options.operates) {
        return true;
      }
      return false;
    }
    if (options.mode === 'single' && (finalizeString('pattern', options.href || '', this.props.data) || options.event)) {
      return true;
    }
    return false;
  }

  private finalizeDisabled(disabled?: boolean | string): boolean {
    if (typeof disabled === 'string') {
      let isDisabled = false;
      try {
        isDisabled = new Function('rec', `return ${disabled}`)(this.props.data);
      } catch {}
      return !!isDisabled;
    }
    return !!disabled;
  }

  public renderMenu(): JSX.Element {
    const options = this.props.schema.options;
    const Menu = this.props.driver.components.Menu;
    const menuList = options.operates?.slice(options.maxTiledCount);
    return (
      <Menu>
        {
          menuList?.map((config, index) => {
            const event = config.event;
            if (event) {
              return (
                <Menu.Item key={config.name || index} disabled={this.finalizeDisabled(config.disabled)}>
                  <a
                    onClick={() => {
                      if (this.props.preview) {
                        return;
                      }
                      this.props.fireEvent({ type: 'drip-link-click', payload: event });
                    }}
                  >
                    { config.label }
                  </a>
                </Menu.Item>
              );
            }
            return (
              <Menu.Item key={config.name || index} disabled={this.finalizeDisabled(config.disabled)}>
                <a
                  href={finalizeString('pattern', config.href || '', this.props.data)}
                  target={config.target}
                >
                  { config.label }
                </a>
              </Menu.Item>
            );
          })
        }
      </Menu>
    );
  }

  public render(): JSX.Element {
    const options = this.props.schema.options;
    const Alert = this.props.driver.components.Alert;
    const DropDown = this.props.driver.components.Dropdown;
    if (!this.configured) {
      return <Alert type="error" showIcon message="属性配置错误" />;
    }
    if (options.mode === 'single') {
      const event = options.event;
      if (event) {
        return (
          <a
            className={this.finalizeDisabled(options.disabled) ? styles['link-disabled'] : void 0}
            onClick={() => {
              if (this.props.preview || this.finalizeDisabled(options.disabled)) {
                return;
              }
              this.props.fireEvent({ type: 'drip-link-click', payload: event });
            }}
          >
            { options.label }
          </a>
        );
      }
      return <a href={finalizeString('pattern', options.href || '', this.props.data)} target={options.target}>{ options.label }</a>;
    }
    return (
      <div>
        {
          options.operates?.slice(0, options.maxTiledCount).map((config, index) => {
            const event = config.event;
            const disabled = this.finalizeDisabled(config.disabled);
            if (event) {
              return (
                <a
                  className={disabled ? styles['link-disabled'] : void 0}
                  style={{ marginRight: '5px' }}
                  key={config.name || index}
                  onClick={() => {
                    if (this.props.preview || disabled) {
                      return;
                    }
                    this.props.fireEvent({ type: 'drip-link-click', payload: event });
                  }}
                >
                  { config.label }
                </a>
              );
            }
            return (
              <a
                className={disabled ? styles['link-disabled'] : void 0}
                style={{ marginRight: '5px' }}
                key={config.name || index}
                href={disabled ? void 0 : finalizeString('pattern', config.href || '', this.props.data)}
                target={disabled ? void 0 : config.target}
              >
                { config.label }
              </a>
            );
          })
        }
        { typeof options.maxTiledCount === 'number' && options.maxTiledCount < (options.operates?.length || 0)
          ? (
            <DropDown
              overlay={this.renderMenu()}
              trigger={options.trigger ? [options.trigger] : void 0}
              placement={options.placement}
            >
              <a style={{ color: options.textColor }}>{ options.dropdownText || 'more' }</a>
            </DropDown>
          )
          : null }
      </div>
    );
  }
}
