/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import './index.less';

import { CheckOutlined, ExclamationCircleFilled, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Col, Image, Input, Modal, Row, Select } from 'antd';
import classNames from 'classnames';
import { DripTableExtraOptions, DripTableSchema } from 'drip-table';
import React from 'react';

import { filterAttributes, mockId } from '@/utils';
import Icon from '@/components/Icon';
import { GeneratorContext } from '@/context';
import { DTGTableConfig, TableConfigsContext } from '@/context/table-configs';
import { defaultComponentIcon } from '@/layouts/table-workstation/editable-table/components/components-selector/configs';
import { generateTableConfigsBySchema, getComponentsConfigs } from '@/layouts/utils';
import { DataSourceTypeAbbr, DripTableComponentAttrConfig, DripTableGeneratorProps } from '@/typing';

import { DTGBuiltInTemplates } from '../../templates';

export interface TemplatesManagerProps<
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  customComponentPanel: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'];
  mockDataSource: DripTableGeneratorProps<RecordType, ExtraOptions>['mockDataSource'];
  dataFields: DripTableGeneratorProps<RecordType, ExtraOptions>['dataFields'];
  customTemplates: DripTableGeneratorProps<RecordType, ExtraOptions>['customTemplates'];
  onOk: () => void;
}

function getTitleOfColumn(columnConfigs: DripTableSchema['columns'][number]) {
  if (typeof columnConfigs?.title === 'string') {
    return columnConfigs.title;
  } if (typeof columnConfigs?.title?.body === 'string') {
    return columnConfigs?.title?.body;
  } if (typeof columnConfigs?.title?.body === 'object') {
    return columnConfigs?.title?.body.content;
  }
  return '';
}

const getColumnSchemaByComponent = (component: DripTableComponentAttrConfig, title: string) => {
  const options: Record<string, unknown> = {};
  const additionalProps = {};
  component?.attrSchema.forEach((schema) => {
    if (schema.name.startsWith('options.')) {
      options[schema.name.replace('options.', '')] = schema.default;
    } else if (schema.name.startsWith('ui:props.')) {
      options[schema.name.replace('ui:props.', '')] = schema.default;
    } else if (!schema.name.startsWith('style') && !schema.name.startsWith('titleStyle')) {
      additionalProps[schema.name] = schema.default;
    }
  });
  if (component['ui:type'] === 'group') {
    options.items = [null, null];
  }
  if (component['ui:type'] === 'icon') {
    options.icon = 'HomeOutlined';
  }
  const columnSchema: DTGTableConfig['columns'][number] = {
    ...filterAttributes(additionalProps, ['dataIndexMode', 'title']),
    key: `${component['ui:type']}_${mockId()}`,
    dataIndex: '',
    title: title ?? component.title,
    width: void 0,
    component: component['ui:type'] as 'text',
    options,
  };
  return columnSchema;
};

