/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { MinusCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { Button, InputNumber, Select } from 'antd';
import React from 'react';

import { DTGComponentBaseProperty } from '..';

import styles from './index.module.less';

type SelectProps = React.ComponentProps<typeof Select>;
type SelectOptionType = NonNullable<SelectProps['options']>[number];

interface Props extends DTGComponentBaseProperty<string> {
  count: number;
  dimensions: string[];
}

export default class StyleNumbersComponent extends React.PureComponent<Props> {
  public static componentName = 'style-numbers';

  private get options() {
    const uiProps = this.props.schema['ui:props'] || {};
    if (Array.isArray(this.props.dimensions)) {
      return (uiProps.dimensions as SelectOptionType)?.map(item => ({ label: item, value: item }));
    }
    return [];
  }

  private get value() {
    const valueArray = this.props.value?.split(' ') || [];
    const formattedValue = valueArray.map((item) => {
      const unit = item.match(/^(-)?[0-9]+(px|%|r?em|pt|vw|cm|in|pc)$/ui)?.[2] || '';
      const value = Number(item.replace(unit, '')) || void 0;
      return { value, unit };
    });
    return formattedValue;
  }

  private formatValue(originValue: { value: number | undefined; unit: string }[]) {
    return originValue.map(item => `${item.value || 0}${item.unit}`).join(' ');
  }

  private onChangeValue(value: { value: number | undefined; unit: string }[]) {
    const config = this.props.schema;
    const formattedValue = this.formatValue(value);
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
  }

  public render() {
    return (
      <div className={styles['component-container']}>
        { this.value.map((item, index) => (
          <div className={styles['item-container']}>
            <InputNumber
              controls={false}
              className={styles['number-input']}
              value={item.value}
              onChange={(val) => {
                const value = [...this.value];
                value[index].value = val || void 0;
                this.onChangeValue(value);
              }}
              addonAfter={(
                <Select
                  className={styles['select-input']}
                  value={item.unit}
                  options={this.options}
                  showArrow={false}
                  getPopupContainer={triggerNode => triggerNode}
                  onChange={(val) => {
                    const value = [...this.value];
                    value[index].unit = val;
                    this.onChangeValue(value);
                  }}
                />
              )}
            />

            <MinusCircleTwoTone
              className={styles.minus}
              twoToneColor="#ff4d4f"
              onClick={() => {
                const value = [...this.value];
                value.splice(index, 1);
                this.onChangeValue(value);
              }}
            />
          </div>
        )) }
        { this.value.length < this.props.count && (
        <Button
          icon={<PlusOutlined />}
          onClick={() => {
            const value = [...this.value, { value: void 0, unit: '' }];
            this.onChangeValue(value);
          }}
        />
        ) }
      </div>
    );
  }
}
