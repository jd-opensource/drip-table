/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { Col, Input, message, Radio, Row } from 'antd';
import React from 'react';

import { DTGComponentPropertySchema } from '@/typing';

import { DTGComponentBaseProperty } from '..';
import ArrayComponent from '../array-list';

interface Props extends DTGComponentBaseProperty<string> {
}

interface States {
  mode: 'custom' | 'map';
  valueList?: Record<string, string>[];
  defaultValue?: string;
}

const TextArea = Input.TextArea;

const schema: DTGComponentPropertySchema = {
  name: 'searchKeys',
  group: '',
  'ui:title': '',
  'ui:type': 'array-list',
  'ui:props': {
    mode: 'narrow',
    items: [
      {
        name: 'label',
        'ui:layout': { labelCol: 6, wrapperCol: 18 },
        'ui:title': '文案',
        'ui:type': 'input',
        default: '',
      },
      {
        name: 'value',
        'ui:layout': { labelCol: 6, wrapperCol: 18 },
        'ui:title': '值',
        'ui:type': 'input',
        default: '',
      },
    ],
  },
  'ui:layout': { labelCol: 8, wrapperCol: 16 },
  type: 'array',
};

export default class DataTranslationComponent extends React.PureComponent<Props, States> {
  public static componentName = 'data-translation';

  public constructor(props: Props) {
    super(props);
    this.state = {
      mode: 'custom',
    };
  }

  private get value() {
    const config = this.props.schema;
    return this.props.value as string ?? config.default;
  }

  public get valueMap() {
    let map: Record<string, string> = {};
    let defaultValue: string = '';
    if (this.props.value) {
      const lines = this.props.value.split('\n');
      if (lines.length >= 3 && lines[1].trim().startsWith('const')) {
        try {
          map = JSON.parse(lines[1].slice(lines[1].indexOf('=') + 1, -1).trim());
        } catch {
          message.error('语句解析失败');
        }
      }
      if (lines.length >= 3 && lines[lines.length - 1].trim().startsWith('return')) {
        defaultValue = lines[lines.length - 1].slice(lines[lines.length - 1].indexOf('\'') + 1, lines[lines.length - 1].lastIndexOf('\''));
      }
    }
    return {
      valueList: Object.keys(map).map(key => ({ value: key, label: map[key] })),
      default: defaultValue,
    };
  }

  public transform(value?: Record<string, string>[], defaultValue?: string) {
    const valueMap: Record<string, string> = {};
    (value || this.state.valueList)?.forEach((item) => {
      valueMap[String(item.value)] = String(item.label);
    });
    return `/** MODE: MAP */
const enumMap = ${JSON.stringify(valueMap)};
return enumMap[String(props.value)] ?? '${defaultValue ?? this.state.defaultValue ?? ''}';`;
  }

  public componentDidMount() {
    if (this.value?.startsWith('/** MODE: MAP */')) {
      this.setState({
        mode: 'map',
        valueList: this.valueMap.valueList,
        defaultValue: this.valueMap.default,
      });
    }
  }

  public componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps.value && !this.props.value && this.state.mode === 'custom') {
      this.setState({
        valueList: [],
        defaultValue: '',
      });
    }
  }

  public render() {
    const config = this.props.schema;
    const uiProps = this.props.schema['ui:props'] || {};

    return (
      <div>
        <Row style={{ marginBottom: 8 }}>
          <Col span={24}>
            <Radio.Group
              buttonStyle="solid"
              size="small"
              value={this.state.mode}
              onChange={e => this.setState({ mode: e.target.value })}
            >
              <Radio.Button value="custom">自定义函数</Radio.Button>
              <Radio.Button value="map">枚举映射</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        { this.state.mode === 'custom'
          ? (
            <TextArea
              value={this.props.value as string ?? config.default}
              placeholder={uiProps.placeholder as string}
              disabled={uiProps.disabled as boolean}
              style={{ width: '100%', ...uiProps.style }}
              autoSize={uiProps.autoSize as boolean || {
                minRows: uiProps.minRows as number,
                maxRows: uiProps.maxRows as number,
              }}
              rows={uiProps.rows as number}
              onChange={(e) => {
                this.props.onChange?.(e.target.value);
              }}
            />
          )
          : (
            <div>
              <ArrayComponent
                theme={this.props.theme}
                schema={schema}
                value={this.state.valueList ?? this.valueMap.valueList}
                onChange={(value) => {
                  const formattedValue: Record<string, string>[] = value.map((item) => {
                    const stringifyItem: Record<string, string> = {};
                    Object.keys(item).forEach((key) => { stringifyItem[key] = String(item[key]); });
                    return stringifyItem;
                  });
                  this.setState({ valueList: formattedValue });
                  this.props.onChange?.(this.transform(formattedValue));
                }}
                onValidate={msg => this.props.onValidate?.(msg)}
              />
              <div style={{ height: 8 }} />
              <Input
                placeholder="请输入默认值"
                value={this.state.defaultValue ?? this.valueMap.default}
                onChange={(e) => {
                  this.setState({ defaultValue: e.target.value });
                  this.props.onChange?.(this.transform(void 0, e.target.value));
                }}
              />
            </div>
          ) }
        { }
      </div>
    );
  }
}
