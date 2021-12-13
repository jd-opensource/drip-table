import React from 'react';
import { Button, Row, Col, Popover, Radio, InputNumber, Switch, Input, Select, AutoComplete } from 'antd';
import { LabeledValue, SelectValue } from 'antd/lib/select';
import { MinusCircleOutlined, PlusCircleOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import RichText from '@/components/RichText';
import { DTGComponentPropertySchema } from '@/typing';

import styles from './index.module.less';

interface Props {
  schema: DTGComponentPropertySchema;
  fieldOptions?: { label: string; value: string }[];
  value?: Record<string, unknown>[];
  onChange?: (value: Record<string, unknown>[]) => void;
}

export default class ArrayComponent extends React.PureComponent<Props> {
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
    const options = schema['ui:props']?.options as LabeledValue[] || this.props.fieldOptions || [];
    if (schema['ui:type'] === 'radio') {
      return (
        <Radio.Group
          style={{ width: '100%' }}
          defaultValue={schema.default}
          value={currentValue[schema.name]}
          onChange={e => this.changeColumnItem(schema.name, e.target.value, parentIndex)}
        >
          {
            options?.map(
              (option, i) =>
                <Radio key={i} value={option.value}>{ option.label }</Radio>,
            )
          }
        </Radio.Group>
      );
    }
    if (schema['ui:type'] === 'input') {
      return (
        <Input
          style={{ width: '100%' }}
          defaultValue={schema.default as string}
          value={currentValue[schema.name] as string}
          onChange={e => this.changeColumnItem(schema.name, e.target.value, parentIndex)}
        />
      );
    }
    if (schema['ui:type'] === 'text') {
      return (
        <Input.TextArea
          style={{ width: '100%' }}
          autoSize={schema['ui:autoSize']}
          defaultValue={schema.default as string}
          value={currentValue[schema.name] as string}
          onChange={e => this.changeColumnItem(schema.name, e.target.value, parentIndex)}
        />
      );
    }
    if (schema['ui:type'] === 'auto-complete') {
      return (
        <AutoComplete
          style={{ width: '100%' }}
          defaultValue={schema.default as string}
          value={currentValue[schema.name] as string}
          options={options}
          onChange={value => this.changeColumnItem(schema.name, value, parentIndex)}
        />
      );
    }
    if (schema['ui:type'] === 'number') {
      return (
        <InputNumber
          style={{ width: '100%' }}
          min={schema['ui:minium']}
          max={schema['ui:maximum']}
          step={schema['ui:step']}
          defaultValue={Number(schema.default)}
          value={Number(currentValue[schema.name])}
          onChange={value => this.changeColumnItem(schema.name, Number(value), parentIndex)}
        />
      );
    }
    if (schema['ui:type'] === 'switch') {
      const value = typeof currentValue[schema.name] === 'undefined' ? schema.default : currentValue[schema.name];
      return (
        <Switch
          checked={value as boolean}
          checkedChildren={schema['ui:checkedContent']}
          unCheckedChildren={schema['ui:unCheckedContent']}
          onChange={checked => this.changeColumnItem(schema.name, checked, parentIndex)}
        />
      );
    }
    if (schema['ui:type'] === 'select') {
      return (
        <Select
          showSearch
          style={{ width: '100%' }}
          mode={schema['ui:mode']}
          defaultValue={schema.default as SelectValue}
          value={currentValue[schema.name] as SelectValue}
          options={options}
          onChange={value => this.changeColumnItem(schema.name, value, parentIndex)}
        />
      );
    }
    return null;
  }

  private renderAttributeItem(schema: DTGComponentPropertySchema, index: number, parentIndex: number) {
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
