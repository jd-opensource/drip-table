/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import 'rc-color-picker/assets/index.css';

import { MinusCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { Button, InputNumber, Select } from 'antd';
import ColorPicker from 'rc-color-picker';
import React from 'react';

import { DTGComponentBaseProperty } from '..';

import styles from './index.module.less';

type SelectProps = React.ComponentProps<typeof Select>;
type SelectOptionType = NonNullable<SelectProps['options']>[number];

interface FormattedValue {
  color: string;
  positions: {
    value: number | undefined;
    unit: string;
  }[];
}

interface Props extends DTGComponentBaseProperty<string> {
  defaultColor?: string;
  count: number;
  dimensions: string[];
}

export default class BoxShadowComponent extends React.PureComponent<Props> {
  public static componentName = 'box-shadow';

  private get options() {
    const uiProps = this.props.schema['ui:props'] || {};
    if (Array.isArray(this.props.dimensions)) {
      return (uiProps.dimensions as SelectOptionType)?.map(item => ({ label: item, value: item }));
    }
    return [];
  }

  private get value() {
    const valueArray = this.props.value?.split(' ') || [];
    const color = valueArray[0] && valueArray[0].startsWith('#') ? valueArray[0] : '';
    const positions = valueArray.slice(1).map((item) => {
      const unit = item.match(/^(-)?[0-9]+(px|%|r?em|pt|vw|cm|in|pc)$/ui)?.[1] || '';
      const value = Number(item.replace(unit, ''));
      return { value: Number.isNaN(value) ? void 0 : value, unit };
    });
    return { color, positions };
  }

  private formatValue(originValue: FormattedValue) {
    return `${originValue.color} ${originValue.positions.map(item => `${item.value || 0}${item.unit}`).join(' ')}`;
  }

  private onChangeValue(value: FormattedValue) {
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
      <div className={styles['box-shadow-container']}>
        <ColorPicker
          placement="bottomLeft"
          defaultAlpha={100}
          color={this.value.color}
          defaultColor={this.props.defaultColor || '#000000'}
          onChange={(event) => {
            this.onChangeValue({ color: event.color, positions: [...this.value.positions] });
          }}
        >
          <span className={styles['picker-trigger']} />
        </ColorPicker>
        { this.value.positions.map((item, index) => (
          <div className={styles['item-container']}>
            <InputNumber
              controls={false}
              className={styles['number-input']}
              value={item.value}
              onChange={(val) => {
                const positions = [...this.value.positions];
                positions[index].value = val;
                this.onChangeValue({ color: this.value.color, positions });
              }}
              addonAfter={(
                <Select
                  className={styles['select-input']}
                  value={item.unit}
                  options={this.options}
                  showArrow={false}
                  getPopupContainer={triggerNode => triggerNode}
                  onChange={(val) => {
                    const positions = [...this.value.positions];
                    positions[index].unit = val;
                    this.onChangeValue({ color: this.value.color, positions });
                  }}
                />
              )}
            />
            <MinusCircleTwoTone
              className={styles.minus}
              twoToneColor="#ff4d4f"
              onClick={() => {
                const positions = [...this.value.positions];
                positions.splice(index, 1);
                this.onChangeValue({ color: this.value.color, positions });
              }}
            />
          </div>
        )) }
        { this.value.positions.length < this.props.count && (
        <Button
          icon={<PlusOutlined />}
          onClick={() => {
            const positions = [...this.value.positions, { value: void 0, unit: '' }];
            this.onChangeValue({ color: this.value.color, positions });
          }}
        />
        ) }
      </div>
    );
  }
}
