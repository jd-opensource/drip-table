/**
 * This file is part of the jd-mkt5 launch.
 * @link     : https://ace.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import React from 'react';
import { InputNumber } from 'antd';
import { DTGComponentPropertySchema } from '@/typing';

interface Props {
  schema: DTGComponentPropertySchema;
  value?: number;
  onChange?: (value: number) => void;
  onValidate?: (errorMessage: string) => void;
}

export default class InputNumberComponent extends React.PureComponent<Props> {
  public render() {
    const config = this.props.schema;
    const uiProps = this.props.schema['ui:props'] || {};

    return (
      <InputNumber<number>
        {...uiProps}
        max={uiProps.max as number}
        min={uiProps.min as number}
        precision={uiProps.precision as number}
        value={this.props.value}
        placeholder={uiProps.placeholder as string}
        disabled={uiProps.disabled as boolean}
        style={{ width: 420, ...uiProps.style }}
        onChange={(value) => {
          this.props.onChange?.(value);
          if (config.validate) {
            const res = config.validate(value);
            (res instanceof Promise ? res : Promise.resolve(res))
              .then((msg) => {
                this.props.onValidate?.(msg);
                return msg;
              })
              .catch((error) => { throw error; });
          }
        }}
      />
    );
  }
}
