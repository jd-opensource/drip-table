/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import React, { Component, ReactNode } from 'react';
import { Form, Input, Switch, Cascader, Button, Select, Radio, Checkbox, InputNumber, Popover, message, AutoComplete } from 'antd';
import { StringDataSchema } from 'drip-table';
import MonacoEditor from '@monaco-editor/react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { LabeledValue, SelectValue } from 'antd/lib/select';
import { DTGComponentPropertySchema } from '@/typing';
import ExtraComponents from './components';
import RichText from '@/components/RichText';
import 'rc-color-picker/assets/index.css';

type CheckboxGroupProps = React.ComponentProps<typeof Checkbox.Group>;
type CascaderProps = React.ComponentProps<typeof Cascader>;

interface Props<T> {
  configs: DTGComponentPropertySchema[];
  data?: T;
  key?: string;
  extendKeys?: string[];
  encodeData: (formData: { [key: string]: unknown }) => T;
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
    const key = this.props.key || '$id';
    const preId = prepProps.data ? prepProps.data[key] : '';
    const thisId = this.props.data ? this.props.data[key] : '';
    if (preId !== thisId) {
      this.setState({ formValues: this.decodeData(this.props.data), helpMsg: {} });
    }
  }

  public decodeData(material?: T) {
    const obj: { [key: string]: unknown } = {};
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
    if (config['ui:type'] === 'input') {
      return (
        <Input
          value={formValues[config.name] as string}
          placeholder={uiProps.placeholder as string}
          disabled={uiProps.disabled as boolean}
          style={{ width: 420, ...uiProps.style }}
          onChange={(e) => {
            const value = e.target.value;
            formValues[config.name] = (config as StringDataSchema).transform?.includes('trim') ? value.trim() : value;
            this.setState({ formValues }, () => { this.changeData(); });
            if (config.validate) {
              const res = config.validate(value);
              (res instanceof Promise ? res : Promise.resolve(res))
                .then((msg) => {
                  helpMsg[config.name] = msg || '';
                  this.setState({ helpMsg });
                  return msg;
                })
                .catch((error) => { throw error; });
            }
          }}
        />
      );
    }
    if (config['ui:type'] === 'text') {
      return (
        <Input.TextArea
          value={formValues[config.name] as string}
          placeholder={uiProps.placeholder as string}
          disabled={uiProps.disabled as boolean}
          style={{ width: 420, ...uiProps.style }}
          autoSize={{
            minRows: uiProps.minRows as number,
            maxRows: uiProps.maxRows as number,
          }}
          onChange={(e) => {
            const value = e.target.value;
            formValues[config.name] = (config as StringDataSchema).transform?.includes('trim') ? value.trim() : value;
            this.setState({ formValues }, () => { this.changeData(); });
            if (config.validate) {
              const res = config.validate(value);
              (res instanceof Promise ? res : Promise.resolve(res))
                .then((msg) => {
                  helpMsg[config.name] = msg || '';
                  this.setState({ helpMsg });
                  return msg;
                })
                .catch((error) => { throw error; });
            }
          }}
        />
      );
    }
    if (config['ui:type'] === 'auto-complete') {
      return (
        <AutoComplete
          value={formValues[config.name] as string}
          placeholder={uiProps.placeholder as string}
          disabled={uiProps.disabled as boolean}
          style={{ width: 420, ...uiProps.style }}
          options={uiProps.options as LabeledValue[]}
          onChange={(value) => {
            formValues[config.name] = (config as StringDataSchema).transform?.includes('trim') ? value.trim() : value;
            this.setState({ formValues }, () => { this.changeData(); });
            if (config.validate) {
              const res = config.validate(value);
              (res instanceof Promise ? res : Promise.resolve(res))
                .then((msg) => {
                  helpMsg[config.name] = msg || '';
                  this.setState({ helpMsg });
                  return msg;
                })
                .catch((error) => { throw error; });
            }
          }}
        />
      );
    }
    if (config['ui:type'] === 'switch') {
      const checkedValue = uiProps.checkedValue ? formValues[config.name] === uiProps.checkedValue : formValues[config.name] as boolean;
      return (
        <Switch
          checked={checkedValue}
          checkedChildren={uiProps.checkedChildren as ReactNode || '是'}
          unCheckedChildren={uiProps.uncheckedChildren as ReactNode || '否'}
          onChange={(checked: boolean) => {
            let value: boolean | string | number = checked;
            if (uiProps.checkedValue && uiProps.unCheckedValue) {
              value = checked ? uiProps.checkedValue as string | number : uiProps.unCheckedValue as string | number;
            }
            formValues[config.name] = value;
            this.setState({ formValues }, () => { this.changeData(); });
          }}
        />
      );
    }
    if (config['ui:type'] === 'number') {
      return (
        <InputNumber
          value={formValues[config.name] as number}
          max={uiProps.max as number}
          min={uiProps.min as number}
          precision={uiProps.precision as number}
          onChange={(checked) => {
            formValues[config.name] = checked;
            this.setState({ formValues }, () => { this.changeData(); });
          }}
        />
      );
    }
    if (config['ui:type'] === 'checkbox') {
      return (
        <Checkbox.Group
          defaultValue={config.default as CheckboxGroupProps['defaultValue']}
          value={formValues[config.name] as CheckboxGroupProps['value']}
          onChange={(value) => {
            formValues[config.name] = value;
            this.setState({ formValues }, () => { this.changeData(); });
          }}
        >
          { (uiProps.options as CheckboxGroupProps['options'])?.map((option, i) => {
            if (typeof option === 'string') {
              option = { label: option, value: option };
            }
            return (
              <Checkbox key={i} value={option.value} style={option.style} disabled={option.disabled}>{ option.label }</Checkbox>
            );
          }) }
        </Checkbox.Group>
      );
    }
    if (config['ui:type'] === 'radio') {
      return (
        <Radio.Group
          defaultValue={config.default}
          value={formValues[config.name] as number | string}
          onChange={(e) => {
            formValues[config.name] = e.target.value;
            this.setState({ formValues }, () => { this.changeData(); });
          }}
        >
          { (uiProps.options as CheckboxGroupProps['options'])?.map((option, i) => {
            if (typeof option === 'string') {
              option = { label: option, value: option };
            }
            return (<Radio key={i} value={option.value} style={option.style} disabled={option.disabled}>{ option.label }</Radio>);
          }) }
        </Radio.Group>
      );
    }
    if (config['ui:type'] === 'select') {
      return (
        <Select
          showSearch
          allowClear={uiProps.allowClear as boolean}
          style={{ width: 420, ...uiProps.style }}
          mode={uiProps.mode as 'multiple' | 'tags'}
          defaultValue={config.default as SelectValue}
          value={formValues[config.name] as SelectValue}
          options={(uiProps.options as { label: string; value: string }[] || []).map(v => ({ label: v.label, value: v.value }))}
          onChange={(value) => {
            formValues[config.name] = value;
            this.setState({ formValues }, () => { this.changeData(); });
          }}
        />
      );
    }
    if (config['ui:type'] === 'cascader') {
      return (
        <Cascader
          options={uiProps.options as CascaderProps['options']}
          defaultValue={config.default as CascaderProps['defaultValue']}
          value={formValues[config.name] as CascaderProps['value']}
          displayRender={uiProps.displayRender as CascaderProps['displayRender']}
          disabled={uiProps.disabled as boolean}
          style={{ width: 420, ...uiProps.style }}
          onChange={(value) => {
            formValues[config.name] = value;
            this.setState({ formValues }, () => { this.changeData(); });
          }}
        />
      );
    }
    if (config['ui:type'] === 'code-editor') {
      let codeStr = formValues[config.name] as string;
      let marks: { message: string }[] = [];
      return (
        <div style={{ position: 'relative' }}>
          <div style={{ margin: '8px 0', position: 'absolute', top: '-42px', right: '2px' }}>
            <Button onClick={() => {
              if (marks.length <= 0) {
                formValues[config.name] = codeStr;
                this.setState({ formValues }, () => { this.changeData(); });
              } else {
                message.error(marks.map(item => item.message).join('\n'));
              }
            }}
            >
              提交代码
            </Button>
          </div>
          <MonacoEditor
            width="100%"
            height={356}
            language="javascript"
            theme="vs-dark"
            value={codeStr}
            onChange={(value) => { codeStr = value || ''; }}
            onValidate={(markers) => {
              marks = markers;
            }}
          />
        </div>
      );
    }
    if (config['ui:type'].startsWith('custom::')) {
      const ComponentName = config['ui:type'].replace('custom::', '');
      const CustomComponent = ExtraComponents[ComponentName] || config['ui:externalComponent'];

      return (
        <CustomComponent
          schema={config}
          value={formValues[config.name] as Record<string, string> | Record<string, string>[]}
          onChange={(value) => {
            formValues[config.name] = value;
            this.setState({ formValues }, () => {
              this.changeData();
            });
          }}
          {...uiProps}
        />
      );
    }

    return null;
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

  public renderFormItem(config: DTGComponentPropertySchema) {
    const { helpMsg } = this.state;
    const labelCol = 6;
    const wrapperCol = config['ui:type'] === 'code-editor' ? 24 : 16;
    const formItemLayout = {
      labelCol: { xs: { span: labelCol }, sm: { span: labelCol } },
      wrapperCol: { xs: { span: wrapperCol }, sm: { span: wrapperCol } },
    };
    const key = config.name;
    const visible = this.visible(config);
    if (!visible) { return null; }
    return (
      <Form.Item
        key={key}
        label={this.renderTitleLabel(config)}
        colon={false}
        validateStatus={helpMsg[key] ? 'error' : 'success'}
        help={helpMsg[key]}
        required={config.required}
        style={config['ui:wrapperStyle']}
        {...formItemLayout}
      >
        { this.renderFormComponent(config) }
      </Form.Item>
    );
  }

  public render() {
    const { configs } = this.props;
    return (
      <div>
        { configs.map(item => this.renderFormItem(item)) }
      </div>
    );
  }
}
