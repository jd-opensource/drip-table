/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { Tooltip } from 'antd';
import { DripTableColumnSchema } from 'drip-table';
import chunk from 'lodash/chunk';
import React from 'react';

import { mockId } from '@/utils';
import { DripTableColumn, globalActions, GlobalStore } from '@/store';
import Icon from '@/components/Icon';
import components from '@/table-components';
import { DripTableComponentAttrConfig, DripTableGeneratorPanel } from '@/typing';

import { defaultComponentIcon } from '../configs';
import { getLength, updateColumnItemByPath } from '../utils';

import styles from './index.module.less';

interface Props {
  width: React.CSSProperties['width'];
  customComponentPanel: DripTableGeneratorPanel<DripTableComponentAttrConfig> | undefined;
}

const ComponentLayout = (props: Props & { store: GlobalStore }) => {
  const getGroups = () => {
    let groups = [
      '基础组件',
      '容器组件',
      '自定义组件',
    ];
    if (props.customComponentPanel) {
      const customGroups = props.customComponentPanel.configs.map(item => item.group);
      if (props.customComponentPanel.mode === 'add') {
        const theSet = new Set([...groups, ...customGroups]);
        groups = [...theSet];
      } else {
        groups = props.customComponentPanel.orders ?? [...new Set(customGroups)];
      }
    }
    return groups;
  };

  const getComponents = (groupName) => {
    let componentsToUse = components;
    if (props.customComponentPanel) {
      const customComponents = props.customComponentPanel.configs;
      componentsToUse = props.customComponentPanel.mode === 'add' ? [...components, ...customComponents] : [...customComponents];
    }
    return [...componentsToUse].filter(item => item.group === groupName);
  };

  const [state, actions] = props.store;
  const store = { state, setState: actions };

  const componentCell = (item: DripTableComponentAttrConfig) => (
    <div
      className={styles['component-container']}
      onClick={() => {
        if (state.currentColumn && (state.currentColumnPath?.length || 0) > 0) {
          const columnItemSchema: DripTableColumnSchema = {
            key: `${item['ui:type']}_${mockId()}`,
            dataIndex: '',
            title: item.title,
            width: void 0,
            description: '',
            component: item['ui:type'],
            options: {},
          };
          updateColumnItemByPath(state.currentColumn, state.currentColumnPath || [], columnItemSchema);
          globalActions.editColumns(store);
          return;
        }
        const columnSchema: DripTableColumn = {
          key: `${item['ui:type']}_${mockId()}`,
          dataIndex: '',
          title: item.title,
          width: void 0,
          description: '',
          component: item['ui:type'],
          options: {},
          index: state.columns.length + 1,
          sort: state.columns.length + 1,
        };
        item.attrSchema.forEach((schema) => {
          if (typeof schema.default !== 'undefined') {
            if (schema.name.startsWith('options.')) {
              const key = schema.name.replace('options.', '');
              if (!columnSchema.options) {
                columnSchema.options = {};
              }
              columnSchema.options[key] = schema.default;
            } else {
              columnSchema[schema.name] = schema.default;
            }
          }
        });
        state.columns.push(columnSchema);
        globalActions.editColumns(store);
      }}
    >
      <div>
        <Icon svg={item.icon || defaultComponentIcon} className={styles['component-icon']} />
        { getLength(item.title) > 11
          ? <Tooltip title={item.title}><span className={styles['component-title']} title={item.title}>{ item.title }</span></Tooltip>
          : <span className={styles['component-title']} title={item.title}>{ item.title }</span> }
      </div>
    </div>
  );

  return (
    <div className={styles['layout-left-wrapper']} style={{ width: props.width }}>
      <div className={styles['layout-left-title']}>组件区</div>
      <div className={styles['layout-left-components-container']}>
        <table style={{ width: '100%' }}>
          { getGroups().map((name, index) => (
            <React.Fragment key={index}>
              <thead key={`thead.${index}`}>
                <tr><td colSpan={2}><div className={styles['group-title']}>{ name }</div></td></tr>
              </thead>
              <tbody key={`tbody.${index}`}>
                { chunk(getComponents(name), 2).map((items, i, componentsInLayout) => (
                  <React.Fragment key={i}>
                    {
                      i === 0
                        ? (
                          <tr key={`groupItem.group.${index}.${i}.gutter.before`}>
                            <td colSpan={2}>
                              <div className={styles['components-line__gutter']} />
                            </td>
                          </tr>
                        )
                        : null
                    }
                    <tr key={`groupItem.group.${index}.${i}`} className={styles['components-line']}>
                      { items.map((item, idx) => <td key={idx}>{ componentCell(item) }</td>) }
                    </tr>
                    {
                      i === componentsInLayout.length - 1
                        ? (
                          <tr key={`groupItem.group.${index}.${i}.gutter.after`}>
                            <td colSpan={2}>
                              <div className={styles['components-line__gutter']} />
                            </td>
                          </tr>
                        )
                        : null
                    }
                  </React.Fragment>
                )) }
              </tbody>
            </React.Fragment>
          )) }
        </table>
      </div>
    </div>
  );
};

export default ComponentLayout;
