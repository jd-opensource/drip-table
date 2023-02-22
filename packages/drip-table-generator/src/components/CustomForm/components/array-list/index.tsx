import './index.less';

import { CloseCircleOutlined, MinusCircleOutlined, PlusCircleOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Popover, Row } from 'antd';
import React from 'react';

import { safeExecute } from '@/utils/sandbox';
import RichText from '@/components/RichText';
import { DTGComponentPropertySchema } from '@/typing';

import BuiltInComponents, { DTGComponentBaseProperty } from '..';

interface Props extends DTGComponentBaseProperty<Record<string, unknown>[]> {
  fieldOptions?: { label: string; value: string }[];
  mode?: 'wide' | 'narrow';
}

export default class ArrayComponent extends React.PureComponent<Props> {
  public static componentName = 'array-list';

  private changeColumnItem(key: string, value: unknown, index: number) {
    const currentValue = this.value?.slice() || [];
    if (!currentValue[index]) {
      currentValue[index] = {};
    }
    currentValue[index][key] = value;
    this.props.onChange?.(currentValue);
  }

  private get defaultValue() {
    const defaultObject = {};
    (this.props.schema['ui:props']?.items as DTGComponentPropertySchema[])
      .forEach((schema, i) => {
        const visible = this.visible(schema, i, (this.props.value || []).length);
        if (visible) { defaultObject[schema.name] = schema.default; }
      });
    return defaultObject;
  }

  private get value() {
    return this.props.value ?? this.props.schema.default as Record<string, unknown>[] | undefined;
  }

  private renderAttributeComponent(schema: DTGComponentPropertySchema, index: number, parentIndex: number) {
    const currentValue = (this.value || [])[parentIndex] || {};
    const uiProps = schema['ui:props'] || {};
    if (schema['ui:type']?.startsWith('custom::')) {
      const ComponentName = schema['ui:type']?.replace('custom::', '');
      const CustomComponent = this.props.extraComponents?.[ComponentName] || schema['ui:externalComponent'];
      if (!CustomComponent) { return <Alert message="未知表单组件" type="error" showIcon />; }
      return (
        <CustomComponent
          icons={this.props.icons}
          schema={schema}
          value={currentValue[schema.name]}
          onChange={value => this.changeColumnItem(schema.name, value, parentIndex)}
          onValidate={msg => this.props.onValidate?.(msg)}
          {...uiProps}
        />
      );
    }
    if (schema['ui:type'] === 'array-list') {
      return (
        <ArrayComponent
          icons={this.props.icons}
          schema={schema}
          value={currentValue[schema.name] as Record<string, unknown>[] | undefined}
          onChange={value => this.changeColumnItem(schema.name, value, parentIndex)}
          onValidate={msg => this.props.onValidate?.(msg)}
        />
      );
    }
    const BuiltInComponent = BuiltInComponents[schema['ui:type']] as React.JSXElementConstructor<DTGComponentBaseProperty<unknown>>;
    if (BuiltInComponent) {
      return (
        <BuiltInComponent
          icons={this.props.icons}
          schema={schema}
          value={currentValue[schema.name]}
          extraComponents={this.props.extraComponents}
          onChange={value => this.changeColumnItem(schema.name, value, parentIndex)}
          onValidate={msg => this.props.onValidate?.(msg)}
          {...uiProps}
        />
      );
    }
    return <Alert message="未知表单组件" type="error" showIcon />;
  }

  private visible(schema: DTGComponentPropertySchema, index: number, parentIndex: number) {
    const currentValue = (this.value || [])[parentIndex] || {};
    if (typeof schema.visible === 'function') {
      return schema.visible(currentValue[schema.name], currentValue, index, parentIndex);
    } if (typeof schema.visible === 'string') {
      return safeExecute(schema.visible, {
        currentValue: currentValue[schema.name],
        formData: currentValue,
        index,
        parentIndex,
      }, false);
    } if (typeof schema.visible === 'boolean') {
      return schema.visible;
    }
    return true;
  }

  private renderAttributeItem(schema: DTGComponentPropertySchema, index: number, parentIndex: number) {
    const layout = schema['ui:layout'];
    if (!this.visible(schema, index, parentIndex)) { return null; }
    return (
      <Row key={index} style={{ lineHeight: '32px', margin: '6px 0' }}>
        <Col span={layout?.labelCol || 8}>
          { schema['ui:title'] }
          {
            schema['ui:description']
              ? (
                <Popover content={<RichText html={schema['ui:description'].title} />}>
                  <QuestionCircleOutlined style={{ marginLeft: '12px', cursor: 'pointer' }} />
                </Popover>
              )
              : null
          }
        </Col>
        <Col span={layout?.wrapperCol || 16}>{ this.renderAttributeComponent(schema, index, parentIndex) }</Col>
      </Row>
    );
  }

  public renderFormItem(item: unknown, index: number) {
    const uiProps = this.props.schema['ui:props'] || {};
    const maxLength = uiProps.max as number;
    const toolWidth = uiProps.toolWidth as number | undefined;
    const mode = uiProps.mode as 'wide' | 'narrow' || 'wide';
    if (mode === 'narrow') {
      return (
        <div className="jfe-drip-table-generator-array-component-form-container" key={index}>
          <div
            className="jfe-drip-table-generator-array-component-close-button"
            onClick={() => {
              const currentValue = this.value?.slice() || [];
              currentValue.splice(index, 1);
              this.props.onChange?.(currentValue);
            }}
          >
            <CloseCircleOutlined />
          </div>
          <div>
            { (this.props.schema['ui:props']?.items as DTGComponentPropertySchema[])
              .map((schema, i) => this.renderAttributeItem(schema, i, index)) }
          </div>
        </div>
      );
    }
    return (
      <div className="jfe-drip-table-generator-array-component-form-container" key={index}>
        <div className="jfe-drip-table-generator-array-component-left-container" style={{ width: toolWidth ? `calc(100% - ${toolWidth}px)` : void 0 }}>
          { (this.props.schema['ui:props']?.items as DTGComponentPropertySchema[])
            .map((schema, i) => this.renderAttributeItem(schema, i, index)) }
        </div>
        <div className="jfe-drip-table-generator-array-component-right-container" style={{ width: toolWidth }}>
          <Button
            icon={<PlusCircleOutlined />}
            shape="circle"
            size="small"
            disabled={!!(maxLength && (this.value || []).length >= maxLength)}
            onClick={() => {
              const currentValue = this.value?.slice() || [];
              currentValue.splice(index + 1, 0, { paramName: '', prefix: '', suffix: '' });
              this.props.onChange?.(currentValue);
            }}
          />
          <Button
            icon={<MinusCircleOutlined />}
            shape="circle"
            size="small"
            onClick={() => {
              const currentValue = this.value?.slice() || [];
              currentValue.splice(index, 1);
              this.props.onChange?.(currentValue);
            }}
          />
        </div>
      </div>
    );
  }

  public render() {
    const uiProps = this.props.schema['ui:props'] || {};
    const maxLength = uiProps.max as number;
    return (
      <div className="jfe-drip-table-generator-array-component-container">
        { (this.value || []).map((item, index) => this.renderFormItem(item, index)) }
        { maxLength && (this.value || []).length >= maxLength
          ? null
          : (
            <Button
              icon={<PlusOutlined />}
              onClick={() => {
                const value: Record<string, unknown>[] = [
                  ...this.value || [],
                  { ...this.defaultValue },
                ];
                this.props.onChange?.(value);
              }}
            >
              添加
            </Button>
          ) }
      </div>
    );
  }
}
