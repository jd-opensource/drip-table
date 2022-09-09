/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { Alert } from 'antd';
import { builtInComponents, DripTableExtraOptions, DripTableRecordTypeBase } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import React from 'react';

import { get } from '@/utils';
import { DripTableGeneratorContext } from '@/context';
import { DripTableGeneratorProps } from '@/typing';

interface EditableComponentsProps<
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
> {
  record: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['previewDataSource'][number];
  column: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['columns'][number];
  driver: DripTableGeneratorProps<RecordType, ExtraOptions>['driver'];
  customComponents: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponents'];
}

const EditableComponents = <
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
>(props: EditableComponentsProps<RecordType, ExtraOptions>) => {
  const [libName, componentName] = props.column?.component?.includes('::') ? props.column.component.split('::') : ['', props.column?.component || ''];
  const DripTableComponent = libName ? props.customComponents?.[libName]?.[componentName] : builtInComponents[componentName];
  const value = props.column?.dataIndex ? get(props.record, props.column.dataIndex) : props.record;

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
