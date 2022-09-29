/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { Input } from 'antd';
import React from 'react';

import { StringDataSchema } from '@/typing';

import { DTGComponentBaseProperty } from '..';

interface Props extends DTGComponentBaseProperty<string> {}

export default class InputComponent extends React.PureComponent<Props> {
  public static componentName = 'input';

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
      <Input
        {...uiProps}
        value={this.props.value as string}
        placeholder={uiProps.placeholder as string}
        disabled={uiProps.disabled as boolean}
        style={{ width: 120, ...uiProps.style }}
        onChange={(e) => {
          const value = this.transform(e.target.value);
          this.props.onChange?.(value);
          if (config.validate) {
            const res = config.validate(value);
            (res instanceof Promise ? res : Promise.resolve(res))
              .then((msg) => {
                this.props.onValidate?.(msg);
                return msg;
              })
              .catch((error: unknown) => { throw error; });
          }
        }}
      />
    );
  }
}
