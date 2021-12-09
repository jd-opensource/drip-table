/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import React, { useState } from 'react';

import { DripTableDriver, DripTableRecordTypeBase } from '@/types';
import { DripTableProps } from '@/index';
import RichText from '@/components/RichText';

import styles from './index.module.css';

type Config = {
  type: 'title' | 'search' | 'addButton' | 'null';
  /**
   * 跨度；取值 0-24
   */
  span: number;
  /**
   * 宽度；如果是string，可以是px也可以是%
   */
  width?: number | string;
  position: 'topLeft' | 'topCenter' | 'topRight';
};

interface TitleConfig extends Config {
  type: 'title';
  title: string;
  html?: boolean;
}

interface SearchConfig extends Config {
  type: 'search';
  placeholder?: string;
  allowClear?: boolean;
  searchBtnText?: string;
  searchStyle?: React.CSSProperties;
  searchClassName?: string;
  size?: 'large' | 'middle' | 'small';
  searchKeys?: { label: string; value: number | string }[];
  searchKeyValue?: number | string;
  props?: Record<string, unknown>;
}

interface AddButtonConfig extends Config {
  type: 'addButton';
  showIcon?: boolean;
  addBtnText?: string;
  addBtnStyle?: React.CSSProperties;
  addBtnClassName?: string;
}

interface NullConfig extends Config {
  type: 'null';
}

export interface DripTableHeaderProps<RecordType extends DripTableRecordTypeBase> {
  driver: DripTableDriver<RecordType>;
  title?: TitleConfig | NullConfig;
  search?: SearchConfig | NullConfig;
  addButton?: AddButtonConfig | NullConfig;
  onSearch?: DripTableProps<RecordType>['onSearch'];
  onAddButtonClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const Header = <RecordType extends DripTableRecordTypeBase>(props: DripTableHeaderProps<RecordType>) => {
  const Button = props.driver.components.Button;
  const Col = props.driver.components.Col;
  const Input = props.driver.components.Input;
  const PlusOutlined = props.driver.icons.PlusOutlined;
  const Row = props.driver.components.Row;
  const Select = props.driver.components.Select;
  const TableSearch = props.driver.components.TableSearch;

  const [searchStr, setSearchStr] = useState('');
  const [searchKey, setSearchKey] = useState<SearchConfig['searchKeyValue']>(void 0);

  if (!props.title && !props.search && !props.addButton) {
    return null;
  }

  const renderColumnContent = (config: TitleConfig | AddButtonConfig | SearchConfig | NullConfig) => {
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
            driver={props.driver}
            onSearch={(searchParams) => { props.onSearch?.(searchParams); }}
          />
        );
      }
      return (
        <div style={config.searchStyle} className={`${styles['search-container']} ${config.searchClassName}`}>
          { config.searchKeys && (
            <Select
              defaultValue={config.searchKeyValue}
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
            enterButton={config.searchBtnText || true}
            size={config.size}
            value={searchStr}
            onChange={e => setSearchStr(e.target.value.trim())}
            onSearch={(value) => { props.onSearch?.({ key: searchKey, value }); }}
          />
        </div>
      );
    }
    if (config.type === 'addButton') {
      return (
        <Button
          type="primary"
          icon={config.showIcon && <PlusOutlined />}
          style={config.addBtnStyle}
          className={config.addBtnClassName}
          onClick={props.onAddButtonClick}
        >
          { config.addBtnText }
        </Button>
      );
    }
    return null;
  };

  const renderColumn = (position: 'topLeft' | 'topCenter' | 'topRight') => {
    const config = [props.title, props.search, props.addButton].find(item => item && item.position === position);
    if (!config) {
      return <Col span={0} />;
    }
    const span = config.span || 8;
    return (
      <Col span={span} style={{ width: config.width }}>
        { renderColumnContent(config) }
      </Col>
    );
  };

  return (
    <div className={styles['header-container']}>
      <Row>
        { renderColumn('topLeft') }
        { renderColumn('topCenter') }
        { renderColumn('topRight') }
      </Row>
    </div>
  );
};

export default Header;
