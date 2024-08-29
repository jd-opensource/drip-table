/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import React from 'react';

import {
  type DripTableColumnSchema,
  type DripTableDataColumnSchema,
  type DripTableExtraOptions,
  type DripTableRecordTypeBase,
  type DripTableRecordTypeWithSubtable,
  type SchemaObject,
} from '@/types';
import { parseReactCSS, parseThemeCSS } from '@/utils/dom';
import { DripTableComponentContext } from '@/components/cell-components/hooks';
import Tooltip from '@/components/react-components/tooltip';
import { type ExtractDripTableExtraOption } from '@/index';

import { DripTableBuiltInColumnSchema } from '..';
import { DripTableComponentProps } from '../component';

export type DTCPopoverColumnSchema<CustomColumnSchema extends DripTableDataColumnSchema = never> = DripTableColumnSchema<'popover', {
  /**
   * 悬浮框自定义样式
   */
  style?: string | Record<string, string>;
  /**
   * 弹出层自定义样式
   */
  overlayStyle?: string | Record<string, string>;
  /**
   * 弹出层内部自定义样式
   */
  overlayInnerStyle?: string | Record<string, string>;
  /**
   * 悬浮框触发器
   */
  trigger?: 'click' | 'hover';
  /**
   * 悬浮框显示位置
   */
  placement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
  /**
   * 悬浮框渲染 Schema
   */
  popover: DripTableBuiltInColumnSchema<CustomColumnSchema> | CustomColumnSchema;
  /**
   * 内容 Schema
   */
  content: DripTableBuiltInColumnSchema<CustomColumnSchema> | CustomColumnSchema;
}>;

interface DTCPopoverProps<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> extends DripTableComponentProps<RecordType, DTCPopoverColumnSchema<ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>>> {
}

interface DTCPopoverState {
  visible: boolean;
}

export default class DTCPopover<
RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
> extends React.PureComponent<DTCPopoverProps<RecordType, ExtraOptions>, DTCPopoverState> {
  public static componentName: DTCPopoverColumnSchema<DripTableExtraOptions['CustomColumnSchema']>['component'] = 'popover';
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
      trigger: { enum: ['click', 'hover'] },
      placement: { enum: ['top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom'] },
      popover: {},
      content: {},
    },
    required: ['popover', 'content'],
  };

  public state: DTCPopoverState = {
    visible: false,
  };

  private parseReactCSS(style?: string | Record<string, string>) {
    const { record, recordIndex, ext } = this.props;
    const styleObject = typeof style === 'string'
      ? this.props.safeEvaluate(style, { props: { record, recordIndex, ext } })
      : style;
    return parseReactCSS(styleObject);
  }

  public render() {
    const { record, recordIndex, renderSchema } = this.props;
    const options = this.props.schema.options;
    return (
      <DripTableComponentContext.Consumer>
        {
          (context) => {
            if (context.state.closePopover === this.props.schema.key) {
              setTimeout(() => { this.setState({ visible: false }); }, 1);
              setTimeout(() => { context.setState({ closePopover: null }); }, 2);
            }
            return (
              <Tooltip
                trigger={options.trigger}
                overlayStyle={{ ...this.parseReactCSS(options.overlayStyle), ...parseThemeCSS(context.info.schema.theme) }}
                overlayInnerStyle={this.parseReactCSS(options.overlayInnerStyle)}
                title={(
                  <div
                    style={this.parseReactCSS(options.style)}
                  >
                    { renderSchema(options.popover, record, recordIndex) }
                  </div>
                )}
                placement={options.placement}
                visible={this.state.visible}
                onVisibleChange={v => this.setState({ visible: v })}
              >
                <div>
                  { renderSchema(options.content, record, recordIndex) }
                </div>
              </Tooltip>
            );
          }
        }
      </DripTableComponentContext.Consumer>
    );
  }
}
