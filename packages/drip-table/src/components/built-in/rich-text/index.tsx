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
    type: 'object',
    properties: {
      render: { type: 'string' },
      tooltip: { type: 'string' },
    },
    required: ['render'],
  };

  private renderInfoCircle = () => (
    <span role="img" aria-label="info-circle">
      <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" />
      </svg>
    </span>
  );

  private renderToolTip = () => {
    const Tooltip = this.props.driver.components.Tooltip;

    const { tooltip } = this.props.schema.options;
    if (tooltip) {
      return (
        <div style={{ marginLeft: 8 }}>
          <Tooltip title={finalizeString('pattern', tooltip, this.props.data)}>
            { this.renderInfoCircle() }
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
      return (
        <div className={styles['rich-text-container']}>
          <ErrorBoundary driver={this.props.driver}><RichText html={html || ''} style={{ wordBreak: 'break-all' }} /></ErrorBoundary>
          { this.renderToolTip() }
        </div>
      );
    } catch (error) {
      console.error(error);
    }
    return <Alert message="渲染异常" showIcon type="error" />;
  }
}
