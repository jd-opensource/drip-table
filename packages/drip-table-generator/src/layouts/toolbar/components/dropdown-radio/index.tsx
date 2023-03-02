/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import '../../index.less';

import { Dropdown, Radio } from 'antd';
import React from 'react';

import { GeneratorContext } from '@/context';

import { ImageRadio } from '../image-radio';

interface DropDownRadioProps<T> {
  name?: string;
  value?: T;
  icon: React.ReactNode;
  label: string | React.ReactNode;
  overlayType: 'radio' | 'image-radio';
  options: ({ label: string | React.ReactNode; value: T; image?: string } & Record<string, unknown>)[];
  default?: T;
  onChange?: (value?: T) => void;
}

const OverLay = <Type,>(props: Omit<DropDownRadioProps<Type>, 'icon' | 'label'>) => (
  <GeneratorContext.Consumer>
    { ({ currentTableID, tableConfigs, setState }) => {
      const currentTableIndex = tableConfigs.findIndex(item => item.tableId === currentTableID);
      const tableConfig = currentTableIndex > -1 ? tableConfigs[currentTableIndex].configs : void 0;
      const getValue = () => {
        if (props.name) {
          return tableConfig?.[props.name] || props.default;
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
          const newTableConfig = Object.assign({}, tableConfig, { [props.name]: value });
          const newTableConfigs = [...tableConfigs];
          newTableConfigs[currentTableIndex] = { ...tableConfigs[currentTableIndex], configs: newTableConfig };
          setState({ tableConfigs: newTableConfigs });
        }
      };

      if (props.overlayType === 'radio') {
        return (
          <div className="jfe-drip-table-generator-toolbar-overlay-wrapper">
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
          <div className="jfe-drip-table-generator-toolbar-overlay-wrapper">
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
    <div className="jfe-drip-table-generator-toolbar-tool-cell">
      { props.icon }
      { props.label }
    </div>
  </Dropdown>
);
