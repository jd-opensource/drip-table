/**
 * This file is part of the jd-mkt5 launch.
 * @link     : https://ace.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import React from 'react';
import { Popover, Select } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { DripTableDriver, DripTableRecordTypeBase } from 'drip-table';

import { DTGComponentPropertySchema } from '@/typing';

type SelectProps = React.ComponentProps<typeof Select>;
type SelectValueType = SelectProps['value'];
type SelectOptionType = NonNullable<SelectProps['options']>[number];

interface Props {
  theme?: DripTableDriver<DripTableRecordTypeBase>;
  schema: DTGComponentPropertySchema;
  value?: SelectValueType;
  onChange?: (value: SelectValueType) => void;
  onValidate?: (errorMessage: string) => void;
}

export default class SelectComponent extends React.PureComponent<Props> {
  private get options() {
    const uiProps = this.props.schema['ui:props'] || {};
    return (uiProps.options as SelectOptionType)?.map(item => this.renderOptionItem(item));
  }

  private get formattedValue() {
    const uiProps = this.props.schema['ui:props'] || {};
    if ((uiProps.mode === 'multiple' || uiProps.mode === 'tags') && !Array.isArray(this.props.value)) {
      return this.props.value ? [this.props.value] : [];
    }
    return this.props.value;
  }

  private iconRender(iconName: string) {
    const icons = this.props.theme?.icons || {};
    const Icon = icons[iconName];
    return Icon ? <Icon style={{ lineHeight: '22px' }} /> : null;
  }

  private renderOptionItem(option: NonNullable<SelectOptionType>[number]) {
    if (option.icon || option.description) {
      return {
        ...option,
        value: option.value,
        label: (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            { option.icon && this.iconRender(option.icon) }
            <span>{ option.label }</span>
            { option.description && (
            <Popover content={option.description}>
              <QuestionCircleOutlined style={{ margin: '0 8px' }} />
            </Popover>
            ) }
          </div>
        ),
      };
    }
    return { ...option };
  }

  public render() {
    const config = this.props.schema;
    const uiProps = this.props.schema['ui:props'] || {};

    return (
      <Select
        {...uiProps}
        showSearch
        allowClear={uiProps.allowClear as boolean}
        style={{ width: 420, ...uiProps.style }}
        mode={uiProps.mode as 'multiple' | 'tags'}
        defaultValue={config.default as SelectValueType}
        value={this.formattedValue as SelectValueType}
        options={(this.options as SelectOptionType[] || [])}
        onChange={(value) => {
          this.props.onChange?.(value);
        }}
      />
    );
  }
}
