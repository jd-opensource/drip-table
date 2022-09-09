/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DripTableExtraOptions, DripTableRecordTypeBase } from 'drip-table';

import tableComponents from '@/table-components';

import { DripTableGeneratorProps } from '../typing';

export const getGroups = <
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
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
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
>(groupName: string, customComponentPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel']) => {
  let componentsToUse = tableComponents;
  if (customComponentPanel) {
    const customComponents = customComponentPanel.configs;
    componentsToUse = customComponentPanel.mode === 'add' ? [...tableComponents, ...customComponents] : [...customComponents];
  }
  return [...componentsToUse].filter(item => item.group === groupName);
};
