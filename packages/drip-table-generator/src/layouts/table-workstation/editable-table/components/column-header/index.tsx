/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { ArrowLeftOutlined, ArrowRightOutlined, CaretDownOutlined, CaretUpOutlined, CopyOutlined, DeleteOutlined, EllipsisOutlined, QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { Alert, Button, Dropdown, MenuProps, message, Popconfirm, Popover, Tooltip } from 'antd';
import classNames from 'classnames';
import { DripTableExtraOptions } from 'drip-table';
import React from 'react';
import ClipboardButton from 'react-clipboard.js';

import { formatNumber } from '@/utils';
import RichText from '@/components/RichText';
import { GeneratorContext } from '@/context';
import { DTGTableConfig, TableConfigsContext } from '@/context/table-configs';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

import ComponentsSelector from '../components-selector';
import { FilterViewer } from './filter';

export interface ColumnHeaderProps <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>{
  tableConfig: DTGTableConfig;
  column: DTGTableConfig['columns'][number];
  containerWidth: number;
  columnId?: string | number;
  showLeftShadow?: boolean;
  showRightShadow?: boolean;
  dataSource?: DripTableGeneratorProps<RecordType, ExtraOptions>['dataSource'];
  columnTools?: DripTableGeneratorProps<RecordType, ExtraOptions>['columnTools'];
  customComponentPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'];
  customColumnAddPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customColumnAddPanel'];
  onClick: DripTableGeneratorProps<RecordType, ExtraOptions>['onClick'];
  renderHeaderCellFilter: DripTableGeneratorProps<RecordType, ExtraOptions>['renderHeaderCellFilter'];
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

  const columnStyle = React.useMemo(() => {
    let styles: React.CSSProperties = {};
    if (typeof props.column.title === 'string') {
      styles = {};
    } else if (typeof props.column.title?.body === 'string') {
      styles = props.column.title?.style ?? {};
    } else {
      styles = props.column.title?.body?.style ?? {};
    }
    return styles;
  }, [props.column]);

  const [columnRightCount, columnTitleWidth] = React.useMemo(() => {
    let count = 0;
    let titleWidth = 'calc(100%';
    if (props.column.sorter) {
      count += 1;
      titleWidth += ' - 24px';
    }
    if (props.column.filters && props.column.filters.length > 0) {
      count += 1;
      titleWidth += ' - 24px';
    }
    titleWidth += ')';
    return [count, titleWidth];
  }, [props.column]);

  const columnWidth = React.useMemo(() => {
    console.debug('header calc', props.containerWidth);
    if (typeof props.column.width === 'string' && props.column.width.endsWith('%')) {
      const rawColumnWidth = (Number(props.column.width.slice(0, -1)) * props.containerWidth) / 100;
      return `${rawColumnWidth}px`;
    }
    return formatNumber(props.column.width || 200);
  }, [props.column.width]);

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
              customColumnAddPanel={props.customColumnAddPanel}
              onClose={() => setSelector('')}
              customColumns={(columns, column) => {
                const index = columns.findIndex(item => item.key === props.column.key);
                const newColumns = [...columns];
                newColumns.splice(index < 0 ? 0 : index, 0, column);
                props.onClick?.('column-insert-left', {
                  columns: newColumns,
                  currentTableID: props.tableConfig.tableId,
                  tableConfig: props.tableConfig,
                });
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
              customColumnAddPanel={props.customColumnAddPanel}
              onClose={() => setSelector('')}
              customColumns={(columns, column) => {
                const index = columns.findIndex(item => item.key === props.column.key);
                const newColumns = [...columns];
                newColumns.splice(index > columns.length - 1 ? columns.length - 1 : index + 1, 0, column);
                props.onClick?.('column-insert-right', {
                  columns: newColumns,
                  currentTableID: props.tableConfig.tableId,
                  tableConfig: props.tableConfig,
                });
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
          key={props.columnId}
          className={classNames('jfe-drip-table-generator-workstation-table-header-item', {
            [props.tableConfig.configs.size || 'default']: props.tableConfig.configs.size,
            checked: props.tableConfig.tableId === currentTableID && props.column.key === currentColumnID,
            bordered: !!props.tableConfig.configs.bordered,
            'right-shadow': !!props.showRightShadow,
            'left-shadow': !!props.showLeftShadow,
          })}
          style={{
            ...columnStyle,
            width: columnWidth,
            textAlign: props.column.align,
          }}
          onClick={(e) => {
            e.stopPropagation();
            setState({
              currentTableID: props.tableConfig.tableId,
              currentColumnID: props.column.key === currentColumnID ? void 0 : props.column.key,
              currentComponentID: void 0,
              currentComponentPath: [],
              drawerType: props.column.key === currentColumnID ? void 0 : 'column',
            });
            props.onClick?.('column', {
              currentTableID: props.tableConfig.tableId,
              currentColumnID: props.column.key === currentColumnID ? void 0 : props.column.key,
              tableConfig: props.tableConfig,
            });
          }}
          onMouseEnter={() => setState({ currentHoverColumnID: props.column.key })}
          onMouseLeave={() => setState({ currentHoverColumnID: void 0 })}
        >
          { props.tableConfig.tableId === currentTableID && props.column.key === currentColumnID && (
            <TableConfigsContext.Consumer>
              { ({ tableConfigs, setTableColumns }) => (
                <div className="jfe-drip-table-generator-workstation-table-header-tools" onClick={e => e.stopPropagation()}>
                  { (!props.columnTools || props.columnTools.includes('config')) && (
                  <Tooltip title="打开当前列组件配置面板">
                    <Button
                      size="small"
                      className="jfe-drip-table-generator-workstation-table-header-tool"
                      ghost
                      icon={<SettingOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        setState({
                          currentTableID: props.tableConfig.tableId,
                          currentColumnID: props.column.key,
                          drawerType: 'column',
                        });
                        props.onClick?.('column', {
                          currentTableID: props.tableConfig.tableId,
                          currentColumnID: props.column.key,
                          tableConfig: props.tableConfig,
                        });
                      }}
                    />
                  </Tooltip>
                  ) }
                  { (!props.columnTools || props.columnTools.includes('copy')) && (
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
                      className="jfe-drip-table-generator-workstation-table-header-tool"
                      ghost
                      icon={<CopyOutlined />}
                      onClick={e => e.stopPropagation()}
                    />
                  </ClipboardButton>
                  ) }
                  { (!props.columnTools || props.columnTools.includes('delete')) && (
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
                      props.onClick?.('column-delete', {
                        columns,
                        currentTableID: props.tableConfig.tableId,
                        tableConfig: props.tableConfig,
                      });
                    }}
                    okText="是的"
                    cancelText="我再想想"
                  >
                    <Button
                      title="删除列"
                      size="small"
                      ghost
                      className="jfe-drip-table-generator-workstation-table-header-tool danger"
                      icon={<DeleteOutlined />}
                    />
                  </Popconfirm>
                  ) }
                  { (!props.columnTools || props.columnTools.includes('more')) && (
                  <Dropdown
                    placement="bottomRight"
                    trigger={['click']}
                    menu={{ items: menuItems }}
                  >
                    <Button
                      title="更多操作"
                      size="small"
                      ghost
                      className="jfe-drip-table-generator-workstation-table-header-tool"
                      style={{ transform: 'rotate(90deg)' }}
                      icon={<EllipsisOutlined />}
                      onClick={e => e.stopPropagation()}
                    />
                  </Dropdown>
                  ) }
                </div>
              ) }
            </TableConfigsContext.Consumer>
          ) }
          <div
            style={{
              width: columnRightCount > 0 ? columnTitleWidth : '100%',
              textAlign: props.column.align,
              display: 'inline-block',
            }}
          >
            <RichText
              className="jfe-drip-table-generator-workstation-table-header-column-title"
              html={columnTitle ?? ''}
            />
            { props.column.description && (
              <Tooltip placement="top" overlay={<RichText html={props.column.description ?? ''} />}>
                <span style={{ marginLeft: 6, verticalAlign: 'top' }}><QuestionCircleOutlined /></span>
              </Tooltip>
            ) }
          </div>
          {
            columnRightCount > 0 && (
              <div style={{ display: 'inline-block', verticalAlign: 'top', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                  { props.column.sorter && (
                  <Popover placement="top" content={(<Alert showIcon description="此处仅用于展示配置，如果您想要体验功能，请切换到预览模式，并配置事件onSorterChanged。" type="warning" />)}>
                    { props.column.sortDirections?.length === 1 && props.column.sortDirections[0] === 'ascend' && (
                    <span style={{ marginLeft: 6, verticalAlign: 'top', color: '#b1b1b1', fontSize: '12px' }}><CaretUpOutlined /></span>
                    ) }
                    { props.column.sortDirections?.length === 1 && props.column.sortDirections[0] === 'descend' && (
                    <span style={{ marginLeft: 6, verticalAlign: 'bottom', color: '#b1b1b1', fontSize: '12px' }}><CaretDownOutlined /></span>
                    ) }
                    { (!props.column.sortDirections || props.column.sortDirections?.length !== 1) && (
                    <span style={{ marginLeft: 6, display: 'flex', flexDirection: 'column', color: '#b1b1b1', fontSize: '12px' }}>
                      <CaretUpOutlined style={{ height: 10 }} />
                      <CaretDownOutlined />
                    </span>
                    ) }
                  </Popover>
                  ) }
                  { props.column.filters && props.column.filters.length > 0 && (
                    <FilterViewer
                      tableConfig={props.tableConfig}
                      column={props.column}
                      dataSource={props.dataSource}
                      renderHeaderCellFilter={props.renderHeaderCellFilter}
                    />
                  ) }
                </div>
              </div>
            )
          }

        </div>
      ) }
    </GeneratorContext.Consumer>
  );
};

export default ColumnHeader;
