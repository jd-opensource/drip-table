/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { QuestionCircleOutlined } from '@ant-design/icons';
import { CheckboxOptionType, Popover, Radio } from 'antd';
import React from 'react';

import { filterAttributes } from '@/utils';

import { DTGComponentBaseProperty } from '..';

type RadioGroupProps = React.ComponentProps<typeof Radio.Group>;
type RadioValueType = RadioGroupProps['value'];
type RadioOptionType = CheckboxOptionType & { description?: string };

interface Props extends DTGComponentBaseProperty<RadioValueType> {
}

export default class RadioComponent extends React.PureComponent<Props> {
  public static componentName = 'radio';

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
    const RadioItem = uiProps.mode === 'button' ? Radio.Button : Radio;
    return (
      <Radio.Group
        {...filterAttributes(uiProps, 'options')}
        defaultValue={config.default as RadioGroupProps['defaultValue']}
        buttonStyle={uiProps.mode === 'button' ? uiProps.buttonStyle as 'outline' | 'solid' : void 0}
        size={uiProps.size as 'small' | 'large'}
        value={this.props.value}
        onChange={(e) => {
          this.props.onChange?.(e.target.value);
        }}
      >
        { (this.options as RadioOptionType[])?.map((option, i) => {
          if (typeof option === 'string' || typeof option === 'number') {
            option = { label: option, value: option };
          }
          return (
            <RadioItem key={i} value={option.value} style={option.style} disabled={option.disabled}>
              { option.label }
              { option.description && (
              <Popover content={option.description}>
                <QuestionCircleOutlined style={{ margin: '0 8px' }} />
              </Popover>
              ) }
            </RadioItem>
          );
        }) }
      </Radio.Group>
    );
  }
}
