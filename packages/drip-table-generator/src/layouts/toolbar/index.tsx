/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import './index.less';

import { CheckSquareOutlined,
  DatabaseOutlined,
  ExpandOutlined,
  FilterOutlined,
  FontSizeOutlined,
  InsertRowAboveOutlined,
  MenuOutlined,
  SettingOutlined,
  SortAscendingOutlined,
  ThunderboltOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import { DripTableExtraOptions, DripTableSchema } from 'drip-table';
import React from 'react';
import Clipboard from 'react-clipboard.js';
import MonacoEditor from 'react-monaco-editor';

import { filterAttributes, mockId } from '@/utils';
import { DripTableGeneratorContext, GeneratorContext } from '@/context';
import { DataSourceTypeAbbr, DripTableGeneratorProps, NonColumnsPartialDTSchemaTypeAbbr } from '@/typing';

import { getSchemaValue } from '../utils';
import { DropDownInput } from './components/dropdown-input';
import { DropDownRadio } from './components/dropdown-radio';
import { SwitchButton } from './components/switch';
import { builtInThemes } from './config';

export type ToolBarConfig = {
  icon: React.ReactNode;
  label: string;
  name: string;
  type?: 'switch' | 'dropdown';
  overlay?: 'radio' | React.ReactElement;
  options?: { label: string; value: string | number }[];
  default?: unknown;
};

interface ToolbarProps<
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> extends DripTableGeneratorProps<RecordType, ExtraOptions> {
  style?: React.CSSProperties;
  onExportSchema?: DripTableGeneratorProps<RecordType, ExtraOptions>['onExportSchema'];
}

const Toolbar = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: ToolbarProps<RecordType, ExtraOptions>) => {
  const [modalStatus, setModalStatus] = React.useState('');
  const [code, setCode] = React.useState('');
  const [theme, setTheme] = React.useState(props.defaultTheme);
  const context = React.useContext(GeneratorContext);

  const themeOptions = React.useMemo(() => {
    const themeList = builtInThemes<RecordType, ExtraOptions>() || [];
    return [...themeList, ...props.customThemeOptions || []];
  }, [props.customThemeOptions]);

  /**
   * 渲染一个Modal用来展示JSON Schema配置
   * @returns {JSX.Element} 返回React组件
   */
  const renderSchemaModal = () => {
    if (modalStatus !== 'export' && modalStatus !== 'import') {
      return null;
    }

    const defaultValue = modalStatus === 'export'
      ? JSON.stringify(getSchemaValue(context), null, 4)
      : code || '';
    return (
      <MonacoEditor
        width="100%"
        height="500px"
        language="json"
        theme="vs-dark"
        value={modalStatus === 'export' && !code ? defaultValue : code}
        onChange={(value) => {
          setCode(value);
        }}
      />
    );
  };

  return (
    <GeneratorContext.Consumer>
      { ({ currentTableID, tableConfigs, columns, drawerType, globalConfigs, mode, setState }) => {
        const currentTableIndex = tableConfigs.findIndex(item => item.tableId === currentTableID);
        const tableConfig = currentTableIndex > -1 ? tableConfigs[currentTableIndex].configs : void 0;
        return (
          <div className="jfe-drip-table-generator-toolbar-toolbar-container" style={props.style}>
            <div className="jfe-drip-table-generator-toolbar-toolbar-container-leftbar">
              <DropDownRadio
                icon={<ThunderboltOutlined className="jfe-drip-table-generator-toolbar-tool-icon" />}
                label="主题"
                overlayType="image-radio"
                options={themeOptions.map(item => ({ label: item.label, image: item.image, value: item.value }))}
                value={theme}
                onChange={(value) => {
                  setTheme(value || '');
                  const theTheme = themeOptions.find(item => item.value === value);
                  const themeStyle = typeof theTheme?.style === 'function' ? theTheme.style(globalConfigs as NonColumnsPartialDTSchemaTypeAbbr<ExtraOptions>) : theTheme?.style;
                  setState({
                    globalConfigs: Object.assign({}, globalConfigs, themeStyle),
                    columns: (columns as DripTableSchema<NonNullable<ExtraOptions['CustomColumnSchema']>>['columns']).map((column, index) => ({ ...column, ...theTheme?.columnStyle?.(column, index) })) as DripTableGeneratorContext['columns'],
                  });
                }}
              />
              <SwitchButton name="sticky" icon={<InsertRowAboveOutlined className="jfe-drip-table-generator-toolbar-tool-icon" />} label="冻结表头" />
              <DropDownInput
                name="dataSourceKey"
                value={tableConfigs[currentTableIndex + 1]?.dataSourceKey}
                checked={() => tableConfigs[currentTableIndex].subtable}
                icon={<ExpandOutlined className="jfe-drip-table-generator-toolbar-tool-icon" />}
                label="行可扩展"
                overlayLabel="子表格数据字段"
                message="确保列表第一条数据有子列表，否则无法提现很好的展示效果甚至无法配置"
                onChange={(value) => {
                  if (!tableConfig || !currentTableID) { return; }
                  const newTableConfigs = [...tableConfigs];
                  newTableConfigs[currentTableIndex] = Object.assign({}, tableConfigs[currentTableIndex], { subtable: !!value });
                  if (value) {
                    const newConfig: DripTableGeneratorContext['tableConfigs'][number] = {
                      tableId: mockId(),
                      columns: [],
                      configs: { pagination: false },
                      subtable: false,
                      dataSourceKey: value,
                    };
                    newTableConfigs[currentTableIndex + 1] = newConfig;
                    setState({ tableConfigs: newTableConfigs });
                  } else if (currentTableIndex < tableConfigs.length - 1) {
                    newTableConfigs.splice(currentTableIndex + 1, 1);
                    setState({ tableConfigs: newTableConfigs, currentTableID: newTableConfigs[0].tableId });
                  }
                }}
              />
              <SwitchButton name="rowSelection" icon={<CheckSquareOutlined className="jfe-drip-table-generator-toolbar-tool-icon" />} label="行可选择" />
              <SwitchButton name="stripe" icon={<MenuOutlined className="jfe-drip-table-generator-toolbar-tool-icon" />} label="间隔斑马纹" />
              <DropDownRadio
                name="size"
                default="middle"
                icon={<FontSizeOutlined className="jfe-drip-table-generator-toolbar-tool-icon" />}
                label="尺寸"
                overlayType="radio"
                options={[
                  { label: '大号', value: 'large' },
                  { label: '中等', value: 'middle' },
                  { label: '小号', value: 'small' },
                ]}
              />
              <SwitchButton name="virtual" icon={<DatabaseOutlined className="jfe-drip-table-generator-toolbar-tool-icon" />} label="虚拟列表" />
              <SwitchButton name="filter" icon={<FilterOutlined className="jfe-drip-table-generator-toolbar-tool-icon" />} label="过滤" onCheck={() => message.info('🚧 施工中，敬请期待~')} />
              <SwitchButton name="sort" icon={<SortAscendingOutlined className="jfe-drip-table-generator-toolbar-tool-icon" />} label="排序" onCheck={() => message.info('🚧 施工中，敬请期待~')} />
            </div>
            <div className="jfe-drip-table-generator-toolbar-toolbar-container-rightbar">
              <Button style={{ marginRight: '4px' }} size="small" type="primary" onClick={() => setState({ drawerType: drawerType === 'global' ? void 0 : 'global' })} icon={<SettingOutlined />}>表格设置</Button>
              <Button style={{ marginRight: '4px' }} size="small" type="primary" onClick={() => setState({ drawerType: drawerType === 'datasource' ? void 0 : 'datasource' })} icon={<DatabaseOutlined />}>表格数据</Button>
              <Button style={{ marginRight: '4px' }} size="small" type="primary" onClick={() => setState({ mode: mode === 'edit' ? 'preview' : 'edit' })}>{ mode === 'edit' ? '预览' : '编辑' }</Button>
              <Button style={{ marginRight: '4px' }} size="small" onClick={() => setModalStatus('import')}>导入配置</Button>
              <Button style={{ marginRight: '4px' }} size="small" onClick={() => setModalStatus('export')}>导出配置</Button>
            </div>
            <Modal
              width={720}
              title={modalStatus === 'export' ? '导出数据' : '导入数据'}
              visible={modalStatus === 'export' || modalStatus === 'import'}
              footer={
              modalStatus === 'export'
                ? [ // 导出复制
                  <Button onClick={() => setModalStatus('')}>确认</Button>,
                  <Button onClick={() => {
                    let hasError = false;
                    try {
                      const json = JSON.parse(code);
                      const globalConfigsToImport = filterAttributes(json, ['columns']);
                      const columnsToImport = json.columns?.map((item, index) => ({ key: `${item.component}_${mockId()}`, index, ...item })) as DripTableGeneratorContext['columns'];
                      setState({
                        globalConfigs: globalConfigsToImport,
                        columns: columnsToImport,
                      });
                    } catch {
                      hasError = true;
                      message.error('解析出错, 请编辑正确的格式');
                    } finally {
                      if (!hasError) {
                        message.success('配置编辑成功');
                      }
                    }
                  }}
                  >
                    确认编辑
                  </Button>,
                  <Clipboard
                    style={{ marginLeft: '8px' }}
                    component="span"
                    option-text={() => JSON.stringify(getSchemaValue(context))}
                    onSuccess={() => {
                      props.onExportSchema?.(getSchemaValue(context));
                      message.success('复制成功');
                      setModalStatus('');
                      setCode('');
                    }}
                    onError={(e) => {
                      message.error('复制失败：您的浏览器不支持复制。');
                    }}
                  >
                    <Button type="primary">复制文本</Button>
                  </Clipboard>,
                ]
                : [ // 导入解析
                  <Button onClick={() => setModalStatus('')}>取消</Button>,
                  <Button onClick={() => {
                    try {
                      const inputCode = JSON.parse(code);
                      const formattedCode = JSON.stringify(inputCode, null, 4);
                      setCode(formattedCode);
                    } catch {
                      message.error('解析出错, 请输入正确的JSON数据');
                    }
                  }}
                  >
                    格式化
                  </Button>,
                  <Button
                    type="primary"
                    onClick={() => {
                      const value = (code || '').trim();
                      let hasError = false;
                      try {
                        const json = JSON.parse(value);
                        const globalConfigsToImport = filterAttributes(json, ['columns']);
                        const columnsToImport = json.columns?.map((item, index) => ({ key: `${item.component}_${mockId()}`, index, ...item })) as DripTableGeneratorContext['columns'];
                        setState({
                          globalConfigs: globalConfigsToImport,
                          columns: columnsToImport,
                          currentColumn: void 0,
                          currentColumnPath: void 0,
                        });
                      } catch {
                        hasError = true;
                        message.error('解析出错, 请传入正确的格式');
                      } finally {
                        if (!hasError) {
                          message.success('数据导入成功');
                        }
                        setModalStatus('');
                        setCode('');
                      }
                    }}
                  >
                    确认导入
                  </Button>,
                ]
            }
              onCancel={() => { setModalStatus(''); setCode(''); }}
            >
              { renderSchemaModal() }
            </Modal>
          </div>
        );
      } }
    </GeneratorContext.Consumer>
  );
};

export default Toolbar;
