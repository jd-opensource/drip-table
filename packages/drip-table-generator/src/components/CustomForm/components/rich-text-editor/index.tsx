/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import 'react-quill/dist/quill.snow.css';

import React from 'react';
import ReactQuill from 'react-quill';

import { DTGComponentBaseProperty } from '..';

interface Props extends DTGComponentBaseProperty<string> {}

export default class RichTextEditorComponent extends React.PureComponent<Props> {
  public static componentName = 'rich-text-editor';

  public get modules() {
    return {
      toolbar: [
        [{ font: [] }, { size: [] }],
        [{ align: [] }, 'direction'],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ script: 'super' }, { script: 'sub' }],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'video'],
        ['clean'],
      ],
    };
  }

  public render() {
    const uiProps = this.props.schema['ui:props'] || {};

    return (
      <div style={uiProps.style}>
        <ReactQuill
          theme="snow"
          modules={this.modules}
          value={this.props.value}
          onChange={(value) => {
            this.props.onChange?.(value);
          }}
        />
      </div>
    );
  }
}
