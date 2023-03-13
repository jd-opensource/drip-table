/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import './index.less';

import { DripTableExtraOptions } from 'drip-table';
import React from 'react';

import { drawerWidth } from '@/utils/enum';
import { GeneratorContext } from '@/context';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

import ComplicatedTable from './complicated-table';
import EditableTableFooter from './editable-footer';
import EditableTableHeader from './editable-header';
import PreviewTable from './table-preview';

const TableWorkStation = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions>) => {
  const context = React.useContext(GeneratorContext);
  const tableWrapper = React.useRef<HTMLDivElement>(null);
  const tableConfig = context.tableConfigs[0]?.configs;
  console.debug(tableConfig);
  return (
    <div
      className="jfe-drip-table-generator-workstation-generator-workstation"
      style={{
        overflow: context.mode === 'edit' ? void 0 : 'hidden',
        width: context.drawerType ? `calc(100% - 128px - ${drawerWidth[context.drawerType]}px)` : void 0,
        overflowY: tableConfig?.scroll?.y || tableConfig.sticky ? 'hidden' : void 0,
      }}
      ref={tableWrapper}
    >
      { context.mode === 'edit'
        ? (
          <React.Fragment>
            <EditableTableHeader slots={props.slots} ext={props.ext} />
            { context.tableConfigs.length >= 0 && (
            <ComplicatedTable
              {...props}
              index={0}
              tableConfig={context.tableConfigs[0]}
              dataSource={context.previewDataSource as RecordType[]}
              innerStyle={{
                height: props.style?.height,
                overflowY: tableConfig?.scroll?.y || tableConfig.sticky ? 'auto' : void 0,
              }}
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
