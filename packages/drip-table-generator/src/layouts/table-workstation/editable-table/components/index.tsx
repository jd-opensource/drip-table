/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import './index.less';

import { CloseCircleOutlined } from '@ant-design/icons';
import { Alert, Col, Row } from 'antd';
import classNames from 'classnames';
import {
  DripTableBuiltInColumnSchema,
  DripTableColumnSchema,
  DripTableExtraOptions,
  DripTableProps,
  TABLE_LAYOUT_COLUMN_RENDER_GENERATOR_DO_NOT_USE_IN_PRODUCTION as columnRenderGenerator,
} from 'drip-table';
import React from 'react';

import { filterAttributes, mockId } from '@/utils';
import { DripTableGeneratorContext, GeneratorContext } from '@/context';
import { getColumnItemConfigs, getComponentsConfigs, getSchemaValue } from '@/layouts/utils';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

import { getWidth, updateColumnItemByPath } from '../../utils';

interface EditableComponentsProps<
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  column: DripTableBuiltInColumnSchema;
  record: RecordType;
  customComponents: DripTableProps<RecordType, ExtraOptions>['components'];
  customComponentPanel: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'] | undefined;
  mockDataSource: DripTableGeneratorProps<RecordType, ExtraOptions>['mockDataSource'];
  dataFields: DripTableGeneratorProps<RecordType, ExtraOptions>['dataFields'];
}

interface EditableGroupComponentProps <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>{
  column: DripTableBuiltInColumnSchema | null;
  record: RecordType;
  customComponents: DripTableProps<RecordType, ExtraOptions>['components'];
  isCurrentColumn?: boolean;
  parentIndex?: number[];
  isChildren?: boolean;
  customComponentPanel: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'] | undefined;
  mockDataSource: DripTableGeneratorProps<RecordType, ExtraOptions>['mockDataSource'];
  dataFields: DripTableGeneratorProps<RecordType, ExtraOptions>['dataFields'];
}

const generatorComponentSchema = <T extends DripTableBuiltInColumnSchema | DripTableGeneratorContext['columns'][number] | null>(column: T): T => (
  column
    ? {
      ...column,
      options: {
        ...filterAttributes(column.options, 'visibleFunc'),
      },
    }
    : column
);

