/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import classNames from 'classnames';
import { DripTableExtraOptions, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, ExtractDripTableExtraOption } from 'drip-table';
import React from 'react';

import { GeneratorContext } from '@/context';
import { TableConfigsContext } from '@/context/table-configs';
import { DripTableGeneratorProps } from '@/typing';

import EditableTableFooter from './editable-footer';
import EditableTableHeader from './editable-header';
import EditableTable from './editable-table';
import PreviewTable from './table-preview';

function TableWorkStation<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions>) {
  const { mode, previewDataSource } = React.useContext(GeneratorContext);
  const { tableConfigs } = React.useContext(TableConfigsContext);
  return (
    <div className={classNames('jfe-drip-table-generator-workstation-wrapper', { edit: mode === 'edit' })}>
      {mode === 'edit'
        ? (
          <React.Fragment>
            <EditableTableHeader
              slots={props.slots}
              ext={props.ext}
              total={props.total}
              renderPagination={props.renderPagination}
              onPageChange={props.onPageChange}
            />
            {tableConfigs.length >= 0 && (
              <EditableTable
                {...props}
                index={0}
                tableConfig={tableConfigs[0]}
                originDataSource={props.dataSource}
                dataSource={previewDataSource as RecordType[]}
              />
            )}
            <EditableTableFooter
              slots={props.slots}
              ext={props.ext}
              total={props.total}
              renderPagination={props.renderPagination}
              onPageChange={props.onPageChange}
            />
          </React.Fragment>
        )
        : <PreviewTable visible={mode === 'preview'} {...props} />}
    </div>
  );
}

export default TableWorkStation;
