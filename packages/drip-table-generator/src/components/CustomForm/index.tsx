/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import 'rc-color-picker/assets/index.css';

import { QuestionCircleOutlined } from '@ant-design/icons';
import { Alert, Col, Collapse, Form, Popover, Row, Tabs } from 'antd';
import { DripTableDriver } from 'drip-table';
import React, { Component } from 'react';

import RichText from '@/components/RichText';
import { DTGComponentPropertySchema } from '@/typing';

import BuiltInComponents, { DTGComponentBaseProperty } from './components';

interface CustomComponentProps {
  schema: DTGComponentPropertySchema;
  value?: string;
  onChange?: (value: string) => void;
  onValidate?: (errorMessage: string) => void;
}
interface Props<T> {
  configs: DTGComponentPropertySchema[];
  groupType?: boolean | 'collapse' | 'tabs';
  extraComponents?: Record<string, new <P extends CustomComponentProps>(props: P) => React.PureComponent<P>>;
  data?: T;
  primaryKey?: string;
  extendKeys?: string[];
  theme?: DripTableDriver;
  decodeData?: (data?: T) => Record<string, unknown>;
  encodeData: (formData: Record<string, unknown>) => T;
  onChange?: (data?: T) => void;
}

interface State {
  formValues: { [key: string]: unknown };
  helpMsg: { [key: string]: string };
}

export default class CustomForm<T> extends Component<Props<T>, State> {
  public constructor(props: Props<T>) {
    super(props);
    this.state = {
      formValues: {},
      helpMsg: {},
    };
  }

  public componentDidMount() {
    this.setState({ formValues: this.decodeData(this.props.data) });
  }

  public componentDidUpdate(prepProps: Props<T>) {
    const key = this.props.primaryKey || '$id';
    const preId = prepProps.data ? prepProps.data[key] : '';
    const thisId = this.props.data ? this.props.data[key] : '';
    if (preId !== thisId) {
      this.setState({ formValues: this.decodeData(this.props.data), helpMsg: {} });
    }
  }

  public decodeData(material?: T) {
    let obj: { [key: string]: unknown } = {};
    // 注入 defaultValue
    this.props.configs.forEach((item) => {
      if (typeof item.default !== 'undefined') { obj[item.name] = item.default; }
    });
    if (material) {
      Object.keys(material)
        .filter(key => (this.props.extendKeys ? !this.props.extendKeys.includes(key) : true))
        .forEach((key) => { obj[key] = material[key]; });
      if (this.props.extendKeys) {
        this.props.extendKeys.forEach(extKey =>
          Object.keys(material[extKey] || {})
            .forEach((key) => { obj[`${extKey}.${key}`] = (material[extKey] || {})[key]; }));
      }
      if (this.props.decodeData) {
        obj = { ...obj, ...this.props.decodeData(material) };
      }
    }
    return obj;
  }

  private visible(config: DTGComponentPropertySchema) {
    const { formValues } = this.state;
    if (typeof config.visible === 'function') {
      return config.visible(formValues[config.name], formValues);
    } if (typeof config.visible === 'string') {
      const visible = new Function('formData', config.visible);
      return visible(formValues);
    } if (typeof config.visible === 'boolean') {
      return config.visible;
    }
    return true;
  }

  public async submitData() {
    const { formValues, helpMsg } = this.state;
    let count = 0;
    const configs = this.props.configs.filter(config => this.visible(config));
    await configs.forEach(async (cfg) => {
      const msg = cfg.validate ? await cfg.validate(formValues[cfg.name] as string) : '';
      if (msg) {
        helpMsg[cfg.name] = msg;
        count += 1;
      }
    });
    this.setState({ helpMsg });
    if (count <= 0) {
      return this.props.encodeData(formValues);
    }
    return void 0;
  }

  public async changeData() {
    const data = await this.submitData();
    if (data && this.props.onChange) {
      this.props.onChange(data);
    }
  }

