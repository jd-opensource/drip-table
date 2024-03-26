/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import '../index.less';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select } from 'antd';
import classNames from 'classnames';
import React from 'react';

import Icon from '@/components/Icon';

import { defaultComponentIcon } from '../configs';

export interface SelectorProps<ValueType> {
  openPanel?: boolean;
  floatPanel?: boolean;
  showFilter?: boolean;
  value: ValueType;
  options: { label: string; value: ValueType; icon?: string | React.ReactSVG; group: string }[];
  groups: string[];
  onChange: (value: ValueType) => void;
}
const Selector = <ValueType,>(props: SelectorProps<ValueType>) => {
  const [keyword, setKeyWord] = React.useState('');
  const [optionPanelHide, setOptionPanelHide] = React.useState(!props.openPanel);
  const [groups, setGroups] = React.useState(props.groups ?? []);
  const [options, setOptions] = React.useState(props.options ?? []);
  if (optionPanelHide) {
    return (
      <div className="jfe-drip-table-generator-components-bar-navigation" style={{ marginTop: 8 }}>
        <Select
          className="jfe-drip-table-generator-components-bar-no-border"
          value={props.value}
          options={props.options}
          onFocus={() => { setOptionPanelHide(false); }}
        />
      </div>
    );
  }
  return (
    <div className="jfe-drip-table-generator-components-bar-navigation" style={{ marginTop: 8 }}>
      { props.showFilter && (
        <div>
          <Input
            className="jfe-drip-table-generator-components-bar-no-border"
            prefix={<SearchOutlined />}
            allowClear
            placeholder="输入组件名搜索"
            value={keyword}
            onChange={(e) => {
              setKeyWord(e.target.value);
              let optionsFiltered: SelectorProps<ValueType>['options'] = [...props.options];
              let groupsFiltered: SelectorProps<ValueType>['groups'] = [...props.groups];
              if (e.target.value) {
                optionsFiltered = props.options.filter(item => item.label.includes(e.target.value));
                groupsFiltered = optionsFiltered.map(item => item.group);
              }
              setOptions(optionsFiltered);
              setGroups(groupsFiltered);
            }}
          />
        </div>
      ) }
      <div className={classNames('jfe-drip-table-generator-components-bar-components-list', { float: props.floatPanel })}>
        { groups.map((groupName, groupIndex) => (
          <div key={groupIndex}>
            <div className="jfe-drip-table-generator-components-bar-component-title">
              { groupName }
            </div>
            {
              options.filter(item => item.group === groupName).map((option, index) => (
                <Button
                  key={index}
                  type="text"
                  className="jfe-drip-table-generator-components-bar-component-title-item"
                  onClick={(e) => {
                    setOptionPanelHide(true);
                    props.onChange(option.value);
                  }}
                >
                  <Icon className="jfe-drip-table-generator-components-bar-component-icon" svg={option.icon || defaultComponentIcon} />
                  <span className="jfe-drip-table-generator-components-bar-component-text">{ option.label }</span>
                </Button>
              ))
            }
          </div>
        )) }
      </div>
    </div>
  );
};

export default Selector;
