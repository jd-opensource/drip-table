/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : renwenci (ararakikon@163.com)
 * @modifier : renwenci (ararakikon@163.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import chunk from 'lodash/chunk';
import React, { useMemo } from 'react';

import { DripTableExtraOptions, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable } from '@/types';
import { indexValue } from '@/utils/operator';
import Pagination from '@/components/pagination';

import { columnGenerator } from '../table';
import { TableLayoutComponentProps } from '../types';

import styles from './index.module.less';

const CardLayout = <
RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: TableLayoutComponentProps<RecordType, ExtraOptions>): JSX.Element => {
  const { tableProps, tableInfo, tableState } = props;

  const paginationAlign = React.useMemo(
    () => {
      const pagination = tableInfo.schema.pagination;
      if (pagination) {
        if (pagination.position === 'bottomLeft') {
          return 'left';
        }
        if (pagination.position === 'bottomCenter') {
          return 'center';
        }
        if (pagination.position === 'bottomRight') {
          return 'right';
        }
      }
      return void 0;
    },
    [tableInfo.schema.pagination],
  );

  const renderPagination = tableInfo.schema.pagination === false
    ? null
    : (
      <Pagination
        size={tableInfo.schema.pagination?.size === void 0 ? 'small' : tableInfo.schema.pagination.size}
        pageSize={tableState.pagination.pageSize}
        total={tableProps.total === void 0 ? tableInfo.dataSource.length : tableProps.total}
        showTotal={React.useMemo(() => {
          if (tableInfo.schema.pagination) {
            if (typeof tableInfo.schema.pagination?.showTotal === 'string') {
              return (total, range) => (tableInfo.schema.pagination
                ? String(tableInfo.schema.pagination.showTotal ?? '')
                  .replace('{{total}}', String(total))
                  .replace('{{range[0]}}', String(range?.[0] ?? ''))
                  .replace('{{range[1]}}', String(range?.[1] ?? ''))
                : '');
            }
            if (tableInfo.schema.pagination?.showTotal) {
              return (total, range) => (range ? `${range[0]}-${range[1]} of ${total}` : `${total} items`);
            }
          }
          return void 0;
        }, [tableInfo.schema.pagination?.showTotal])}
        current={tableProps.currentPage || tableState.pagination.current}
        align={paginationAlign}
        showLessItems={tableInfo.schema.pagination?.showLessItems}
        showQuickJumper={tableInfo.schema.pagination?.showQuickJumper}
        showSizeChanger={tableInfo.schema.pagination?.showSizeChanger}
        hideOnSinglePage={tableInfo.schema.pagination?.hideOnSinglePage}
        onChange={(page, pageSize) => {
          const pagination = { ...tableState.pagination, current: page, pageSize };
          props.setTableState({ pagination });
          tableProps.onPageChange?.(page, pageSize, tableInfo);
          tableProps.onChange?.({ pagination, filters: tableState.filters }, tableInfo);
        }}
      />
    );

  const dataForCurrentPage = useMemo(() => {
    if (!tableInfo.schema.pagination) {
      return tableProps.dataSource;
    }
    const chunkList = chunk(tableProps.dataSource, tableState.pagination.pageSize);
    return chunkList[tableProps.currentPage || 0];
  }, [tableProps.dataSource, tableInfo.schema.pagination, tableProps.currentPage, tableState.pagination]);

  const extraProps = {
    driver: tableProps.driver,
    components: tableProps.components,
    ext: tableProps.ext,
    onEvent: tableProps.onEvent,
    onDataSourceChange: tableProps.onDataSourceChange,
  };

  return (
    <div className={styles.main}>
      { props.header }
      <div className={styles['card-container']}>
        {
          dataForCurrentPage.map(record => (
            <div
              className={styles['card-item']}
            >
              {
              tableInfo.schema.columns
                .filter(column => !column.hidable || tableState.displayColumnKeys.includes(column.key))
                .map(column => columnGenerator(tableInfo, column, extraProps))
                .map(col => (
                  <div key={col.key}>
                    <h4>{ col.title }</h4>
                    { col.render?.(indexValue(record, col.dataIndex), record, 0) }

                  </div>
                ))
            }
            </div>
          ))
        }
      </div>
      { renderPagination }
    </div>
  );
};

export default CardLayout;
