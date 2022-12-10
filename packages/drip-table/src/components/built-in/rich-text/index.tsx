/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import React from 'react';

import { DripTableColumnSchema, DripTableRecordTypeBase, SchemaObject } from '@/types';
import ErrorBoundary from '@/components/error-boundary';
import RichText from '@/components/rich-text';

import { DripTableComponentProps } from '../component';
import { finalizeString } from '../utils';

import styles from './index.module.less';

export type DTCRichTextColumnSchema = DripTableColumnSchema<'rich-text', {
  render: string;
  tooltip?: string;
}>;

interface DTCRichTextProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, DTCRichTextColumnSchema> { }

interface DTCRichTextState { }

export default class DTCRichText<RecordType extends DripTableRecordTypeBase> extends React.PureComponent<DTCRichTextProps<RecordType>, DTCRichTextState> {
  public static componentName: DTCRichTextColumnSchema['component'] = 'rich-text';
  public static schema: SchemaObject = {
    properties: {
      render: { type: 'string' },
      tooltip: { type: 'string' },
    },
    required: ['render'],
  };

  private renderToolTip = () => {
    const Tooltip = this.props.driver.components.Tooltip;
    const { InfoCircleOutlined } = this.props.driver.icons;

    const { tooltip } = this.props.schema.options;
    if (tooltip) {
      return (
        <div style={{ marginLeft: 8 }}>
          <Tooltip title={finalizeString('pattern', tooltip, this.props.data)}>
            <InfoCircleOutlined />
          </Tooltip>
        </div>

      );
    }
    return null;
  };

  public render(): JSX.Element {
    const { data, schema: { options } } = this.props;
    const { Alert } = this.props.driver.components;
    try {
      const html = options.render.replace(
        /\{\{(.+?)\}\}/guis, (s, s1) =>
          finalizeString('script', `return ${s1}`, data),
      );
      if (typeof html === 'object') {
        return (
          <div>{ Object.prototype.toString.call(html) }</div>
        );
      }
      return (
        <div className={styles['rich-text-container']}>
          <ErrorBoundary driver={this.props.driver}><RichText html={html || ''} /></ErrorBoundary>
          { this.renderToolTip() }
        </div>
      );
    } catch (error) {
      console.error(error);
    }
    return <Alert message="渲染异常" showIcon type="error" />;
  }
}
