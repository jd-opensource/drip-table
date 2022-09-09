/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Popover, Select } from 'antd';
import React from 'react';

import { DataSchema } from '@/typing';

import { DTGComponentBaseProperty } from '..';

type SelectProps = React.ComponentProps<typeof Select>;
type SelectValueType = SelectProps['value'];
type SelectOptionType = NonNullable<SelectProps['options']>[number];

interface Props extends DTGComponentBaseProperty<SelectValueType> {}

export default class SelectComponent extends React.PureComponent<Props> {
  public static componentName = 'select';

  private get options() {
    const uiProps = this.props.schema['ui:props'] || {};
    if (Array.isArray(uiProps.options)) {
      return (uiProps.options as SelectOptionType)?.map(item => this.renderOptionItem(item));
    }
    return [];
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

  public transform(value: SelectValueType) {
    const config = this.props.schema;
    if (config.type === 'array'
      && typeof config.items === 'object'
      && (config.items as DataSchema).type === 'number'
    ) {
      return (value as string[]).map(item => Number(item));
    }
    return value;
  }

  public render() {
    const config = this.props.schema;
    const uiProps = this.props.schema['ui:props'] || {};

    return (
      <Select
        {...uiProps}
        showSearch
        allowClear={uiProps.allowClear as boolean}
        style={{ width: 120, ...uiProps.style }}
        mode={uiProps.mode as 'multiple' | 'tags'}
        defaultValue={config.default as SelectValueType}
        value={this.formattedValue}
        options={(this.options as SelectOptionType[] || [])}
        getPopupContainer={triggerNode => triggerNode}
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
              .catch((error: unknown) => { throw error; });
          }
        }}
      />
    );
  }
}
