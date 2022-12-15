/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

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
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import React from 'react';

import { filterAttributes, mockId } from '@/utils';
import { DripTableGeneratorContext, GeneratorContext } from '@/context';
import { getSchemaValue } from '@/layouts/utils';
import components from '@/table-components';
import { DataSourceTypeAbbr, DripTableGeneratorProps, DTGComponentPropertySchema } from '@/typing';

import { getWidth, updateColumnItemByPath } from '../../utils';

import styles from './index.module.less';

interface EditableComponentsProps<
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  column: DripTableBuiltInColumnSchema;
  record: RecordType;
  driver: DripTableGeneratorProps<RecordType, ExtraOptions>['driver'];
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
  driver: DripTableGeneratorProps<RecordType, ExtraOptions>['driver'];
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

  const getAllComponentsConfigs = React.useMemo(() => {
    let componentsToUse = components;
    if (props.customComponentPanel) {
      const customComponents = props.customComponentPanel.configs;
      componentsToUse = props.customComponentPanel.mode === 'add' ? [...components, ...customComponents] : [...customComponents];
    }
    return [...componentsToUse];
  }, [props.customComponentPanel]);

  const getColumnConfigs = (componentType: string) => {
    const columnConfig = getAllComponentsConfigs.find(schema => schema['ui:type'] === componentType);
    if (columnConfig) {
      columnConfig.attrSchema = columnConfig.attrSchema.filter(item => !(item.name.startsWith('titleStyle') || ['title', 'dataProcess', 'description'].includes(item.name)));
    }
    columnConfig?.attrSchema.forEach((schema) => {
      const uiProps = schema['ui:props'];
      if (!uiProps) {
        return;
      }
      if (uiProps.optionsParam === '$$FIELD_KEY_OPTIONS$$') {
        uiProps.options = props.mockDataSource
          ? Object.keys(context.previewDataSource[0] || {}).map(key => ({ label: key, value: key }))
          : props.dataFields?.map(key => ({ label: key, value: key })) || [];
      }
      if (uiProps.items) {
        (uiProps.items as DTGComponentPropertySchema[])?.forEach((item, index) => {
          const itemUiProps = item['ui:props'];
          if (!itemUiProps) {
            return;
          }
          if (itemUiProps.optionsParam === '$$FIELD_KEY_OPTIONS$$') {
            itemUiProps.options = props.mockDataSource
              ? Object.keys(context.previewDataSource[0] || {}).map(key => ({ label: key, value: key }))
              : props.dataFields?.map(key => ({ label: key, value: key })) || [];
          }
        });
      }
    });
    return columnConfig;
  };

  const isChecked = (currentCheckedIndex: number) => {
    const currentColumnPath = [...props?.parentIndex || [], currentCheckedIndex];
    const stateColumnPath = context.currentColumnPath || [];
    return props?.isCurrentColumn && currentColumnPath.join('.') === stateColumnPath.join('.');
  };

  if (props.column?.component === 'group') {
    const gutter = props.column.options.gutter ?? [0, 0];
    const columnWidth = Number(getWidth(props.column?.width || '', void 0, -18));
    const componentOptions = props.column.options;
    return (
      <GeneratorContext.Consumer>
        { ({ currentColumn, columns, columnToAdd, drawerType, setState }) => (
          <div style={{ height: props.isChildren ? '100%' : 'max-content', overflow: 'hidden' }}>
            <div
              className={props.isChildren ? '' : styles['table-cell']}
              style={{ width: props.isChildren ? '100%' : columnWidth }}
            >
              { componentOptions.layout?.map((layout, index) => (
                <Row
                  key={index}
                  className={styles['row-margin']}
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
                          driver: props.driver || DripTableDriverAntDesign,
                          components: props.customComponents,
                          ext: void 0, // TODO: ext
                          unknownComponent: <Alert type="error" message="未知组件" />,
                        },
                      )
                      : () => <div />;
                    return (
                      <Col
                        className={classNames(styles['linear-stripe'], isChecked(currentCheckedIndex) ? styles['checked-stripe'] : '')}
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
                            currentColumn: !props.isCurrentColumn ? columns.find(item => item.key === props.column?.key) : currentColumn,
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
                            const componentStyle = {};
                            configs?.attrSchema.forEach((schema) => {
                              if (schema.name.startsWith('options.')) {
                                options[schema.name.replace('options.', '')] = schema.default;
                              } else if (schema.name.startsWith('style.')) {
                                componentStyle[schema.name.replace('style.', '')] = schema.default;
                              } else if (!schema.name.startsWith('titleStyle.')) {
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
                              style: componentStyle,
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
                            className={styles['close-column-item']}
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
                              driver={props.driver}
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
                        { !componentOptions.items[currentCheckedIndex] && <span className={styles['column-tips']}>拖拽组件至此</span> }
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
        driver={props.driver}
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
        driver: props.driver || DripTableDriverAntDesign,
        components: props.customComponents,
        ext: void 0, // TODO: ext
        unknownComponent: <Alert type="error" message="未知组件" />,
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
