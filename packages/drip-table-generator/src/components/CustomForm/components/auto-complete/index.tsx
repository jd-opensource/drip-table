/**
 * This file is part of the jd-mkt5 launch.
 * @link     : https://ace.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import React from 'react';
import { AutoComplete, Select } from 'antd';
import { StringDataSchema } from 'drip-table';
import { DTGComponentPropertySchema } from '@/typing';

interface Props {
  schema: DTGComponentPropertySchema;
  value?: string;
  onChange?: (value: string) => void;
  onValidate?: (errorMessage: string) => void;
}

type LabeledValue = React.ComponentProps<typeof Select>['options'];

export default class AutoCompleteComponent extends React.PureComponent<Props> {
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
      <AutoComplete
        value={this.props.value as string}
        placeholder={uiProps.placeholder as string}
        disabled={uiProps.disabled as boolean}
        style={{ width: 420, ...uiProps.style }}
        options={uiProps.options as LabeledValue}
        onChange={(value) => {
          const formattedValue = this.transform(value);
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
