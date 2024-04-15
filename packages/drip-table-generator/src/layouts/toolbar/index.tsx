/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { ArrowLeftOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, message, Tooltip } from 'antd';
import { DripTableColumnSchema, DripTableExtraOptions } from 'drip-table';
import React from 'react';

import { GeneratorContext } from '@/context';
import { DTGTableConfig, TableConfigsContext } from '@/context/table-configs';
import { getSchemaValue } from '@/layouts/utils';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

import DataSourceEditor from './components/datasource';
import DropDownButton, { DropDownButtonProps } from './components/dropdown-button';
import ExportSchema from './components/export-schema';
import ImportSchema from './components/import-schema';
import TemplatesManager from './components/templates-manager';

function generateDropdownProps(props: {
  name: string;
  label: string;
  mode?: 'modal' | 'page';
  width?: number;
  height?: number;
}): Omit<DropDownButtonProps, 'children'> {
  return {
    dataIndex: props.name,
    label: props.label,
    width: props.width ?? 1000,
    height: props.height ?? 588,
    mode: props.mode,
  };
}

const ModeSwitch = (props: { style?: React.CSSProperties; disabled?: boolean }) => {
  const { tableConfigs } = React.useContext(TableConfigsContext);
  const hasNullItem = (configs: DTGTableConfig[]) => {
    const hasNullColumn = (columns: (DripTableColumnSchema | null)[]): boolean => {
      for (const column of columns) {
        if (column === null) {
          return true;
        }
        if (column.component === 'group' && column.options?.items && hasNullColumn(column.options.items as (DripTableColumnSchema | null)[])) {
          return true;
        }
      }
      return false;
    };
    for (const config of configs) {
      if (hasNullColumn(config.columns)) {
        return true;
      }
    }
    return false;
  };
  return (
    <GeneratorContext.Consumer>
      { ({ mode, setState }) => (
        <Button
          style={{ marginLeft: 24, borderRadius: '6px', ...props.style }}
          onClick={() => {
            if (hasNullItem(tableConfigs)) {
              message.warning('组合组件的子组件未设置完成，请设置完成后预览');
              return;
            }
            setState({ mode: mode === 'edit' ? 'preview' : 'edit', drawerType: void 0 });
          }}
          disabled={props.disabled}
        >
          { mode === 'edit' ? '预览' : '编辑' }
        </Button>
      ) }
    </GeneratorContext.Consumer>
  );
};

