---
title: Refs引用
toc: content
---

## Refs 引用

> 引用实例，利用 `refs` 引用可以在外部主动获取 `drip-table-generator` 的状态以及配置信息。

## 一、获取编辑器实例

利用 `react` 的 `refs` 属性可以获取表格编辑器内部开放的状态和函数从而获取 `drip-table-generator` 状态

> hook 写法

```js
const generator = useRef(null);
```

> component 写法:

```js
const generator = React.createRef();

<DripTableGenerator refs={generator}>
```

## 二、开放函数

### getSchemaValue

- 描述: `获取最新的列表配置信息`
- 类型: `function(): DripTableSchema`
- 返回值: `DripTableSchema`
  主动调用 `drip-table-generator` 实例的 `getSchemaValue` 函数可以从组件外部获得当前用户配置好的列表 `JSON Schema` 配置。

### getDataSource

- 描述: `获取最新的列表数据信息`
- 类型: `function(): Record<string, unknown>[]`
- 返回值: `Record<string, unknown>[]`
  主动调用 `drip-table-generator` 实例的 `getDataSource` 函数可以从组件外部获得当前用户配置的表格数据。

## 三、代码演示

```tsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from "react";
import antd from "antd";
import { DripTableSchema } from "drip-table";
import DripTableGenerator, { DripTableGeneratorHandler } from "drip-table-generator";
import "antd/dist/antd.css";

const { Row, Col, Button, message } = antd;

const Demo = () => {
  const generator: React.MutableRefObject<DripTableGeneratorHandler | null> = React.useRef(
    null
  );

  const getSchemaValue = () => {
    const value = generator.current?.getSchemaValue();
    const aux = document.createElement("input");
    aux.setAttribute("value", value ? JSON.stringify(value) : "");
    document.body.append(aux);
    aux.select();
    document.execCommand("copy");
    aux.remove();
    message.success("Schema复制成功");
  };

  const getDataSource = () => {
    const value = generator.current?.getDataSource();
    const aux = document.createElement("input");
    aux.setAttribute("value", value ? JSON.stringify(value) : "");
    document.body.append(aux);
    aux.select();
    document.execCommand("copy");
    aux.remove();
    message.success("DataSource复制成功");
  };

  return (
    <React.Fragment>
      <Row style={{ borderBottom: "1px solid #2190ff", padding: "8px 0" }}>
        <Button type="primary" onClick={getSchemaValue}>
          获取列表配置
        </Button>
        <Button
          style={{ marginLeft: "12px" }}
          type="primary"
          onClick={getDataSource}
        >
          获取表格数据
        </Button>
      </Row>
      <DripTableGenerator
        ref={generator}
        mockDataSource
        dataSource={[]}
      />
    </React.Fragment>
  );
};

export default Demo;
```
