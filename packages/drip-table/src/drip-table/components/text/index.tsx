/**
 * This file is part of the jd-mkt5 launch.
 * @link     : https://ace.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import classnames from 'classnames';
import React from 'react';

import { DripTableRecordTypeBase } from '@/types';
import { indexValue, stringify } from '@/drip-table/utils';

import { DripTableComponentProps, DripTableComponentSchema } from '../component';

import styles from './index.module.less';

export interface DTCTextSchema extends DripTableComponentSchema {
  dataIndex: string | string[];
  /**
   * 字体大小
   */
  fontSize?: string;
  /**
   * 展示模式：
   * {'single'}   单行文本；
   * {'multiple'} 多行文本；
   * {'custom'}   自定义文本；
   */
  mode?: 'single' | 'multiple' | 'custom';
  /**
   * 自定义格式化字符串
   */
  format?: string;
  /**
   * 内容展示翻译文案
   */
  i18n?: Record<string, string>;
  /**
   * 兜底文案
   */
  defaultValue?: string;
  /**
   * 前缀文案
   */
  prefix?: string;
  /**
   * 后缀文案
   */
  suffix?: string;
  /**
   * 多行文本段落配置
   */
  parts?: {
    dataIndex: string | string[];
    /**
     * 内容展示翻译文案
     */
    i18n?: Record<string, string>;
    /**
     * 前缀文案
     */
    prefix?: string;
    /**
     * 后缀文案
     */
    suffix?: string;
  }[];
  /**
   * 最大行数
   */
  maxRow?: number;
  /**
   *  行高
   */
  lineHeight?: number;
  /**
   * 超出部分显示省略号
   */
  ellipsis?: boolean;
}

interface DTCTextProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, DTCTextSchema> { }

interface DTCTextState {}

const translate = (i18n: Record<string, string> | undefined, origin: string) => {
  if (typeof origin === 'string' && i18n && origin in i18n) {
    return i18n[origin];
  }
  return origin;
};

export default class DTCText<RecordType extends DripTableRecordTypeBase> extends React.PureComponent<DTCTextProps<RecordType>, DTCTextState> {
  public static componentName: 'text' = 'text';

  private get configured() {
    const schema = this.props.schema;
    if (schema.mode === 'custom') {
      if (schema.format) {
        return true;
      }
      return false;
    }
    if (schema.mode === 'multiple') {
      if (schema.parts) {
        return schema.parts.length > 0;
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

  private get lineHeight() {
    return this.props.schema.lineHeight || 1.5;
  }

  private get wrapperClassName(): string | null {
    const maxRow = this.props.schema.maxRow;
    const classNames: string[] = [];
    if (this.props.schema.ellipsis) {
      classNames.push(styles['text-ellipsis']);
    }
    if (maxRow) {
      classNames.push(styles['max-row']);
    }
    return classnames(classNames);
  }

  private get rawTextStyles(): React.CSSProperties {
    const lineHeight = this.lineHeight;
    const textStyles: React.CSSProperties = {
      fontSize: this.fontSize,
      lineHeight,
    };
    return textStyles;
  }

  private get wrapperStyles(): React.CSSProperties {
    const rawTextStyles = this.rawTextStyles;
    const maxRow = this.props.schema.maxRow;
    const lineHeight = this.lineHeight;
    const wrapperStyles: React.CSSProperties = Object.assign({}, rawTextStyles);
    if (maxRow) {
      wrapperStyles.WebkitLineClamp = maxRow;
      wrapperStyles.maxHeight = `${maxRow * lineHeight}em`;
    }
    return wrapperStyles;
  }

  private get rawText(): string[] {
    const { schema, data } = this.props;
    const { mode, dataIndex, defaultValue, format, prefix, suffix, parts: params } = schema;
    if (mode === 'custom') {
      return (format || '')
        .replace(/\{\{(.+?)\}\}/guis, (s, s1) => {
          try {
            return stringify(new Function('rec', `return ${s1}`)(data));
          } catch (error) {
            return error instanceof Error
              ? `{{Render Error: ${error.message}}}`
              : '{{Unknown Render Error}}';
          }
        })
        .split('\n');
    }
    if (mode === 'single') {
      return `${prefix ?? ''}${translate(schema.i18n, indexValue(data, dataIndex, defaultValue)) ?? ''}${suffix ?? ''}`.split('\n');
    }
    if (mode === 'multiple') {
      return (params || [])
        .map((config, i) => `${config.prefix || ''}${translate(config.i18n, indexValue(data, config.dataIndex, defaultValue)) ?? ''}${config.suffix || ''}`)
        .join('\n')
        .split('\n');
    }
    return [];
  }

  public render(): JSX.Element {
    const Tooltip = this.props.driver.components.Tooltip;
    const wrapperClassName = this.wrapperClassName;
    const wrapperStyles = this.wrapperStyles;
    if (!this.configured) {
      return <div style={{ color: 'red' }}>未配置字段</div>;
    }
    const rawTextEl: JSX.Element | JSX.Element[] = this.rawText.map((s, i) => <div key={i}>{ stringify(s) }</div>);
    const wrapperEl = <div className={classnames(wrapperClassName, styles['word-break'])} style={wrapperStyles}>{ rawTextEl }</div>;
    if (this.props.schema.maxRow) {
      return (
        <Tooltip title={<div className={styles['word-break']} style={this.rawTextStyles}>{ rawTextEl }</div>}>
          { wrapperEl }
        </Tooltip>
      );
    }
    return wrapperEl;
  }
}
