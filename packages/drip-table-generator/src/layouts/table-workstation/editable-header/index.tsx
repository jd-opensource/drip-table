/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Pagination, Select } from 'antd';
import classNames from 'classnames';
import { DripTableExtraOptions, DripTableGenericRenderElement, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, DripTableSchema } from 'drip-table';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';

import { filterAttributes } from '@/utils';
import RichText from '@/components/RichText';
import { DripTableGeneratorContext, GeneratorContext } from '@/context';
import { DripTableGeneratorProps } from '@/typing';

import styles from './index.module.less';

interface EditableTableHeaderProps<
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
> {
  driver: DripTableGeneratorProps<RecordType, ExtraOptions>['driver'];
  slots: DripTableGeneratorProps<RecordType, ExtraOptions>['slots'];
}

const EditableTableHeader = <
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
>(props: EditableTableHeaderProps<RecordType, ExtraOptions>) => {
  const context = React.useContext(GeneratorContext);
  const [currentCellIndex, setCurrentCellIndex] = React.useState(-1);
  const [currentCell, setCurrentCell] = React.useState<DripTableGenericRenderElement>();

  const textAlignMapper = {
    topLeft: 'left',
    topCenter: 'center',
    topRight: 'right',
  };

  const renderColumnContent = (
    config: DripTableGenericRenderElement,
    globalConfigs: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['globalConfigs'],
  ) => {
    if (config.type === 'spacer') {
      return null;
    }

    if (config.type === 'text') {
      return <h3 className={styles['generic-render-text-element']}>{ config.text }</h3>;
    }

    if (config.type === 'html') {
      return <RichText className={styles['generic-render-html-element']} html={config.html} />;
    }

    if (config.type === 'search') {
      return (
        <div style={config.wrapperStyle} className={classNames(styles['generic-render-search-element'], config.wrapperClassName)}>
          { config.searchKeys && (
            <Select
              defaultValue={config.searchKeyDefaultValue}
              className={styles['generic-render-search-element__select']}
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
            {...config.props}
            className={classNames(styles['generic-render-slot-element'], typeof config.props?.className === 'string' ? config.props.className : '')}
            slotType={config.slot}
            driver={props.driver}
            schema={{ ...globalConfigs, columns: context.columns.map(item => ({ ...filterAttributes(item, 'index') })) } as DripTableSchema<NonNullable<ExtraOptions['CustomColumnSchema']>, NonNullable<ExtraOptions['SubtableDataSourceKey']>>}
            dataSource={context.previewDataSource as DripTableRecordTypeWithSubtable<RecordType, ExtraOptions['SubtableDataSourceKey']>[] || []}
            onSearch={() => void 0}
          />
        );
      }
      return <span className={styles['generic-render-slot-element__error']}>{ `自定义插槽组件渲染函数 tableProps.slots['${config.slot}'] 不存在` }</span>;
    }

    if (config.type === 'insert-button') {
      return (
        <Button
          className={classNames(styles['generic-render-insert-button-element'], config.insertButtonClassName)}
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

  const startDragCell = (element: DripTableGenericRenderElement, index: number) => {
    setCurrentCellIndex(index);
    setCurrentCell(element);
  };

  const dropHeaderCell = (
    element: DripTableGenericRenderElement,
    index: number,
    globalConfigs: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['globalConfigs'],
    setState: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['setState'],
  ) => {
    if (currentCellIndex === -1 || !currentCell) {
      return;
    }
    if (typeof globalConfigs.header === 'object') {
      const newColumns = globalConfigs.header.elements ? [...globalConfigs.header.elements] : [];
      if (currentCellIndex !== index) {
        newColumns.splice(currentCellIndex, 1, element);
        newColumns.splice(index, 1, currentCell);
        setCurrentCellIndex(-1);
        setCurrentCell(void 0);
        const configs = cloneDeep({ ...globalConfigs,
          header: {
            ...globalConfigs.header,
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
        const paginationInHeader = typeof globalConfigs.pagination === 'object' && globalConfigs.pagination.position?.startsWith('top');
        return (
          <div style={{ marginBottom: '12px' }}>
            { paginationInHeader && (
            <Pagination
              style={{ textAlign: typeof globalConfigs.pagination === 'object' ? textAlignMapper[globalConfigs.pagination?.position || ''] : void 0 }}
              {...filterAttributes(globalConfigs.pagination, 'showTotal')}
              showTotal={globalConfigs.pagination ? renderShowTotal(globalConfigs.pagination.showTotal) : void 0}
              total={previewDataSource.length}
            />
            ) }
            <div className={styles['draggable-container']} style={{ padding: '8px 0 0 8px', overflowX: 'auto' }}>
              {
                typeof globalConfigs.header === 'object'
                && globalConfigs.header.elements?.map((element, index) => (
                  <div
                    draggable
                    onDragStart={e => startDragCell(element, index)}
                    onDrop={(e) => { e.preventDefault(); dropHeaderCell(element, index, globalConfigs, setState); }}
                    onDragOver={e => e.preventDefault()}
                    key={index}
                    className={styles['draggable-cell']}
                    style={element.style}
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

export default EditableTableHeader;