/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DripTableBuiltInColumnSchema, DripTableExtraOptions, DripTableSchema, ExtractDripTableColumnSchema } from 'drip-table';

import { DripTableGeneratorContext } from '@/context';
import tableComponents from '@/table-components';

import { DataSourceTypeAbbr, DripTableGeneratorProps } from '../typing';

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

export const getComponents = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(groupName: string, customComponentPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel']) => {
  let componentsToUse = tableComponents;
  if (customComponentPanel) {
    const customComponents = customComponentPanel.configs;
    componentsToUse = customComponentPanel.mode === 'add' ? [...tableComponents, ...customComponents] : [...customComponents];
  }
  return [...componentsToUse].filter(item => item.group === groupName);
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
}) as DripTableSchema<NonNullable<ExtraOptions['CustomColumnSchema']>, NonNullable<ExtraOptions['SubtableDataSourceKey']>>;
