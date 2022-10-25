/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { InputNumber } from 'antd';
import React from 'react';

import { DTGComponentBaseProperty } from '..';

interface Props extends DTGComponentBaseProperty<number | undefined> {
}

export default class InputNumberComponent extends React.PureComponent<Props> {
  public static componentName = 'number';

  public render() {
    const config = this.props.schema;
    const uiProps = this.props.schema['ui:props'] || {};

    return (
      <InputNumber
        {...uiProps}
        max={uiProps.max as number}
        min={uiProps.min as number}
        precision={uiProps.precision as number}
        value={this.props.value}
        placeholder={uiProps.placeholder as string}
        disabled={uiProps.disabled as boolean}
        style={{ width: 120, ...uiProps.style }}
        onChange={(value) => {
          const formedValue = value === void 0 || value === null ? void 0 : Number(value);
          this.props.onChange?.(formedValue);
          if (config.validate) {
            const res = config.validate(formedValue);
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
