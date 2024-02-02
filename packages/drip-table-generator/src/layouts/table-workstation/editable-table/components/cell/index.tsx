/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { CloseOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Dropdown, Row } from 'antd';
import classNames from 'classnames';
import {
  DripTableBuiltInColumnSchema,
  DripTableExtraOptions,
  DripTableProps,
  TABLE_LAYOUT_COLUMN_RENDER_GENERATOR_DO_NOT_USE_IN_PRODUCTION as columnRenderGenerator,
} from 'drip-table';
import React from 'react';

import { filterAttributes } from '@/utils';
import { GeneratorContext } from '@/context';
import { DTGTableConfig, TableConfigsContext } from '@/context/table-configs';
import { updateColumnItemByPath } from '@/layouts/attributes-layout/utils';
import { getSchemaValue } from '@/layouts/utils';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

import ComponentsSelector from '../components-selector';

interface TableCellProps<
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  column: DripTableBuiltInColumnSchema;
  columnIndex: number;
  record: RecordType;
  rowIndex: number;
  path: number[];
  tableConfig: DTGTableConfig;
  customComponents: DripTableProps<RecordType, ExtraOptions>['components'];
  customComponentPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'];
  customColumnAddPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customColumnAddPanel'];
  mockDataSource: DripTableGeneratorProps<RecordType, ExtraOptions>['mockDataSource'];
  dataFields: DripTableGeneratorProps<RecordType, ExtraOptions>['dataFields'];
  ext?: DripTableGeneratorProps<RecordType, ExtraOptions>['ext'];
  onClick?: DripTableGeneratorProps<RecordType, ExtraOptions>['onClick'];
}

const generatorComponentSchema = <T extends DripTableBuiltInColumnSchema | null>(column: T): T => (
  column
    ? {
      ...column,
      options: {
        ...filterAttributes(column.options, 'visibleFunc'),
      },
    }
    : column
);

const getIndex = (layout: number[], rowIndex: number, colIndex: number) => layout.slice(0, rowIndex).reduce((prev, curr) => prev + curr, 0) + colIndex;

