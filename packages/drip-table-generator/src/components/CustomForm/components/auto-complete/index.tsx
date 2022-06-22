/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { QuestionCircleOutlined } from '@ant-design/icons';
import { AutoComplete, Popover, Select } from 'antd';
import React from 'react';

import { StringDataSchema } from '@/typing';

import { DTGComponentBaseProperty } from '..';

interface Props extends DTGComponentBaseProperty<string> {}

type LabeledValue = React.ComponentProps<typeof Select>['options'];

export default class AutoCompleteComponent extends React.PureComponent<Props> {
  public static componentName = 'auto-complete';

  private get options() {
    const uiProps = this.props.schema['ui:props'] || {};
    if (Array.isArray(uiProps.options)) {
      return (uiProps.options as LabeledValue)?.map(item => this.renderOptionItem(item));
    }
    return [];
  }

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

  private iconRender(iconName: string) {
    const icons = this.props.theme?.icons || {};
    const Icon = icons[iconName];
    return Icon ? <Icon style={{ lineHeight: '22px' }} /> : null;
  }

  private renderOptionItem(option: NonNullable<LabeledValue>[number]) {
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
      <AutoComplete
        value={this.props.value as string}
        placeholder={uiProps.placeholder as string}
        disabled={uiProps.disabled as boolean}
        style={{ width: 240, ...uiProps.style }}
        options={this.options as LabeledValue}
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
