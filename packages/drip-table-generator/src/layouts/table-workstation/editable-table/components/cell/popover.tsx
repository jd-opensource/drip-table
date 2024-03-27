/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import './index.less';

import { SwitcherOutlined } from '@ant-design/icons';
import { Dropdown, Popover, Row, Tooltip } from 'antd';
import classNames from 'classnames';
import {
  DripTableBuiltInColumnSchema,
  DripTableExtraOptions,
  DripTableProps,
} from 'drip-table';
import React from 'react';

import { GeneratorContext } from '@/context';
import { DTGTableConfig } from '@/context/table-configs';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

import ComponentsSelector from '../components-selector';
import CellComponent from './cell';
import { CommonCellProps } from './common';

export interface PopoverCellProps<
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,> extends CommonCellProps<RecordType, ExtraOptions> {
  column: DripTableBuiltInColumnSchema;
  path?: (number | 'popover' | 'content')[];
  onChangeColumnItem: (path: (number | 'popover' | 'content')[], schema: DripTableBuiltInColumnSchema, tableIndex: number) => void;
  // 对应表格配置信息
  tableConfig: DTGTableConfig;
  customComponents: DripTableProps<RecordType, ExtraOptions>['components'];
  customComponentPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'];
  customColumnAddPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customColumnAddPanel'];
  mockDataSource: DripTableGeneratorProps<RecordType, ExtraOptions>['mockDataSource'];
  dataFields: DripTableGeneratorProps<RecordType, ExtraOptions>['dataFields'];
  onAddColumnItem: (path: (number | 'popover' | 'content')[], column: DripTableBuiltInColumnSchema, tableIndex: number) => void;
  onRemoveColumnItem: (path: (number | 'popover' | 'content')[], columnIndex: number, tableId: string) => void;
  onClick?: DripTableGeneratorProps<RecordType, ExtraOptions>['onClick'];
}

const PopoverCell = <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,>(props: PopoverCellProps<RecordType, ExtraOptions>) => {
  const [dropDown, setDropDown] = React.useState(false);
  const [popoverDropDown, setPopoverDropDown] = React.useState(false);
  const { currentComponentID } = React.useContext(GeneratorContext);

  if (props.column.component === 'popover') {
    const options = props.column.options;
    return (
      <Popover
        content={(
          <div
            className={classNames('jfe-drip-table-generator-workstation-table-cell-group-col', {
              checked: options.popover.key === currentComponentID,
            })}
            style={{ position: 'relative' }}
            onClick={(e) => {
              e.stopPropagation();
              const path = props.path ?? [];
              props.onClick?.('column-item', {
                currentComponentPath: options.popover.key === currentComponentID ? void 0 : [...path, 'popover'],
                currentComponentID: options.popover.key === currentComponentID ? void 0 : options.popover.key,
                currentColumnID: props.column.key,
                currentTableID: props.tableConfig.tableId,
              });
            }}
          >
            { options.popover.key === currentComponentID && (
            <Dropdown
              placement="bottomRight"
              trigger={['click']}
              open={popoverDropDown}
              onOpenChange={(open) => { if (!open) { setPopoverDropDown(false); } }}
              dropdownRender={() => (
                <ComponentsSelector
                  open={popoverDropDown}
                  tableId={props.tableConfig.tableId}
                  showFilter
                  customComponentPanel={props.customComponentPanel}
                  customColumnAddPanel={props.customColumnAddPanel}
                  onClose={() => setPopoverDropDown(false)}
                  onConfirm={(column, tableIndex) => {
                    props.onChangeColumnItem([...props.path ?? [], 'popover'], column as DripTableBuiltInColumnSchema, tableIndex);
                  }}
                />
              )}
            >
              <div className="jfe-drip-table-generator-workstation-table-cell-group-close primary">
                <Tooltip title="点击更换组件">
                  <SwitcherOutlined onClick={(e) => {
                    e.stopPropagation();
                    setPopoverDropDown(true);
                  }}
                  />
                </Tooltip>
              </div>
            </Dropdown>
            ) }
            <CellComponent
              {...props}
              column={options.popover}
              onAddColumnItem={(path, column, tableIndex) => {
                props.onAddColumnItem?.(['popover', ...path], column, tableIndex);
              }}
              onRemoveColumnItem={(path, columnIndex, tableId) => {
                props.onRemoveColumnItem?.(['popover', ...path], columnIndex, tableId);
              }}
              onClick={(type, payload) => {
                const path = payload.currentComponentPath as (number | 'popover' | 'content')[] | undefined;
                props.onClick?.(type, {
                  ...payload,
                  currentComponentPath: path ? ['popover', ...path] : void 0,
                });
              }}
            />
          </div>
        )}
        trigger={options.trigger}
        placement={options.placement}
      >
        <Row
          className={classNames('jfe-drip-table-generator-workstation-table-cell-group-col', {
            checked: options.content.key === currentComponentID,
          })}
          style={{ padding: '4px', position: 'relative' }}
          onClick={(e) => {
            e.stopPropagation();
            const path = props.path ?? [];
            props.onClick?.('column-item', {
              currentComponentPath: options.content.key === currentComponentID ? void 0 : [...path, 'content'],
              currentComponentID: options.content.key === currentComponentID ? void 0 : options.content.key,
              currentColumnID: props.column.key,
              currentTableID: props.tableConfig.tableId,
            });
          }}
        >
          { options.content.key === currentComponentID && (
          <Dropdown
            placement="bottomRight"
            trigger={['click']}
            open={dropDown}
            onOpenChange={(open) => { if (!open) { setDropDown(false); } }}
            dropdownRender={() => (
              <ComponentsSelector
                open={dropDown}
                tableId={props.tableConfig.tableId}
                showFilter
                customComponentPanel={props.customComponentPanel}
                customColumnAddPanel={props.customColumnAddPanel}
                onClose={() => setDropDown(false)}
                onConfirm={(column, tableIndex) => {
                  props.onChangeColumnItem([...props.path ?? [], 'content'], column as DripTableBuiltInColumnSchema, tableIndex);
                }}
              />
            )}
          >
            <div className="jfe-drip-table-generator-workstation-table-cell-group-close primary">
              <Tooltip title="点击更换组件">
                <SwitcherOutlined onClick={(e) => {
                  e.stopPropagation();
                  setDropDown(true);
                }}
                />
              </Tooltip>
            </div>
          </Dropdown>
          ) }
          <CellComponent
            {...props}
            column={options.content}
            onAddColumnItem={(path, column, tableIndex) => {
              props.onAddColumnItem?.(['content', ...path], column, tableIndex);
            }}
            onRemoveColumnItem={(path, columnIndex, tableId) => {
              props.onRemoveColumnItem?.(['content', ...path], columnIndex, tableId);
            }}
            onClick={(type, payload) => {
              const path = payload.currentComponentPath as (number | 'popover' | 'content')[] | undefined;
              props.onClick?.(type, {
                ...payload,
                currentComponentPath: path ? ['content', ...path] : void 0,
              });
            }}
          />
        </Row>
      </Popover>
    );
  }
  return null;
};

export default PopoverCell;
