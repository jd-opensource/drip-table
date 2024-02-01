/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import './index.less';

import React from 'react';

import { DripTableColumnSchema, DripTableRecordTypeBase, SchemaObject } from '@/types';
import { safeExecute } from '@/utils/sandbox';
import Alert from '@/components/react-components/alert';
import Dropdown from '@/components/react-components/dropdown';
import Menu from '@/components/react-components/menu';
import Tooltip from '@/components/react-components/tooltip';

import { DripTableComponentProps } from '../component';
import { dataProcessValue, finalizeString } from '../utils';

const prefixCls = 'jfe-drip-table-cc-link';

export type DTCLinkColumnSchema = DripTableColumnSchema<'link', {
  mode?: 'single' | 'multiple';
  lineHeight?: string;
  name?: string;
  label?: string;
  href?: string;
  event?: string;
  target?: string;
  tooltip?: string;
  disabled?: boolean | string;
  operates?: {
    name?: string;
    label?: string;
    href?: string;
    event?: string;
    target?: string;
    disabled?: boolean | string;
    /**
     * 显隐的数据处理
     */
    visibleFunc?: string;
  }[];
  /**
   * 多选模式下最大平铺展示数量，如果配置，其余均通过更多收起
   */
  maxTiledCount?: number;
  dropdownText?: string;
  textColor?: string;
  suffixIcon?: string;
  trigger?: 'hover' | 'click';
  placement?: 'bottom' | 'bottomLeft' | 'bottomRight' | 'top' | 'topLeft' | 'topRight';
  /**
   * 禁用的数据处理
   */
  disableFunc?: string;
  /**
   * 显隐的数据处理
   */
  visibleFunc?: string;
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
    type: 'object',
    properties: {
      mode: { enum: ['single', 'multiple'] },
      name: { type: 'string' },
      lineHeight: { type: 'string' },
      label: { type: 'string' },
      href: { type: 'string' },
      event: { type: 'string' },
      target: { type: 'string' },
      disabled: { anyOf: [{ type: 'string' }, { type: 'boolean' }] },
      tooltip: { type: 'string' },
      operates: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            label: { type: 'string' },
            href: { type: 'string' },
            event: { type: 'string' },
            target: { type: 'string' },
            disabled: { anyOf: [{ type: 'string' }, { type: 'boolean' }] },
            disableFunc: { type: 'string' },
            visibleFunc: { type: 'string' },
          },
        },
      },
      maxTiledCount: { type: 'number' },
      dropdownText: { type: 'string' },
      textColor: { type: 'string' },
      suffixIcon: { type: 'string' },
      trigger: { enum: ['hover', 'click'] },
      placement: { enum: ['bottom', 'bottomLeft', 'bottomRight', 'top', 'topLeft', 'topRight'] },
      dataProcess: { type: 'string' },
      disableFunc: { type: 'string' },
      visibleFunc: { type: 'string' },
    },
  };

  private renderInfoCircle = () => (
    <span role="img" aria-label="info-circle">
      <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" />
      </svg>
    </span>
  );

  private formatLabel(label?: string) {
    return finalizeString('pattern', label || '', this.props.record, this.props.recordIndex);
  }

  private renderToolTip = (template?: string) => {
    const { tooltip } = this.props.schema.options;
    if (tooltip) {
      return (
        <div style={{ marginLeft: 8 }}>
          { this.props.preview
            ? this.renderInfoCircle()
            : (
              <Tooltip title={finalizeString('pattern', tooltip, this.props.record, this.props.recordIndex)}>
                { this.renderInfoCircle() }
              </Tooltip>
            ) }
        </div>

      );
    }
    return null;
  };

  private get configured() {
    const options = this.props.schema.options;
    if (options.mode === 'multiple') {
      if (options.operates) {
        return true;
      }
      return false;
    }
    if (options.mode === 'single' && (finalizeString('pattern', options.href || '', this.props.record, this.props.recordIndex) || options.event)) {
      return true;
    }
    return false;
  }

  private finalizeDisabled(disabled?: boolean | string): boolean {
    if (typeof disabled === 'string') {
      return safeExecute(`return ${disabled}`, {
        props: {
          value: this.props.value,
          record: this.props.record,
        },
        rec: this.props.record,
      }, false);
    }
    return !!disabled;
  }

  private get visible(): boolean {
    const { schema, record } = this.props;
    const { dataIndex, options } = schema;
    const { mode, visibleFunc } = options;
    if (mode === 'single' && visibleFunc) {
      return dataProcessValue(record, dataIndex, visibleFunc);
    }
    return true;
  }

  private getIcon(iconName: string) {
    const Icons = this.props.icons;
    const Icon = Icons?.[iconName];
    if (Icon) {
      return (
        <Icon />
      );
    }
    return null;
  }

  public renderMenu(): JSX.Element {
    const options = this.props.schema.options;
    const menuList = options.operates?.slice(options.maxTiledCount);
    return (
      <Menu>
        {
          menuList?.map((config, index) => {
            const event = config.event;
            if (event) {
              return (
                <Menu.Item key={index} disabled={this.finalizeDisabled(config.disabled)}>
                  <a
                    onClick={() => {
                      if (this.props.preview) {
                        return;
                      }
                      this.props.fireEvent({ type: 'drip-link-click', payload: event });
                    }}
                  >
                    { this.formatLabel(config.label) }
                  </a>
                </Menu.Item>
              );
            }
            return (
              <Menu.Item key={index} disabled={this.finalizeDisabled(config.disabled)}>
                <a
                  href={finalizeString('pattern', config.href || '', this.props.record, this.props.recordIndex)}
                  onClick={this.props.preview ? e => e.preventDefault() : void 0}
                  target={config.target}
                >
                  { this.formatLabel(config.label) }
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
    if (!this.visible && options.mode === 'single') {
      return <div />;
    }
    if (!this.configured) {
      return <Alert type="error" showIcon message="属性配置错误" />;
    }
    if (options.mode === 'single') {
      const event = options.event;
      if (event) {
        return (
          <div>
            <a
              className={`${prefixCls}-link-break ${this.finalizeDisabled(options.disabled) ? `${prefixCls}-link-disabled` : ''}`}
              style={{ lineHeight: options.lineHeight }}
              onClick={() => {
                if (this.props.preview || this.finalizeDisabled(options.disabled)) {
                  return;
                }
                this.props.fireEvent({ type: 'drip-link-click', payload: event });
              }}
            >
              { this.formatLabel(options.label) }
            </a>
            { this.renderToolTip() }
          </div>

        );
      }
      return (
        <div>
          <a
            className={`${prefixCls}-link-break ${this.finalizeDisabled(options.disabled) ? `${prefixCls}-link-disabled` : ''}`}
            href={this.finalizeDisabled(options.disabled) ? void 0 : finalizeString('pattern', options.href || '', this.props.record, this.props.recordIndex)}
            target={options.target}
            onClick={this.props.preview || this.finalizeDisabled(options.disabled) ? e => e.preventDefault() : void 0}
            style={{ lineHeight: options.lineHeight }}
          >
            { this.formatLabel(options.label) }
          </a>
          { this.renderToolTip() }
        </div>
      );
    }
    return (
      <React.Fragment>
        {
          options.operates?.slice(0, options.maxTiledCount).map((config, index) => {
            const event = config.event;
            const disabled = this.finalizeDisabled(config.disabled);
            if (event) {
              return (
                <div key={index} style={{ display: 'inline' }}>
                  <a
                    style={{ marginRight: '5px', lineHeight: options.lineHeight }}
                    onClick={() => {
                      if (this.props.preview) {
                        return;
                      }
                      this.props.fireEvent({ type: 'drip-link-click', payload: event });
                    }}
                  >
                    { this.formatLabel(config.label) }
                  </a>
                  { this.renderToolTip() }
                </div>

              );
            }
            return (
              <div key={index} style={{ display: dataProcessValue(this.props.record, this.props.schema.dataIndex, config.visibleFunc) || !config.visibleFunc ? 'inline' : 'none' }}>
                <a
                  className={`${prefixCls}-link-break ${disabled ? `${prefixCls}-link-disabled` : ''}`}
                  style={{ marginRight: '5px', lineHeight: options.lineHeight }}
                  href={disabled ? void 0 : finalizeString('pattern', config.href || '', this.props.record, this.props.recordIndex)}
                  target={disabled ? void 0 : config.target}
                  onClick={(e) => {
                    if (this.props.preview || disabled) {
                      e.preventDefault();
                      return;
                    }
                    this.props.fireEvent({ type: 'drip-link-click', payload: event as string });
                  }}
                >
                  { this.formatLabel(config.label) }
                </a>
                { this.renderToolTip() }
              </div>
            );
          })
        }
        { typeof options.maxTiledCount === 'number' && options.maxTiledCount < (options.operates?.length || 0)
          ? (
            <Dropdown
              overlay={this.renderMenu()}
              trigger={options.trigger ? [options.trigger] : void 0}
              placement={options.placement}
            >
              <a style={{ color: options.textColor }}>
                { options.dropdownText || 'more' }
                { options.suffixIcon ? ' ' : '' }
                { options.suffixIcon ? this.getIcon(options.suffixIcon) : null }
              </a>
            </Dropdown>
          )
          : null }
      </React.Fragment>
    );
  }
}
