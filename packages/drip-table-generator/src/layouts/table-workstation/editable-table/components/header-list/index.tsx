/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { ReactSortable } from 'react-sortablejs';

import { filterArray } from '@/utils';
import { DTGTableConfig } from '@/context/table-configs';

import ColumnHeader from '../column-header';

interface ColumnHeaderListProps {
  tableConfig: DTGTableConfig;
  onResort: (column: DTGTableConfig['columns']) => void;
}

const ColumnHeaderList = (props: ColumnHeaderListProps) => {
  const columnList = React.useMemo(() => props.tableConfig.columns.map((item, index) => ({ id: index + 1, column: item })), [props.tableConfig.columns]);
  const sortableColumns = filterArray(columnList, item => !item.column.fixed);
  return (
    <div className={classNames('jfe-drip-table-generator-workstation-table-header-wrapper', {
      invisible: props.tableConfig.configs.showHeader === false,
      [props.tableConfig.configs.size || 'default']: props.tableConfig.configs.size,
    })}
    >
      { sortableColumns[0] && sortableColumns[0].id > 1
        ? props.tableConfig.columns
          .filter((item, index) => item.fixed && index < sortableColumns[0].id)
          .map((column, index) => <ColumnHeader tableConfig={props.tableConfig} column={column} key={index} />)
        : null }
      <ReactSortable
        animation={250}
        list={columnList}
        setList={(newList) => {
          const newColumns = newList.map(item => item.column);
          props.onResort(newColumns);
        }}
        style={{
          display: 'flex',
          width: typeof props.tableConfig.configs.scroll?.x === 'boolean' ? '100%' : props.tableConfig.configs.scroll?.x,
          overflowX: 'auto',
        }}
      >
        { props.tableConfig.columns.map((column, index) => (
          <ColumnHeader tableConfig={props.tableConfig} column={column} key={index} />
        )) }
      </ReactSortable>
      { sortableColumns[sortableColumns.length - 1] && sortableColumns[sortableColumns.length - 1].id < columnList.length
        ? props.tableConfig.columns
          .filter((item, index) => item.fixed && index > sortableColumns[sortableColumns.length - 1].id)
          .map((column, index) => <ColumnHeader tableConfig={props.tableConfig} column={column} key={index} />)
        : null }
      <div
        className={classNames('jfe-drip-table-generator-workstation-table-header-add-item', {
          [props.tableConfig.configs.size || 'default']: props.tableConfig.configs.size,
        })}
      >
        <Button icon={<PlusOutlined />} />
      </div>
    </div>
  );
};

export default ColumnHeaderList;
