/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Empty } from 'antd';
import classNames from 'classnames';
import { DripTableExtraOptions, DripTableTableInformation } from 'drip-table';
import React from 'react';

import { filterArray, mockId } from '@/utils';
import { GeneratorContext } from '@/context';
import { DTGTableConfig, TableConfigsContext } from '@/context/table-configs';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

import PaginationComponent from '../components/pagination';
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
  originDataSource?: RecordType[];
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
      const dataSource = props.dataSource.map((rec, idx) => ({ id: idx, record: rec }));
      const pageSize = props.tableConfig.configs.pagination.pageSize;
      return filterArray(dataSource, item => item.id < pageSize);
    }
    if (typeof previewRecord === 'number') {
      return [{ id: 0, record: props.dataSource[previewRecord] }];
    }
    return props.dataSource.map((rec, idx) => ({ id: idx, record: rec }));
  }, [props.dataSource, props.tableConfig.configs.pagination, previewRecord]);

  return (
    <TableConfigsContext.Consumer>
      { ({ tableConfigs, setTableColumns }) => {
        const previewDataSource = typeof previewRecord === 'number' ? [dataSourceToUse[previewRecord]] : dataSourceToUse;
        const paginationInHeader = props.tableConfig.configs.pagination && props.tableConfig.configs.pagination.position?.startsWith('top');
        const paginationInFooter = props.tableConfig.configs.pagination && props.tableConfig.configs.pagination.position?.startsWith('bottom');
        const subTableInfo = {
          uuid: props.tableConfig?.tableId,
          schema: {
            ...props.tableConfig?.configs,
            id: props.tableConfig.tableId ?? mockId(),
            columns: props.tableConfig?.columns,
            dataSourceKey: props.tableConfig?.dataSourceKey,
          } as DripTableTableInformation<RecordType, ExtraOptions>['schema'],
          parent: props.parent,
          dataSource: dataSourceToUse.map(item => item.record),
        };
        return (
          <TableContainer tableTools={props.tableTools} tableConfig={props.tableConfig} onClick={props.onClick}>
            { props.parent?.record && (props.subtableTitle?.(props.parent.record, props.index || 0, subTableInfo) || '') }
            { props.parent?.record && props.tableConfig.configs.pagination && paginationInHeader
              ? (
                <PaginationComponent {...props.tableConfig.configs.pagination} total={props.total || props.dataSource.length} />
              )
              : null }
            <div
              className={classNames('jfe-drip-table-generator-workstation-table-wrapper', {
                bordered: props.tableConfig.configs.bordered,
              })}
              style={{
                height: tableHeight,
              }}
            >
              { props.tableConfig.configs.sticky
                ? (
                  <ColumnHeaderList
                    draggable={props.draggable}
                    scrollTarget={scrollTarget}
                    scrollLeft={scrollLeft}
                    customComponentPanel={props.customComponentPanel}
                    customColumnAddPanel={props.customColumnAddPanel}
                    columnTools={props.columnTools}
                    tableConfig={props.tableConfig}
                    dataSource={props.originDataSource}
                    onResort={newColumns => setTableColumns([...newColumns], props.index)}
                    onScroll={(left) => { setScrollLeft(left); }}
                    onClick={props.onClick}
                    onColumnAdded={props.onColumnAdded}
                  />
                )
                : null }
              <div
                style={props.tableConfig.configs.sticky ? { height: 420, overflow: 'auto', boxShadow: 'inset 0 0 8px -4px #00000063' } : void 0}
              >
                { !props.tableConfig.configs.sticky && (
                <ColumnHeaderList
                  draggable={props.draggable}
                  scrollTarget={scrollTarget}
                  scrollLeft={scrollLeft}
                  customComponentPanel={props.customComponentPanel}
                  customColumnAddPanel={props.customColumnAddPanel}
                  tableConfig={props.tableConfig}
                  columnTools={props.columnTools}
                  dataSource={props.originDataSource}
                  onResort={newColumns => setTableColumns([...newColumns], props.index)}
                  onScroll={(left) => { setScrollLeft(left); }}
                  onClick={props.onClick}
                  onColumnAdded={props.onColumnAdded}
                />
                ) }
                { previewDataSource.map((wrapRecord, rowIndex) => {
                  const hasSubTable = tableConfigs[props.index + 1] && Object.keys(wrapRecord.record || {}).includes(tableConfigs[props.index + 1]?.dataSourceKey);
                  const tableInfo: DripTableTableInformation<RecordType, ExtraOptions> = {
                    uuid: props.tableConfig?.tableId,
                    schema: {
                      ...props.tableConfig?.configs,
                      id: props.tableConfig.tableId ?? mockId(),
                      columns: props.tableConfig?.columns,
                      dataSourceKey: props.tableConfig?.dataSourceKey,
                    } as DripTableTableInformation<RecordType, ExtraOptions>['schema'],
                    dataSource: wrapRecord?.[tableConfigs[props.index + 1]?.dataSourceKey || ''] as RecordType[] || [],
                    record: wrapRecord.record,
                  };
                  return (
                    <div
                      key={wrapRecord.id}
                      className={classNames('jfe-drip-table-generator-workstation-table-row', {
                        checked: checkedRecord === wrapRecord.id && props.tableConfig.tableId === context.currentTableID,
                        stripe: props.tableConfig.configs.stripe && wrapRecord.id % 2 === 0,
                        disabled: props.generatorRowSelectable === false,
                      })}
                      onMouseEnter={(e) => { e.stopPropagation(); setScrollTarget(`__row_${rowIndex}`); }}
                      onMouseLeave={(e) => { e.stopPropagation(); setScrollTarget(''); }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (props.generatorRowSelectable === false) { return; }
                        setCheckedRecord(checkedRecord === wrapRecord.id ? void 0 : wrapRecord.id);
                      }}
                    >
                      { checkedRecord === wrapRecord.id && props.tableConfig.tableId === context.currentTableID && (
                      <div className="jfe-drip-table-generator-workstation-table-row-tools">
                        <Button
                          title={previewRecord === wrapRecord.id ? '取消关注当前列' : '只关注当前列'}
                          size="small"
                          type="primary"
                          icon={previewRecord === wrapRecord.id ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewRecord(previewRecord === wrapRecord.id ? void 0 : wrapRecord.id);
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
                        record={wrapRecord.record}
                        customComponents={props.customComponents}
                        customComponentPanel={props.customComponentPanel}
                        mockDataSource={props.mockDataSource}
                        dataFields={props.dataFields}
                        ext={props.ext}
                        slots={props.slots}
                        icons={props.icons}
                        preview={props.preview}
                        onEvent={props.onEvent}
                        hasSubTable={hasSubTable}
                        onScroll={(left) => { setScrollLeft(left); }}
                        onClick={props.onClick}
                        onColumnItemChanged={props.onColumnItemChanged}
                      />
                      { (props.tableConfig.hasSubTable && hasSubTable)
                    && (
                    <div className="subtable">
                      <EditableTable
                        {...props}
                        index={props.index + 1}
                        tableConfig={tableConfigs[props.index + 1]}
                        dataSource={wrapRecord.record[tableConfigs[props.index + 1].dataSourceKey] as RecordType[] || []}
                        parent={tableInfo}
                      />
                    </div>
                    ) }
                    </div>
                  );
                }) }
                { previewDataSource.length <= 0 && (props.emptyText ? props.emptyText?.(subTableInfo) : <Empty className="jfe-drip-table-generator-workstation-editable-table-empty-body" image={Empty.PRESENTED_IMAGE_SIMPLE} />) }
              </div>
            </div>
            { props.parent?.record && props.tableConfig.configs.pagination && paginationInFooter
              ? (
                <PaginationComponent {...props.tableConfig.configs.pagination} total={props.total || props.dataSource.length} />
              )
              : null }
            { props.parent?.record && (props.subtableFooter?.(props.parent.record, props.index || 0, subTableInfo) || '') }
          </TableContainer>
        );
      } }
    </TableConfigsContext.Consumer>
  );
};

export default EditableTable;