const TemplatesManager = <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: TemplatesManagerProps<RecordType, ExtraOptions>) => {
  const { previewDataSource } = React.useContext(GeneratorContext);
  const [currentTemplate, setCurrentTemplate] = React.useState('');
  const [currentStep, setCurrentStep] = React.useState(0);
  const [schemaToAdd, setSchemaToAdd] = React.useState(void 0 as DripTableSchema | undefined);
  const [components, setComponents] = React.useState(getComponentsConfigs('', props.customComponentPanel));

  const templates = React.useMemo(() => {
    const allTemplates = [...DTGBuiltInTemplates];
    (props.customTemplates || []).forEach((template) => {
      const index = allTemplates.findIndex(t => t.key === template.key);
      allTemplates.push({
        ...template,
        key: index < 0 ? template.key : mockId(),
      });
    });
    return allTemplates;
  }, props.customTemplates);

  const initStep2State = () => {
    setComponents(getComponentsConfigs('', props.customComponentPanel));
    setSchemaToAdd(void 0);
    setCurrentTemplate('');
  };

  const updateColumnTitle = (title: string, index: number) => {
    if (schemaToAdd) {
      const columnConfig = schemaToAdd.columns[index];
      if (typeof columnConfig?.title === 'string') {
        columnConfig.title = title;
      } else if (typeof columnConfig?.title?.body === 'string') {
        columnConfig.title.body = title;
      } else if (typeof columnConfig?.title?.body === 'object') {
        columnConfig.title.body.content = title;
      }
      const columns = [...schemaToAdd.columns];
      columns[index] = columnConfig;
      setSchemaToAdd({ ...schemaToAdd, columns });
    }
  };

  const updateColumnDataIndex = (dataIndex: string, index: number) => {
    if (schemaToAdd) {
      const columnConfig = schemaToAdd.columns[index];
      columnConfig.dataIndex = dataIndex;
      const columns = [...schemaToAdd.columns];
      columns[index] = columnConfig;
      setSchemaToAdd({ ...schemaToAdd, columns });
    }
  };

  const updateColumnSchema = (column: DripTableSchema['columns'][number], index: number) => {
    if (schemaToAdd) {
      const columns = [...schemaToAdd.columns];
      columns[index] = column;
      setSchemaToAdd({ ...schemaToAdd, columns });
    }
  };

  const dataIndexOptions = () => (props.mockDataSource
    ? Object.keys(previewDataSource[0] || {}).map(key => ({ label: key, value: key }))
    : props.dataFields?.map(key => ({ label: key, value: key })) || []);

  return (
    <div className="jfe-drip-table-generator-templates-manager">
      { currentStep === 0 && (
        <div className="jfe-drip-table-generator-templates-container">
          { templates.map((iTemplate, key) => (
            <div
              className={classNames('jfe-drip-table-generator-templates-wrapper', { checked: iTemplate.key === currentTemplate })}
              key={key}
              onClick={() => {
                setCurrentTemplate(iTemplate.key);
                setSchemaToAdd(iTemplate.schema as DripTableSchema);
              }}
            >
              { iTemplate.key === currentTemplate && (
              <div className="jfe-drip-table-generator-templates-wrapper-corner">
                <CheckOutlined style={{ color: '#ffffff', marginRight: '2px' }} />
              </div>
              ) }
              <div><Image width={112} height={112} src={iTemplate.previewImg} preview={false} /></div>
              <div><span>{ iTemplate.label }</span></div>
            </div>
          )) }
        </div>
      ) }
      { currentStep === 1 && (
        <div>
          <Row>
            <Col className="jfe-drip-table-generator-templates-table-header" span={2}>序号</Col>
            <Col className="jfe-drip-table-generator-templates-table-header" span={6}>列名称</Col>
            <Col className="jfe-drip-table-generator-templates-table-header" span={4}>组件名称</Col>
            <Col className="jfe-drip-table-generator-templates-table-header" span={5}>字段选择</Col>
            <Col className="jfe-drip-table-generator-templates-table-header">操作</Col>
          </Row>
          { schemaToAdd?.columns.map((iColumn, key) => (
            <Row key={key}>
              <Col span={2} className="jfe-drip-table-generator-templates-cell-index"><span>{ key + 1 }</span></Col>
              <Col span={6} className="jfe-drip-table-generator-templates-cell">
                <Input value={getTitleOfColumn(iColumn)} onChange={e => updateColumnTitle(e.target.value, key)} />
              </Col>
              <Col span={4} className="jfe-drip-table-generator-templates-cell">
                <Select
                  style={{ width: 160 }}
                  value={iColumn.component}
                  onChange={(value) => {
                    const component = components.find(i => i['ui:type'] === value);
                    if (component) {
                      const schema = getColumnSchemaByComponent(component, getTitleOfColumn(iColumn));
                      updateColumnSchema(schema as DripTableSchema['columns'][number], key);
                    }
                  }}
                >
                  { components.map((component, componentKey) => (
                    <Select.Option key={componentKey} value={component['ui:type']}>
                      <Icon className="jfe-drip-table-generator-components-bar-component-icon" svg={component.icon || defaultComponentIcon} />
                      <span className="jfe-drip-table-generator-components-bar-component-text">{ component.title }</span>
                    </Select.Option>
                  )) }
                </Select>
              </Col>
              <Col span={5} className="jfe-drip-table-generator-templates-cell">
                <AutoComplete style={{ width: 200 }} value={iColumn.dataIndex} options={dataIndexOptions()} onChange={value => updateColumnDataIndex(String(value), key)} />
              </Col>
              <Col className="jfe-drip-table-generator-templates-cell">
                <Button
                  icon={<PlusCircleOutlined />}
                  onClick={() => {
                    const columns = [...schemaToAdd.columns];
                    const component = components.find(i => i['ui:type'] === 'text');
                    if (component) {
                      const column = getColumnSchemaByComponent(component, '');
                      columns.splice(key + 1, 0, column as DripTableSchema['columns'][number]);
                    }
                    setSchemaToAdd({ ...schemaToAdd, columns });
                  }}
                />
                <Button
                  disabled={schemaToAdd.columns.length <= 1}
                  icon={<MinusCircleOutlined />}
                  onClick={() => {
                    const columns = [...schemaToAdd.columns];
                    columns.splice(key, 1);
                    setSchemaToAdd({ ...schemaToAdd, columns });
                  }}
                />
              </Col>
            </Row>
          )) }
          { (schemaToAdd && (schemaToAdd?.columns?.length || 0) <= 0) && (
            <Button
              icon={<PlusCircleOutlined />}
              onClick={() => {
                const columns = [...schemaToAdd.columns];
                const component = components.find(i => i['ui:type'] === 'text');
                if (component) {
                  const column = getColumnSchemaByComponent(component, '');
                  columns.push(column as DripTableSchema['columns'][number]);
                }
                setSchemaToAdd({ ...schemaToAdd, columns });
              }}
            >
              添加一列
            </Button>
          ) }
        </div>
      ) }
      { currentTemplate && (
        <div className="jfe-drip-table-generator-templates-tools">
          { currentStep === 0 && <Button onClick={() => setCurrentStep(1)}>下一步</Button> }
          { currentStep === 1 && (
          <Button
            style={{ marginRight: 5 }}
            onClick={() => { setCurrentStep(0); initStep2State(); }}
          >
            上一步
          </Button>
          ) }
          { currentStep === 1 && (
          <TableConfigsContext.Consumer>
            { ({ tableConfigs, updateTableConfigs }) => (
              <Button
                type="primary"
                onClick={() => {
                  if (tableConfigs.length > 0 && tableConfigs[0].columns.length > 0) {
                    Modal.confirm({
                      title: '此操作会覆盖当前正在编辑的表格，确定要这么做吗?',
                      icon: <ExclamationCircleFilled />,
                      okText: '确定',
                      okType: 'danger',
                      cancelText: '我再想想',
                      onOk() {
                        if (schemaToAdd) {
                          const newTableConfigs = generateTableConfigsBySchema(schemaToAdd);
                          updateTableConfigs(newTableConfigs);
                        }
                        initStep2State();
                        props.onOk();
                      },
                    });
                  } else {
                    if (schemaToAdd) {
                      const newTableConfigs = generateTableConfigsBySchema(schemaToAdd);
                      updateTableConfigs(newTableConfigs);
                    }
                    initStep2State();
                    props.onOk();
                  }
                }}
              >
                确认设置
              </Button>
            ) }
          </TableConfigsContext.Consumer>
          ) }
        </div>
      ) }
    </div>
  );
};

export default TemplatesManager;
