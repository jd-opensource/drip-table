/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { Pagination, PaginationProps } from 'antd';
import { DripTableColumnSchema, DripTableExtraOptions, DripTableSchema } from 'drip-table';
import React from 'react';

import { safeExecute } from '@/utils/sandbox';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

import { parseReactCSS } from './dom';

export type PaginationComponentProps<
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
CustomColumnSchema extends DripTableColumnSchema = never,
SubtableDataSourceKey extends React.Key = never,
> = DripTableSchema<CustomColumnSchema, SubtableDataSourceKey>['pagination'] & Omit<PaginationProps, 'showTotal'> & {
  renderPagination: DripTableGeneratorProps<RecordType, ExtraOptions>['renderPagination'];
  ext?: DripTableExtraOptions['CustomComponentExtraData'];
};

const PaginationComponent = <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
CustomColumnSchema extends DripTableColumnSchema = never,
SubtableDataSourceKey extends React.Key = never,
>(props: PaginationComponentProps<RecordType, ExtraOptions, CustomColumnSchema, SubtableDataSourceKey>) => {
  if (!props) { return null; }
  const renderShowTotal = (showTotal?: string | boolean) => {
    if (typeof showTotal === 'boolean') {
      return showTotal ? (total, range) => (range ? `${range[0]}-${range[1]} of ${total}` : `${total} items`) : void 0;
    }
    if (typeof showTotal === 'string') {
      return (total, range) => String(showTotal ?? '')
        .replace('{{total}}', String(props.total))
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
  const PaginationRenderer = props.renderPagination ?? Pagination;
  return (
    <div style={{ display: 'flex', justifyContent: justifyContent[props.position || 'topLeft'] }}>
      <PaginationRenderer
        {...props}
        border={props.border}
        size={props.size}
        pageSize={props.pageSize}
        showTotal={props.showTotal ? renderShowTotal(props.showTotal) : void 0}
        total={props.total}
        showLessItems={props.showLessItems}
        showQuickJumper={props.showQuickJumper}
        showSizeChanger={props.showSizeChanger}
        hideOnSinglePage={props.hideOnSinglePage}
        pageSizeOptions={props.pageSizeOptions}
        style={parseReactCSS(
          typeof props?.style === 'string'
            ? safeExecute(props?.style, { props: { ext: props.ext } })
            : props?.style,
        )}
        pageNumberStyle={parseReactCSS(
          typeof props?.pageNumberStyle === 'string'
            ? safeExecute(props.pageNumberStyle, { props: { ext: props.ext } })
            : props?.pageNumberStyle,
        )}
        pageStepperStyle={parseReactCSS(
          typeof props?.pageStepperStyle === 'string'
            ? safeExecute(props.pageStepperStyle, { props: { ext: props.ext } })
            : props?.pageStepperStyle,
        )}
        pageSelectorStyle={parseReactCSS(
          typeof props?.pageSelectorStyle === 'string'
            ? safeExecute(props.pageSelectorStyle, { props: { ext: props.ext } })
            : props?.pageSelectorStyle,
        )}
      />
    </div>
  );
};

export default PaginationComponent;
