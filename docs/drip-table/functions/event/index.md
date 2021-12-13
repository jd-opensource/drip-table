---
order: 3
title: 事件机制
# sidemenu: false
---

# 事件机制

## 事件监听

> 事件机制回调函数，支持内置事件、自定义事件。

```js
<DripTable onEvent={onEvent}/>
```

`function onEvent(event: DripTableEvent, record: Record, index: number): void`

### event: DripTableEvent

> 事件对象。

```ts
interface DripTableEvent {
  type: DripTableBuiltInComponentEvent | 'custom';
  payload: unknown;
}
```

### record: Record

> 触发事件表格行数据。

### index: number

> 触发事件表格行在当前页的下标。


## 事件触发

在自定义组件中，调用 `this.props.fireEvent(event: DripTableEvent)` 即可。


# 示例

## 事件监听

```js
<DripTable<SampleRecordType, CustomComponentEvent>
  onEvent={(event, record, index) => {
    if (event.type === 'drip-link-click') {
      const name = event.payload;
      message.info(`你点击了第${index + 1}行“${record.name} (ID: ${record.id})”的"${name}"事件按钮。`);
      console.log(name, record, index);
    } else if (event.type === 'custom') {
      message.info(`自定义事件“${event.name}”触发于行“${record.name} (ID: ${record.id})”的自定义组件。`);
      console.log(event, record, index);
    }
  }}
/>
```

## 事件触发

```ts
export default class CustomComponentSample extends React.PureComponent<CustomComponentSampleProps, CustomComponentSampleState> {
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

## 示例展示

<code src='./sample.tsx' />
