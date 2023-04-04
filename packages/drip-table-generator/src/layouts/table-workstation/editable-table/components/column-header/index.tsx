/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { ArrowLeftOutlined, ArrowRightOutlined, CopyOutlined, DeleteOutlined, EllipsisOutlined, QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, message, Popconfirm, Tooltip } from 'antd';
import classNames from 'classnames';
import { DripTableExtraOptions } from 'drip-table';
import React from 'react';
import ClipboardButton from 'react-clipboard.js';

import RichText from '@/components/RichText';
import { GeneratorContext } from '@/context';
import { DTGTableConfig, TableConfigsContext } from '@/context/table-configs';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

import ComponentsSelector from '../components-selector';

export interface ColumnHeaderProps <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>{
  tableConfig: DTGTableConfig;
  column: DTGTableConfig['columns'][number];
  key?: string | number;
  showLeftShadow?: boolean;
  showRightShadow?: boolean;
  customComponentPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'] | undefined;
}
const ColumnHeader = <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: ColumnHeaderProps<RecordType, ExtraOptions>) => {
  const [selector, setSelector] = React.useState('');
  const columnTitle = React.useMemo(() => {
    let title = '';
    if (typeof props.column.title === 'string') {
      title = props.column.title;
    } else if (typeof props.column.title?.body === 'string') {
      title = props.column.title?.body;
    } else {
      title = props.column.title?.body?.content;
    }
    return title;
  }, [props.column.title]);

  const menuItems: MenuProps['items'] = React.useMemo(() => [
    {
      key: '1',
      label: (
        <Dropdown
          placement="bottomRight"
          trigger={['click']}
          open={selector === 'left'}
          onOpenChange={(open) => { if (!open) { setSelector(''); } }}
          dropdownRender={() => (
            <ComponentsSelector
              tableId={props.tableConfig.tableId}
              showTitle
              showFilter
              customComponentPanel={props.customComponentPanel}
              onClose={() => setSelector('')}
              customColumns={(columns, column) => {
                const index = columns.findIndex(item => item.key === props.column.key);
                const newColumns = [...columns];
                newColumns.splice(index < 0 ? 0 : index, 0, column);
                return newColumns;
              }}
            />
          )}
        >
          <div onClick={(e) => { e.stopPropagation(); setSelector('left'); }}>
            <ArrowLeftOutlined />
            <span style={{ marginLeft: 2 }}>向左插入列</span>
          </div>
        </Dropdown>
      ),
    },
    {
      key: '2',
      label: (
        <Dropdown
          placement="bottomRight"
          trigger={['click']}
          open={selector === 'right'}
          onOpenChange={(open) => { if (!open) { setSelector(''); } }}
          dropdownRender={() => (
            <ComponentsSelector
              tableId={props.tableConfig.tableId}
              showTitle
              showFilter
              customComponentPanel={props.customComponentPanel}
              onClose={() => setSelector('')}
              customColumns={(columns, column) => {
                const index = columns.findIndex(item => item.key === props.column.key);
                const newColumns = [...columns];
                newColumns.splice(index > columns.length - 1 ? columns.length - 1 : index + 1, 0, column);
                return newColumns;
              }}
            />
          )}
        >
          <div onClick={(e) => { e.stopPropagation(); setSelector('right'); }}>
            <ArrowRightOutlined />
            <span style={{ marginLeft: 2 }}>向右插入列</span>
          </div>
        </Dropdown>
      ),
    },
  ], [selector]);
  return (
    <GeneratorContext.Consumer>
      { ({ currentComponentPath, currentColumnID, currentComponentID, currentTableID, drawerType, setState }) => (
        <div
          key={props.key}
          className={classNames('jfe-drip-table-generator-workstation-table-header-item', {
            [props.tableConfig.configs.size || 'default']: props.tableConfig.configs.size,
            checked: props.tableConfig.tableId === currentTableID && props.column.key === currentColumnID,
            bordered: !!props.tableConfig.configs.bordered,
            'right-shadow': !!props.showRightShadow,
            'left-shadow': !!props.showLeftShadow,
          })}
          style={{ width: props.column.width }}
          onClick={(e) => {
            e.stopPropagation();
            setState({
              currentTableID: props.tableConfig.tableId,
              currentColumnID: props.column.key === currentColumnID ? void 0 : props.column.key,
              currentComponentID: void 0,
              currentComponentPath: [],
              drawerType: props.column.key === currentColumnID ? void 0 : 'column',
            });
          }}
          onMouseEnter={() => setState({ currentHoverColumnID: props.column.key })}
          onMouseLeave={() => setState({ currentHoverColumnID: void 0 })}
        >
          { props.tableConfig.tableId === currentTableID && props.column.key === currentColumnID && (
            <TableConfigsContext.Consumer>
              { ({ tableConfigs, setTableColumns }) => (
                <div className="jfe-drip-table-generator-workstation-table-header-tools" onClick={e => e.stopPropagation()}>
                  <Button
                    title="打开配置面板"
                    size="small"
                    type="primary"
                    icon={<SettingOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      setState({
                        currentTableID: props.tableConfig.tableId,
                        currentColumnID: props.column.key,
                        drawerType: 'column',
                      });
                    }}
                  />
                  <ClipboardButton
                    component="span"
                    style={{ lineHeight: '24px' }}
                    option-text={() => JSON.stringify({ ...props.column, key: void 0 }, null, 4)}
                    onSuccess={() => {
                      message.success('复制成功');
                    }}
                    onError={(e) => {
                      message.error('复制失败：您的浏览器不支持复制。');
                    }}
                  >
                    <Button
                      title="复制列"
                      size="small"
                      type="primary"
                      icon={<CopyOutlined />}
                      onClick={e => e.stopPropagation()}
                    />
                  </ClipboardButton>
                  <Popconfirm
                    title="确定删除当前列么?"
                    onConfirm={(e) => {
                      e?.stopPropagation();
                      const isGroupColumn = props.column.component === 'group';
                      setState({
                        currentColumnID: void 0,
                        currentComponentID: isGroupColumn ? void 0 : currentComponentID,
                        currentComponentPath: isGroupColumn ? [] : currentComponentPath,
                        drawerType: drawerType === 'column' ? void 0 : drawerType,
                      });
                      const tableIndex = tableConfigs.findIndex(item => item.tableId === currentTableID);
                      const columnIndex = tableConfigs[tableIndex]?.columns.findIndex(item => item.key === props.column.key) ?? 0;
                      const columns = [...tableConfigs[tableIndex]?.columns];
                      columns.splice(columnIndex, 1);
                      setTableColumns(columns, tableIndex);
                    }}
                    okText="是的"
                    cancelText="我再想想"
                  >
                    <Button
                      title="删除列"
                      size="small"
                      type="primary"
                      className="jfe-drip-table-generator-workstation-table-header-tool danger"
                      icon={<DeleteOutlined />}
                    />
                  </Popconfirm>
                  <Dropdown
                    placement="bottomRight"
                    trigger={['click']}
                    menu={{ items: menuItems }}
                  >
                    <Button
                      title="更多操作"
                      size="small"
                      type="primary"
                      style={{ transform: 'rotate(90deg)' }}
                      icon={<EllipsisOutlined />}
                      onClick={e => e.stopPropagation()}
                    />
                  </Dropdown>
                </div>
              ) }
            </TableConfigsContext.Consumer>

          ) }
          <RichText
            className="jfe-drip-table-generator-workstation-table-header-column-title"
            style={{ width: props.column.description ? 'calc(100% - 34px)' : void 0 }}
            html={columnTitle}
          />
          { props.column.description && (
          <Tooltip placement="top" overlay={<RichText html={props.column.description} />}>
            <span style={{ marginLeft: 6, verticalAlign: 'top' }}><QuestionCircleOutlined /></span>
          </Tooltip>
          ) }
        </div>
      ) }
    </GeneratorContext.Consumer>
  );
};

export default ColumnHeader;
