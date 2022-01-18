/**
 * This file is part of the jd-mkt5 launch.
 * @link     : https://ace.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Popover, Radio } from 'antd';
import React from 'react';

import { filterAttributes } from '@/utils';
import { DTGComponentPropertySchema } from '@/typing';

const RadioGroup = Radio.Group;

 type RadioGroupProps = React.ComponentProps<typeof RadioGroup>;
 type RadioValueType = RadioGroupProps['value'];
 type RadioOptionType = NonNullable<RadioGroupProps['options']>[number] & { description?: string };

interface Props {
  schema: DTGComponentPropertySchema;
  value?: RadioValueType;
  onChange?: (value: RadioValueType) => void;
  onValidate?: (errorMessage: string) => void;
}

export default class RadioComponent extends React.PureComponent<Props> {
  private get options() {
    const uiProps = this.props.schema['ui:props'] || {};
    if (Array.isArray(uiProps.options)) {
      return uiProps.options;
    }
    return [];
  }

  public render() {
    const config = this.props.schema;
    const uiProps = this.props.schema['ui:props'] || {};

    return (
      <RadioGroup
        {...filterAttributes(uiProps, 'options')}
        defaultValue={config.default as RadioGroupProps['defaultValue']}
        value={this.props.value}
        onChange={(e) => {
          this.props.onChange?.(e.target.value);
        }}
      >
        { (this.options as RadioOptionType[])?.map((option, i) => {
          if (typeof option === 'string') {
            option = { label: option, value: option };
          }
          return (
            <Radio key={i} value={option.value} style={option.style} disabled={option.disabled}>
              { option.label }
              { option.description && (
              <Popover content={option.description}>
                <QuestionCircleOutlined style={{ margin: '0 8px' }} />
              </Popover>
              ) }
            </Radio>
          );
        }) }
      </RadioGroup>
    );
  }
}
