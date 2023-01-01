/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import './index.less';

import classnames from 'classnames';
import React from 'react';

import {
  type DripTableDriver,
  type DripTableExtraOptions,
  type DripTableRecordTypeBase,
  type DripTableRecordTypeWithSubtable,
  type ExtractDripTableExtraOption,
} from '@/types';
import { parseReactCSS } from '@/utils/dom';
import RichText from '@/components/rich-text';
import { type IDripTableContext, useTableContext } from '@/hooks';

interface SlotElementBaseSchema {
  /**
   * 包裹 <Col> 样式名
   */
  className?: string;
  /**
   * 包裹 <Col> 样式
   */
  style?: React.CSSProperties;
  /**
   * 宽度：
   * {number}      跨度，取值 0-24。
   * {'flex-auto'} 自动伸缩。
   * {string}      透传给元素的 width 样式值。
   */
  span?: number | 'flex-auto' | string;
  /**
   * 对齐方式
   * {'flex-start'}    左对齐。
   * {'center'}        居中。
   * {'flex-end'}      右对齐。
   * {'space-between'} 两端对齐。
   * {'space-around'}  等间对齐。
   */
  align?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  /**
   * 是否可见
   */
  visible?: boolean;
}

interface SpacerSlotElementSchema extends SlotElementBaseSchema {
  /**
   * 占位区域
   */
  type: 'spacer';
}

interface TextSlotElementSchema extends SlotElementBaseSchema {
  /**
   * 文本展示
   */
  type: 'text';
  /**
   * 文本内容
   */
  text: string;
}

interface HTMLSlotElementSchema extends SlotElementBaseSchema {
  /**
   * 富文本展示
   */
  type: 'html';
  /**
   * 富文本内容
   */
  html: string;
}

interface SearchSlotElementSchema extends SlotElementBaseSchema {
  /**
   * 基本搜索
   */
  type: 'search';
  /**
   * 搜索区域类名
   */
  wrapperClassName?: string;
  /**
   * 搜索区域样式
   */
  wrapperStyle?: React.CSSProperties;
  /**
   * 暗纹提示
   */
  placeholder?: string;
  /**
   * 显示清空按钮
   */
  allowClear?: boolean;
  /**
   * 搜索按钮文字
   */
  searchButtonText?: string;
  /**
   * 搜索按钮大小
   */
  searchButtonSize?: 'large' | 'middle' | 'small';
  /**
   * 多维度搜索维度指定
   */
  searchKeys?: { label: string; value: number | string }[];
  /**
   * 多维度搜索默认维度值
   */
  searchKeyDefaultValue?: number | string;
}

interface CustomSlotElementSchema extends SlotElementBaseSchema {
  /**
   * 用户自定义组件插槽
   */
  type: 'slot';
  /**
   * 插槽渲染函数标识符
   */
  slot: string;
  /**
   * 插槽样式类名
   */
  class?: string;
  /**
   * 插槽自定义样式
   */
  style?: Record<string, string>;
  /**
   * 透传给自定义组件的数据
   */
  data?: unknown;
  /**
   * @deprecated 请使用 `data`、`class`、`style` 字段
   */
  props?: Record<string, unknown>;
}

interface InsertButtonSlotElementSchema extends SlotElementBaseSchema {
  type: 'insert-button';
  insertButtonClassName?: string;
  insertButtonStyle?: React.CSSProperties;
  insertButtonText?: string;
  showIcon?: boolean;
}

interface LayoutSelectorSlotElementSchema extends SlotElementBaseSchema {
  /**
   * table布局方式选择器
   */
  type: 'layout-selector';
  /**
   * 布局方式选择器提示文案
   */
  selectorButtonText?: string;
  /**
   * 选择器按钮样式
   */
  selectorButtonType?: React.ComponentProps<DripTableDriver['components']['Button']>['type'];
}

interface DisplayColumnSelectorSlotElementSchema extends SlotElementBaseSchema {
  /**
   * 展示列选择器
   */
  type: 'display-column-selector';
  /**
   * 展示列选择器提示文案
   */
  selectorButtonText?: string;
  /**
   * 选择器按钮样式
   */
  selectorButtonType?: React.ComponentProps<DripTableDriver['components']['Button']>['type'];
}

export type DripTableSlotElementSchema =
  | SpacerSlotElementSchema
  | TextSlotElementSchema
  | HTMLSlotElementSchema
  | SearchSlotElementSchema
  | CustomSlotElementSchema
  | InsertButtonSlotElementSchema
  | DisplayColumnSelectorSlotElementSchema
  | LayoutSelectorSlotElementSchema;

