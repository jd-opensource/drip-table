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
  MenuOutlined,
  SettingOutlined,
  SortAscendingOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, message, Modal, Radio } from 'antd';
import classNames from 'classnames';
import { DripTableColumnSchema, DripTableExtraOptions, DripTableRecordTypeBase, DripTableSchema } from 'drip-table';
import React from 'react';

import { filterAttributes } from '@/utils';
import { DripTableGeneratorContext, GeneratorContext } from '@/context';
import { DripTableGeneratorProps } from '@/typing';

import styles from './index.module.less';

export type ToolBarConfig = {
  icon: React.ReactNode;
  label: string;
  name: string;
  type?: 'switch' | 'dropdown';
  overlay?: 'radio' | 'checkbox';
  options?: { label: string; value: string | number }[];
  default?: unknown;
};

interface ToolbarProps<
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
> {
  style?: React.CSSProperties;
  onExportSchema?: DripTableGeneratorProps<RecordType, ExtraOptions>['onExportSchema'];
}

const Toolbar = <
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
>(props: ToolbarProps<RecordType, ExtraOptions>) => {
  const [modalStatus, setModalStatus] = React.useState('');
  const [code, setCode] = React.useState('');
  const context = React.useContext(GeneratorContext);

  const getSchemaValue = (): DripTableSchema<DripTableColumnSchema> => ({
    ...context.globalConfigs,
    columns: context.columns.map(item => ({ ...item, index: void 0 })),
  });

  /**
   * 渲染一个Modal用来展示JSON Schema配置
   * @returns {JSX.Element} 返回React组件
   */
  const renderSchemaModal = () => {
    if (modalStatus !== 'export' && modalStatus !== 'import') {
      return null;
    }

    const defaultValue = modalStatus === 'export'
      ? JSON.stringify(getSchemaValue(), null, 4)
      : code || '';
    return (
      <Input.TextArea
        style={{ minHeight: '560px' }}
        value={defaultValue}
        onChange={(e) => {
          if (modalStatus === 'import') { setCode(e.target.value); }
        }}
      />
    );
  };

  const configs: ToolBarConfig[] = [
    { icon: <InsertRowAboveOutlined className={styles['tool-icon']} />, label: '冻结表头', type: 'switch', name: 'sticky' },
    { icon: <BorderOuterOutlined className={styles['tool-icon']} />, label: '边框', type: 'switch', name: 'bordered' },
    { icon: <CheckSquareOutlined className={styles['tool-icon']} />, label: '行可选择', type: 'switch', name: 'rowSelection' },
    { icon: <MenuOutlined className={styles['tool-icon']} />, label: '间隔斑马纹', type: 'switch', name: 'stripe' },
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
      default: 'middle',
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
              value={globalConfig[config.name] || config.default}
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
            <Button style={{ marginRight: '4px' }} size="small" onClick={() => setModalStatus('import')}>导入配置</Button>
            <Button style={{ marginRight: '4px' }} size="small" onClick={() => setModalStatus('export')}>导出配置</Button>
          </div>
          <Modal
            width={720}
            title={modalStatus === 'export' ? '导出数据' : '导入数据'}
            visible={modalStatus === 'export' || modalStatus === 'import'}
            cancelText={modalStatus === 'export' ? '确认' : '取消'}
            okText={modalStatus === 'export' ? '复制文本' : '确认导入'}
            onCancel={() => setModalStatus('')}
            onOk={() => {
              if (modalStatus === 'import') { // 导入解析
                const value = (code || '').trim();
                let hasError = false;
                try {
                  const json = JSON.parse(value);
                  const globalConfigsToImport = filterAttributes(json, ['columns']);
                  const columnsToImport = json.columns?.map((item, index) => ({ index, ...item })) as DripTableGeneratorContext['columns'];
                  setState({
                    globalConfigs: globalConfigsToImport,
                    columns: columnsToImport,
                    currentColumn: void 0,
                    currentColumnPath: void 0,
                  });
                } catch {
                  hasError = true;
                  message.error('解析出错, 请传入正确的格式');
                } finally {
                  if (!hasError) {
                    message.success('数据导入成功');
                  }
                }
              } else if (modalStatus === 'export') { // 导出复制
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(JSON.stringify(getSchemaValue()))
                    .then(
                      () => {
                        props.onExportSchema?.(getSchemaValue());
                        message.success('复制成功');
                        return void 0;
                      },
                    )
                    .catch(
                      () => {
                        message.error('复制失败');
                      },
                    );
                } else {
                  message.error('复制失败：您的浏览器不支持复制。');
                }
              }
              setModalStatus('');
              setCode('');
            }}
          >
            { renderSchemaModal() }
          </Modal>
        </div>
      ) }
    </GeneratorContext.Consumer>
  );
};

export default Toolbar;
