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
  type DripTableExtraOptions,
  type DripTableRecordTypeBase,
  type DripTableRecordTypeWithSubtable,
  type ExtractDripTableExtraOption,
} from '@/types';
import * as childrenLike from '@/utils/children-like';
import { parseReactCSS } from '@/utils/dom';
import Button, { type ButtonProps } from '@/components/react-components/button';
import Col from '@/components/react-components/col';
import Dropdown from '@/components/react-components/dropdown';
import Input from '@/components/react-components/input';
import Menu from '@/components/react-components/menu';
import RichText from '@/components/react-components/rich-text';
import Row from '@/components/react-components/row';
import Select from '@/components/react-components/select';
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
  selectorButtonType?: ButtonProps['type'];
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
  selectorButtonType?: ButtonProps['type'];
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

const prefixCls = 'jfe-drip-table-rc-slot-render';

const renderCheckOutlined = () => (
  <span role="img" aria-label="check">
    <svg viewBox="64 64 896 896" focusable="false" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true">
      <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
    </svg>
  </span>
);

const renderDropDownIcon = () => (
  <span role="img" aria-label="down" style={{ fontSize: '10px', verticalAlign: 'baseline' }}>
    <svg viewBox="64 64 896 896" focusable="false" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
      <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" />
    </svg>
  </span>
);

const renderPlusOutlined = () => (
  <span role="img" aria-label="plus">
    <svg style={{ shapeRendering: 'optimizeSpeed' }} viewBox="64 64 896 896" focusable="false" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true">
      <defs><style /></defs>
      <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" />
      <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" />
    </svg>
  </span>
);

const SlotRender = <
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: SlotRenderProps<RecordType, ExtraOptions>) => {
  const { props: tableProps, info: tableInfo, state: tableState, setState: setTableState } = useTableContext<RecordType, ExtraOptions>();

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
      return <h3 className={`${prefixCls}-text-element`}>{ config.text }</h3>;
    }

    if (config.type === 'html') {
      return <RichText className={`${prefixCls}-html-element`} html={config.html} />;
    }

    if (config.type === 'search') {
      return (
        <div style={config.wrapperStyle} className={classnames(`${prefixCls}-search-element`, config.wrapperClassName)}>
          { config.searchKeys && (
            <Select
              defaultValue={config.searchKeyDefaultValue}
              className={`${prefixCls}-search-element__select`}
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
      const columnIndex = typeof props.columnKey === 'string' ? childrenLike.findIndexRecursive(tableProps.schema.columns, c => c.key === props.columnKey) : -1;
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
            className={classnames(`${prefixCls}-slot-element`, typeof deprecatedProps?.className === 'string' ? deprecatedProps.className : '', config.class)}
            style={config.style ? parseReactCSS(config.style) : void 0}
            slotType={config.slot}
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
      return <span className={`${prefixCls}-slot-element__error`}>{ `自定义插槽组件渲染函数 tableProps.slots['${config.slot}'] 不存在` }</span>;
    }

    if (config.type === 'insert-button') {
      return (
        <Button
          className={classnames(`${prefixCls}-insert-button-element`, config.insertButtonClassName)}
          type="primary"
          icon={config.showIcon && renderPlusOutlined()}
          style={config.insertButtonStyle}
          onClick={e => tableProps.onInsertButtonClick?.(e, tableInfo)}
        >
          { config.insertButtonText }
        </Button>
      );
    }

    if (config.type === 'display-column-selector') {
      const hidableColumns = childrenLike.filterRecursive(tableProps.schema.columns, c => c.hidable);
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
                icon={<span style={{ opacity: tableState.displayColumnKeys.includes(column.key) ? 1 : 0 }}>{ renderCheckOutlined() }</span>}
              >
                { column.title }
              </Menu.Item>
            ))
          }
        </Menu>
      );
      return (
        <Dropdown
          className={`${prefixCls}-display-column-selector-element`}
          trigger={['click']}
          overlay={menu}
          visible={displayColumnVisible}
          onVisibleChange={(v) => { setDisplayColumnVisible(v); }}
        >
          <Button type={config.selectorButtonType} icon={renderDropDownIcon()}>
            { config.selectorButtonText || '展示列' }
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
            icon={<span style={{ opacity: tableState.layout === 'table' ? 1 : 0 }}>{ renderCheckOutlined() }</span>}
          >
            列表模式
          </Menu.Item>
          <Menu.Item
            key="card"
            icon={<span style={{ opacity: tableState.layout === 'card' ? 1 : 0 }}>{ renderCheckOutlined() }</span>}
          >
            卡片模式
          </Menu.Item>
        </Menu>
      );
      return (
        <Dropdown
          className={`${prefixCls}-display-column-selector-element`}
          trigger={['click']}
          overlay={menu}
          visible={layoutSelectorVisible}
          onVisibleChange={(v) => { setLayoutSelectorVisible(v); }}
        >
          <Button type={config.selectorButtonType}>
            { { table: '列表模式', card: '卡片模式', calendar: '日历模式' }[tableState.layout] || '布局模式' }
            { renderDropDownIcon() }
          </Button>
        </Dropdown>
      );
    }

    return null;
  };

  const elements = props.schema.elements;
  if (elements && elements.length > 0) {
    return (
      <Row className={prefixCls} style={Object.assign({}, props.style, props.schema.style)}>
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
