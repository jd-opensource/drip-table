/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import DripTable, { DripTableExtraOptions, DripTableProps, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import React from 'react';

import { filterAttributes } from '@/utils';
import { GeneratorContext } from '@/context';
import { DripTableGeneratorProps } from '@/typing';

const PreviewTable = <
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions> & { visible: boolean }) => {
  const { columns, globalConfigs, previewDataSource } = React.useContext(GeneratorContext);
  return (
    <DripTable<DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, React.Key>, DripTableExtraOptions>
      style={{ ...props.style, display: props.visible ? void 0 : 'none' }}
      driver={DripTableDriverAntDesign}
      schema={{ ...globalConfigs, columns: columns.map(item => ({ ...item, index: void 0 })) }}
      dataSource={previewDataSource}
      ajv={{ additionalProperties: true }}
      components={props.customComponents as DripTableProps<DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, React.Key>, DripTableExtraOptions>['components']}
      {...filterAttributes(props, ['driver', 'dataSource', 'schema', 'ajv', 'style', 'customComponents'])}
    />
  );
};

export default PreviewTable;
