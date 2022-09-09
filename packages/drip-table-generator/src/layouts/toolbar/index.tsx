/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { BorderOuterOutlined,
  CheckSquareOutlined,
  DatabaseOutlined,
  FilterOutlined,
  FontSizeOutlined,
  InsertRowAboveOutlined,
  SettingOutlined,
  SortAscendingOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Radio } from 'antd';
import classNames from 'classnames';
import { DripTableExtraOptions } from 'drip-table';
import React from 'react';

import { DripTableGeneratorContext, GeneratorContext } from '@/context';

import styles from './index.module.less';

export type ToolBarConfig = {
  icon: React.ReactNode;
  label: string;
  name: string;
  type?: 'switch' | 'dropdown';
  overlay?: 'radio' | 'checkbox';
  options?: { label: string; value: string | number }[];
};

interface ToolbarProps {
  style?: React.CSSProperties;
}

const Toolbar = <
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
>(props: ToolbarProps) => {
  const configs: ToolBarConfig[] = [
    { icon: <InsertRowAboveOutlined className={styles['tool-icon']} />, label: '冻结表头', type: 'switch', name: 'sticky' },
    { icon: <BorderOuterOutlined className={styles['tool-icon']} />, label: '边框', type: 'switch', name: 'bordered' },
    { icon: <CheckSquareOutlined className={styles['tool-icon']} />, label: '行可选择', type: 'switch', name: 'rowSelection' },
    {
      icon: <FontSizeOutlined className={styles['tool-icon']} />,
      label: '尺寸',
      type: 'dropdown',
      name: 'size',
      overlay: 'radio',
      options: [
        { label: '大号', value: 'large' },
        { label: '中等', value: 'middle' },
        { label: '小号', value: 'small' },
      ],
    },
    { icon: <DatabaseOutlined className={styles['tool-icon']} />, label: '虚拟列表', type: 'switch', name: 'virtual' },
    { icon: <FilterOutlined className={styles['tool-icon']} />, label: '过滤', name: 'filter' },
    { icon: <SortAscendingOutlined className={styles['tool-icon']} />, label: '排序', name: 'sort' },
  ];

  const renderToolbarCell = (
    config: ToolBarConfig,
    globalConfig: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['globalConfigs'],
    setState: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['setState'],
  ) => {
    if (config.type === 'switch') {
      return (
        <div
          key={config.name}
          className={classNames(styles['tool-cell'], { [styles.checked]: !!globalConfig[config.name] })}
          onClick={() => {
            const newTableGlobalConfig = Object.assign({}, globalConfig, { [config.name]: !globalConfig[config.name] });
            setState({ globalConfigs: newTableGlobalConfig });
          }}
        >
          { config.icon }
          { config.label }
        </div>
      );
    }
    if (config.type === 'dropdown') {
      let overlay: React.ReactElement = <div />;
      if (config.overlay === 'radio') {
        overlay = (
          <div className={styles['overlay-wrapper']}>
            <Radio.Group
              value={globalConfig[config.name]}
              onChange={(e) => {
                const newTableGlobalConfig = Object.assign({}, globalConfig, { [config.name]: e.target.value });
                setState({ globalConfigs: newTableGlobalConfig });
              }}
            >
              { config.options?.map((option, index) => (
                <Radio key={index} value={option.value}>{ option.label }</Radio>
              )) }
            </Radio.Group>
          </div>
        );
      }
      return (
        <Dropdown overlay={overlay} trigger={['click']} placement="bottomLeft" key={config.name}>
          <div className={styles['tool-cell']}>
            { config.icon }
            { config.label }
          </div>
        </Dropdown>
      );
    }
    return (
      <div key={config.name} className={styles['tool-cell']} onClick={() => message.info('🚧 施工中，敬请期待~')}>
        { config.icon }
        { config.label }
      </div>
    );
  };

  return (
    <GeneratorContext.Consumer>
      { ({ drawerType, globalConfigs, mode, setState }) => (
        <div className={styles['toolbar-container']} style={props.style}>
          <div className={styles['toolbar-container-leftbar']}>
            { configs.map(item => renderToolbarCell(item, globalConfigs, setState)) }
          </div>
          <div className={styles['toolbar-container-rightbar']}>
            <Button style={{ marginRight: '4px' }} size="small" type="primary" onClick={() => setState({ drawerType: drawerType === 'global' ? void 0 : 'global' })} icon={<SettingOutlined />}>全局设置</Button>
            <Button style={{ marginRight: '4px' }} size="small" type="primary" onClick={() => setState({ drawerType: drawerType === 'datasource' ? void 0 : 'datasource' })} icon={<DatabaseOutlined />}>数据源</Button>
            <Button style={{ marginRight: '4px' }} size="small" type="primary" onClick={() => setState({ mode: mode === 'edit' ? 'preview' : 'edit' })}>{ mode === 'edit' ? '预览' : '编辑' }</Button>
            <Button style={{ marginRight: '4px' }} size="small">导入配置</Button>
            <Button style={{ marginRight: '4px' }} size="small">导出配置</Button>
          </div>
        </div>
      ) }
    </GeneratorContext.Consumer>
  );
};

export default Toolbar;
