/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import classnames from 'classnames';
import React from 'react';

import { type DripTableDriver, type DripTableRecordTypeBase, type EventLike } from '@/types';
import RichText from '@/components/RichText';
import { type IDripTableContext } from '@/context';
import { type DripTableProps } from '@/index';

import { DripTableComponentSchema } from '../components';

import styles from './index.module.css';

interface HeaderConfigBase {
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

interface HeaderSpacerElement extends HeaderConfigBase {
  /**
   * 占位区域
   */
  type: 'spacer';
}

interface HeaderTextElement extends HeaderConfigBase {
  /**
   * 文本展示
   */
  type: 'text';
  /**
   * 文本内容
   */
  text: string;
}

interface HeaderHTMLElement extends HeaderConfigBase {
  /**
   * 富文本展示
   */
  type: 'html';
  /**
   * 富文本内容
   */
  html: string;
}

interface HeaderSearchElement extends HeaderConfigBase {
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

interface HeaderAdvanceSearchElement extends HeaderConfigBase {
  /**
   * 高级搜索（用户自定义搜索组件）
   */
  type: 'advance-search';
  /**
   * 透传给自定搜索组件的属性值
   */
  props?: Record<string, unknown>;
}

interface HeaderInsertButtonElement extends HeaderConfigBase {
  type: 'insert-button';
  insertButtonClassName?: string;
  insertButtonStyle?: React.CSSProperties;
  insertButtonText?: string;
  showIcon?: boolean;
}

interface HeaderDisplayColumnSelectorElement extends HeaderConfigBase {
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
  selectorButtonType?: React.ComponentProps<DripTableDriver<unknown>['components']['Button']>['type'];
}

export type DripTableHeaderElement =
  | HeaderSpacerElement
  | HeaderTextElement
  | HeaderHTMLElement
  | HeaderSearchElement
  | HeaderAdvanceSearchElement
  | HeaderInsertButtonElement
  | HeaderDisplayColumnSelectorElement;

interface HeaderProps<
  RecordType extends DripTableRecordTypeBase,
  CustomComponentSchema extends DripTableComponentSchema = never,
  CustomComponentEvent extends EventLike = never,
  Ext = unknown,
> {
  tableProps: DripTableProps<RecordType, CustomComponentSchema, CustomComponentEvent, Ext>;
  tableState: IDripTableContext;
  setTableState: IDripTableContext['setTableState'];
}

const Header = <
  RecordType extends DripTableRecordTypeBase,
  CustomComponentSchema extends DripTableComponentSchema = never,
  CustomComponentEvent extends EventLike = never,
  Ext = unknown,
>(props: HeaderProps<RecordType, CustomComponentSchema, CustomComponentEvent, Ext>) => {
  const { tableProps, tableState, setTableState } = props;
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
  const TableAdvanceSearch = tableProps.driver.components.TableAdvanceSearch;
  const elements: DripTableHeaderElement[] = React.useMemo(
    () => {
      if (tableProps.schema.header === true) {
        return [
          { type: 'display-column-selector', span: 8 },
          { type: 'search', span: 8 },
          { type: 'insert-button', span: 4 },
        ];
      }
      if (tableProps.schema.header === false) {
        return [];
      }
      return tableProps.schema.header?.elements || [];
    },
    [tableProps.schema.header],
  );

  const [searchStr, setSearchStr] = React.useState('');
  const [searchKey, setSearchKey] = React.useState<HeaderSearchElement['searchKeyDefaultValue']>(elements.map(s => (s.type === 'search' ? s.searchKeyDefaultValue : '')).find(s => s));

  const renderColumnContent = (config: DripTableHeaderElement) => {
    if (config.type === 'spacer') {
      return null;
    }

    if (config.type === 'text') {
      return <h3 className={styles['header-title']}>{ config.text }</h3>;
    }

    if (config.type === 'html') {
      return <RichText html={config.html} />;
    }

    if (config.type === 'search') {
      return (
        <div style={config.wrapperStyle} className={classnames(styles['search-container'], config.wrapperClassName)}>
          { config.searchKeys && (
            <Select
              defaultValue={config.searchKeyDefaultValue}
              className={styles['search-select']}
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
            onSearch={(value) => { tableProps.onSearch?.({ searchKey, searchStr: value }); }}
          />
        </div>
      );
    }

    if (config.type === 'advance-search') {
      if (TableAdvanceSearch) {
        return (
          <TableAdvanceSearch
            {...config.props}
            driver={tableProps.driver}
            onSearch={(searchParams) => { tableProps.onSearch?.(searchParams); }}
          />
        );
      }
      return <span>未指定 tableProps.driver.components.TableAdvanceSearch 自定义搜索组件</span>;
    }

    if (config.type === 'insert-button') {
      return (
        <Button
          type="primary"
          icon={config.showIcon && <PlusOutlined />}
          style={config.insertButtonStyle}
          className={config.insertButtonClassName}
          onClick={tableProps.onInsertButtonClick}
        >
          { config.insertButtonText }
        </Button>
      );
    }

    if (config.type === 'display-column-selector') {
      const [displayColumnVisible, setDisplayColumnVisible] = React.useState(false);
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
          trigger="click"
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

    return null;
  };

  if (elements.length > 0) {
    const style = typeof tableProps.schema.header === 'object'
      ? tableProps.schema.header.style
      : void 0;
    return (
      <div className={styles['header-container']} style={style}>
        <Row>
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
                  paddingRight: index === elements.length - 1 ? '3px' : '0',
                  ...item.style,
                }}
                span={typeof item.span === 'string' ? void 0 : item.span}
              >
                { item.visible !== false ? renderColumnContent(item) : null }
              </Col>
            ))
          }
        </Row>
      </div>
    );
  }
  return null;
};

export default Header;
