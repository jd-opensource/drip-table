/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import './index.less';

import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Pagination, Select } from 'antd';
import classNames from 'classnames';
import { DripTableExtraOptions, DripTableSchema, DripTableSlotElementSchema } from 'drip-table';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';

import { filterAttributes } from '@/utils';
import RichText from '@/components/RichText';
import { DripTableGeneratorContext, GeneratorContext } from '@/context';
import { getSchemaValue } from '@/layouts/utils';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

interface EditableTableFooterProps<
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  driver: DripTableGeneratorProps<RecordType, ExtraOptions>['driver'];
  ext: ExtraOptions['CustomComponentExtraData'];
  slots: DripTableGeneratorProps<RecordType, ExtraOptions>['slots'];
}

const EditableTableFooter = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: EditableTableFooterProps<RecordType, ExtraOptions>) => {
  const context = React.useContext(GeneratorContext);
  const [currentCellIndex, setCurrentCellIndex] = React.useState(-1);
  const [currentCell, setCurrentCell] = React.useState<DripTableSlotElementSchema>();

  const textAlignMapper = {
    bottomLeft: 'left',
    bottomCenter: 'center',
    bottomRight: 'right',
  };

  const renderColumnContent = (
    config: DripTableSlotElementSchema,
    globalConfigs: DripTableGeneratorContext['globalConfigs'],
  ) => {
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
            driver={props.driver}
            ext={props.ext}
            schema={getSchemaValue(context) as unknown as DripTableSchema<NonNullable<ExtraOptions['CustomColumnSchema']>, NonNullable<ExtraOptions['SubtableDataSourceKey']>>}
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
        <Button style={{ margin: '12px 0' }} type={config.selectorButtonType}>
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
    globalConfigs: DripTableGeneratorContext['globalConfigs'],
    setState: DripTableGeneratorContext['setState'],
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
        setState({ globalConfigs: configs });
      }
    }
  };
  const renderShowTotal = (showTotal?: string | boolean) => {
    if (typeof showTotal === 'boolean') {
      return showTotal ? (total, range) => (range ? `${range[0]}-${range[1]} of ${total}` : `${total} items`) : void 0;
    }
    if (typeof showTotal === 'string') {
      return (total, range) => String(showTotal ?? '')
        .replace('{{total}}', String(context.previewDataSource.length))
        .replace('{{range[0]}}', String(range?.[0] ?? ''))
        .replace('{{range[1]}}', String(range?.[1] ?? ''));
    }
    return void 0;
  };
  return (
    <GeneratorContext.Consumer>
      { ({ globalConfigs, previewDataSource, setState }) => {
        const paginationInFooter = typeof globalConfigs.pagination === 'object' && globalConfigs.pagination.position?.startsWith('bottom');
        return (
          <div style={{ marginTop: '12px' }}>
            { paginationInFooter && (
            <Pagination
              style={{ textAlign: typeof globalConfigs.pagination === 'object' ? textAlignMapper[globalConfigs.pagination?.position || ''] : void 0 }}
              {...filterAttributes(globalConfigs.pagination, 'showTotal')}
              showTotal={globalConfigs.pagination ? renderShowTotal(globalConfigs.pagination.showTotal) : void 0}
              total={previewDataSource.length}
              onShowSizeChange={(current, size) => {
                const configs = { ...globalConfigs };
                if (typeof configs.pagination === 'object') {
                  configs.pagination.pageSize = size;
                }
                setState({ globalConfigs: configs });
              }}
            />
            ) }
            <div className="jfe-drip-table-generator-workstation-editable-footer-draggable-container" style={{ padding: '8px 0 0 8px', overflowX: 'auto' }}>
              {
                typeof globalConfigs.footer === 'object'
                && globalConfigs.footer.elements?.map((element, index) => (
                  <div
                    draggable
                    onDragStart={e => startDragCell(element, index)}
                    onDrop={(e) => { e.preventDefault(); dropFooterCell(element, index, globalConfigs, setState); }}
                    onDragOver={e => e.preventDefault()}
                    key={index}
                    className={classNames('jfe-drip-table-generator-workstation-editable-footer-draggable-cell', { 'jfe-drip-table-generator-workstation-editable-footer-text-cell': element.type === 'text' })}
                    style={{ width: Number(element.span) ? `${(Number(element.span) * 100) / 24}%` : void 0, ...element.style }}
                  >
                    { renderColumnContent(element, globalConfigs) }
                  </div>
                ))
              }
            </div>
          </div>
        );
      } }
    </GeneratorContext.Consumer>
  );
};

export default EditableTableFooter;
