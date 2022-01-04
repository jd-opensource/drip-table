/**
 * This file is part of the jd-mkt5 launch.
 * @link     : https://ace.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import React from 'react';
import { Checkbox, Popover } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { DTGComponentPropertySchema } from '@/typing';
import { filterAttributes } from '@/utils';

type CheckboxGroupProps = React.ComponentProps<typeof Checkbox.Group>;
type CheckboxValueType = CheckboxGroupProps['value'];
type CheckboxOptionType = NonNullable<CheckboxGroupProps['options']>[number] & { description?: string };

interface Props {
  schema: DTGComponentPropertySchema;
  value?: CheckboxValueType;
  onChange?: (value: CheckboxValueType) => void;
  onValidate?: (errorMessage: string) => void;
}

export default class CheckboxComponent extends React.PureComponent<Props> {
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
        { (uiProps.options as CheckboxOptionType[])?.map((option, i) => {
          if (typeof option === 'string') {
            option = { label: option, value: option };
          }
          return (
            <Checkbox key={i} value={option.value} style={option.style} disabled={option.disabled}>
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