  public renderFormComponent(config: DTGComponentPropertySchema) {
    const { formValues, helpMsg } = this.state;
    const uiProps = config['ui:props'] || {};
    if (config['ui:type'] === 'render-html') {
      return (
        <RichText html={config.default as string} />
      );
    }
    if (config['ui:type']?.startsWith('custom::')) {
      const ComponentName = config['ui:type']?.replace('custom::', '');
      const CustomComponent = this.props.extraComponents?.[ComponentName] || config['ui:externalComponent'];
      return (
        <CustomComponent
          theme={this.props.theme}
          schema={config}
          value={formValues[config.name] as Record<string, string> | Record<string, string>[]}
          onChange={(value) => {
            formValues[config.name] = value;
            this.setState({ formValues }, () => {
              this.changeData();
            });
          }}
          onValidate={(msg: string) => {
            helpMsg[config.name] = msg || '';
            this.setState({ helpMsg });
          }}
          {...uiProps}
        />
      );
    }
    const BuiltInComponent = BuiltInComponents[config['ui:type']] as React.JSXElementConstructor<DTGComponentBaseProperty<unknown>>;
    if (BuiltInComponent) {
      return (
        <BuiltInComponent
          theme={this.props.theme}
          schema={config}
          value={formValues[config.name]}
          onChange={(value) => {
            formValues[config.name] = value;
            this.setState({ formValues }, () => {
              this.changeData();
            });
          }}
          onValidate={(msg) => {
            helpMsg[config.name] = msg || '';
            this.setState({ helpMsg });
          }}
          {...uiProps}
        />
      );
    }
    return <Alert message="未知表单组件" type="error" showIcon />;
  }

  public renderTitleLabel(config: DTGComponentPropertySchema) {
    const titleFragment = (
      <span style={{ marginRight: '6px' }}>
        { config['ui:title'] }
      </span>
    );
    if (config['ui:description']) {
      return (
        <div style={config['ui:titleStyle']}>
          { titleFragment }
          <Popover
            content={<RichText html={config['ui:description'].title} />}
            trigger={config['ui:description'].trigger}
          >
            <QuestionCircleOutlined />
          </Popover>
        </div>
      );
    }
    return (
      <div style={config['ui:titleStyle']}>{ titleFragment }</div>
    );
  }

  public renderFormItem(config: DTGComponentPropertySchema, index: number) {
    const { helpMsg } = this.state;
    const labelCol = config['ui:layout']?.labelCol || 8;
    const wrapperCol = config['ui:layout']?.wrapperCol || 16;
    const formItemLayout = {
      labelCol: { xs: { span: labelCol }, sm: { span: labelCol } },
      wrapperCol: { xs: { span: wrapperCol }, sm: { span: wrapperCol } },
    };
    const key = config.name;
    const visible = this.visible(config);
    if (!visible) { return null; }
    return (
      <React.Fragment key={index}>
        <Form.Item
          key={key}
          label={this.renderTitleLabel(config)}
          colon={false}
          validateStatus={helpMsg[key] ? 'error' : 'success'}
          help={config['ui:layout']?.customHelpMsg ? '' : helpMsg[key]}
          required={config.required}
          style={config['ui:wrapperStyle']}
          {...formItemLayout}
        >
          { !config['ui:layout']?.extraRow && this.renderFormComponent(config) }
          { config['ui:layout']?.customHelpMsg && helpMsg[key] && (
            <Alert style={{ padding: '4px 12px', height: '32px' }} message={helpMsg[key]} type="error" showIcon />
          ) }
        </Form.Item>
        { config['ui:layout']?.extraRow && (
          <Row>
            <Col span={24}>
              { this.renderFormComponent(config) }
            </Col>
          </Row>
        ) }
      </React.Fragment>
    );
  }

  public render() {
    const { configs } = this.props;
    if (this.props.groupType) {
      const groups = [...new Set(configs.map(item => item.group || ''))];
      const indexOfUnnamedGroup = groups.indexOf('');
      if (indexOfUnnamedGroup > -1) {
        groups[indexOfUnnamedGroup] = '其他';
      }
      if (this.props.groupType === 'collapse') {
        return (
          <Collapse>
            { groups.map((groupName, groupIndex) => (
              <Collapse.Panel key={groupIndex} header={groupName}>
                { configs.filter(item => groupName === (item.group || '其他')).map((item, index) => this.renderFormItem(item, index)) }
              </Collapse.Panel>
            )) }
          </Collapse>
        );
      }
      return (
        <Tabs tabPosition="left">
          { groups.map((groupName, groupIndex) => (
            <Tabs.TabPane key={groupIndex} tab={groupName}>
              { configs.filter(item => groupName === (item.group || '其他')).map((item, index) => this.renderFormItem(item, index)) }
            </Tabs.TabPane>
          )) }
        </Tabs>
      );
    }
    return (
      <div>
        { configs.map((item, index) => this.renderFormItem(item, index)) }
      </div>
    );
  }
}
