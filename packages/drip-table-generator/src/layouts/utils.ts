/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DripTableBuiltInColumnSchema, DripTableExtraOptions, DripTableSchema, ExtractDripTableColumnSchema, ExtractDripTableExtraOption } from 'drip-table';
import cloneDeep from 'lodash/cloneDeep';

import { filterAttributes, mockId } from '@/utils';
import { DripTableGeneratorContext } from '@/context';
import { DTGTableConfig } from '@/context/table-configs';
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
    icons?: DripTableGeneratorProps<RecordType, ExtraOptions>['icons'];
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
    if (uiProps.optionsParam === '$$PROPS_ICONS_OPTIONS$$') {
      uiProps.options = Object.keys(options.icons || {}).map(key => ({ label: key, value: key, icon: key }));
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
        if (itemUiProps.optionsParam === '$$PROPS_ICONS_OPTIONS$$') {
          itemUiProps.options = Object.keys(options.icons || {}).map(key => ({ label: key, value: key, icon: key }));
        }
      });
    }
  });
  return columnConfig;
};

const getColumns = (columns: DTGTableConfig['columns']) => columns.map((item) => {
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
    if (!Object.isExtensible(schemaItem.options)) {
      schemaItem.options = { ...schemaItem.options };
    }
    schemaItem.options.items = items;
  }
  if (schemaItem.component === 'text' && schemaItem.options.parts) {
    schemaItem.options.parts = (schemaItem.options.parts as Record<string, unknown>[] || []).map((partItem) => {
      delete partItem.dataIndexMode;
      return {
        ...partItem,
      };
    });
  }
  return schemaItem;
});

export const getSchemaValue = <ExtraOptions extends Partial<DripTableExtraOptions> = never>(tableConfigs: DTGTableConfig[]) => {
  const globalConfigs = { ...filterAttributes(tableConfigs[0].configs, 'dataSourceKey') };
  const globalColumns = getColumns(tableConfigs[0].columns);
  let subtable;
  if (tableConfigs.length > 0) {
    for (let i = tableConfigs.length - 1; i > 0; i--) {
      subtable = {
        ...tableConfigs[i].configs,
        columns: getColumns(tableConfigs[i].columns),
        subtable,
        id: tableConfigs[i].tableId,
        dataSourceKey: tableConfigs[i].dataSourceKey,
      };
    }
  }
  return {
    id: tableConfigs[0].tableId,
    ...globalConfigs,
    columns: globalColumns,
    subtable,
  } as DripTableSchema<ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>;
};

export const generateTableConfigsBySchema = <ExtraOptions extends Partial<DripTableExtraOptions> = never>
  (schema: DripTableSchema<ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ): DTGTableConfig[] => {
  const rootTableId = mockId();
  if (!schema) {
    return [{
      tableId: rootTableId,
      columns: [],
      configs: { pagination: false, header: false },
      hasSubTable: false,
      dataSourceKey: '',
    }];
  }
  const configs: DTGTableConfig[] = [];
  let currentSchema = schema ? cloneDeep({ dataSourceKey: void 0, ...schema }) : void 0;
  do {
    if (currentSchema) {
      const columns = currentSchema?.columns.map(column => ({ ...column, key: column.key ?? mockId() })) || [];
      const pureGlobalConfig = { ...currentSchema } as Omit<typeof currentSchema, 'columns' | 'subtable'> & { columns?: unknown[]; subtable?: unknown };
      delete pureGlobalConfig.columns;
      delete pureGlobalConfig.subtable;
      configs.push({
        tableId: currentSchema.id ? String(currentSchema.id) : mockId(),
        columns,
        configs: schema ? { ...pureGlobalConfig } : { pagination: false },
        hasSubTable: !!currentSchema?.subtable,
        dataSourceKey: currentSchema?.dataSourceKey || '',
      });
    }
    currentSchema = currentSchema?.subtable ? cloneDeep(Object.assign({ dataSourceKey: void 0 }, currentSchema.subtable)) : void 0;
  } while (currentSchema);

  if (configs.length < 0) {
    return [{
      tableId: rootTableId,
      columns: [],
      configs: { pagination: false, header: false },
      hasSubTable: false,
      dataSourceKey: '',
    }];
  }
  if (!configs[0].tableId) { configs[0].tableId = rootTableId; }
  return configs;
};
