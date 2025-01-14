/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Select } from 'antd';
import classNames from 'classnames';
import { DripTableExtraOptions, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, DripTableSlotElementSchema, ExtractDripTableExtraOption } from 'drip-table';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';

import RichText from '@/components/RichText';
import { GeneratorContext } from '@/context';
import { DTGTableConfig, DTGTableConfigsContext, TableConfigsContext } from '@/context/table-configs';
import { getSchemaValue } from '@/layouts/utils';
import { DripTableGeneratorProps } from '@/typing';

interface RowHeaderProps<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  ext: DripTableGeneratorProps<RecordType, ExtraOptions>['ext'];
  slots: DripTableGeneratorProps<RecordType, ExtraOptions>['slots'];
  configs: DTGTableConfigsContext['tableConfigs'][number]['configs']['rowHeader'];
  tableConfig: DTGTableConfig;
}
function RowHeader<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: RowHeaderProps<RecordType, ExtraOptions>) {
  const context = React.useContext(GeneratorContext);
  const tableConfigsContext = React.useContext(TableConfigsContext);
  const [currentCellIndex, setCurrentCellIndex] = React.useState(-1);
  const [currentCell, setCurrentCell] = React.useState<DripTableSlotElementSchema>();

  const renderColumnContent = (config: DripTableSlotElementSchema) => {
    if (config.type === 'spacer') {
      return null;
    }

    if (config.type === 'text') {
      return <h3 className="jfe-drip-table-generator-workstation-editable-footer-generic-render-text-element">{config.text}</h3>;
    }

    if (config.type === 'html') {
      return <RichText className="jfe-drip-table-generator-workstation-editable-footer-generic-render-html-element" html={config.html} />;
    }

    if (config.type === 'search') {
      return (
        <div style={config.wrapperStyle} className={classNames('jfe-drip-table-generator-workstation-editable-footer-generic-render-search-element', config.wrapperClassName)}>
          {config.searchKeys && (
            <Select
              defaultValue={config.searchKeyDefaultValue}
              className="jfe-drip-table-generator-workstation-editable-footer-generic-render-search-element__select"
            >
              {config.searchKeys.map((item, i) => <Select.Option key={i} value={item.value}>{item.label}</Select.Option>)}
            </Select>
          )}
          <Input.Search
            allowClear={config.allowClear}
            placeholder={config.placeholder}
            enterButton={config.searchButtonText || true}
            size={config.searchButtonSize}
          />
        </div>
      );
    }

    if (config.type === 'slot') {
      const Slot = props.slots?.[config.slot] || props.slots?.default;
      if (Slot) {
        return (
          <Slot
            className={classNames('jfe-drip-table-generator-workstation-editable-footer-generic-render-slot-element', config.class)}
            style={config.style}
            slotType={config.slot}
            data={config.data}
            ext={props.ext}
            schema={getSchemaValue(tableConfigsContext.tableConfigs)}
            dataSource={context.previewDataSource as RecordType[] || []}
            onSearch={() => void 0}
            fireEvent={() => void 0}
          />
        );
      }
      return <span className="jfe-drip-table-generator-workstation-editable-footer-generic-render-slot-element__error">{`自定义插槽组件渲染函数 tableProps.slots['${config.slot}'] 不存在`}</span>;
    }

    if (config.type === 'insert-button') {
      return (
        <Button
          className={classNames('jfe-drip-table-generator-workstation-editable-footer-generic-render-insert-button-element', config.insertButtonClassName)}
          type="primary"
          icon={config.showIcon && <PlusOutlined />}
          style={config.insertButtonStyle}
        >
          {config.insertButtonText}
        </Button>
      );
    }

    if (config.type === 'display-column-selector') {
      return (
        <Button style={{ margin: '6px 0' }} type={config.selectorButtonType}>
          {config.selectorButtonText || '展示列'}
          <DownOutlined />
        </Button>
      );
    }

    return null;
  };

  const dropHeaderCell = (
    element: DripTableSlotElementSchema,
    cellIndex: number,
    setTableConfigs: DTGTableConfigsContext['setTableConfigs'],
  ) => {
    if (currentCellIndex === -1 || !currentCell) {
      return;
    }
    if (typeof props.tableConfig.configs.rowHeader === 'object') {
      const rowHeader = props.tableConfig.configs.rowHeader;
      const newColumns = rowHeader.elements ? [...rowHeader.elements] : [];
      const tableIndex = tableConfigsContext.tableConfigs.findIndex(config => config.tableId === props.tableConfig.tableId);
      if (currentCellIndex !== cellIndex) {
        newColumns.splice(currentCellIndex, 1, element);
        newColumns.splice(cellIndex, 1, currentCell);
        setCurrentCellIndex(-1);
        setCurrentCell(void 0);
        const configs = cloneDeep({
          ...props.tableConfig.configs,
          rowHeader: {
            ...props.tableConfig.configs.rowHeader,
            elements: newColumns,
          },
        });
        setTableConfigs(configs, tableIndex);
      }
    }
  };

  return (
    <TableConfigsContext.Consumer>
      {({ setTableConfigs }) => (
        <div style={{ ...props.configs?.style, display: 'flex' }}>
          {
            props.configs?.elements?.map((element, index) => (
              <div
                draggable
                onDragOver={e => e.preventDefault()}
                onDragStart={() => {
                  setCurrentCellIndex(index);
                  setCurrentCell(element);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  dropHeaderCell(element, index, setTableConfigs);
                }}
                key={index}
                className={classNames('jfe-drip-table-generator-workstation-editable-header-draggable-cell', {
                  'jfe-drip-table-generator-workstation-editable-header-text-cell': element.type === 'text',
                  'jfe-drip-table-generator-workstation-editable-header-spacer-cell': element.type === 'spacer',
                })}
                style={{ width: Number(element.span) ? `${(Number(element.span) * 100) / 24}%` : void 0, ...element.style }}
              >
                {renderColumnContent(element)}
              </div>
            ))
          }
        </div>
      )}
    </TableConfigsContext.Consumer>

  );
}

export default RowHeader;
