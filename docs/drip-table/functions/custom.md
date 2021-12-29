---
order: 3
title: 自定义组件库
---

# 自定义组件库

> 自定义业务组件，使 `drip-table` 适用于具体业务。

## 参数定义

#### components
- 描述: `自定义组件库`
- 类型: `{ [libName: string]: { [componentName: string]: new (props: DripTableComponentProps<RecordType, DripTableComponentSchema, CustomComponentEvent, Ext>) => React.PureComponent<RecordType, DripTableComponentSchema, CustomComponentEvent, Ext>}`
- 默认值: `无`

    自定义组件库

## 渲染效果

![image](https://img14.360buyimg.com/imagetools/jfs/t1/174404/6/25364/18460/61cc37e0Eea19c33a/bd7a2e256a23b2de.jpg)

## 使用示例

组件部分：

```js
import React from 'react';
import { Button } from 'antd';
import { DripTableComponentProps, DripTableComponentSchema, DripTableCustomEvent } from 'drip-table';

import { SampleRecordType } from '../../global-configs.ts';

interface CustomComponentSampleSchema extends DripTableComponentSchema {
  customSchema?: string;
}

interface CustomComponentSampleProps extends DripTableComponentProps<SampleRecordType, CustomComponentSampleSchema, DripTableCustomEvent<'sample-event'>> { }

interface CustomComponentSampleState { }

class CustomComponentSample extends React.PureComponent<CustomComponentSampleProps, CustomComponentSampleState> {
  public constructor(props: CustomComponentSampleProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div>
        自定义: {this.props.data?.status}
        <Button type="link" onClick={() => { this.props.fireEvent({ type: 'custom', name: 'sample-event' }); }}>发起事件</Button>
        {this.props.schema.customSchema}
      </div>
    );
  }
}
```

引用部分：

```js
import DripTable from 'drip-table';

<DripTable
  components={{ custom: { CustomComponentSample, ...otherComponents } }}
/>
```
