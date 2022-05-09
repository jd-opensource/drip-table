/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { CloseCircleTwoTone } from '@ant-design/icons';
import { Alert, Col, Empty, Row } from 'antd';
import classnames from 'classnames';
import { builtInComponents, DripTableBuiltInColumnSchema, DripTableDriver, DripTableExtraOptions, DripTableProps, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import React from 'react';

import { get } from '@/utils';
import { DripTableColumn, globalActions, GlobalStore } from '@/store';
import Draggable from '@/components/Draggable';
import { useGlobalData } from '@/hooks';

import styles from './index.module.less';

interface Props {
  driver: DripTableDriver;
  customComponents: DripTableProps<DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, React.Key>, DripTableExtraOptions>['components'];
}

const EditableTable = (props: Props & { store: GlobalStore }) => {
  const { noDataFeedBack } = useGlobalData();
  const [state, actions] = props.store;
  const store = { state, setState: actions };

  const hasRecord = !(!state.previewDataSource || state.previewDataSource.length <= 0);

  const previewComponentRender = (
    column: DripTableBuiltInColumnSchema | null,
    extraOptions?: {
      isCurrentColumn?: boolean;
      parentIndex?: number[];
      isChildren?: boolean;
    },
  ) => {
    const [libName, componentName] = column?.component?.includes('::') ? column.component.split('::') : ['', column?.component || ''];
    const DripTableComponent = libName ? props.customComponents?.[libName]?.[componentName] : builtInComponents[componentName];
    const record = state.previewDataSource?.[0] || {} as Record<string, unknown>;
    const value = column?.dataIndex ? get(record, column.dataIndex) : record;

    const isChecked = (currentCheckedIndex: number) => {
      const currentColumnPath = [...extraOptions?.parentIndex || [], currentCheckedIndex];
      const stateColumnPath = state.currentColumnPath || [];
      return extraOptions?.isCurrentColumn && currentColumnPath.join('.') === stateColumnPath.join('.');
    };

    // render group column and handler options.items
    if (column?.component === 'group') {
      const gutter = column.options.gutter ?? [0, 0];
      return (
        <div style={{ height: extraOptions?.isChildren ? '100%' : '120px', overflow: 'hidden' }}>
          <div
            className={extraOptions?.isChildren ? '' : styles['table-cell']}
            style={{ width: extraOptions?.isChildren ? '100%' : column?.width || 120 }}
          >
            { column.options.layout?.map((layout, index) => (
              <Row
                key={index}
                className={styles['row-margin']}
                style={{
                  flexFlow: column.options.wrap ? 'row wrap' : 'nowrap',
                  justifyContent: column.options.horizontalAlign,
                  width: 'calc(100% - 4px)',
                  height: 120 / column.options.layout.length - gutter[1],
                }}
                gutter={gutter}
                justify={column.options.horizontalAlign}
                wrap={column.options.wrap}
              >
                { Array.from({ length: layout }, (v, i) => i).map((col, i) => {
                  const currentCheckedIndex = column.options.layout.slice(0, index).reduce((sum, j) => sum + j, i);
                  return (
                    <Col
                      className={classnames(styles['linear-stripe'], isChecked(currentCheckedIndex) ? styles['checked-stripe'] : '')}
                      key={i}
                      style={{
                        width: (Number(column?.width) || 120) / layout - gutter[0],
                        height: '100%',
                        overflow: 'auto',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!extraOptions?.isCurrentColumn) { return; }
                        state.currentColumnPath = isChecked(currentCheckedIndex)
                          ? []
                          : [...extraOptions?.parentIndex || [], currentCheckedIndex];
                        globalActions.updateColumnPath(store);
                      }}
                    >
                      { column.options.items[currentCheckedIndex]
                        ? previewComponentRender(column.options.items[currentCheckedIndex], {
                          isCurrentColumn: extraOptions?.isCurrentColumn,
                          parentIndex: [...extraOptions?.parentIndex || [], currentCheckedIndex],
                          isChildren: true,
                        })
                        : null }
                    </Col>
                  );
                }) }
              </Row>
            )) }
          </div>
        </div>
      );
    }

    // render normal column and preview component
    const componentPreviewCell = DripTableComponent
      ? (
        <DripTableComponent
          driver={props.driver || DripTableDriverAntDesign}
          value={value as unknown}
          data={record}
          schema={column}
          preview={{}}
        />
      )
      : <Alert type="error" message="未知组件" />;
    return extraOptions?.isChildren
      ? componentPreviewCell
      : (
        <div style={{ height: '120px', overflow: 'auto' }}>
          <div className={styles['table-cell']} style={{ width: column?.width || 120 }}>
            { componentPreviewCell }
          </div>
        </div>
      );
  };

  const renderTableCell = (col: DripTableColumn) => {
    const isCurrent = state.currentColumn && state.currentColumn.index === col.index;
    let width = String(col.width).trim() || '120';
    if ((/^[0-9]+$/gui).test(width)) {
      width += 'px';
    }
    return (
      <div
        style={{ width }}
        className={classnames(styles.column, { checked: isCurrent })}
        onClick={() => {
          if (col.key !== state.currentColumn?.key) {
            state.currentColumnPath = [];
          }
          state.currentColumn = isCurrent ? void 0 : col;
          globalActions.checkColumn(store);
        }}
      >
        <div className={styles['column-title']}>{ col.title }</div>
        { hasRecord
          ? previewComponentRender(col as DripTableBuiltInColumnSchema,
            {
              isCurrentColumn: isCurrent ?? false,
            })
          : null }
        { isCurrent && (
        <CloseCircleTwoTone
          className={styles['close-icon']}
          twoToneColor="#ff4d4f"
          onClick={() => {
            const index = state.columns.findIndex(item => item.key === state.currentColumn?.key);
            if (index > -1) {
              state.columns.splice(index, 1);
              for (let i = index; i < state.columns.length; i++) {
                state.columns[i].index = i + 1;
                state.columns[i].sort = i + 1;
              }
              state.currentColumn = void 0;
              globalActions.editColumns(store);
              globalActions.checkColumn(store);
            }
          }}
        />
        ) }
      </div>
    );
  };

  const emptyFeedBack = () => {
    let message = '';
    if (!hasRecord) {
      if (noDataFeedBack) { return noDataFeedBack; }
      message = '暂无数据';
    }
    if (!state.columns || state.columns?.length <= 0) { message = '暂无表格配置'; }
    let width: number = 0;
    state.columns?.forEach((item) => {
      width += Number(String(item.width).replace(/(px|%|r?em|pt|vw|cm|in|pc)$/ui, '')) || 120;
    });

    return message ? <Empty style={{ width: width > 0 ? width : void 0 }} image={Empty.PRESENTED_IMAGE_SIMPLE} description={message} /> : null;
  };

  return (
    <div style={{ padding: '12px 0 12px 12px', overflowX: 'auto' }}>
      {
      state.columns && state.columns.length > 0 && (
        <Draggable<DripTableColumn>
          value={(state.columns || [])}
          codeKey="sort"
          style={{ position: 'relative' }}
          onChange={(data) => {
            state.columns = [...data];
            globalActions.editColumns(store);
          }}
          render={renderTableCell}
        />
      )
      }
      { emptyFeedBack() }
    </div>
  );
};

export default EditableTable;
