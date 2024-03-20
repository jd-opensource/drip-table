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
import Col from '@/components/react-components/col';
import Row from '@/components/react-components/row';
import Tooltip from '@/components/react-components/tooltip';
import { type ExtractDripTableExtraOption, TABLE_LAYOUT_COLUMN_RENDER_GENERATOR_DO_NOT_USE_IN_PRODUCTION as columnRenderGenerator } from '@/index';
import { type DripTableColumnRenderOptions } from '@/layouts/table/types';

import { DripTableBuiltInColumnSchema } from '..';
import { DripTableComponentProps } from '../component';

export type DTCGroupColumnSchema<CustomColumnSchema extends DripTableDataColumnSchema = never> = DripTableColumnSchema<'group', {
  /**
   * 布局配置：水平排列对齐方式
   */
  horizontalAlign?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  /**
   * 布局配置：垂直排列对齐方式
   */
  verticalAlign?: 'top' | 'middle' | 'bottom';
  /**
   * 布局配置：每行列数
   */
  layout: number[];
  /**
   * 布局配置：行列间隔
   */
  gutter?: [number, number];
  /**
   * 布局配置：是否自动换行
   */
  wrap?: boolean;
  /**
   * 布局配置：列偏移
   */
  offset?: number[];
  /**
   * 每个栅格栏的配置
   */
  items: (DripTableBuiltInColumnSchema<CustomColumnSchema> | CustomColumnSchema | null)[];
  /**
   * 悬浮框配置
   */
  popover?: {
    /**
     * 自定义样式
     */
    style?: React.CSSProperties;
    /**
     * 触发器
     */
    trigger?: 'click' | 'hover';
    /**
     * 提示文案显示位置
     */
    placement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
    /**
     * 渲染 Schema
     */
    schema: (DripTableBuiltInColumnSchema<CustomColumnSchema> | CustomColumnSchema);
  };
}>;

interface DTCGroupProps<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> extends DripTableComponentProps<RecordType, DTCGroupColumnSchema<ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>>> {
}

interface DTCGroupState {}

export default class DTCGroup<
RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
> extends React.PureComponent<DTCGroupProps<RecordType, ExtraOptions>, DTCGroupState> {
  public static componentName: DTCGroupColumnSchema<DripTableExtraOptions['CustomColumnSchema']>['component'] = 'group';
  public static schema: SchemaObject = {
    type: 'object',
    properties: {
      horizontalAlign: { enum: ['start', 'end', 'center', 'space-around', 'space-between'] },
      verticalAlign: { enum: ['top', 'middle', 'bottom'] },
      layout: { type: 'array', items: { type: 'number' } },
      gutter: { type: 'array', items: { type: 'number' } },
      wrap: { type: 'boolean' },
      offset: { type: 'array', items: { type: 'number' } },
      items: {
        type: 'array',
        items: {},
      },
      popover: {
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
          schema: {},
        },
        required: ['schema'],
      },
    },
  };

  /**
   * 根据组件类型，生成表格渲染器
   * @param schema Schema
   * @returns 表格
   */
  public renderGenerator(schema: DripTableBuiltInColumnSchema<ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>> | ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>): React.ReactNode {
    const { tableInfo, extraProps } = this.props.ext as DripTableColumnRenderOptions<RecordType, ExtraOptions>;
    const render = columnRenderGenerator(tableInfo, schema, extraProps);
    return render(null, { type: 'body', key: schema.key, index: this.props.recordIndex, record: this.props.record }, 0);
  }

  public renderCell(row: number, col: number) {
    const schema = this.props.schema;
    const schemaItems = schema.options.items ?? [];
    let index = 0;
    for (let i = 0; i < row; i++) {
      index += schema.options.layout[i];
    }
    index += col;
    const schemaItem = schemaItems[index];
    return schemaItem ? this.renderGenerator(schemaItem) : null;
  }

  public render() {
    const options = this.props.schema.options;
    const rowLength = options.layout?.length;
    const rows = [...Array.from({ length: rowLength }).keys()];
    let el = (
      <div style={{ wordBreak: 'break-word' }}>
        {
          rows.map((row, index) => (
            <Row
              key={index}
              style={{
                marginTop: options.gutter?.[1],
                marginBottom: options.gutter?.[1],
              }}
              gutter={options.gutter}
              justify={options.horizontalAlign}
              align={options.verticalAlign}
              wrap={options.wrap}
            >
              { options.layout[index]
              && [...Array.from({ length: options.layout[index] || 1 }).keys()]
                .map(col => (
                  <Col
                    key={col}
                    gutter={options.gutter}
                    style={{
                      ...col ? void 0 : { marginLeft: 0 },
                      wordBreak: 'break-word',
                    }}
                  >
                    { this.renderCell(Number(row), Number(col)) }
                  </Col>
                )) }
            </Row>
          ))
        }
      </div>
    );
    if (options.popover) {
      el = (
        <Tooltip
          trigger={options.popover.trigger}
          title={(
            <div
              style={options.popover.style}
            >
              { this.renderGenerator(options.popover.schema) }
            </div>
          )}
          placement={options.popover.placement}
        >
          { el }
        </Tooltip>
      );
    }
    return el;
  }
}
