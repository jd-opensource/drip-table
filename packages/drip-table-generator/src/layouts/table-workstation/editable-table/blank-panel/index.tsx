/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { Dropdown, Menu } from 'antd';
import { DripTableExtraOptions } from 'drip-table';
import React from 'react';

import Icon from '@/components/Icon';
import { defaultComponentIcon } from '@/layouts/components-bar/configs';
import { getComponents, getGroups } from '@/layouts/utils';
import { DataSourceTypeAbbr, DripTableComponentAttrConfig, DripTableGeneratorProps } from '@/typing';

interface BlankPanelProps<
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>{
  style?: React.CSSProperties;
  customComponentPanel: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'] | undefined;
  onMenuClick: (component: DripTableComponentAttrConfig, index?: number) => void;
  onDropComponent: () => void;
}

const BlankPanel = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: BlankPanelProps<RecordType, ExtraOptions>) => {
  const menu = (
    <Menu>
      { getGroups(props.customComponentPanel).map((group, index) => (
        <Menu.ItemGroup key={index} title={group}>
          { getComponents(group, props.customComponentPanel).map((component, i) => (
            <Menu.Item
              key={`${index}_${i}`}
              onClick={() => { props.onMenuClick(component, i); }}
            >
              <Icon svg={component.icon || defaultComponentIcon} className="jfe-drip-table-generator-workstation-editable-table-blank-panel-component-icon" />
              <span>{ component.title }</span>
            </Menu.Item>
          )) }
        </Menu.ItemGroup>
      )) }
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['contextMenu']}>
      <div
        className="jfe-drip-table-generator-workstation-editable-table-blank-panel-table-column-skeleton"
        style={props.style}
        onDragOver={(event) => {
          event.stopPropagation();
          event.preventDefault();
        }}
        onDrop={(event) => {
          event.stopPropagation();
          event.preventDefault();
          props.onDropComponent();
        }}
      >
        拖拽组件至此处或者在此处右击
      </div>
    </Dropdown>
  );
};

export default BlankPanel;