export interface DripTableSlotSchema {
  /**
   * 插槽自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 插槽展示元素配置
   */
  elements?: DripTableSlotElementSchema[];
}

interface SlotRenderProps<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 插槽 Schema 配置
   */
  schema: DripTableSlotSchema;
  /**
   * 当前插槽位置列 Schema 唯一标识符
   */
  columnKey?: string;
  /**
   * 当前插槽位置行数据（仅位于行插槽可用）
   */
  record?: RecordType;
  /**
   * 当前插槽位置行下标（仅位于行插槽可用）
   */
  recordIndex?: number;
}

const SlotRender = <
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: SlotRenderProps<RecordType, ExtraOptions>) => {
  const { props: tableProps, info: tableInfo, state: tableState, setState: setTableState } = useTableContext<RecordType, ExtraOptions>();
  const Button = tableProps.driver.components.Button;
  const CheckOutlined = tableProps.driver.icons.CheckOutlined;
  const Col = tableProps.driver.components.Col;
  const DownOutlined = tableProps.driver.icons.DownOutlined;
  const Dropdown = tableProps.driver.components.Dropdown;
  const Input = tableProps.driver.components.Input;
  const Menu = tableProps.driver.components.Menu;
  const PlusOutlined = tableProps.driver.icons.PlusOutlined;
  const Row = tableProps.driver.components.Row;
  const Select = tableProps.driver.components.Select;

  const [displayColumnVisible, setDisplayColumnVisible] = React.useState(false);
  const [layoutSelectorVisible, setLayoutSelectorVisible] = React.useState(false);

  const [searchStr, setSearchStr] = React.useState('');
  const [searchKey, setSearchKey] = React.useState<SearchSlotElementSchema['searchKeyDefaultValue']>(
    props.schema.elements
      ?.map(s => (s.type === 'search' ? s.searchKeyDefaultValue : ''))
      .find(Boolean),
  );

  const renderColumnContent = (config: DripTableSlotElementSchema) => {
    if (config.type === 'spacer') {
      return null;
    }

    if (config.type === 'text') {
      return <h3 className="jfe-drip-table-slot-render-text-element">{ config.text }</h3>;
    }

    if (config.type === 'html') {
      return <RichText className="jfe-drip-table-slot-render-html-element" html={config.html} />;
    }

    if (config.type === 'search') {
      return (
        <div style={config.wrapperStyle} className={classnames('jfe-drip-table-slot-render-search-element', config.wrapperClassName)}>
          { config.searchKeys && (
            <Select
              defaultValue={config.searchKeyDefaultValue}
              className="jfe-drip-table-slot-render-search-element__select"
              value={searchKey}
              onChange={value => setSearchKey(value)}
            >
              { config.searchKeys.map((item, i) => <Select.Option key={i} value={item.value}>{ item.label }</Select.Option>) }
            </Select>
          ) }
          <Input.Search
            allowClear={config.allowClear}
            placeholder={config.placeholder}
            enterButton={config.searchButtonText || true}
            size={config.searchButtonSize}
            value={searchStr}
            onChange={e => setSearchStr(e.target.value.trim())}
            onSearch={(value) => { tableProps.onSearch?.({ searchKey, searchStr: value }, tableInfo); }}
          />
        </div>
      );
    }

    if (config.type === 'slot') {
      const Slot = tableProps.slots?.[config.slot] || tableProps.slots?.default;
      const columnIndex = typeof props.columnKey === 'string' ? tableProps.schema.columns.findIndex(c => c.key === props.columnKey) : -1;
      if (Slot) {
        const DEPRECATED_PROPS = 'props';
        const deprecatedProps = config[DEPRECATED_PROPS];
        if (deprecatedProps) {
          console.warn('Slot props field is deprecated, please use data/class/style fields instead.');
        }
        return (
          <Slot
            {...deprecatedProps}
            data={config.data}
            className={classnames('jfe-drip-table-slot-render-slot-element', typeof deprecatedProps?.className === 'string' ? deprecatedProps.className : '', config.class)}
            style={config.style ? parseReactCSS(config.style) : void 0}
            slotType={config.slot}
            driver={tableProps.driver}
            schema={tableProps.schema}
            ext={tableProps.ext}
            dataSource={tableProps.dataSource}
            columnIndex={columnIndex === -1 ? void 0 : columnIndex}
            record={props.record}
            recordIndex={props.recordIndex}
            onSearch={(searchParams) => { tableProps.onSearch?.(searchParams, tableInfo); }}
            fireEvent={event => tableProps.onEvent?.({ record: props.record, recordIndex: props.recordIndex, columnIndex, ...event }, tableInfo)}
          />
        );
      }
      return <span className="jfe-drip-table-slot-render-slot-element__error">{ `自定义插槽组件渲染函数 tableProps.slots['${config.slot}'] 不存在` }</span>;
    }

    if (config.type === 'insert-button') {
      return (
        <Button
          className={classnames('jfe-drip-table-slot-render-insert-button-element', config.insertButtonClassName)}
          type="primary"
          icon={config.showIcon && <PlusOutlined />}
          style={config.insertButtonStyle}
          onClick={e => tableProps.onInsertButtonClick?.(e, tableInfo)}
        >
          { config.insertButtonText }
        </Button>
      );
    }

    if (config.type === 'display-column-selector') {
      const hidableColumns = tableProps.schema.columns.filter(c => c.hidable);
      if (hidableColumns.length === 0) {
        return null;
      }
      const menu = (
        <Menu
          onClick={(e) => {
            setTableState((state) => {
              const displayColumnKeys = state.displayColumnKeys.filter(k => k !== e.key) || [];
              if (!state.displayColumnKeys.includes(e.key)) {
                displayColumnKeys.push(e.key);
              }
              tableProps.onDisplayColumnKeysChange?.(displayColumnKeys, tableInfo);
              return { displayColumnKeys };
            });
          }}
        >
          {
            hidableColumns.map(column => (
              <Menu.Item
                key={column.key}
                icon={<span style={{ opacity: tableState.displayColumnKeys.includes(column.key) ? 1 : 0 }}><CheckOutlined /></span>}
              >
                { column.title }
              </Menu.Item>
            ))
          }
        </Menu>
      );
      return (
        <Dropdown
          className="jfe-drip-table-slot-render-display-column-selector-element"
          trigger={['click']}
          overlay={menu}
          visible={displayColumnVisible}
          onVisibleChange={(v) => { setDisplayColumnVisible(v); }}
        >
          <Button type={config.selectorButtonType}>
            { config.selectorButtonText || '展示列' }
            <DownOutlined />
          </Button>
        </Dropdown>
      );
    }

    if (config.type === 'layout-selector') {
      const menu = (
        <Menu
          onClick={(e) => {
            setTableState(() => ({ layout: e.key as IDripTableContext['state']['layout'] }));
          }}
        >
          <Menu.Item
            key="table"
            icon={<span style={{ opacity: tableState.layout === 'table' ? 1 : 0 }}><CheckOutlined /></span>}
          >
            列表模式
          </Menu.Item>
          <Menu.Item
            key="card"
            icon={<span style={{ opacity: tableState.layout === 'card' ? 1 : 0 }}><CheckOutlined /></span>}
          >
            卡片模式
          </Menu.Item>
        </Menu>
      );
      return (
        <Dropdown
          className="jfe-drip-table-slot-render-display-column-selector-element"
          trigger={['click']}
          overlay={menu}
          visible={layoutSelectorVisible}
          onVisibleChange={(v) => { setLayoutSelectorVisible(v); }}
        >
          <Button type={config.selectorButtonType}>
            { { table: '列表模式', card: '卡片模式', calendar: '日历模式' }[tableState.layout] || '布局模式' }
            <DownOutlined />
          </Button>
        </Dropdown>
      );
    }

    return null;
  };

  const elements = props.schema.elements;
  if (elements && elements.length > 0) {
    return (
      <Row className="jfe-drip-table-slot-render" style={Object.assign({}, props.style, props.schema.style)}>
        {
          elements.map((item, index) => (
            <Col
              key={index}
              className={item.className}
              style={{
                width: typeof item.span === 'string' && item.span !== 'flex-auto' ? item.span : void 0,
                display: 'flex',
                flex: item.span === 'flex-auto' ? '1 1 auto' : void 0,
                justifyContent: item.align || 'center',
                paddingLeft: index === 0 ? '0' : '3px',
                ...item.style,
              }}
              span={typeof item.span === 'string' ? void 0 : item.span}
            >
              { item.visible === false ? null : renderColumnContent(item) }
            </Col>
          ))
        }
      </Row>
    );
  }
  return null;
};

export default SlotRender;
