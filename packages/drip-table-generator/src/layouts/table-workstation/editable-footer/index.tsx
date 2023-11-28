/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import './index.less';

import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Select } from 'antd';
import classNames from 'classnames';
import { DripTableExtraOptions, DripTableSlotElementSchema, DripTableTableInformation } from 'drip-table';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';

import RichText from '@/components/RichText';
import { GeneratorContext } from '@/context';
import { DTGTableConfig, DTGTableConfigsContext, TableConfigsContext } from '@/context/table-configs';
import { getSchemaValue } from '@/layouts/utils';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

import PaginationComponent from '../components/pagination';

interface EditableTableFooterProps<
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  ext: ExtraOptions['CustomComponentExtraData'];
  slots: DripTableGeneratorProps<RecordType, ExtraOptions>['slots'];
  total?: DripTableGeneratorProps<RecordType, ExtraOptions>['total'];
  onPageChange?: DripTableGeneratorProps<RecordType, ExtraOptions>['onPageChange'];
}

const EditableTableFooter = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: EditableTableFooterProps<RecordType, ExtraOptions>) => {
  const context = React.useContext(GeneratorContext);
  const tableConfigsContext = React.useContext(TableConfigsContext);
  const [currentCellIndex, setCurrentCellIndex] = React.useState(-1);
  const [currentCell, setCurrentCell] = React.useState<DripTableSlotElementSchema>();
  const [draggingIndex, setDraggingIndex] = React.useState(-1);

  const textAlignMapper = {
    bottomLeft: 'left',
    bottomCenter: 'center',
    bottomRight: 'right',
  };

  const renderColumnContent = (config: DripTableSlotElementSchema) => {
    if (config.type === 'spacer') {
      return null;
    }

    if (config.type === 'text') {
      return <h3 className="jfe-drip-table-generator-workstation-editable-footer-generic-render-text-element">{ config.text }</h3>;
    }

    if (config.type === 'html') {
      return <RichText className="jfe-drip-table-generator-workstation-editable-footer-generic-render-html-element" html={config.html} />;
    }

    if (config.type === 'search') {
      return (
        <div style={config.wrapperStyle} className={classNames('jfe-drip-table-generator-workstation-editable-footer-generic-render-search-element', config.wrapperClassName)}>
          { config.searchKeys && (
            <Select
              defaultValue={config.searchKeyDefaultValue}
              className="jfe-drip-table-generator-workstation-editable-footer-generic-render-search-element__select"
            >
              { config.searchKeys.map((item, i) => <Select.Option key={i} value={item.value}>{ item.label }</Select.Option>) }
            </Select>
          ) }
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
      return <span className="jfe-drip-table-generator-workstation-editable-footer-generic-render-slot-element__error">{ `自定义插槽组件渲染函数 tableProps.slots['${config.slot}'] 不存在` }</span>;
    }

    if (config.type === 'insert-button') {
      return (
        <Button
          className={classNames('jfe-drip-table-generator-workstation-editable-footer-generic-render-insert-button-element', config.insertButtonClassName)}
          type="primary"
          icon={config.showIcon && <PlusOutlined />}
          style={config.insertButtonStyle}
        >
          { config.insertButtonText }
        </Button>
      );
    }

    if (config.type === 'display-column-selector') {
      return (
        <Button style={{ margin: '6px 0' }} type={config.selectorButtonType}>
          { config.selectorButtonText || '展示列' }
          <DownOutlined />
        </Button>
      );
    }

    return null;
  };

  const startDragCell = (element: DripTableSlotElementSchema, index: number) => {
    setCurrentCellIndex(index);
    setCurrentCell(element);
  };

  const dropFooterCell = (
    element: DripTableSlotElementSchema,
    index: number,
    globalConfigs: DTGTableConfig['configs'],
    setTableConfigs: DTGTableConfigsContext['setTableConfigs'],
  ) => {
    if (currentCellIndex === -1 || !currentCell) {
      return;
    }
    if (typeof globalConfigs.footer === 'object') {
      const newColumns = globalConfigs.footer.elements ? [...globalConfigs.footer.elements] : [];
      if (currentCellIndex !== index) {
        newColumns.splice(currentCellIndex, 1, element);
        newColumns.splice(index, 1, currentCell);
        setCurrentCellIndex(-1);
        setCurrentCell(void 0);
        const configs = cloneDeep({ ...globalConfigs,
          footer: {
            ...globalConfigs.footer,
            elements: newColumns,
          } });
        setTableConfigs(configs, 0);
      }
    }
  };

  return (
    <TableConfigsContext.Consumer>
      { ({ tableConfigs, setTableConfigs }) => {
        const globalConfigs = tableConfigs[0].configs;
        const paginationInFooter = typeof globalConfigs.pagination === 'object' && globalConfigs.pagination.position?.startsWith('bottom');
        const tableInfo = {
          uuid: tableConfigs[0]?.tableId,
          schema: {
            ...tableConfigs[0]?.configs,
            id: tableConfigs[0].tableId,
            columns: tableConfigs[0]?.columns,
            dataSourceKey: tableConfigs[0]?.dataSourceKey,
          } as DripTableTableInformation<RecordType, ExtraOptions>['schema'],
          parent: void 0,
          dataSource: context.previewDataSource as RecordType[],
        };
        return (
          <div style={{ marginTop: '12px' }}>
            { paginationInFooter && typeof globalConfigs.pagination === 'object' && (
              <PaginationComponent
                style={{ textAlign: textAlignMapper[globalConfigs.pagination?.position || ''] }}
                {...globalConfigs.pagination}
                total={props.total || context.previewDataSource.length}
                onShowSizeChange={(current, size) => {
                  const configs = { ...globalConfigs };
                  if (typeof configs.pagination === 'object') {
                    configs.pagination.pageSize = size;
                  }
                  setTableConfigs(configs, 0);
                  props.onPageChange?.(current, size, tableInfo);
                }}
                onChange={(page, pageSize) => props.onPageChange?.(page, pageSize, tableInfo)}
              />
            ) }
            <div className="jfe-drip-table-generator-workstation-editable-footer-draggable-container" style={{ padding: '8px 0 0', overflowX: 'auto' }}>
              {
                typeof globalConfigs.footer === 'object'
                && globalConfigs.footer.elements?.map((element, index) => (
                  <div
                    draggable
                    onDragStart={e => startDragCell(element, index)}
                    onDrop={(e) => {
                      e.preventDefault();
                      dropFooterCell(element, index, globalConfigs, setTableConfigs);
                      setDraggingIndex(-1);
                    }}
                    onDragOver={(e) => { e.preventDefault(); setDraggingIndex(index); }}
                    key={index}
                    className={classNames('jfe-drip-table-generator-workstation-editable-footer-draggable-cell', {
                      'jfe-drip-table-generator-workstation-editable-footer-text-cell': element.type === 'text',
                      'jfe-drip-table-generator-workstation-editable-footer-spacer-cell': element.type === 'spacer',
                      'jfe-drip-table-generator-workstation-editable-footer-dragging': index === draggingIndex,
                    })}
                    style={{ width: Number(element.span) ? `${(Number(element.span) * 100) / 24}%` : void 0, ...element.style }}
                  >
                    { renderColumnContent(element) }
                  </div>
                ))
              }
            </div>
          </div>
        );
      } }
    </TableConfigsContext.Consumer>
  );
};

export default EditableTableFooter;
