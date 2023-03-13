/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { Pagination } from 'antd';
import { DripTableColumnSchema, DripTableSchema } from 'drip-table';
import React from 'react';

export type PaginationComponentProps<
CustomColumnSchema extends DripTableColumnSchema = never,
SubtableDataSourceKey extends React.Key = never,
> = DripTableSchema<CustomColumnSchema, SubtableDataSourceKey>['pagination'] & {
  dataSourceLength: number;
};

const PaginationComponent = <
CustomColumnSchema extends DripTableColumnSchema = never,
SubtableDataSourceKey extends React.Key = never,
>(props: PaginationComponentProps<CustomColumnSchema, SubtableDataSourceKey>) => {
  if (!props) { return null; }
  const renderShowTotal = (showTotal?: string | boolean) => {
    if (typeof showTotal === 'boolean') {
      return showTotal ? (total, range) => (range ? `${range[0]}-${range[1]} of ${total}` : `${total} items`) : void 0;
    }
    if (typeof showTotal === 'string') {
      return (total, range) => String(showTotal ?? '')
        .replace('{{total}}', String(props.dataSourceLength))
        .replace('{{range[0]}}', String(range?.[0] ?? ''))
        .replace('{{range[1]}}', String(range?.[1] ?? ''));
    }
    return void 0;
  };
  const justifyContent = {
    topLeft: 'start',
    topCenter: 'center',
    topRight: 'end',
    bottomLeft: 'start',
    bottomCenter: 'center',
    bottomRight: 'end',
  };
  return (
    <div style={{ display: 'flex', justifyContent: justifyContent[props.position || 'topLeft'] }}>
      <Pagination
        {...props}
        size={props.size}
        pageSize={props.pageSize}
        showTotal={props.showTotal ? renderShowTotal(props.showTotal) : void 0}
        total={props.dataSourceLength}
        showLessItems={props.showLessItems}
        showQuickJumper={props.showQuickJumper}
        showSizeChanger={props.showSizeChanger}
        hideOnSinglePage={props.hideOnSinglePage}
        pageSizeOptions={props.pageSizeOptions}
      />
    </div>
  );
};

export default PaginationComponent;
