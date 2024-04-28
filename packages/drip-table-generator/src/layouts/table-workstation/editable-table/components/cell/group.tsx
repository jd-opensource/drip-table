/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import './index.less';

import { CloseOutlined } from '@ant-design/icons';
import { Col, Dropdown, Row, Tooltip } from 'antd';
import classNames from 'classnames';
import {
  DripTableBuiltInColumnSchema,
  DripTableExtraOptions,
} from 'drip-table';
import React from 'react';

import { GeneratorContext } from '@/context';
import { DTGTableConfig } from '@/context/table-configs';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

import ComponentsSelector from '../components-selector';
import CellComponent from './cell';
import { CommonCellProps } from './common';

export interface GroupCellProps<
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> extends CommonCellProps<RecordType, ExtraOptions> {
  column: DripTableBuiltInColumnSchema;
  columnIndex: number;
  // 用来嵌套渲染
  path: (number | 'content' | 'popover')[];
  // 对应表格配置信息
  tableConfig: DTGTableConfig;
  mockDataSource: DripTableGeneratorProps<RecordType, ExtraOptions>['mockDataSource'];
  dataFields: DripTableGeneratorProps<RecordType, ExtraOptions>['dataFields'];
  onAddColumnItem: (path: (number | 'content' | 'popover')[], column: DripTableBuiltInColumnSchema, tableIndex: number) => void;
  onRemoveColumnItem: (path: (number | 'content' | 'popover')[], columnIndex: number, tableId: string) => void;
  customComponentPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'];
  customColumnAddPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customColumnAddPanel'];
  onClick?: DripTableGeneratorProps<RecordType, ExtraOptions>['onClick'];
  onChangeColumnItem: (path: (number | 'popover' | 'content')[], schema: DripTableBuiltInColumnSchema, tableIndex: number) => void;
}

const getIndex = (layout: number[], rowIndex: number, colIndex: number) => layout.slice(0, rowIndex).reduce((prev, curr) => prev + curr, 0) + colIndex;

const GroupCell = <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: GroupCellProps<RecordType, ExtraOptions>) => {
  const [dropDownIndex, setDropDownIndex] = React.useState([] as (number | 'content' | 'popover')[]);
  const { currentComponentID } = React.useContext(GeneratorContext);
  const columnToRender = 'schema' in props.column ? props.column.schema as DripTableBuiltInColumnSchema : props.column;
  if (columnToRender?.component === 'group') {
    const options = columnToRender.options;
    const gutter = options.gutter ?? [0, 0];
    const rootColumn = props.tableConfig.columns[props.columnIndex];
    return (
      <div
        className="jfe-drip-table-generator-workstation-table-cell-group-wrapper"
        onClick={e => e.stopPropagation()}
        style={{
          width: props.path.length === 0 ? 'max-content' : void 0,
          minWidth: props.path.length === 0 ? props.column.width || 128 : void 0,
        }}
      >
        <div className="jfe-drip-table-generator-workstation-table-cell-group-inner-border">
          { options.layout.map((colLength, rowIndex) => (
            <Row
              key={rowIndex}
              justify={options.horizontalAlign}
              wrap={options.wrap}
              className="jfe-drip-table-generator-workstation-table-cell-group-row"
              style={{ minHeight: 40 / options.layout.length }}
            >
              { Array.from({ length: colLength }, (v, i) => i).map((col, colIndex) => {
                const componentIndex = getIndex(options.layout, rowIndex, colIndex);
                const itemColumn = options.items[componentIndex] ?? null;
                const itemColumnSchema = itemColumn && 'component' in itemColumn ? itemColumn : itemColumn?.schema;
                const colChecked = currentComponentID && currentComponentID === itemColumnSchema?.key;
                return (
                  <Col
                    key={colIndex}
                    className={classNames('jfe-drip-table-generator-workstation-table-cell-group-col', {
                      checked: colChecked,
                      empty: !itemColumnSchema,
                    })}
                    style={{
                      ...itemColumn && 'style' in itemColumn && 'schema' in itemColumn ? itemColumn.style : {},
                      margin: `${gutter[0]}px ${gutter[1]}px`,
                      minWidth: `${100 / colLength}%`,
                      width: 'max-content',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      props.onClick?.('column-item', {
                        currentComponentPath: colChecked ? [] : [componentIndex],
                        currentComponentID: colChecked ? void 0 : itemColumnSchema?.key,
                        currentColumnID: rootColumn.key,
                        currentTableID: props.tableConfig.tableId,
                        tableConfig: props.tableConfig,
                      });
                    }}
                  >
                    { itemColumnSchema && itemColumnSchema.key === currentComponentID && (
                    <div className="jfe-drip-table-generator-workstation-table-cell-group-close danger">
                      <Tooltip title="点击删除子组件">
                        <CloseOutlined
                          onClick={(e) => {
                            e.stopPropagation();
                            props.onRemoveColumnItem([componentIndex], props.columnIndex, props.tableConfig.tableId);
                          }}
                        />
                      </Tooltip>
                    </div>
                    ) }
                    { itemColumnSchema
                      ? (
                        <CellComponent
                          {...props}
                          column={itemColumnSchema}
                          path={[...props.path, componentIndex]}
                          onAddColumnItem={(path, column, tableIndex) => {
                            props.onAddColumnItem?.([componentIndex, ...path], column, tableIndex);
                          }}
                          onRemoveColumnItem={(path, columnIndex, tableId) => {
                            props.onRemoveColumnItem?.([componentIndex, ...path], columnIndex, tableId);
                          }}
                          onChangeColumnItem={(path, column, tableIndex) => {
                            props.onChangeColumnItem?.([componentIndex, ...path], column, tableIndex);
                          }}
                          onClick={(type, payload) => {
                            const path = payload.currentComponentPath as (number | 'popover' | 'content')[] | undefined;
                            props.onClick?.(type, {
                              ...payload,
                              currentComponentPath: path ? [componentIndex, ...path] : void 0,
                            });
                          }}
                        />
                      )
                      : (
                        <Dropdown
                          placement="bottomRight"
                          trigger={['click']}
                          open={dropDownIndex.join(',') === [...props.path, componentIndex].join(',')}
                          onOpenChange={(open) => { if (!open) { setDropDownIndex([]); } }}
                          dropdownRender={() => (
                            <ComponentsSelector
                              open={dropDownIndex.join(',') === [...props.path, componentIndex].join(',')}
                              tableId={props.tableConfig.tableId}
                              showFilter
                              customComponentPanel={props.customComponentPanel}
                              customColumnAddPanel={props.customColumnAddPanel}
                              onClose={() => setDropDownIndex([])}
                              onConfirm={(column, tableIndex) => {
                                const columnSchema = {
                                  ...column,
                                  style: { width: `${100 / colLength}%` },
                                } as DripTableBuiltInColumnSchema;
                                props.onAddColumnItem([componentIndex], columnSchema, tableIndex);
                              }}
                            />
                          )}
                        >
                          <div
                            className="jfe-drip-table-generator-workstation-table-cell-group-empty"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDropDownIndex([...props.path, componentIndex]);
                            }}
                          >
                            <span>点击添加子组件</span>
                          </div>
                        </Dropdown>
                      ) }
                  </Col>
                );
              }) }
            </Row>
          )) }
        </div>

      </div>
    );
  }

  return null;
};

export default GroupCell;
