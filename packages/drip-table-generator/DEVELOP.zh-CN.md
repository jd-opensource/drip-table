# DripTableGenerator 开发文档

DripTableGenerator 是一个可视化的 DripTable `JSON Schema` 配置数据的生成工具。

## 目录结构

- 持续更新

```
├── src                            // 源代码
│ ├── components                   // drip-table-generator 依赖的通用组件
│ │ ├── Draggable                  // 拖拽组件
│ │ ├── Highlight                  // 高亮组件
│ │ └── RichText                   // HTML 字符渲染组件
│ ├── custom-components            // 属性面板依赖的自定义组件
│ │ └── ArrayComponent             // 列表组件
│ ├── layout                       // 页面布局
│ │ ├── attribute-layout.tsx       // 属性面板
│ │ ├── component-layout.tsx       // 组件列表面板
│ │ ├── configs.ts                 // 全局属性配置
│ │ ├── custom-form.tsx            // 属性面板底层驱动表单
│ │ ├── editable-layout.tsx        // 可编辑列表面板
│ │ ├── preview-layout.tsx         // 预览列表面板
│ │ └── tool-layout.tsx            // 工具栏
│ ├── store                        // 全局数据流管理
│ │ ├── custom-hook.ts             // setState 实现
│ │ └── index.ts                   // 全局状态定义和修改函数定义
│ ├── table-components             // 属性面板配置
│ │ ├── configs.ts                 // 通用属性配置
│ │ ├── index.ts                   // 属性导出
│ │ ├── links.ts                   // 链接组件属性配置
│ │ ├── picture.ts                 // 图片组件属性配置
│ │ ├── render-html.ts             // 自定义 HTML 渲染组件属性配置
│ │ └── text.ts                    // 文本组件属性配置
│ ├── utils                        // 通用函数
│ │ └── common.ts                  // 常用通用函数
│ ├── context.ts                   // 全局上下文导出
│ ├── drip-table-generator.tsx     // 入口文件
│ ├── hooks.ts                     // 全局属性状态管理
│ ├── index.module.less            // 全局样式
│ ├── index.ts                     // 导出
│ ├── shims-styles.d.ts            // 样式类型定义
│ ├── shims-window.d.ts            // 全局变量类型定义
│ ├── typing.ts                    // drip-table-generator 类型定义
│ └── wrapper.ts                   // 入口文件
```

## 开发

### 开发准备

1. 安装依赖

  ```sh
    lerna bootstrap
  ```

2. 启动项目

  ```sh
    yarn start
  ```

### 开发步骤

1. Fork。
2. 创建一个新分支，分支名表达改动内容即可。
3. 改动，并提交。
4. 创建 PR 请求。

### 注意事项

- 每个函数式组件 export 之前使用 React.memo 包裹，浅比较 props 来更新包裹的组件
- 尽量合并相关的 state，不要使用多个 useState。
- 事件函数不要用箭头函数直接赋值。（参考：[如何从 useCallback 读取一个经常变化的值？](https://react.docschina.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback))
- 单个组件中不要同时使用 class component 与 function component。

## 发布

npm 添加用户名，仅第一次添加即可

```sh
npm owner add [username] drip-table-generator
```

### 版本号定修改规则

- 主版本号(1)：必填，当功能模块有较大的变动，比如增加多个模块或者整体架构发生变化。此版本号由项目决定是否修改。

- 子版本号(2)：必填，当功能有一定的增加或变化，比如增加了对权限控制、增加自定义视图等功能。此版本号由项目决定是否修改。

- 阶段版本号(3)：必填，一般是 Bug 修复或是一些小的变动，要经常发布修订版，时间间隔不限，修复一个严重的bug即可发布一个修订版。此版本号由项目经理决定是否修改。

- 日期版本号(051021): 可选，用于记录修改项目的当前日期，每天对项目的修改都需要更改日期版本号。此版本号由开发人员决定是否修改。

- 希腊字母版本号(beta): 可选，此版本号用于标注当前版本的软件处于哪个开发阶段，当软件进入到另一个阶段时需要修改此版本号。此版本号由项目决定是否修改。


```sh
git commit -m 'release: drip-table-generator 1.2.3'
lerna run build --stream --scope=drip-table-generator
cd packages/drip-table-generator
npm publish --access=public
```
