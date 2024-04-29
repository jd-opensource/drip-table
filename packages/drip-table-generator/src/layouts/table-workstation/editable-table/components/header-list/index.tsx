/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Dropdown } from 'antd';
import classNames from 'classnames';
import { DripTableExtraOptions } from 'drip-table';
import React from 'react';
import { ReactSortable } from 'react-sortablejs';

import { filterArray } from '@/utils';
import { DTGTableConfig } from '@/context/table-configs';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

import ColumnHeader from '../column-header';
import ComponentsSelector from '../components-selector';

interface ColumnHeaderListProps<
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  scrollTarget: string;
  scrollLeft: number;
  tableConfig: DTGTableConfig;
  draggable: DripTableGeneratorProps<RecordType, ExtraOptions>['draggable'];
  dataSource?: DripTableGeneratorProps<RecordType, ExtraOptions>['dataSource'];
  columnTools?: DripTableGeneratorProps<RecordType, ExtraOptions>['columnTools'];
  customComponentPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'];
  customColumnAddPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customColumnAddPanel'];
  onColumnAdded?: DripTableGeneratorProps<RecordType, ExtraOptions>['onColumnAdded'];
  onResort: (column: DTGTableConfig['columns']) => void;
  onScroll: (scrollLeft: number) => void;
  onClick: DripTableGeneratorProps<RecordType, ExtraOptions>['onClick'];
}

const ColumnHeaderList = <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: ColumnHeaderListProps<RecordType, ExtraOptions>) => {
  const scrollableRow = React.useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const columnList = React.useMemo(() => props.tableConfig.columns.map((item, index) => ({ id: index, column: item })), [props.tableConfig.columns]);
  const sortableColumns = filterArray(columnList, item => !item.column.fixed);
  let leftFixedColumns = filterArray(columnList, item => item.column.fixed === 'left');
  let rightFixedColumns = filterArray(columnList, item => item.column.fixed === 'right');
  if (sortableColumns.length > 0) {
    leftFixedColumns = filterArray(columnList, item => item.column.fixed === 'left' || (item.column.fixed && item.id < sortableColumns[0].id));
    rightFixedColumns = filterArray(columnList, item => item.column.fixed === 'right' || (item.column.fixed && item.id > sortableColumns[0].id));
  }
  React.useEffect(() => {
    if (scrollableRow.current && props.scrollTarget !== '') {
      scrollableRow.current.scrollLeft = props.scrollLeft;
    }
  }, [props.scrollLeft, props.scrollTarget]);

  return (
    <div className={classNames('jfe-drip-table-generator-workstation-table-header-wrapper', {
      invisible: props.tableConfig.configs.showHeader === false,
      [props.tableConfig.configs.size || 'default']: props.tableConfig.configs.size,
    })}
    >
      { props.tableConfig.hasSubTable && (
        <div
          className={classNames('jfe-drip-table-generator-workstation-table-header-item disabled', {
            [props.tableConfig.configs.size || 'default']: props.tableConfig.configs.size,
            bordered: !!props.tableConfig.configs.bordered,
          })}
          style={{ width: 48, minWidth: 48 }}
        />
      ) }
      { props.tableConfig.configs.rowSelection && (
        <div
          className={classNames('jfe-drip-table-generator-workstation-table-header-item disabled', {
            [props.tableConfig.configs.size || 'default']: props.tableConfig.configs.size,
            bordered: !!props.tableConfig.configs.bordered,
          })}
          style={{ width: 48, minWidth: 48 }}
        >
          <Checkbox disabled />
        </div>
      ) }
      { leftFixedColumns.length > 0
        ? leftFixedColumns.map((columnWrapper, index) => (
          <ColumnHeader
            showRightShadow={index === leftFixedColumns.length - 1}
            tableConfig={props.tableConfig}
            column={columnWrapper.column}
            columnId={columnWrapper.id}
            customColumnAddPanel={props.customColumnAddPanel}
            customComponentPanel={props.customComponentPanel}
            columnTools={props.columnTools}
            dataSource={props.dataSource}
            onClick={props.onClick}
          />
        ))
        : null }
      <div
        ref={scrollableRow}
        className="jfe-drip-table-generator-workstation-table-header-scrollbar"
        style={{
          width: typeof props.tableConfig.configs.scroll?.x === 'boolean' ? '100%' : props.tableConfig.configs.scroll?.x,
          overflowX: props.tableConfig.configs.scroll?.x ? 'auto' : void 0,
          overflowY: 'hidden',
        }}
        onScroll={(e) => { if (!props.scrollTarget) { props.onScroll((e.target as HTMLDivElement).scrollLeft); } }}
      >
        <ReactSortable
          animation={250}
          filter={props.draggable === false ? '.jfe-drip-table-generator-workstation-table-header-item' : void 0}
          list={columnList}
          setList={(newList) => {
            const newColumns = newList.map(item => item.column);
            props.onResort(newColumns);
          }}
          style={{ display: 'flex' }}
        >
          { sortableColumns.map(columnWrapper => (
            <ColumnHeader
              tableConfig={props.tableConfig}
              column={columnWrapper.column}
              columnId={columnWrapper.id}
              customColumnAddPanel={props.customColumnAddPanel}
              customComponentPanel={props.customComponentPanel}
              columnTools={props.columnTools}
              dataSource={props.dataSource}
              onClick={props.onClick}
            />
          )) }
        </ReactSortable>
      </div>
      { rightFixedColumns.length > 0
        ? rightFixedColumns.map((columnWrapper, index) => (
          <ColumnHeader
            showLeftShadow={!index}
            tableConfig={props.tableConfig}
            column={columnWrapper.column}
            columnId={columnWrapper.id}
            customColumnAddPanel={props.customColumnAddPanel}
            customComponentPanel={props.customComponentPanel}
            columnTools={props.columnTools}
            dataSource={props.dataSource}
            onClick={props.onClick}
          />
        ))
        : null }
      <div
        className={classNames('jfe-drip-table-generator-workstation-table-header-add-item', {
          [props.tableConfig.configs.size || 'default']: props.tableConfig.configs.size,
        })}
      >
        <Dropdown
          placement="bottomRight"
          trigger={['click']}
          open={dropdownOpen}
          onOpenChange={(open) => { if (!open) { setDropdownOpen(false); } }}
          dropdownRender={() => (
            <ComponentsSelector
              open={dropdownOpen}
              tableId={props.tableConfig.tableId}
              showTitle
              showFilter
              customComponentPanel={props.customComponentPanel}
              customColumnAddPanel={props.customColumnAddPanel}
              onClose={() => setDropdownOpen(false)}
              onColumnAdded={props.onColumnAdded}
            />
          )}
        >
          <Button
            icon={<PlusOutlined />}
            size={props.tableConfig.configs.size === 'small' ? props.tableConfig.configs.size : void 0}
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen(!dropdownOpen);
            }}
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default ColumnHeaderList;
