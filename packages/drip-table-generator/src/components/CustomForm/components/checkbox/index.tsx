/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Checkbox, CheckboxOptionType, Popover } from 'antd';
import React from 'react';

import { filterAttributes } from '@/utils';

import { DTGComponentBaseProperty } from '..';

type CheckboxGroupProps = React.ComponentProps<typeof Checkbox.Group>;
type CheckboxValueType = CheckboxGroupProps['value'];
type CheckboxOption = CheckboxOptionType & { description?: string; icon?: string };

interface Props extends DTGComponentBaseProperty<CheckboxValueType> {}

export default class CheckboxComponent extends React.PureComponent<Props> {
  public static componentName = 'checkbox';

  private get options() {
    const uiProps = this.props.schema['ui:props'] || {};
    if (Array.isArray(uiProps.options)) {
      return uiProps.options;
    }
    return [];
  }

  private iconRender(iconName: string) {
    const icons = this.props.theme?.icons || {};
    const Icon = icons[iconName];
    return Icon ? <Icon /> : null;
  }

  public render() {
    const config = this.props.schema;
    const uiProps = this.props.schema['ui:props'] || {};

    return (
      <Checkbox.Group
        {...filterAttributes(uiProps, 'options')}
        defaultValue={config.default as CheckboxGroupProps['defaultValue']}
        value={this.props.value}
        onChange={(value) => {
          this.props.onChange?.(value);
        }}
      >
        { (this.options as CheckboxOption[])?.map((option, i) => {
          if (typeof option === 'string' || typeof option === 'number') {
            option = { label: option, value: option };
          }
          return (
            <Checkbox key={i} value={option.value} style={option.style} disabled={option.disabled}>
              { option.icon && this.iconRender(option.icon) }
              { option.label }
              { option.description && (
                <Popover content={option.description}>
                  <QuestionCircleOutlined style={{ margin: '0 8px' }} />
                </Popover>
              ) }
            </Checkbox>
          );
        }) }
      </Checkbox.Group>
    );
  }
}
