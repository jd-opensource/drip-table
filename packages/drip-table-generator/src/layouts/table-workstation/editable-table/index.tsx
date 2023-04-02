/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classNames from 'classnames';
import { DripTableExtraOptions, DripTableTableInformation } from 'drip-table';
import React from 'react';

import { filterArray } from '@/utils';
import { GeneratorContext } from '@/context';
import { DTGTableConfig, TableConfigsContext } from '@/context/table-configs';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

import TableContainer from '../components/table-container';
import ColumnHeaderList from './components/header-list';
import TableRowList from './components/row';

export interface EditableTableProps<
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
> extends DripTableGeneratorProps<RecordType, ExtraOptions> {
  index: number;
  tableConfig: DTGTableConfig;
  dataSource: RecordType[];
  parent?: DripTableTableInformation<RecordType, ExtraOptions>;
}

const EditableTable = <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: EditableTableProps<RecordType, ExtraOptions>) => {
  const context = React.useContext(GeneratorContext);
  const [checkedRecord, setCheckedRecord] = React.useState(void 0 as number | undefined);
  const [previewRecord, setPreviewRecord] = React.useState(void 0 as number | undefined);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const [scrollTarget, setScrollTarget] = React.useState('');
  const tableHeight = React.useMemo(() => {
    if (props.tableConfig.configs.scroll?.y && typeof props.tableConfig.configs.scroll?.y !== 'boolean') {
      return props.tableConfig.configs.scroll?.y;
    }
    return '100%';
  }, []);

  const dataSourceToUse = React.useMemo(() => {
    if (props.tableConfig.configs.pagination) {
      const dataSource = props.dataSource.map((rec, idx) => ({ idx, rec }));
      const pageSize = props.tableConfig.configs.pagination.pageSize;
      return filterArray(dataSource, item => item.idx < pageSize).map(item => item.rec);
    }
    if (typeof previewRecord === 'number') {
      return [props.dataSource[previewRecord]];
    }
    return props.dataSource;
  }, [props.dataSource, props.tableConfig.configs.pagination, previewRecord]);

  return (
    <TableConfigsContext.Consumer>
      { ({ tableConfigs, setTableColumns }) => {
        const previewDataSource = typeof previewRecord === 'number' ? [dataSourceToUse[previewRecord]] : dataSourceToUse;
        return (
          <TableContainer tableConfig={props.tableConfig}>
            <div
              className={classNames('jfe-drip-table-generator-workstation-table-wrapper', {
                bordered: props.tableConfig.configs.bordered,
              })}
              style={{ height: tableHeight, overflow: props.tableConfig.configs.sticky ? 'hidden' : 'auto' }}
            >
              { props.tableConfig.configs.sticky
                ? (
                  <ColumnHeaderList
                    scrollTarget={scrollTarget}
                    scrollLeft={scrollLeft}
                    customComponentPanel={props.customComponentPanel}
                    tableConfig={props.tableConfig}
                    onResort={newColumns => setTableColumns([...newColumns], props.index)}
                    onScroll={(left) => { setScrollLeft(left); }}
                  />
                )
                : null }
              <div
                style={props.tableConfig.configs.sticky ? { height: 420, overflow: 'auto', boxShadow: 'inset 0 0 8px -4px #00000063' } : void 0}
              >
                { !props.tableConfig.configs.sticky && (
                <ColumnHeaderList
                  scrollTarget={scrollTarget}
                  scrollLeft={scrollLeft}
                  customComponentPanel={props.customComponentPanel}
                  tableConfig={props.tableConfig}
                  onResort={newColumns => setTableColumns([...newColumns], props.index)}
                  onScroll={(left) => { setScrollLeft(left); }}
                />
                ) }
                { previewDataSource.map((record, rowIndex) => {
                  const hasSubTable = tableConfigs[props.index + 1] && Object.keys(record || {}).includes(tableConfigs[props.index + 1]?.dataSourceKey);
                  const tableInfo: DripTableTableInformation<RecordType, ExtraOptions> = {
                    uuid: tableConfigs[props.index]?.tableId,
                    schema: {
                      ...tableConfigs[props.index]?.configs,
                      id: tableConfigs[props.index]?.tableId,
                      columns: tableConfigs[props.index]?.columns,
                      dataSourceKey: tableConfigs[props.index]?.dataSourceKey,
                    } as DripTableTableInformation<RecordType, ExtraOptions>['schema'],
                    dataSource: record?.[tableConfigs[props.index + 1]?.dataSourceKey || ''] as RecordType[] || [],
                    record,
                  };
                  return (
                    <div
                      key={rowIndex}
                      className={classNames('jfe-drip-table-generator-workstation-table-row', {
                        checked: checkedRecord === rowIndex && props.tableConfig.tableId === context.currentTableID,
                      })}
                      onMouseEnter={(e) => { e.stopPropagation(); setScrollTarget(`__row_${rowIndex}`); }}
                      onMouseLeave={(e) => { e.stopPropagation(); setScrollTarget(''); }}
                      onClick={(e) => { e.stopPropagation(); setCheckedRecord(checkedRecord === rowIndex ? void 0 : rowIndex); }}
                    >
                      { checkedRecord === rowIndex && props.tableConfig.tableId === context.currentTableID && (
                      <div className="jfe-drip-table-generator-workstation-table-row-tools">
                        <Button
                          title={previewRecord === rowIndex ? '取消关注当前列' : '只关注当前列'}
                          size="small"
                          type="primary"
                          icon={previewRecord === rowIndex ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewRecord(previewRecord === rowIndex ? void 0 : rowIndex);
                          }}
                        />
                      </div>
                      ) }
                      <TableRowList
                        rowIndex={rowIndex}
                        isLastRow={rowIndex === previewDataSource.length - 1}
                        scrollTarget={scrollTarget}
                        scrollLeft={scrollLeft}
                        tableConfig={props.tableConfig}
                        record={record}
                        customComponents={props.customComponents}
                        customComponentPanel={props.customComponentPanel}
                        mockDataSource={props.mockDataSource}
                        dataFields={props.dataFields}
                        hasSubTable={hasSubTable}
                        onScroll={(left) => { setScrollLeft(left); }}
                      />
                      { (props.tableConfig.hasSubTable && hasSubTable)
                    && (
                    <div className="subtable">
                      <EditableTable
                        {...props}
                        index={props.index + 1}
                        tableConfig={tableConfigs[props.index + 1]}
                        dataSource={record[tableConfigs[props.index + 1].dataSourceKey] as RecordType[] || []}
                        parent={tableInfo}
                      />
                    </div>
                    ) }
                    </div>
                  );
                }) }
              </div>
            </div>
          </TableContainer>
        );
      } }
    </TableConfigsContext.Consumer>
  );
};

export default EditableTable;
