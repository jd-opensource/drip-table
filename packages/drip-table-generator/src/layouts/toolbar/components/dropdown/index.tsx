/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { Dropdown, Radio } from 'antd';
import React from 'react';

import { GeneratorContext } from '@/context';

import { ImageRadio } from '../image-radio';

import styles from '../../index.module.less';

interface DropDownRadioProps<T> {
  name?: string;
  value?: T;
  icon: React.ReactNode;
  label: string | React.ReactNode;
  overlayType: 'radio' | 'image-radio';
  options: { label: string; value: T; image?: string }[];
  default?: T;
  onChange?: (value?: T) => void;
}

const OverLay = <Type,>(props: Omit<DropDownRadioProps<Type>, 'icon' | 'label'>) => (
  <GeneratorContext.Consumer>
    { ({ globalConfigs, setState }) => {
      const getValue = () => {
        if (props.name) {
          return globalConfigs[props.name] || props.default;
        }
        if (props.value) {
          return props.value || props.default;
        }
        return props.default;
      };

      const onChange = (value: Type) => {
        if (props.onChange) {
          props.onChange(value);
        } else if (props.name) {
          const newTableGlobalConfig = Object.assign({}, globalConfigs, { [props.name]: value });
          setState({ globalConfigs: newTableGlobalConfig });
        }
      };

      if (props.overlayType === 'radio') {
        return (
          <div className={styles['overlay-wrapper']}>
            <Radio.Group
              value={getValue()}
              onChange={e => onChange(e.target.value)}
            >
              { props.options?.map((option, index) => (
                <Radio key={index} value={option.value}>{ option.label }</Radio>
              )) }
            </Radio.Group>
          </div>
        );
      }
      if (props.overlayType === 'image-radio') {
        return (
          <div className={styles['overlay-wrapper']}>
            <ImageRadio value={getValue()} options={props.options} onChange={v => onChange(v)} />
          </div>
        );
      }
      return null;
    } }
  </GeneratorContext.Consumer>
);

export const DropDownRadio: <Type>(props: DropDownRadioProps<Type>) => React.ReactElement = props => (
  <Dropdown overlay={<OverLay {...props} />} trigger={['click']} placement="bottomLeft" key={props.name}>
    <div className={styles['tool-cell']}>
      { props.icon }
      { props.label }
    </div>
  </Dropdown>
);
