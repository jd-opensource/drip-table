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
import { builtInComponents, DripTableBuiltInColumnSchema, DripTableColumnSchema, DripTableExtraOptions, DripTableRecordTypeBase } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import React from 'react';

import { get, mockId } from '@/utils';
import { DripTableGeneratorContext, GeneratorContext } from '@/context';
import components from '@/table-components';
import { DripTableGeneratorProps, DTGComponentPropertySchema } from '@/typing';

import { getWidth, updateColumnItemByPath } from '../../utils';

import styles from './index.module.less';

interface EditableComponentsProps<
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
> {
  record: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['previewDataSource'][number];
  column: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['columns'][number];
  driver: DripTableGeneratorProps<RecordType, ExtraOptions>['driver'];
  customComponents: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponents'];
  customComponentPanel: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'] | undefined;
  mockDataSource: DripTableGeneratorProps<RecordType, ExtraOptions>['mockDataSource'];
  dataFields: DripTableGeneratorProps<RecordType, ExtraOptions>['dataFields'];
}

interface EditableGroupComponentProps <
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
>{
  column: DripTableBuiltInColumnSchema | null;
  record: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['previewDataSource'][number];
  driver: DripTableGeneratorProps<RecordType, ExtraOptions>['driver'];
  customComponents: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponents'];
  isCurrentColumn?: boolean;
  parentIndex?: number[];
  isChildren?: boolean;
  customComponentPanel: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'] | undefined;
  mockDataSource: DripTableGeneratorProps<RecordType, ExtraOptions>['mockDataSource'];
  dataFields: DripTableGeneratorProps<RecordType, ExtraOptions>['dataFields'];
}

const EditableGroupComponent = <
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
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
                    const subColumn = componentOptions.items[currentCheckedIndex];
                    const [libName, componentName] = subColumn?.component?.includes('::') ? subColumn.component.split('::') : ['', subColumn?.component || ''];
                    const DripTableComponent = libName ? props.customComponents?.[libName]?.[componentName] : builtInComponents[componentName];
                    const value = subColumn?.dataIndex ? get(props.record, subColumn.dataIndex) : props.record;
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
                            configs?.attrSchema.forEach((schema) => {
                              if (schema.name.startsWith('options.')) {
                                options[schema.name.replace('options.', '')] = schema.default;
                              } else {
                                additionalProps[schema.name] = schema.default;
                              }
                            });
                            if (columnToAdd.component === 'group') {
                              options.items = [null, null];
                            }
                            const columnItemSchema: DripTableColumnSchema = {
                              key: `${columnToAdd.component}_${mockId()}`,
                              dataIndex: '',
                              title: columnToAdd.title,
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
                              { DripTableComponent
                                ? (
                                  <DripTableComponent
                                    driver={props.driver || DripTableDriverAntDesign}
                                    value={value as unknown}
                                    data={props.record}
                                    schema={componentOptions.items[currentCheckedIndex]}
                                    preview={{}}
                                  />
                                )
                                : <Alert type="error" message="未知组件" /> }
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
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
>(props: EditableComponentsProps<RecordType, ExtraOptions>) => {
  const context = React.useContext(GeneratorContext);
  const [libName, componentName] = props.column?.component?.includes('::') ? props.column.component.split('::') : ['', props.column?.component || ''];
  const DripTableComponent = libName ? props.customComponents?.[libName]?.[componentName] : builtInComponents[componentName];
  const value = props.column?.dataIndex ? get(props.record, props.column.dataIndex) : props.record;

  if (props.column?.component === 'group') {
    const isCurrentColumn = context.currentColumn && context.currentColumn.key === props.column.key;
    return (
      <EditableGroupComponent
        isCurrentColumn={isCurrentColumn}
        column={props.column as DripTableBuiltInColumnSchema}
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

  return DripTableComponent
    ? (
      <DripTableComponent
        driver={props.driver || DripTableDriverAntDesign}
        value={value as unknown}
        data={props.record}
        schema={props.column}
        preview={{}}
      />
    )
    : <Alert type="error" message="未知组件" />;
};

export default EditableComponents;
