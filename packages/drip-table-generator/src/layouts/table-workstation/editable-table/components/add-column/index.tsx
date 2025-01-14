/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import classNames from 'classnames';
import { DripTableExtraOptions, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, ExtractDripTableExtraOption } from 'drip-table';
import React from 'react';

import { DTGTableConfig } from '@/context/table-configs';
import { DripTableGeneratorProps } from '@/typing';

import ComponentsSelector from '../components-selector';

interface ColumnHeaderListProps<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  tableConfig: DTGTableConfig;
  customComponentPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'];
  customColumnAddPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customColumnAddPanel'];
  onColumnAdded?: DripTableGeneratorProps<RecordType, ExtraOptions>['onColumnAdded'];
}

function AddColumnComponent<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: ColumnHeaderListProps<RecordType, ExtraOptions>) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const DropdownRender = React.useCallback(() => (
    <ComponentsSelector
      open={dropdownOpen}
      tableId={props.tableConfig.tableId}
      showTitle
      showFilter
      customComponentPanel={props.customComponentPanel}
      customColumnAddPanel={props.customColumnAddPanel}
      onClose={() => setDropdownOpen(false)}
      onColumnAdded={props.onColumnAdded}
    />
  ), [
    dropdownOpen,
    props.tableConfig.tableId,
    props.customComponentPanel,
    props.customColumnAddPanel,
    setDropdownOpen,
    props.onColumnAdded,
  ]);

  return (
    <div
      className={classNames('jfe-drip-table-generator-workstation-table-header-add-item', {
        [props.tableConfig.configs.size || 'default']: props.tableConfig.configs.size,
        sticky: props.tableConfig.configs.sticky,
      })}
    >
      <Dropdown
        placement="bottomRight"
        trigger={['click']}
        open={dropdownOpen}
        onOpenChange={(open) => { if (!open) { setDropdownOpen(false); } }}
        dropdownRender={DropdownRender}
      >
        <Button
          icon={<PlusOutlined />}
          size={props.tableConfig.configs.size === 'small' ? props.tableConfig.configs.size : void 0}
          onClick={(e) => {
            e.stopPropagation();
            setDropdownOpen(!dropdownOpen);
          }}
        />
      </Dropdown>
    </div>
  );
}

export default AddColumnComponent;
