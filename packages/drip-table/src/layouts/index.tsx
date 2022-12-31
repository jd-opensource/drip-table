/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import classnames from 'classnames';
import React, { useEffect } from 'react';

import {
  type DripTableExtraOptions,
  type DripTableRecordTypeBase,
  type DripTableRecordTypeWithSubtable,
} from '@/types';
import ErrorBoundary from '@/components/error-boundary';
import SlotRender, { type DripTableSlotSchema } from '@/components/slot-render';
import Spin from '@/components/spin';
import { useTableContext } from '@/hooks';

import CalendarLayout from './calendar';
import CardLayout from './card';
import TableLayout from './table';

const DripTableLayout = <
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(): JSX.Element => {
  const { props: tableProps, info: tableInfo, state: tableState, setState: setTableState } = useTableContext<RecordType, ExtraOptions>();

  React.useEffect(() => {
    if (tableProps.selectedRowKeys) {
      setTableState({ selectedRowKeys: tableProps.selectedRowKeys });
    }
  }, [tableProps.selectedRowKeys]);

  React.useEffect(() => {
    setTableState(state => ({
      filters: Object.fromEntries(tableProps.schema.columns.map(c => [c.dataIndex, c.defaultFilteredValue]).filter(([k, v]) => typeof k === 'string' && v)),
      displayColumnKeys: tableProps.displayColumnKeys || tableProps.schema.columns.filter(c => c.hidable).map(c => c.key),
    }));
  }, [tableProps.displayColumnKeys]);

  React.useEffect(() => {
    tableProps.componentDidMount?.(tableInfo);
    return () => {
      tableProps.componentWillUnmount?.(tableInfo);
    };
  }, []);

  React.useEffect(() => {
    tableProps.componentDidUpdate?.(tableInfo);
  }, [tableProps]);

  const header = React.useMemo<DripTableSlotSchema | null>(
    () => {
      if (tableProps.schema.header === true) {
        return {
          elements: [
            { type: 'display-column-selector', selectorButtonType: 'primary' },
            { type: 'spacer', span: 'flex-auto' },
            { type: 'search' },
            { type: 'insert-button', showIcon: true },
          ],
        };
      }
      if (!tableProps.schema.header || !tableProps.schema.header.elements?.length) {
        return null;
      }
      return {
        style: tableProps.schema.header.style,
        elements: tableProps.schema.header.elements,
      };
    },
    [tableProps.schema.header],
  );

  const footer = React.useMemo<DripTableSlotSchema | null>(
    () => {
      if (!tableProps.schema.footer || !tableProps.schema.footer.elements?.length) {
        return null;
      }
      return {
        style: tableProps.schema.footer.style,
        elements: tableProps.schema.footer.elements,
      };
    },
    [tableProps.schema.footer],
  );

  const headerNode = header
    ? (
      <SlotRender
        schema={header}
      />
    )
    : null;

  const footerNode = footer
    ? (
      <SlotRender
        schema={footer}
      />
    )
    : null;

  useEffect(() => {
    if (tableInfo.schema.defaultTableLayout) {
      setTableState({ layout: tableInfo.schema.defaultTableLayout });
    }
  }, []);

  const layoutNode = React.useMemo(() => {
    if (tableState.layout === 'table') {
      return (
        <TableLayout
          header={headerNode}
          footer={footerNode}
        />
      );
    }
    if (tableState.layout === 'card') {
      return (
        <CardLayout
          header={headerNode}
        />
      );
    }
    if (tableState.layout === 'calendar') {
      return (
        <CalendarLayout
          header={headerNode}
        />
      );
    }
    return null;
  }, [tableProps, tableInfo, tableState, setTableState, headerNode, footerNode]);

  return (
    <ErrorBoundary driver={tableProps.driver}>
      <Spin spinning={tableProps.loading}>
        <div
          className={classnames(tableProps.className, tableProps.schema.className)}
          style={Object.assign({}, tableProps.style, tableProps.schema.style)}
        >
          { layoutNode }
        </div>
      </Spin>
    </ErrorBoundary>
  );
};

export default DripTableLayout;