const TableCell = <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: TableCellProps<RecordType, ExtraOptions>) => {
  const [dropdownIndex, setDropdownIndex] = React.useState(-1);
  const { tableConfigs } = React.useContext(TableConfigsContext);

  // 组合组件支持可视化编辑
  if (props.column?.component === 'group') {
    const options = props.column.options;
    return (
      <TableConfigsContext.Consumer>
        { ({ setTableColumns }) => {
          const gutter = options.gutter ?? [0, 0];
          return (
            <div
              className="jfe-drip-table-generator-workstation-table-cell-group-wrapper"
              onClick={e => e.stopPropagation()}
              style={{
                width: props.path.length === 0 ? 'max-content' : void 0,
                minWidth: props.path.length === 0 ? props.column.width || 200 : void 0,
              }}
            >
              { options.layout.map((colLength, rowIndex) => (
                <Row
                  key={rowIndex}
                  justify={options.horizontalAlign}
                  wrap={options.wrap}
                  className="jfe-drip-table-generator-workstation-table-cell-group-row"
                  style={{ minHeight: 120 / options.layout.length }}
                >
                  { Array.from({ length: colLength }, (v, i) => i).map((col, colIndex) => {
                    const componentIndex = getIndex(options.layout, rowIndex, colIndex);
                    const itemColumn = options.items[componentIndex] ?? null;
                    return (
                      <GeneratorContext.Consumer>
                        { ({ currentComponentPath, currentComponentID, setState }) => {
                          const isCurrentItem = itemColumn && itemColumn.key === currentComponentID && (currentComponentPath || []).join(',') === [...props.path, componentIndex].join(',');
                          return (
                            <Col
                              key={colIndex}
                              className={classNames('jfe-drip-table-generator-workstation-table-cell-group-col', {
                                checked: isCurrentItem,
                                empty: !itemColumn,
                              })}
                              style={{
                                padding: `${gutter[0]}px ${gutter[1]}px`,
                                minWidth: `${100 / colLength}%`,
                                width: 'max-content',
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setState({
                                  currentTableID: props.tableConfig.tableId,
                                  currentColumnID: props.tableConfig.columns[props.columnIndex].key,
                                  currentComponentID: isCurrentItem ? void 0 : itemColumn?.key,
                                  currentComponentPath: isCurrentItem ? [] : [...props.path, componentIndex],
                                  drawerType: isCurrentItem ? void 0 : 'column-item',
                                });
                                props.onClick?.('column-item', {
                                  currentTableID: props.tableConfig.tableId,
                                  currentColumnID: props.tableConfig.columns[props.columnIndex].key,
                                  currentComponentID: isCurrentItem ? void 0 : itemColumn?.key,
                                  currentComponentPath: isCurrentItem ? [] : [...props.path, componentIndex],
                                  tableConfig: props.tableConfig,
                                });
                              }}
                            >
                              { isCurrentItem && (
                                <Button
                                  className="jfe-drip-table-generator-workstation-table-cell-group-close"
                                  danger
                                  size="small"
                                  shape="circle"
                                  icon={<CloseOutlined />}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const tableIndex = tableConfigs.findIndex(x => x.tableId === props.tableConfig.tableId);
                                    const path = [...props.path, componentIndex];
                                    const rootColumn = updateColumnItemByPath(props.tableConfig.columns[props.columnIndex], path, null);
                                    const columns = [...props.tableConfig.columns];
                                    columns[props.columnIndex] = rootColumn;
                                    setTableColumns(columns, tableIndex);
                                  }}
                                />
                              ) }
                              { itemColumn
                                ? <TableCell {...props} column={itemColumn} path={[...props.path, componentIndex]} />
                                : (
                                  <Dropdown
                                    placement="bottomRight"
                                    trigger={['click']}
                                    open={dropdownIndex === componentIndex}
                                    onOpenChange={(open) => { if (!open) { setDropdownIndex(-1); } }}
                                    dropdownRender={() => (
                                      <ComponentsSelector
                                        open={dropdownIndex === componentIndex}
                                        tableId={props.tableConfig.tableId}
                                        showFilter
                                        customComponentPanel={props.customComponentPanel}
                                        customColumnAddPanel={props.customColumnAddPanel}
                                        onClose={() => setDropdownIndex(-1)}
                                        onConfirm={(column, tableIndex) => {
                                          const path = [...props.path, componentIndex];
                                          const rootColumn = updateColumnItemByPath(props.tableConfig.columns[props.columnIndex], path, column);
                                          const columns = [...props.tableConfig.columns];
                                          columns[props.columnIndex] = rootColumn;
                                          setTableColumns(columns, tableIndex);
                                        }}
                                      />
                                    )}
                                  >
                                    <div
                                      className="jfe-drip-table-generator-workstation-table-cell-group-empty"
                                      onClick={(e) => { e.stopPropagation(); setDropdownIndex(componentIndex); }}
                                    >
                                      <span>点击添加子组件</span>
                                    </div>
                                  </Dropdown>
                                ) }
                            </Col>
                          );
                        } }
                      </GeneratorContext.Consumer>
                    );
                  }) }
                </Row>
              )) }
            </div>
          );
        } }
      </TableConfigsContext.Consumer>
    );
  }
  const columnSchema = generatorComponentSchema(props.column);
  const renderCommonCell = columnSchema
    ? columnRenderGenerator<RecordType, ExtraOptions>(
      {
        uuid: 'DRIP-TABLE-GENERATOR-INSTANCE',
        schema: getSchemaValue(tableConfigs),
        dataSource: [props.record],
      },
      columnSchema,
      {
        components: props.customComponents,
        ext: props.ext,
        unknownComponent: <Alert type="error" message="未知组件" />,
        preview: true,
      },
    )
    : () => <div />;
  return (
    <React.Fragment>
      { renderCommonCell(null, { type: 'body', key: '$$KEY$$', record: props.record, index: props.rowIndex }, props.rowIndex) }
    </React.Fragment>
  );
};

export default TableCell;
