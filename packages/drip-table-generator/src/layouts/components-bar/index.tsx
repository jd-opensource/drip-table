/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { DripTableExtraOptions, DripTableRecordTypeBase } from 'drip-table';
import React from 'react';

import { mockId } from '@/utils';
import Icon from '@/components/Icon';
import { DripTableColumn, DripTableGeneratorContext, GeneratorContext } from '@/context';
import { DripTableComponentAttrConfig, DripTableGeneratorProps } from '@/typing';

import { getComponents, getGroups } from '../utils';
import { defaultComponentIcon } from './configs';

import styles from './index.module.less';

interface ComponentsBarProps<
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
> {
  customComponentPanel: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'] | undefined;
}

const ComponentsBar = <
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
>(props: ComponentsBarProps<RecordType, ExtraOptions>) => {
  const [collapsed, setCollapsed] = React.useState(true);
  const { columns } = React.useContext(GeneratorContext);

  const addComponentToColumn = (component: DripTableComponentAttrConfig, setState: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['setState']) => {
    const columnSchema: DripTableColumn<ExtraOptions['CustomColumnSchema']> = {
      key: `${component['ui:type']}_${mockId()}`,
      dataIndex: '',
      title: component.title,
      width: void 0,
      description: '',
      component: component['ui:type'] as 'text',
      options: {},
      index: columns.length,
    };
    setState({ columnToAdd: columnSchema });
  };

  return (
    <GeneratorContext.Consumer>
      { ({ setState }) => (
        <div className={styles['components-container']}>
          <div className={styles['components-navigator']}>
            <div className={styles['component-title']}>组件库</div>
            <Button className={styles['component-button']} onClick={() => setCollapsed(!collapsed)} type="text">
              { collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> }
            </Button>
            {
            getGroups(props.customComponentPanel).map((groupName, groupIndex) => (
              <div key={groupIndex}>
                <div className={styles['component-title']}>{ groupName.replace(/组件$/u, '') }</div>
                {
                  getComponents(groupName, props.customComponentPanel).map((component, index) => (
                    <Tooltip title={component.title} key={index} placement="right">
                      <Button
                        draggable
                        onDragStart={() => addComponentToColumn(component, setState)}
                        onDragEnd={() => setState({ columnToAdd: void 0 })}
                        type="text"
                        className={styles['component-button']}
                      >
                        <Icon className={styles['component-icon']} svg={component.icon || defaultComponentIcon} />
                      </Button>
                    </Tooltip>
                  ))
                }
              </div>
            ))
          }
          </div>
          <div className={styles['components-drawer']} style={{ transform: collapsed ? 'translateX(-320px)' : void 0 }}>
            {
            getGroups(props.customComponentPanel).map((groupName, groupIndex) => (
              <div key={groupIndex}>
                <div className={styles['component-title']}>{ groupName }</div>
                <div className={styles['component-group']}>
                  {
                    getComponents(groupName, props.customComponentPanel).map((component, index) => (
                      <Button
                        key={index}
                        type="primary"
                        size="small"
                        draggable
                        onDragEnd={() => {
                          setCollapsed(!collapsed);
                          setState({ columnToAdd: void 0 });
                        }}
                        onDragStart={() => addComponentToColumn(component, setState)}
                      >
                        <Icon className={styles['component-icon']} svg={component.icon || defaultComponentIcon} />
                        { component.title }
                      </Button>
                    ))
                  }
                </div>
              </div>
            ))
          }
          </div>
        </div>
      ) }
    </GeneratorContext.Consumer>

  );
};

export default ComponentsBar;
