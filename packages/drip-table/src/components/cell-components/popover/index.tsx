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
import Tooltip from '@/components/react-components/tooltip';
import { type ExtractDripTableExtraOption } from '@/index';

import { DripTableBuiltInColumnSchema } from '..';
import { DripTableComponentProps } from '../component';

export type DTCPopoverColumnSchema<CustomColumnSchema extends DripTableDataColumnSchema = never> = DripTableColumnSchema<'popover', {
  /**
   * 悬浮框自定义样式
   */
  style?: React.CSSProperties;
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

interface DTCPopoverState {}

export default class DTCPopover<
RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
> extends React.PureComponent<DTCPopoverProps<RecordType, ExtraOptions>, DTCPopoverState> {
  public static componentName: DTCPopoverColumnSchema<DripTableExtraOptions['CustomColumnSchema']>['component'] = 'popover';
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
      trigger: { enum: ['click', 'hover'] },
      placement: { enum: ['top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom'] },
      popover: {},
      content: {},
    },
    required: ['popover', 'content'],
  };

  public render() {
    const { record, recordIndex, renderSchema } = this.props;
    const options = this.props.schema.options;
    return (
      <Tooltip
        trigger={options.trigger}
        title={(
          <div
            style={options.style}
          >
            { renderSchema(options.popover, record, recordIndex) }
          </div>
        )}
        placement={options.placement}
      >
        <div>
          { renderSchema(options.content, record, recordIndex) }
        </div>
      </Tooltip>
    );
  }
}
