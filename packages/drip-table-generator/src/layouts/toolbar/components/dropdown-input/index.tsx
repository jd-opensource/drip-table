/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import '../../index.less';

import { Alert, AutoComplete, Dropdown, Input } from 'antd';
import classNames from 'classnames';
import React from 'react';

import { GeneratorContext } from '@/context';

interface DropDownInputProps {
  name: string;
  value: string;
  default?: string;
  type: 'input' | 'auto-complete';
  options?: { label: string; value: string }[];
  icon: React.ReactNode;
  label: string | React.ReactNode;
  overlayLabel: string;
  message?: string;
  checked?: () => boolean;
  onChange?: (value?: string) => void;
}

const OverLay = (props: Omit<DropDownInputProps, 'icon' | 'label'>) => (
  <GeneratorContext.Consumer>
    { ({ currentTableID, tableConfigs, setState }) => {
      const currentTableIndex = tableConfigs.findIndex(item => item.tableId === currentTableID);
      const tableConfig = currentTableIndex > -1 ? tableConfigs[currentTableIndex].configs : void 0;
      const onChange = (value: string) => {
        if (!tableConfig || !currentTableID) { return; }
        if (props.onChange) {
          props.onChange(value);
        } else {
          const newTableConfig = Object.assign({}, tableConfig, { [props.name]: value });
          const newTableConfigs = [...tableConfigs];
          newTableConfigs[currentTableIndex] = { ...tableConfigs[currentTableIndex], configs: newTableConfig };
          setState({ tableConfigs: newTableConfigs });
        }
      };
      return (
        <div className="jfe-drip-table-generator-toolbar-overlay-wrapper">
          <div style={{ display: 'flex' }}>
            <div style={{ lineHeight: '32px', marginRight: 6 }}>{ props.overlayLabel }</div>
            <div>
              { props.type === 'input' && (
                <Input
                  allowClear
                  disabled={!tableConfig || !currentTableID}
                  value={props.value}
                  onChange={e => onChange(e.target.value)}
                />
              ) }
              { props.type === 'auto-complete' && (
                <AutoComplete
                  allowClear
                  style={{ width: 200 }}
                  disabled={!tableConfig || !currentTableID}
                  value={props.value}
                  options={props.options}
                  onChange={value => onChange(value)}
                />
              ) }
            </div>
          </div>
          <div style={{ marginTop: 8 }}><Alert showIcon type="warning" message={props.message} /></div>
        </div>
      );
    } }
  </GeneratorContext.Consumer>
);

export const DropDownInput: (props: DropDownInputProps) => React.ReactElement = (props) => {
  const { currentTableID, tableConfigs } = React.useContext(GeneratorContext);
  const currentTableIndex = tableConfigs.findIndex(item => item.tableId === currentTableID);
  const tableConfig = currentTableIndex > -1 ? tableConfigs[currentTableIndex].configs : void 0;
  return (
    <Dropdown overlay={<OverLay {...props} />} trigger={['click']} placement="bottomLeft" key={props.name}>
      <div
        className={classNames(
          'jfe-drip-table-generator-toolbar-tool-cell',
          {
            checked: props.checked ? props.checked() : !!tableConfig?.[props.name],
            disabled: !tableConfig || !currentTableID,
          },
        )}
      >
        { props.icon }
        { props.label }
      </div>
    </Dropdown>
  );
};