const EditableGroupComponent = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: EditableGroupComponentProps<RecordType, ExtraOptions>) => {
  const context = React.useContext(GeneratorContext);

  const getAllComponentsConfigs = React.useMemo(() => getComponentsConfigs('', props.customComponentPanel), [props.customComponentPanel]);

  const getColumnConfigs = (componentType: string) => getColumnItemConfigs(componentType, {
    componentsConfigs: getAllComponentsConfigs,
    previewDataSource: context.previewDataSource,
    mockDataSource: props.mockDataSource,
    dataFields: props.dataFields,
    filterSchema: true,
  });

  const isChecked = (currentCheckedIndex: number) => {
    const currentColumnPath = [...props?.parentIndex || [], currentCheckedIndex];
    const stateColumnPath = context.currentColumnPath || [];
    return props?.isCurrentColumn && currentColumnPath.join('.') === stateColumnPath.join('.');
  };

  if (props.column?.component === 'group') {
    const gutter = props.column.options.gutter ?? [0, 0];
    const columnWidth = Number(getWidth(props.column?.width || '', void 0, -20));
    const componentOptions = props.column.options;
    return (
      <GeneratorContext.Consumer>
        { ({ currentColumn, columns, columnToAdd, drawerType, setState }) => (
          <div style={{ height: props.isChildren ? '100%' : 'max-content', overflow: 'hidden' }}>
            <div
              className={props.isChildren ? '' : 'jfe-drip-table-generator-workstation-editable-table-components-table-cell'}
              style={{ width: props.isChildren ? '100%' : columnWidth }}
            >
              { componentOptions.layout?.map((layout, index) => (
                <Row
                  key={index}
                  className="jfe-drip-table-generator-workstation-editable-table-components-row-margin"
                  style={{
                    flexFlow: componentOptions.wrap ? 'row wrap' : 'nowrap',
                    justifyContent: componentOptions.horizontalAlign,
                  }}
                  gutter={gutter}
                  justify={componentOptions.horizontalAlign}
                  wrap={componentOptions.wrap}
                >
                  { Array.from({ length: layout }, (v, i) => i).map((col, i) => {
                    const currentCheckedIndex = componentOptions.layout.slice(0, index).reduce((sum, j) => sum + j, i);
                    const columnSchema = generatorComponentSchema(componentOptions.items[currentCheckedIndex]);
                    const renderTableCell = columnSchema
                      ? columnRenderGenerator<RecordType, ExtraOptions>(
                        {
                          uuid: 'DRIP-TABLE-GENERATOR-INSTANCE',
                          schema: getSchemaValue(context),
                          dataSource: [props.record],
                        },
                        columnSchema,
                        {
                          components: props.customComponents,
                          ext: void 0, // TODO: ext
                          unknownComponent: <Alert type="error" message="未知组件" />,
                          preview: true,
                        },
                      )
                      : () => <div />;
                    return (
                      <Col
                        className={classNames('jfe-drip-table-generator-workstation-editable-table-components-linear-stripe', isChecked(currentCheckedIndex) ? 'jfe-drip-table-generator-workstation-editable-table-components-checked-stripe' : '')}
                        key={i}
                        style={{
                          width: columnWidth / layout - gutter[0],
                          height: '100%',
                          overflow: 'auto',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          const path = isChecked(currentCheckedIndex) ? [] : [...props.parentIndex || [], currentCheckedIndex];
                          setState({
                            currentColumn: props.isCurrentColumn ? currentColumn : columns.find(item => item.key === props.column?.key),
                            currentColumnPath: path,
                            drawerType: isChecked(currentCheckedIndex) ? 'column' : 'column-item',
                          });
                        }}
                        onDragOver={(event) => {
                          event.stopPropagation();
                          event.preventDefault();
                        }}
                        onDrop={(event) => {
                          event.stopPropagation();
                          event.preventDefault();
                          const path = [...props.parentIndex || [], currentCheckedIndex];
                          if (props.column && columnToAdd) {
                            const configs = getColumnConfigs(columnToAdd.component);
                            const options: Record<string, unknown> = {};
                            const additionalProps = {};
                            configs?.attrSchema.forEach((schema) => {
                              if (schema.name.startsWith('options.')) {
                                options[schema.name.replace('options.', '')] = schema.default;
                              } else if (!schema.name.startsWith('style') && !schema.name.startsWith('titleStyle')) {
                                additionalProps[schema.name] = schema.default;
                              }
                            });
                            if (columnToAdd.component === 'group') {
                              options.items = [null, null];
                            }
                            const columnItemSchema: DripTableColumnSchema = {
                              key: `${columnToAdd.component}_${mockId()}`,
                              dataIndex: '',
                              title: '',
                              width: void 0,
                              description: '',
                              component: columnToAdd.component,
                              options,
                              ...additionalProps,
                            };
                            const theColumn = columns.find(item => item.key === props.column?.key);
                            if (theColumn) {
                              updateColumnItemByPath(theColumn, path || [], columnItemSchema);
                              const columnIndex = columns.findIndex(item => item.key === theColumn.key);
                              columns[columnIndex] = theColumn;
                              setState({ currentColumn: theColumn, columns });
                            }
                          }
                        }}
                      >
                        { componentOptions.items[currentCheckedIndex]
                          && (
                          <CloseCircleOutlined
                            className="jfe-drip-table-generator-workstation-editable-table-components-close-column-item"
                            onClick={() => {
                              componentOptions.items[currentCheckedIndex] = null;
                              setState({
                                currentColumnPath: [],
                                drawerType: drawerType === 'column-item' ? 'column' : drawerType,
                              });
                            }}
                          />
                          ) }
                        { componentOptions.items[currentCheckedIndex]?.component === 'group'
                          ? (
                            <EditableGroupComponent
                              column={componentOptions.items[currentCheckedIndex]}
                              isCurrentColumn={props.isCurrentColumn}
                              parentIndex={[...props?.parentIndex || [], currentCheckedIndex]}
                              isChildren
                              record={props.record}
                              customComponents={props.customComponents}
                              customComponentPanel={props.customComponentPanel}
                              mockDataSource={props.mockDataSource}
                              dataFields={props.dataFields}
                            />
                          )
                          : null }
                        { componentOptions.items[currentCheckedIndex] && componentOptions.items[currentCheckedIndex]?.component !== 'group'
                          ? (
                            <React.Fragment>
                              { renderTableCell(null, { type: 'body', key: '$$KEY$$', record: props.record, index: 0 }, 0) }
                            </React.Fragment>
                          )
                          : null }
                        { !componentOptions.items[currentCheckedIndex] && <span className="jfe-drip-table-generator-workstation-editable-table-components-column-tips">拖拽组件至此</span> }
                      </Col>
                    );
                  }) }
                </Row>
              )) }
            </div>
          </div>
        ) }
      </GeneratorContext.Consumer>
    );
  }
  return null;
};

const EditableComponents = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: EditableComponentsProps<RecordType, ExtraOptions>) => {
  const context = React.useContext(GeneratorContext);

  if (props.column?.component === 'group') {
    const isCurrentColumn = context.currentColumn && context.currentColumn.key === props.column.key;
    return (
      <EditableGroupComponent
        isCurrentColumn={isCurrentColumn}
        column={props.column}
        isChildren={false}
        record={props.record}
        customComponents={props.customComponents}
        customComponentPanel={props.customComponentPanel}
        mockDataSource={props.mockDataSource}
        dataFields={props.dataFields}
      />
    );
  }

  const columnSchema = generatorComponentSchema(props.column);
  const renderTableCell = columnSchema
    ? columnRenderGenerator<RecordType, ExtraOptions>(
      {
        uuid: 'DRIP-TABLE-GENERATOR-INSTANCE',
        schema: getSchemaValue(context),
        dataSource: [props.record],
      },
      columnSchema,
      {
        components: props.customComponents,
        ext: void 0, // TODO: ext
        unknownComponent: <Alert type="error" message="未知组件" />,
        preview: true,
      },
    )
    : () => <div />;

  return (
    <React.Fragment>
      { renderTableCell(null, { type: 'body', key: '$$KEY$$', record: props.record, index: 0 }, 0) }
    </React.Fragment>
  );
};

export default EditableComponents;
