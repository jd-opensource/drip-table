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
import { parseCSS } from '@/utils/dom';
import { safeExecute } from '@/utils/sandbox';
import Col from '@/components/react-components/col';
import Row from '@/components/react-components/row';
import { type ExtractDripTableExtraOption } from '@/index';

import { DripTableBuiltInColumnSchema } from '..';
import { DripTableComponentProps } from '../component';

export type DTCGroupColumnSchema<CustomColumnSchema extends DripTableDataColumnSchema = never> = DripTableColumnSchema<'group', {
  /**
   * 自定义样式
   */
  style?: string | Record<string, string>;
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
  items: (DripTableBuiltInColumnSchema<CustomColumnSchema> | CustomColumnSchema | null)[] | {
    style?: React.CSSProperties;
    schema: (DripTableBuiltInColumnSchema<CustomColumnSchema> | CustomColumnSchema | null);
  }[];
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
    },
  };

  private get rowItems(): {
    style?: React.CSSProperties;
    schema: (DripTableBuiltInColumnSchema<ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>> | ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'> | null);
  }[][] {
    const options = this.props.schema.options;
    const items = options.items.map((item) => {
      if (!item || 'component' in item) {
        return { schema: item };
      }
      return item;
    });
    let startIndex = 0;
    return options.layout.map((columnLength) => {
      const columnItems = items.slice(startIndex, startIndex + columnLength);
      startIndex += columnLength;
      return columnItems;
    });
  }

  private parseStyle(style?: string | Record<string, string>) {
    const { record, recordIndex, ext } = this.props;
    const styleObject = typeof style === 'string'
      ? safeExecute(style, { props: { record, recordIndex, ext } })
      : style;
    return parseCSS(styleObject);
  }

  public render() {
    const { record, recordIndex, renderSchema } = this.props;
    const options = this.props.schema.options;
    return (
      <div style={{ wordBreak: 'break-word', ...this.parseStyle(options.style) }}>
        {
          this.rowItems.map((columnItems, rowIndex) => (
            <Row
              key={rowIndex}
              style={{
                marginTop: options.gutter?.[1],
                marginBottom: options.gutter?.[1],
              }}
              gutter={options.gutter}
              justify={options.horizontalAlign}
              align={options.verticalAlign}
              wrap={options.wrap}
            >
              {
                columnItems
                  .map((item, columnIndex) => (
                    <Col
                      key={columnIndex}
                      gutter={options.gutter}
                      style={{
                        ...columnIndex ? void 0 : { marginLeft: 0 },
                        wordBreak: 'break-word',
                        ...item.style,
                      }}
                    >
                      { item.schema ? renderSchema(item.schema, record, recordIndex) : null }
                    </Col>
                  ))
              }
            </Row>
          ))
        }
      </div>
    );
  }
}
