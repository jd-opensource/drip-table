/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import React, { forwardRef, useImperativeHandle } from 'react';

import { DripTableRecordTypeBase } from '@/types';
import { DripTableContext, IDripTableContext } from '@/context';
import DripTable, { DripTableProps } from '@/drip-table';
import { useState, useTable } from '@/hooks';

/**
 * 暴露给外部直接操作实例的接口
 */
export interface DripTableContainerHandle extends IDripTableContext {
  /**
   * 通过接口选择行
   *
   * @param indexes 行号数组
   */
  select: (indexes: number[]) => void;
}

// 组件提供给外部的公共接口
const createTableContext = <RecordType extends DripTableRecordTypeBase>(props: DripTableProps<RecordType>): DripTableContainerHandle => {
  const initialState = useTable();
  const [state, setState] = useState(initialState);

  const select = (indexes: number[]) => {
    let selectedKeys: React.Key[] = [];
    const { dataSource, schema: { rowKey } } = props;
    if (dataSource && rowKey) {
      indexes.forEach((index) => {
        const data = dataSource[index];
        if (data) {
          const value = data[rowKey];
          const key = typeof value === 'string' || typeof value === 'number'
            ? value
            : index;
          selectedKeys.push(key);
        }
      });
    } else {
      selectedKeys = [...indexes];
    }
    setState({ selectedRowKeys: selectedKeys });
  };

  const handler: DripTableContainerHandle = {
    ...state,
    setTableState: setState,
    select,
    _CTX_SOURCE: 'PROVIDER', // context 来源于 drip-table-provider
  };
  return handler;
};

export interface DripTableProviderProps {}

const findChildReactNode = (children: React.ReactNode | undefined, filter: (child: React.ReactNode) => boolean): React.ReactNode => {
  const stack = [children];
  while (stack.length > 0) {
    const child = stack.pop();
    if (Array.isArray(child)) {
      stack.push(...child);
    } else if (child && filter(child)) {
      return child;
    }
  }
  return void 0;
};

const DripTableContainer: React.ForwardRefRenderFunction<DripTableContainerHandle, React.PropsWithChildren<DripTableProviderProps>> = (props, ref) => {
  const tableChild = findChildReactNode(
    props.children,
    (child) => {
      const childType = child && typeof child === 'object' && 'type' in child ? child.type : void 0;
      const childName = typeof childType === 'function' ? childType.name : childType;
      return childName === DripTable.name;
    },
  );
  const tableProps: DripTableProps<DripTableRecordTypeBase> | undefined = tableChild && typeof tableChild === 'object' && 'type' in tableChild
    ? tableChild.props
    : void 0;
  if (tableProps) {
    const ConfigProvider = tableProps.driver.components.ConfigProvider;
    const context = createTableContext(tableProps);
    useImperativeHandle(ref, () => context);
    return (
      <ConfigProvider locale={tableProps?.driver.locale}>
        <DripTableContext.Provider {...props} value={context} />
      </ConfigProvider>
    );
  }
  return <div />;
};

const DripTableProvider = forwardRef(DripTableContainer);

const withTable = <T extends DripTableRecordTypeBase>(Component: React.FC<DripTableProps<T>>) => (props: DripTableProps<T>) => (
  <DripTableProvider>
    <Component {...props} />
  </DripTableProvider>
);

export { DripTableProvider, withTable };
