/**
 * This file is part of the drip-table project.
 * @link     : https://ace.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import React from 'react';

import { DripTableColumnSchema, DripTableRecordTypeBase } from '@/types';
import RichText from '@/components/rich-text';

import { DripTableComponentProps } from '../component';

export type DTCRenderHTMLColumnSchema = DripTableColumnSchema<'render-html', {
  render: string;
}>;

interface DTCRenderHTMLProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, DTCRenderHTMLColumnSchema> { }

interface DTCRenderHTMLState { }

export default class DTCRenderHTML<RecordType extends DripTableRecordTypeBase> extends React.PureComponent<DTCRenderHTMLProps<RecordType>, DTCRenderHTMLState> {
  public static componentName: DTCRenderHTMLColumnSchema['component'] = 'render-html';

  public render(): JSX.Element {
    const { data, schema: { options } } = this.props;
    try {
      const html = new Function('rec', options.render)(data);
      if (typeof html === 'object') {
        return (
          <div>{ Object.prototype.toString.call(html) }</div>
        );
      }
      return <RichText html={html || ''} />;
    } catch (error) {
      console.error(error);
    }
    return <div style={{ color: 'red' }}>渲染异常</div>;
  }
}