const Toolbar = <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions>) => {
  const { drawerType, setState } = React.useContext(GeneratorContext);
  const [operateMenu, setOperateMenu] = React.useState(void 0 as string | undefined);
  const onOpen = (isOpen: boolean, key: string) => {
    setOperateMenu(isOpen ? key : void 0);
  };

  React.useEffect(() => {
    if (operateMenu && drawerType) {
      setState({ drawerType: void 0 });
    }
  }, [operateMenu]);

  const bodyHeight = (props.height ?? 640) - 52;

  return (
    <TableConfigsContext.Consumer>
      { ({ tableConfigs, updateTableConfigs }) => (
        <div className="jfe-drip-table-generator-templates-toolbar wrapper">
          <div
            className="jfe-drip-table-generator-templates-toolbar left"
            style={{ width: `calc(100% - ${props.save && props.savePosition === 'right' && props.mode === 'modal' ? 64 : 32}px)` }}
            onClick={() => {
              if (operateMenu) { setOperateMenu(void 0); }
            }}
          >
            { props.save && props.savePosition !== 'right' && !operateMenu && (
              <Tooltip title="保存表格" placement="bottom">
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  shape="circle"
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onSave?.(getSchemaValue(tableConfigs));
                  }}
                  disabled={!!operateMenu && operateMenu !== 'export'}
                />
              </Tooltip>
            ) }
            { operateMenu
              ? (
                <Tooltip title="退出当前操作" placement="bottom">
                  <Button icon={<ArrowLeftOutlined />} shape="circle" onClick={() => setOperateMenu(void 0)} />
                </Tooltip>
              )
              : (<div style={props.save && props.savePosition !== 'right' ? void 0 : { width: 32, height: 32 }} />) }
            { Array.isArray(props.showToolbar) && !props.showToolbar.includes('template')
              ? null
              : (
                <DropDownButton
                  {...generateDropdownProps({ name: 'template', label: '模版', mode: props.mode, width: props.width, height: bodyHeight })}
                  open={operateMenu === 'template'}
                  style={{ marginLeft: 24 }}
                  onOpen={onOpen}
                >
                  <TemplatesManager
                    dataFields={props.dataFields}
                    mockDataSource={props.mockDataSource}
                    customComponentPanel={props.customComponentPanel}
                    customTemplates={props.customTemplates}
                    onOk={() => setOperateMenu(void 0)}
                  />
                </DropDownButton>
              ) }
            { Array.isArray(props.showToolbar) && !props.showToolbar.includes('datasource')
              ? null
              : (
                <DropDownButton
                  {...generateDropdownProps({ name: 'datasource', label: '数据源', mode: props.mode, width: props.width, height: bodyHeight })}
                  open={operateMenu === 'datasource'}
                  onOpen={onOpen}
                  style={{ marginLeft: 24 }}
                  innerStyle={{ padding: 0, background: '#1e1e1e' }}
                >
                  <DataSourceEditor
                    width={props.width ?? 1000}
                    height={bodyHeight - 8}
                    onDataSourceChange={dataSource => props.onDataSourceChange?.(dataSource as RecordType[])}
                  />
                </DropDownButton>
              ) }
            { Array.isArray(props.showToolbar) && !props.showToolbar.includes('import')
              ? null
              : (
                <DropDownButton
                  {...generateDropdownProps({ name: 'import', label: '配置导入', mode: props.mode, width: props.width, height: bodyHeight })}
                  open={operateMenu === 'import'}
                  onOpen={onOpen}
                  style={{ marginLeft: 24 }}
                  innerStyle={{ padding: '0 0 8px 0' }}
                >
                  <ImportSchema height={bodyHeight - 8 - 40} />
                </DropDownButton>
              ) }
            { Array.isArray(props.showToolbar) && !props.showToolbar.includes('export')
              ? null
              : (
                <DropDownButton
                  {...generateDropdownProps({ name: 'export', label: '配置编辑', mode: props.mode, width: props.width, height: bodyHeight })}
                  open={operateMenu === 'export'}
                  onOpen={onOpen}
                  style={{ marginLeft: 24 }}
                  innerStyle={{ padding: '0 0 8px 0' }}
                >
                  <ExportSchema
                    height={bodyHeight - 8 - 40}
                    mode={props.mode}
                  />
                </DropDownButton>
              ) }
            { Array.isArray(props.showToolbar) && !props.showToolbar.includes('preview')
              ? null
              : (<ModeSwitch disabled={operateMenu ? true : void 0} />) }
          </div>
          <div
            className="jfe-drip-table-generator-templates-toolbar right"
            style={{ width: props.save && props.savePosition === 'right' && props.mode === 'modal' ? 64 : 32 }}
          >
            { props.save && props.savePosition === 'right' && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                props.onSave?.(getSchemaValue(tableConfigs));
              }}
              type="text"
              shape="default"
              icon={<SaveOutlined />}
              disabled={!!operateMenu && operateMenu !== 'export'}
            />
            ) }
            { props.mode === 'modal' && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  props.onClose?.(getSchemaValue(tableConfigs));
                }}
                className="jfe-drip-table-generator-templates-close"
                type="text"
                icon={<CloseOutlined />}
              />
            ) }
          </div>
        </div>
      ) }
    </TableConfigsContext.Consumer>
  );
};

export default Toolbar;
