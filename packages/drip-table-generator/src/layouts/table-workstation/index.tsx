/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DripTableExtraOptions } from 'drip-table';
import React from 'react';

import { GeneratorContext } from '@/context';
import { GeneratorTableConfigsContext } from '@/context/table-configs';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

import EditableTableFooter from './editable-footer';
import EditableTableHeader from './editable-header';
import EditableTable from './editable-table';
import PreviewTable from './table-preview';

const TableWorkStation = <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions>) => {
  const context = React.useContext(GeneratorContext);
  const { tableConfigs } = React.useContext(GeneratorTableConfigsContext);
  return (
    <div>
      { context.mode === 'edit'
        ? (
          <React.Fragment>
            <EditableTableHeader slots={props.slots} ext={props.ext} />
            { tableConfigs.length >= 0 && (
            <EditableTable
              {...props}
              index={0}
              tableConfig={tableConfigs[0]}
              dataSource={context.previewDataSource as RecordType[]}
            />
            ) }
            <EditableTableFooter slots={props.slots} ext={props.ext} />
          </React.Fragment>
        )
        : <PreviewTable visible={context.mode === 'preview'} {...props} /> }
    </div>
  );
};

export default TableWorkStation;
