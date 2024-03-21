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
import { type ExtractDripTableExtraOption, TABLE_LAYOUT_COLUMN_RENDER_GENERATOR_DO_NOT_USE_IN_PRODUCTION as columnRenderGenerator } from '@/index';
import { type DripTableColumnRenderOptions } from '@/layouts/table/types';

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

  /**
   * 根据组件类型，生成表格渲染器
   * @param schema Schema
   * @returns 表格
   */
  public schemaRender(schema: DripTableBuiltInColumnSchema<ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>> | ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>): React.ReactNode {
    const { tableInfo, extraProps } = this.props.ext as DripTableColumnRenderOptions<RecordType, ExtraOptions>;
    const render = columnRenderGenerator(tableInfo, schema, extraProps);
    return render(null, { type: 'body', key: schema.key, index: this.props.recordIndex, record: this.props.record }, 0);
  }

  public renderContent() {
    const options = this.props.schema.options;
    return this.schemaRender(options.content);
  }

  public render() {
    const options = this.props.schema.options;
    return (
      <Tooltip
        trigger={options.trigger}
        title={(
          <div
            style={options.style}
          >
            { this.schemaRender(options.popover) }
          </div>
        )}
        placement={options.placement}
      >
        <div>
          { this.schemaRender(options.content) }
        </div>
      </Tooltip>
    );
  }
}
