/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import classnames from 'classnames';
import React, { CSSProperties } from 'react';

import { type DripTableRecordTypeBase, type EventLike } from '@/types';
import RichText from '@/components/RichText';
import { type DripTableProps } from '@/index';

import styles from './index.module.css';

type ConfigBase = {
  /**
   * 跨度；取值 0-24
   */
  span?: number | 'auto';
  /**
   * 宽度；如果是string，可以是px也可以是%
   */
  width?: number | string;
  /**
   * 对齐方式
   * flex-start: 左对齐; center: 居中; flex-end: 右对齐; space-between: 两端对齐; space-around: 等间对齐;
   */
  align?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  /**
   * 是否可见
   */
  visible?: boolean;
  /**
   * 列样式
   */
  columnStyle?: CSSProperties;
};

interface TitleConfig extends ConfigBase {
  type: 'title';
  title: string;
  html?: boolean;
}

interface SearchConfig extends ConfigBase {
  type: 'search';
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  allowClear?: boolean;
  searchButtonText?: string;
  size?: 'large' | 'middle' | 'small';
  searchKeys?: { label: string; value: number | string }[];
  searchKeyDefaultValue?: number | string;
  props?: Record<string, unknown>;
}

interface InsertButtonConfig extends ConfigBase {
  type: 'insert-button';
  className?: string;
  style?: React.CSSProperties;
  text?: string;
  showIcon?: boolean;
}

export type DripTableHeaderElement =
  | TitleConfig
  | SearchConfig
  | InsertButtonConfig;

interface HeaderProps<RecordType extends DripTableRecordTypeBase, CustomComponentEvent extends EventLike = never, Ext = unknown> {
  tableProps: DripTableProps<RecordType, CustomComponentEvent, Ext>;
}

const Header = <
  RecordType extends DripTableRecordTypeBase,
  CustomComponentEvent extends EventLike = never,
  Ext = unknown,
>(props: HeaderProps<RecordType, CustomComponentEvent, Ext>) => {
  const tableProps = props.tableProps;
  const Button = tableProps.driver.components.Button;
  const Col = tableProps.driver.components.Col;
  const Input = tableProps.driver.components.Input;
  const PlusOutlined = tableProps.driver.icons.PlusOutlined;
  const Row = tableProps.driver.components.Row;
  const Select = tableProps.driver.components.Select;
  const TableSearch = tableProps.driver.components.TableSearch;
  const elements: DripTableHeaderElement[] = React.useMemo(
    () => {
      if (tableProps.schema.configs.header === true) {
        return [
          { type: 'search', span: 8 },
          { type: 'insert-button', span: 4 },
        ];
      }
      if (tableProps.schema.configs.header === false) {
        return [];
      }
      return tableProps.schema.configs.header?.elements || [];
    },
    [tableProps.schema.configs.header],
  );

  const [searchStr, setSearchStr] = React.useState('');
  const [searchKey, setSearchKey] = React.useState<SearchConfig['searchKeyDefaultValue']>(elements.map(s => (s.type === 'search' ? s.searchKeyDefaultValue : '')).find(s => s));

  const renderColumnContent = (config: DripTableHeaderElement) => {
    if (config.type === 'title') {
      return config.html
        ? <RichText html={config.title} />
        : <h3 className={styles['header-title']}>{ config.title }</h3>;
    }

    if (config.type === 'search') {
      if (TableSearch) {
        return (
          <TableSearch
            {...config.props}
            driver={tableProps.driver}
            onSearch={(searchParams) => { tableProps.onSearch?.(searchParams); }}
          />
        );
      }

      return (
        <div style={config.style} className={classnames(styles['search-container'], config.className)}>
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
            size={config.size}
            value={searchStr}
            onChange={e => setSearchStr(e.target.value.trim())}
            onSearch={(value) => { tableProps.onSearch?.({ searchKey, searchStr: value }); }}
          />
        </div>
      );
    }

    if (config.type === 'insert-button') {
      return (
        <Button
          type="primary"
          icon={config.showIcon && <PlusOutlined />}
          style={config.style}
          className={config.className}
          onClick={tableProps.onInsertButtonClick}
        >
          { config.text }
        </Button>
      );
    }

    return null;
  };

  if (elements.length > 0) {
    const style = typeof tableProps.schema.configs.header === 'object'
      ? tableProps.schema.configs.header.style
      : void 0;
    return (
      <div className={styles['header-container']} style={style}>
        <Row>
          {
            elements.map((item, index) => (
              <Col
                key={index}
                style={{
                  width: item.width,
                  display: 'flex',
                  flex: item.span === 'auto' ? '1 1 auto' : void 0,
                  justifyContent: item.align || 'center',
                  ...item.columnStyle,
                }}
                span={item.span === 'auto' ? void 0 : item.span}
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
