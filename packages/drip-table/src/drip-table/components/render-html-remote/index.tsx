/**
 * This file is part of the drip-table project.
 * @link     : https://ace.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import React from 'react';

import { DripTableRecordTypeBase } from '@/types';
import RichText from '@/components/rich-text';

import { DripTableComponentProps, DripTableComponentSchema } from '../component';

const CACHE_RENDERER = new Map<string, Promise<string>>();

export interface DTCRenderHTMLRemoteSchema extends DripTableComponentSchema {
  url: string;
}

interface DTCRenderHTMLRemoteProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, DTCRenderHTMLRemoteSchema> { }

interface DTCRenderHTMLRemoteState {
  render: string;
}

export default class DTCRenderHTMLRemote<RecordType extends DripTableRecordTypeBase> extends React.PureComponent<DTCRenderHTMLRemoteProps<RecordType>, DTCRenderHTMLRemoteState> {
  public static componentName: 'render-html-remote' = 'render-html-remote';

  public state = {
    render: '',
  };

  private async fetch() {
    const url = this.props.schema.url;
    if (!CACHE_RENDERER.has(url)) {
      CACHE_RENDERER.set(url, new Promise((resolve, reject) => {
        fetch(url)
          .then(res => res.text())
          .then((res) => {
            resolve(res);
            return res;
          })
          .catch((error) => {
            CACHE_RENDERER.delete(url);
            throw error;
          });
      }));
    }
    const promise = CACHE_RENDERER.get(url);
    if (promise) {
      const render = await promise;
      if (this.props.schema.url === url) {
        this.setState({ render });
      }
    }
  }

  public componentDidMount() {
    this.fetch();
  }

  public componentDidUpdate(prevProps: DTCRenderHTMLRemoteProps<RecordType>) {
    if (this.props.schema.url !== prevProps.schema.url) {
      this.fetch();
    }
  }

  public render(): JSX.Element {
    if (!this.state.render) {
      return <div>Loading</div>;
    }
    try {
      const html = new Function('rec', this.state.render)(this.props.data);
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
