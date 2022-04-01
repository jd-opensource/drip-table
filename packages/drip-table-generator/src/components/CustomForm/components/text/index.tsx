/**
 * This file is part of the jd-mkt5 launch.
 * @link     : https://ace.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { Input } from 'antd';
import React from 'react';

import { StringDataSchema } from '@/typing';

import { DTGComponentBaseProperty } from '..';

interface Props extends DTGComponentBaseProperty<string> {
}

const TextArea = Input.TextArea;

export default class TextComponent extends React.PureComponent<Props> {
  public static componentName = 'text';

  private transform(value: string) {
    const transform = (this.props.schema as StringDataSchema).transform;
    if (transform) {
      transform.forEach((transformType) => {
        if (transformType === 'trim') {
          value = value.trim();
        } else if (transformType === 'toLowerCase') {
          value = value.toLowerCase();
        } else if (transformType === 'toUpperCase') {
          value = value.toUpperCase();
        }
      });
    }
    return value;
  }

  public render() {
    const config = this.props.schema;
    const uiProps = this.props.schema['ui:props'] || {};

    return (
      <TextArea
        value={this.props.value as string}
        placeholder={uiProps.placeholder as string}
        disabled={uiProps.disabled as boolean}
        style={{ width: 420, ...uiProps.style }}
        autoSize={{
          minRows: uiProps.minRows as number,
          maxRows: uiProps.maxRows as number,
        }}
        onChange={(e) => {
          const formattedValue = this.transform(e.target.value);
          this.props.onChange?.(formattedValue);
          if (config.validate) {
            const res = config.validate(formattedValue);
            (res instanceof Promise ? res : Promise.resolve(res))
              .then((message) => {
                this.props.onValidate?.(message);
                return message;
              })
              .catch((error) => { throw error; });
          }
        }}
      />
    );
  }
}
