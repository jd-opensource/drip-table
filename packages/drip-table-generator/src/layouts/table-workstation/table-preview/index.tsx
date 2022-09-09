/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import DripTable, { DripTableExtraOptions, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import React from 'react';

import { GeneratorContext } from '@/context';

const PreviewTable = () => {
  const { columns, globalConfigs, previewDataSource } = React.useContext(GeneratorContext);
  return (
    <DripTable<DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, React.Key>, DripTableExtraOptions>
      driver={(DripTableDriverAntDesign)}
      schema={{ ...globalConfigs, columns: columns.map(item => ({ ...item, index: void 0 })) }}
      dataSource={previewDataSource}
      // TODO
      ajv={{ additionalProperties: true }}
    />
  );
};

export default PreviewTable;
