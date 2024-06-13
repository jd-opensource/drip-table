/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import React from 'react';

import { DripTableColumnSchema, DripTableRecordTypeBase, SchemaObject } from '@/types';
import { DRIP_TABLE_GENERIC_CSS_SCHEMA } from '@/utils/ajv';
import { parseReactCSS, parseThemeCSS } from '@/utils/dom';
import { safeExecute } from '@/utils/sandbox';
import { DripTableComponentContext } from '@/components/cell-components/hooks';
import Button from '@/components/react-components/button';
import Tooltip from '@/components/react-components/tooltip';

import { DripTableComponentProps } from '../component';
import { dataProcessValue, finalizeString } from '../utils';

export type DTCButtonColumnSchema = DripTableColumnSchema<'button', {
  /**
   * 自定义样式
   */
  style?: string | Record<string, string>;
  /**
   * 展示模式：单按钮、多按钮
   */
  mode?: 'single' | 'multiple';
  label?: string;
  buttonType?: 'primary' | 'dashed' | 'text' | 'link';
  shape?: 'circle' | 'round';
  size?: 'large' | 'middle' | 'small';
  danger?: boolean;
  ghost?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  event?: string;
  closePopover?: string;
  margin?: number;
  popconfirm?: {
    /**
     * 弹出层自定义样式
     */
    overlayStyle?: string | Record<string, string>;
    /**
     * 弹出层内部自定义样式
     */
    overlayInnerStyle?: string | Record<string, string>;
    title: string;
    titleIcon?: string;
    /**
     * 标题图标自定义样式
     */
    titleIconStyle?: string | Record<string, string>;
    content: string;
    contentIcon?: string;
    /**
     * 正文图标自定义样式
     */
    contentIconStyle?: string | Record<string, string>;
    placement?: string;
    cancelText?: string;
    /**
     * 取消按钮自定义样式
     */
    cancelStyle?: string | Record<string, string>;
    confirmText?: string;
    /**
     * 确认按钮自定义样式
     */
    confirmStyle?: string | Record<string, string>;
  };
  disableFunc?: string;
  visibleFunc?: string;
  buttons?: {
    label?: string;
    event?: string;
    closePopover?: string;
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

interface DTCButtonState {
  showPopconfirm: boolean;
}

export default class DTCButton<RecordType extends DripTableRecordTypeBase> extends React.PureComponent<DTCButtonProps<RecordType>, DTCButtonState> {
  public static componentName: DTCButtonColumnSchema['component'] = 'button';
  public static schema: SchemaObject = {
    type: 'object',
    properties: {
      style: {
        anyOf: [
          { type: 'string' },
          {
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
        ],
      },
      mode: { enum: ['single', 'multiple'] },
      label: { type: 'string' },
      buttonType: { enum: ['primary', 'dashed', 'text', 'link'] },
      shape: { enum: ['circle', 'round'] },
      size: { enum: ['large', 'middle', 'small'] },
      danger: { type: 'boolean' },
      ghost: { type: 'boolean' },
      icon: { type: 'string' },
      iconPosition: { enum: ['left', 'right'] },
      event: { type: 'string' },
      closePopover: { type: 'string' },
      margin: { type: 'number' },
      popconfirm: {
        type: 'object',
        properties: {
          overlayStyle: {
            anyOf: [
              { type: 'string' },
              {
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
            ],
          },
          overlayInnerStyle: {
            anyOf: [
              { type: 'string' },
              {
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
            ],
          },
          title: { type: 'string' },
          titleIcon: { type: 'string' },
          titleIconStyle: DRIP_TABLE_GENERIC_CSS_SCHEMA,
          content: { type: 'string' },
          contentIcon: { type: 'string' },
          contentIconStyle: DRIP_TABLE_GENERIC_CSS_SCHEMA,
          placement: { type: 'string' },
          cancelText: { type: 'string' },
          cancelStyle: {
            anyOf: [
              { type: 'string' },
              {
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
            ],
          },
          confirmText: { type: 'string' },
          confirmStyle: {
            anyOf: [
              { type: 'string' },
              {
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
            ],
          },
        },
      },
      disableFunc: { type: 'string' },
      visibleFunc: { type: 'string' },
      buttons: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            label: { type: 'string' },
            event: { type: 'string' },
            closePopover: { type: 'string' },
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

  public state: DTCButtonState = {
    showPopconfirm: false,
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
    return finalizeString('pattern', options.label || '', this.props.record, this.props.recordIndex, this.props.ext);
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

  private getVisible(visibleFunc?: string): boolean {
    const { schema, record } = this.props;
    const { dataIndex } = schema;
    if (!visibleFunc) {
      return true;
    }
    return dataProcessValue(record, dataIndex, visibleFunc);
  }

  private getDisabled(disableFunc?: string): boolean {
    const { schema, record } = this.props;
    const { dataIndex } = schema;
    if (!disableFunc) {
      return this.props.disable ?? false;
    }
    return dataProcessValue(record, dataIndex, disableFunc);
  }

  private parseReactCSS(style?: string | Record<string, string>) {
    const { record, recordIndex, ext } = this.props;
    const styleObject = typeof style === 'string'
      ? safeExecute(style, { props: { record, recordIndex, ext } })
      : style;
    return parseReactCSS(styleObject);
  }

  public render() {
    const options = this.props.schema.options;
    if (!this.configured) {
      return <div style={{ color: 'red' }}>属性配置错误</div>;
    }
    if (options.mode === 'single') {
      if (!this.getVisible(options.visibleFunc)) {
        return null;
      }
      const wrapperEl = (
        <DripTableComponentContext.Consumer>
          {
            context => (
              <Button
                style={this.parseReactCSS(options.style)}
                type={options.buttonType}
                size={options.size}
                shape={options.shape}
                danger={options.danger}
                ghost={options.ghost}
                disabled={this.getDisabled(options.disableFunc)}
                icon={options.icon ? this.getIcon(options.icon) : void 0}
                iconPosition={options.iconPosition}
                onClick={() => {
                  if (options.popconfirm) {
                    this.setState({ showPopconfirm: true });
                    return;
                  }
                  if (this.props.preview) {
                    return;
                  }
                  if (options.event) {
                    this.props.fireEvent({ type: 'drip-button-click', payload: options.event });
                  }
                  if (options.closePopover) {
                    context.setState({ closePopover: options.closePopover });
                  }
                }}
              >
                { this.label }
              </Button>
            )
          }
        </DripTableComponentContext.Consumer>
      );
      if (options.popconfirm) {
        const popconfirm = options.popconfirm;
        const TitleIcon = popconfirm.titleIcon ? this.props.icons?.[popconfirm.titleIcon] : null;
        const ContentIcon = popconfirm.contentIcon ? this.props.icons?.[popconfirm.contentIcon] : null;
        return (
          <DripTableComponentContext.Consumer>
            {
              context => (
                <Tooltip
                  overlayStyle={{ ...this.parseReactCSS(popconfirm.overlayStyle), ...parseThemeCSS(context.info.schema.theme) }}
                  overlayInnerStyle={this.parseReactCSS(popconfirm.overlayInnerStyle)}
                  title={(
                    <div style={{ fontSize: '14px', fontWeight: '600', lineHeight: '22px' }}>
                      { TitleIcon ? <TitleIcon style={this.parseReactCSS(popconfirm.titleIconStyle)} /> : null }
                      { finalizeString('pattern', popconfirm.title, this.props.record, this.props.recordIndex, this.props.ext) }
                    </div>
                  )}
                  overlay={(
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '400', lineHeight: '22px', marginTop: '4px' }}>
                        { ContentIcon ? <ContentIcon style={this.parseReactCSS(popconfirm.contentIconStyle)} /> : null }
                        { finalizeString('pattern', popconfirm.content, this.props.record, this.props.recordIndex, this.props.ext) }
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                        {
                          popconfirm.cancelText
                            ? (
                              <Button
                                style={this.parseReactCSS(popconfirm.cancelStyle)}
                                size="small"
                                onClick={() => {
                                  this.setState({ showPopconfirm: false });
                                }}
                              >
                                { popconfirm.cancelText }
                              </Button>
                            )
                            : null
                        }
                        <Button
                          style={{ marginLeft: '10px', ...this.parseReactCSS(popconfirm.confirmStyle) }}
                          type="primary"
                          size="small"
                          shape={options.shape}
                          danger={options.danger}
                          ghost={options.ghost}
                          onClick={() => {
                            if (options.event) {
                              this.props.fireEvent({ type: 'drip-button-click', payload: options.event });
                            }
                            this.setState({ showPopconfirm: false });
                          }}
                        >
                          { popconfirm.confirmText || 'Yes' }
                        </Button>
                      </div>
                    </div>
                  )}
                  visible={this.state.showPopconfirm}
                  onVisibleChange={(visible) => {
                    this.setState({ showPopconfirm: visible });
                  }}
                  trigger="click"
                  placement={popconfirm.placement}
                >
                  { wrapperEl }
                </Tooltip>
              )
            }
          </DripTableComponentContext.Consumer>
        );
      }
      return wrapperEl;
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
          { finalizeString('pattern', config.label || '', this.props.record, this.props.recordIndex, this.props.ext) }
        </Button>
      ));
    }
    return null;
  }
}
