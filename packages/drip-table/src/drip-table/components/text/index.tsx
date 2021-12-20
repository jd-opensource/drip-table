/**
 * This file is part of the drip-table project.
 * @link     : https://ace.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import React from 'react';
import { DripTableRecordTypeBase } from '@/types';

import { DripTableComponentProps, DripTableComponentSchema } from '../component';
import styles from './index.module.less';

export interface DTCTextSchema extends DripTableComponentSchema {
  'ui:type': 'text';
  /** 字体大小 */
  fontSize?: string;
  /** 最大行数，超出展示... */
  maxRow?: number;
  /** 行高 */
  lineHeight?: number;
  /** 展示模式：单行文本、多行文本、自定义文本 */
  mode?: 'single' | 'multiple' | 'custom';
  /** 自定义文本 -- 渲染格式/代码 */
  format?: string;
  /** 兜底文案 */
  noDataValue?: string;
  /** 前缀文案 */
  prefix?: string;
  /** 后缀文案 */
  suffix?: string;
  enumValue?: string[];
  enumLabel?: string[];
  tooltip?: boolean | string;
  ellipsis?: boolean;
  /** 字段配置 */
  params?: {
    dataIndex: string;
    /** 前缀文案 */
    prefix?: string;
    /** 后缀文案 */
    suffix?: string;
    enumValue?: string[];
    enumLabel?: string[];
    tooltip?: boolean | string;
  }[];
}

interface DTCTextProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, DTCTextSchema> { }

interface DTCTextState {}

export default class DTCText<RecordType extends DripTableRecordTypeBase> extends React.PureComponent<DTCTextProps<RecordType>, DTCTextState> {
  private get configured() {
    const schema = this.props.schema;
    if (schema.mode === 'custom') {
      if (schema.format) {
        return true;
      }
      return false;
    }
    if (schema.mode === 'multiple') {
      if (schema.params) {
        return schema.params.length > 0;
      }
      return false;
    }
    if (schema.mode === 'single') {
      if (typeof schema.dataIndex === 'object') {
        return Object.keys(schema.dataIndex).length > 0;
      }
      return !!schema.dataIndex;
    }
    return false;
  }

  private get fontSize() {
    let fontSize = String(this.props.schema.fontSize || '').trim();
    if ((/^[0-9]+$/uig).test(fontSize)) {
      fontSize += 'px';
    }
    return fontSize;
  }

  public get classNames() {
    const schema = this.props.schema;
    let classNames = styles['word-break'];
    if (schema.ellipsis) {
      classNames += ` ${styles['word-ellipsis']}`;
    }
    if (schema.maxRow) {
      classNames += ` ${styles['max-row']}`;
    }
    return classNames;
  }

  private get lineHeight() {
    return this.props.schema.lineHeight || 1.5;
  }

  public get styles(): React.CSSProperties {
    const schema = this.props.schema;
    const wrapperStyles: React.CSSProperties = {
      fontSize: this.fontSize,
      lineHeight: this.lineHeight,
    };
    if (schema.maxRow) {
      wrapperStyles.WebkitLineClamp = schema.maxRow;
      wrapperStyles.maxHeight = `${schema.maxRow * this.lineHeight}em`;
    }
    return wrapperStyles;
  }

  public render(): JSX.Element {
    const { schema, data } = this.props;
    const { mode,
      dataIndex,
      noDataValue,
      format,
      prefix,
      suffix,
      params,
      enumValue,
      enumLabel,
      tooltip } = schema;
    if (!this.configured) {
      return <div style={{ color: 'red' }}>未配置字段</div>;
    }
    if (mode === 'custom') {
      return (
        <pre style={{ fontSize: this.fontSize }}>
          {
            (format || '')
              .replace(/\{\{(.+?)\}\}/uig, (s, s1) => {
                try {
                  const text = new Function('rec', `return ${s1}`)(data);
                  if (typeof text === 'string') {
                    return text;
                  }
                  return JSON.stringify(text);
                } catch {}
                return '';
              })
          }
        </pre>
      );
    }
    if (mode === 'single') {
      const noDataStr = noDataValue || '';
      let value = data[dataIndex as string];
      if (enumValue && enumLabel && typeof value === 'string') {
        const index = enumValue.indexOf(value);
        value = enumLabel[index];
      }
      const contentStr = `${prefix || ''} ${value || noDataStr} ${suffix || ''}`;
      const Tooltip = this.props.driver.components.Tooltip;
      return (
        <div style={this.styles} className={this.classNames}>
          { tooltip
            ? (
              <Tooltip title={typeof tooltip === 'string' ? tooltip : contentStr} placement="top">
                { contentStr }
              </Tooltip>
            )
            : contentStr }
        </div>
      );
    }
    if (mode === 'multiple') {
      const noDataStr = noDataValue || '';
      const Tooltip = this.props.driver.components.Tooltip;
      return (
        <div style={this.styles} className={this.classNames}>
          { (params || []).map((config, i) => {
            let value = data[config.dataIndex];
            if (enumValue && enumLabel && typeof value === 'string') {
              const index = enumValue.indexOf(value);
              value = enumLabel[index];
            }
            const contentStr = `${config.prefix || ''} ${value || noDataStr} ${config.suffix || ''}`;
            return (
              <div key={i}>
                { tooltip
                  ? (
                    <Tooltip title={typeof tooltip === 'string' ? tooltip : contentStr} placement="top">
                      { contentStr }
                    </Tooltip>
                  )
                  : contentStr }
              </div>
            );
          }) }
        </div>
      );
    }
    return <div />;
  }
}
