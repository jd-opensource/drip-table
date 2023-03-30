/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Image } from 'antd';
import classNames from 'classnames';
import { DripTableExtraOptions, DripTableSchema } from 'drip-table';
import React from 'react';

import { GeneratorContext } from '@/context';
import { generateTableConfigsBySchema } from '@/layouts/utils';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

import DataSourceEditor from './components/datasource';
import DropDownButton, { DropDownButtonProps } from './components/dropdown-button';
import ExportSchema from './components/export-schema';
import ImportSchema from './components/import-schema';
import { DTGBuiltInTemplates } from './templates';

function generateDropdownProps(name: string, label: string): Omit<DropDownButtonProps, 'children'> {
  return {
    dataIndex: name,
    label,
    width: 1000,
    height: 598,
  };
}

const Toolbar = <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions>) => {
  const [defaultTemplate, setTemplate] = React.useState('basic-template');
  const [operateMenu, setOperateMenu] = React.useState(void 0 as string | undefined);
  const onOpen = (isOpen: boolean, key: string) => {
    setOperateMenu(isOpen ? key : void 0);
  };
  return (
    <GeneratorContext.Consumer>
      { ({ updateTableConfigs }) => (
        <div className="jfe-drip-table-generator-templates-toolbar" style={{ padding: 10 }}>
          <div className="jfe-drip-table-generator-templates-toolbar left">
            <DropDownButton {...generateDropdownProps('template', '模版')} open={operateMenu === 'template'} onOpen={onOpen} left={-10}>
              <div className="jfe-drip-table-generator-templates-container">
                { DTGBuiltInTemplates.map((iTemplate, key) => (
                  <div
                    className={classNames('jfe-drip-table-generator-templates-wrapper', { checked: iTemplate.key === defaultTemplate })}
                    key={key}
                    onClick={() => {
                      setTemplate(iTemplate.key);
                      const newTableConfigs = generateTableConfigsBySchema(iTemplate.schema as DripTableSchema);
                      updateTableConfigs(newTableConfigs);
                    }}
                  >
                    { iTemplate.key === defaultTemplate && (
                    <div className="jfe-drip-table-generator-templates-wrapper-corner">
                      <CheckOutlined style={{ color: '#ffffff', marginRight: '2px' }} />
                    </div>
                    ) }
                    <div><Image width={112} height={112} src={iTemplate.previewImg} preview={false} /></div>
                    <div><span>{ iTemplate.label }</span></div>
                  </div>
                )) }
              </div>
            </DropDownButton>
            <DropDownButton
              {...generateDropdownProps('datasource', '数据源')}
              open={operateMenu === 'datasource'}
              onOpen={onOpen}
              left={-98}
              style={{ marginLeft: 24 }}
              innerStyle={{ padding: 0, background: '#1e1e1e' }}
            >
              <DataSourceEditor
                width={1000}
                height={598 - 8}
                onDataSourceChange={dataSource => props.onDataSourceChange?.(dataSource as RecordType[])}
              />
            </DropDownButton>
            <DropDownButton
              {...generateDropdownProps('import', '表格导入')}
              open={operateMenu === 'import'}
              onOpen={onOpen}
              left={-196}
              style={{ marginLeft: 24 }}
              innerStyle={{ padding: '0 0 8px 0' }}
            >
              <ImportSchema height={598 - 8 - 40} />
            </DropDownButton>
            <DropDownButton
              {...generateDropdownProps('export', '配置编辑')}
              open={operateMenu === 'export'}
              onOpen={onOpen}
              left={-308}
              style={{ marginLeft: 24 }}
              innerStyle={{ padding: '0 0 8px 0' }}
            >
              <ExportSchema height={598 - 8 - 40} />
            </DropDownButton>
          </div>
          <div className="jfe-drip-table-generator-templates-toolbar right">
            <Button className="jfe-drip-table-generator-templates-close" type="text" icon={<CloseOutlined />} />
          </div>
        </div>
      ) }
    </GeneratorContext.Consumer>
  );
};

export default Toolbar;
