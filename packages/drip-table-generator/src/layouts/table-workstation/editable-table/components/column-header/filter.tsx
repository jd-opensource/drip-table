/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { FilterFilled } from '@ant-design/icons';
import { Checkbox, Col, message, Popconfirm, Row } from 'antd';
import { DripTableExtraOptions, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, ExtractDripTableExtraOption } from 'drip-table';
import React from 'react';

import { get } from '@/utils';
import { GeneratorContext } from '@/context';
import { DTGTableConfig, TableConfigsContext } from '@/context/table-configs';
import { DripTableGeneratorProps } from '@/typing';

export interface ColumnHeaderProps<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  tableConfig: DTGTableConfig;
  renderHeaderCellFilter: DripTableGeneratorProps<RecordType, ExtraOptions>['renderHeaderCellFilter'];
  column: DTGTableConfig['columns'][number];
  dataSource?: DripTableGeneratorProps<RecordType, ExtraOptions>['dataSource'];
}

export function FilterViewer<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: ColumnHeaderProps<RecordType, ExtraOptions>) {
  const tableContext = React.useContext(TableConfigsContext);
  const [filteredValue, setFilteredValue] = React.useState(props.column.defaultFilteredValue || []);
  const [storedDataSource] = React.useState([...props.dataSource || []]);

  if (props.renderHeaderCellFilter) {
    return (
      <props.renderHeaderCellFilter
        columnSchema={props.column}
        filter={filteredValue}
        setFilter={(newFilter) => {
          setFilteredValue(newFilter as React.Key[] ?? []);
          message.warn('编辑状态下自定义筛选器仅做展示用，如需预览联动效果请使用预览功能');
        }}
      />
    );
  }
  return (
    <GeneratorContext.Consumer>
      {({ setState }) => (
        <Popconfirm
          title={(
            <Checkbox.Group
              defaultValue={props.column.defaultFilteredValue as string[]}
              onChange={checkedValues => setFilteredValue(checkedValues as React.Key[])}
            >
              {props.column.filters?.map((item, index) => (
                <Row key={index}>
                  <Col span={24}><Checkbox value={item.value}>{item.text}</Checkbox></Col>
                </Row>
              ))}
            </Checkbox.Group>
          )}
          icon={null}
          cancelText="重置"
          okText="确认"
          onCancel={(e) => {
            e?.stopPropagation();
            if (props.tableConfig.tableId === tableContext.tableConfigs[0].tableId) {
              setFilteredValue([]);
              setState({ previewDataSource: storedDataSource });
            } else {
              message.warn('子表格暂不支持编辑状态下预览过滤器效果');
            }
          }}
          onConfirm={(e) => {
            e?.stopPropagation();
            if (props.tableConfig.tableId === tableContext.tableConfigs[0].tableId) {
              const newDataSource = filteredValue.length > 0 && filteredValue.length < (props.column.filters?.length || 0)
                ? storedDataSource.filter(item => filteredValue.includes(get(item, props.column.dataIndex)))
                : storedDataSource;
              setState({ previewDataSource: newDataSource });
            } else {
              message.warn('子表格暂不支持编辑状态下预览过滤器效果');
            }
          }}
        >
          <span style={{ marginLeft: 6, verticalAlign: 'top', color: '#b1b1b1', cursor: 'pointer' }}><FilterFilled /></span>
        </Popconfirm>
      )}
    </GeneratorContext.Consumer>
  );
}
