/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DripTableColumnSchema, DripTableComponentProps, DripTableRecordTypeBase, indexValue } from 'drip-table';
import React from 'react';

export type TextColumnSchema = DripTableColumnSchema<'custom::TextComponent', {
  /** 字体大小 */
  fontSize?: string;
  /** 兜底文案 */
  noDataValue?: string;
}>;

interface TextProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, TextColumnSchema> { }

interface TextState {}

export default class TextComponent<RecordType extends DripTableRecordTypeBase> extends React.PureComponent<TextProps<RecordType>, TextState> {
  private get fontSize() {
    let fontSize = String(this.props.schema.options.fontSize || '').trim();
    if ((/^[0-9]+$/uig).test(fontSize)) {
      fontSize += 'px';
    }
    return fontSize;
  }

  public render(): JSX.Element {
    const { schema, data } = this.props;
    const { dataIndex,
      options: { noDataValue } } = schema;
    const value = indexValue(data, dataIndex, '');
    const contentStr = `${value || noDataValue}`;
    return (
      <div style={{ fontSize: this.fontSize, color: '#6d0fff' }}>
        { contentStr }
      </div>
    );
  }
}
