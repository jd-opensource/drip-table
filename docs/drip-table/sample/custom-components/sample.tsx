/**
 * This file is part of the drip-table project.
 * @link     : https://ace.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { Button } from 'antd';
import { DripTableColumnSchema, DripTableComponentProps, SchemaObject } from 'drip-table';
import React from 'react';

import { SampleRecordType } from '../../../demo-data';
import { CustomComponentEvent } from '.';

export type CustomComponentSampleColumnSchema = DripTableColumnSchema<'custom::CustomComponentSample', {
  customSchema?: string;
}>;

export interface CustomComponentSampleProps extends DripTableComponentProps<SampleRecordType, CustomComponentSampleColumnSchema, CustomComponentEvent> { }

interface CustomComponentSampleState { }

export default class CustomComponentSample extends React.PureComponent<CustomComponentSampleProps, CustomComponentSampleState> {
  public static componentName: 'CustomComponentSample' = 'CustomComponentSample';
  public static schema: SchemaObject = {
    properties: {
      customSchema: { type: 'string' },
    },
  };

  public constructor(props: CustomComponentSampleProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div>
        自定义:
        { ' ' }
        { this.props.data?.status }
        <Button type="link" onClick={() => { this.props.fireEvent({ type: 'custom', name: 'sample-event' }); }}>发起事件</Button>
        { this.props.schema.options.customSchema }
      </div>
    );
  }
}
