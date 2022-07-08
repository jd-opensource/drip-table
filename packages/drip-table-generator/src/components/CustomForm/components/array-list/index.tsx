import { MinusCircleOutlined, PlusCircleOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Popover, Row } from 'antd';
import React from 'react';

import RichText from '@/components/RichText';
import { DTGComponentPropertySchema } from '@/typing';

import BuiltInComponents, { DTGComponentBaseProperty } from '..';

import styles from './index.module.less';

interface Props extends DTGComponentBaseProperty<Record<string, unknown>[]> {
  fieldOptions?: { label: string; value: string }[];
}

export default class ArrayComponent extends React.PureComponent<Props> {
  public static componentName = 'array-list';

  private changeColumnItem(key: string, value: unknown, index: number) {
    const currentValue = this.props.value?.slice() || [];
    if (!currentValue[index]) {
      currentValue[index] = {};
    }
    currentValue[index][key] = value;
    this.props.onChange?.(currentValue);
  }

  private renderAttributeComponent(schema: DTGComponentPropertySchema, index: number, parentIndex: number) {
    const currentValue = (this.props.value || [])[parentIndex] || {};
    const uiProps = schema['ui:props'] || {};
    if (schema['ui:type']?.startsWith('custom::')) {
      const ComponentName = schema['ui:type']?.replace('custom::', '');
      const CustomComponent = this.props.extraComponents?.[ComponentName] || schema['ui:externalComponent'];
      if (!CustomComponent) { return <Alert message="未知表单组件" type="error" showIcon />; }
      return (
        <CustomComponent
          theme={this.props.theme}
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
          theme={this.props.theme}
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
          theme={this.props.theme}
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
    const currentValue = (this.props.value || [])[parentIndex] || {};
    if (typeof schema.visible === 'function') {
      return schema.visible(currentValue[schema.name], currentValue, index, parentIndex);
    } if (typeof schema.visible === 'string') {
      const visible = new Function('currentValue', 'formData', 'index', 'parentIndex', schema.visible);
      return visible(currentValue[schema.name], currentValue, index, parentIndex);
    } if (typeof schema.visible === 'boolean') {
      return schema.visible;
    }
    return true;
  }

  private renderAttributeItem(schema: DTGComponentPropertySchema, index: number, parentIndex: number) {
    if (!this.visible(schema, index, parentIndex)) { return null; }
    return (
      <Row key={index} style={{ lineHeight: '32px', margin: '6px 0' }}>
        <Col span={8}>
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
        <Col span={16}>{ this.renderAttributeComponent(schema, index, parentIndex) }</Col>
      </Row>
    );
  }

  public renderFormItem(item: unknown, index: number) {
    return (
      <div className={styles['array-component-form-container']} key={index}>
        <div className={styles['array-component-left-container']}>
          { (this.props.schema['ui:props']?.items as DTGComponentPropertySchema[])
            .map((schema, i) => this.renderAttributeItem(schema, i, index)) }
        </div>
        <div className={styles['array-component-right-container']}>
          <Button
            icon={<PlusCircleOutlined />}
            shape="circle"
            size="small"
            onClick={() => {
              const currentValue = this.props.value?.slice() || [];
              currentValue.splice(index + 1, 0, { paramName: '', prefix: '', suffix: '' });
              this.props.onChange?.(currentValue);
            }}
          />
          <Button
            icon={<MinusCircleOutlined />}
            shape="circle"
            size="small"
            onClick={() => {
              const currentValue = this.props.value?.slice() || [];
              currentValue.splice(index, 1);
              this.props.onChange?.(currentValue);
            }}
          />
        </div>
      </div>
    );
  }

  public render() {
    return (
      <div className={styles['array-component-container']}>
        { (this.props.value || []).map((item, index) => this.renderFormItem(item, index)) }
        <Button
          icon={<PlusOutlined />}
          onClick={() => {
            const value: Record<string, unknown>[] = [
              ...this.props.value || [],
              {},
            ];
            this.props.onChange?.(value);
          }}
        >
          添加
        </Button>
      </div>
    );
  }
}
