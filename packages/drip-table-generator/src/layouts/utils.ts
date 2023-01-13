/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DripTableBuiltInColumnSchema, DripTableExtraOptions, DripTableSchema, ExtractDripTableColumnSchema, ExtractDripTableExtraOption } from 'drip-table';
import cloneDeep from 'lodash/cloneDeep';

import { DripTableGeneratorContext } from '@/context';
import tableComponents from '@/table-components';

import { DataSourceTypeAbbr, DripTableComponentAttrConfig, DripTableGeneratorProps, DTGComponentPropertySchema } from '../typing';

export const getGroups = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(customComponentPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel']) => {
  let groups = [
    '基础组件',
    '容器组件',
    '自定义组件',
  ];
  if (customComponentPanel) {
    const customGroups = customComponentPanel.configs.map(item => item.group);
    if (customComponentPanel.mode === 'add') {
      const theSet = new Set([...groups, ...customGroups]);
      groups = [...theSet];
    } else {
      groups = customComponentPanel.orders ?? [...new Set(customGroups)];
    }
  }
  return groups;
};

export const getComponentsConfigs = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(groupName?: string, customComponentPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel']) => {
  let componentsToUse = cloneDeep(tableComponents);
  if (customComponentPanel) {
    const customComponents = customComponentPanel.configs;
    componentsToUse = customComponentPanel.mode === 'add' ? [...tableComponents, ...customComponents] : [...customComponents];
  }
  return groupName ? [...componentsToUse].filter(item => item.group === groupName) : [...componentsToUse];
};

export const getColumnItemConfigs = <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(componentType: string, options: {
    componentsConfigs: DripTableComponentAttrConfig[];
    previewDataSource: DripTableGeneratorContext['previewDataSource'];
    dataFields: DripTableGeneratorProps<RecordType, ExtraOptions>['dataFields'];
    mockDataSource?: DripTableGeneratorProps<RecordType, ExtraOptions>['mockDataSource'];
    filterSchema?: boolean;
  }) => {
  const theComponent = options.componentsConfigs.find(schema => schema['ui:type'] === componentType);
  const columnConfig = theComponent ? Object.assign({}, { ...theComponent, attrSchema: [...theComponent.attrSchema] }) : void 0;
  if (columnConfig && options.filterSchema) {
    columnConfig.attrSchema = columnConfig.attrSchema.filter(item => !(item.name.startsWith('titleStyle') || ['title', 'dataProcess', 'description'].includes(item.name)));
  }
  columnConfig?.attrSchema.forEach((schema) => {
    const uiProps = schema['ui:props'];
    if (!uiProps) {
      return;
    }
    if (uiProps.optionsParam === '$$FIELD_KEY_OPTIONS$$') {
      uiProps.options = options.mockDataSource
        ? Object.keys(options.previewDataSource[0] || {}).map(key => ({ label: key, value: key }))
        : options.dataFields?.map(key => ({ label: key, value: key })) || [];
    }
    if (uiProps.items) {
      (uiProps.items as DTGComponentPropertySchema[])?.forEach((item, index) => {
        const itemUiProps = item['ui:props'];
        if (!itemUiProps) {
          return;
        }
        if (itemUiProps.optionsParam === '$$FIELD_KEY_OPTIONS$$') {
          itemUiProps.options = options.mockDataSource
            ? Object.keys(options.previewDataSource[0] || {}).map(key => ({ label: key, value: key }))
            : options.dataFields?.map(key => ({ label: key, value: key })) || [];
        }
      });
    }
  });
  return columnConfig;
};

export const getSchemaValue = <ExtraOptions extends Partial<DripTableExtraOptions> = never>(context: DripTableGeneratorContext) => ({
  ...context.globalConfigs,
  columns: context.columns.map((item) => {
    type BuiltInGroupColumnSchema = ExtractDripTableColumnSchema<DripTableBuiltInColumnSchema<NonNullable<DripTableExtraOptions['CustomColumnSchema']>>, 'group'>;
    const schemaItem = { ...item, innerIndexForGenerator: void 0, dataIndexMode: void 0 };
    delete schemaItem.innerIndexForGenerator;
    delete schemaItem.dataIndexMode;
    if (schemaItem.component === 'group') {
      const items = [...schemaItem.options.items as BuiltInGroupColumnSchema['options']['items']];
      items.forEach((element, index) => {
        if (element) {
          const subComponentItem = { ...element, innerIndexForGenerator: void 0, dataIndexMode: void 0 };
          delete subComponentItem.innerIndexForGenerator;
          delete subComponentItem.dataIndexMode;
          items[index] = subComponentItem;
        }
      });
      schemaItem.options.items = items;
    }
    return schemaItem;
  }),
}) as DripTableSchema<ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>;
