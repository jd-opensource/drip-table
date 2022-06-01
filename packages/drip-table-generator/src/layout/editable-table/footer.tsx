/**
 * This file is part of the jd-mkt5 launch.
 * @link     : https://ace.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import classNames from 'classnames';
import { DripTableDriver, DripTableGenericRenderElement } from 'drip-table';
import cloneDeep from 'lodash/cloneDeep';
import React, { useState } from 'react';

import { globalActions, GlobalStore } from '@/store';
import RichText from '@/components/RichText';
import { useGlobalData } from '@/hooks';

import styles from './index.module.less';

export interface EditableFooterProps {
  driver: DripTableDriver;
}

const EditableFooter = (props: EditableFooterProps & { store: GlobalStore }) => {
  const {
    slots,
  } = useGlobalData();
  const [state, setState] = props.store;
  const store = { state, setState };
  const { driver } = props;
  const Button = driver.components.Button;
  const DownOutlined = driver.icons.DownOutlined;
  const Input = driver.components.Input;
  const PlusOutlined = driver.icons.PlusOutlined;
  const Select = driver.components.Select;

  const [currentCellIndex, setCurrentCellIndex] = useState(-1);
  const [currentCell, setCurrentCell] = useState<DripTableGenericRenderElement>();

  const renderColumnContent = (config: DripTableGenericRenderElement) => {
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
      const Slot = slots?.[config.slot] || slots?.default;
      if (Slot) {
        return (
          <Slot
            {...config.props}
            className={classNames(styles['generic-render-slot-element'], typeof config.props?.className === 'string' ? config.props.className : '')}
            slotType={config.slot}
            driver={driver}
            schema={{ ...state.globalConfigs, columns: state.columns }}
            dataSource={state.previewDataSource || []}
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

  const dropFooterCell = (element: DripTableGenericRenderElement, index: number) => {
    if (currentCellIndex === -1 || !currentCell) {
      return;
    }
    if (typeof state.globalConfigs.footer === 'object') {
      const columns = state.globalConfigs.footer.elements ? [...state.globalConfigs.footer.elements] : [];
      if (currentCellIndex !== index) {
        columns.splice(currentCellIndex, 1, element);
        columns.splice(index, 1, currentCell);
        setCurrentCellIndex(-1);
        setCurrentCell(void 0);
        store.state.globalConfigs = cloneDeep({ ...state.globalConfigs,
          footer: {
            ...state.globalConfigs.footer,
            elements: columns,
          } });
        globalActions.updateGlobalConfig(store);
      }
    }
  };

  return (
    <div className={styles['draggable-container']} style={{ padding: '12px 0 0 12px', overflowX: 'auto' }}>
      {
       typeof state.globalConfigs.footer === 'object'
       && state.globalConfigs.footer.elements?.map((element, index) => (
         <div
           draggable
           onDragStart={e => startDragCell(element, index)}
           onDrop={(e) => { e.preventDefault(); dropFooterCell(element, index); }}
           onDragOver={e => e.preventDefault()}
           key={index}
           className={styles['draggable-cell']}
           style={element.style}
         >
           { renderColumnContent(element) }
         </div>
       ))
     }
    </div>
  );
};

export default EditableFooter;
