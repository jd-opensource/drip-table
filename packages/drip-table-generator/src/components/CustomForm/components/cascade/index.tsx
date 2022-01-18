/**
 * This file is part of the jd-mkt5 launch.
 * @link     : https://ace.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { Cascader as Cascade } from 'antd';
import React from 'react';

import { DTGComponentPropertySchema } from '@/typing';

type CascadeProps = React.ComponentProps<typeof Cascade>;

interface Props {
  schema: DTGComponentPropertySchema;
  value?: CascadeProps['value'];
  onChange?: (value: CascadeProps['value']) => void;
  onValidate?: (errorMessage: string) => void;
}

export default class CascadeComponent extends React.PureComponent<Props> {
  public render() {
    const config = this.props.schema;
    const uiProps = this.props.schema['ui:props'] || {};

    return (
      <Cascade
        {...uiProps}
        options={uiProps.options as CascadeProps['options']}
        defaultValue={config.default as CascadeProps['defaultValue']}
        value={this.props.value}
        displayRender={uiProps.displayRender as CascadeProps['displayRender']}
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
