# DripTable 开发文档

`DripTable` 是动态列表解决方案的核心库，其主要能力是支持符合 `JSON Schema` 标准的数据自动渲染列表内容。

## 目录结构

- 持续更新

```
├── src                            // 源代码
  ├── components                   // drip-table 依赖的通用组件
  │ ├── ErrorBoundary              // 错误提示组件
  │ ├── Highlight                  // 高亮组件
  │ └── RichText                   // HTML 字符渲染组件
  ├── drip-table                   // drip-table 主要渲染逻辑
  │ ├─ components                  // 内置通用组件
  │ | ├── image                    // 图片展示组件
  │ | ├── link                     // 链接操作组件
  │ | ├── render-html              // 自定义 HTML 渲染组件
  │ | ├── text                     // 文本展示组件
  │ | ├── components.ts            // 组件通用类型定义
  │ | └── index.ts                 // 组件导出
  | ├── header                     // 表格头部渲染
  | ├── utils                      // 工具函数库
  | └── virtual-table              // 虚拟滚动表格
  ├── drip-table-provider          // drip-table 入口文件
  ├── context.ts                   // 全局上下文导出
  ├── hooks.ts                     // 全局属性状态管理
  ├── index.ts                     // 导出
  ├── shims-styles.d.ts            // 样式类型定义
  └── types.ts                     // 全局变量类型定义
```

## 开发

### 开发步骤
1. 新建本地分支，命名可大概说明需求新特性；
2. 在本地分支上修改对应代码；
3. 在 `docs/drip-table` 目录下添加相应的文档说明；
4. 在 `docs/drip-table/changelog` 目录下修改版本更改说明；
5. 提交代码，合并至 `master` 分支；
6. 修改 `package.json` 修改版本信息；
7. 提交代码；
8. 打包发布；

### 注意事项
- 每个函数式组件 export 之前使用 React.memo 包裹，浅比较 props 来更新包裹的组件
- 尽量合并相关的 state，不要使用多个 useState。
- 事件函数不要用箭头函数直接赋值。（参考：[如何从 useCallback 读取一个经常变化的值？](https://react.docschina.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback))
- 单个组件中不要同时使用 class component 与 function component。

## 发布

npm 添加 账号，仅第一次添加即可

```sh
npm owner add [username] drip-table
```

### 版本号定修改规则

- 主版本号(1)：必填，当功能模块有较大的变动，比如增加多个模块或者整体架构发生变化。此版本号由项目决定是否修改。

- 子版本号(2)：必填，当功能有一定的增加或变化，比如增加了对权限控制、增加自定义视图等功能。此版本号由项目决定是否修改。

- 阶段版本号(3)：必填，一般是问题修复或是一些小的变动，要经常发布修订版，时间间隔不限，修复一个严重的问题即可发布一个修订版。此版本号由项目经理决定是否修改。

- 日期版本号(051021): 可选，用于记录修改项目的当前日期，每天对项目的修改都需要更改日期版本号。此版本号由开发人员决定是否修改。

- 希腊字母版本号(beta): 可选，此版本号用于标注当前版本的软件处于哪个开发阶段，当软件进入到另一个阶段时需要修改此版本号。此版本号由项目决定是否修改。


```sh
git commit -m 'release: drip-table 1.2.3'
lerna run build --stream --scope=drip-table
cd packages/drip-table
npm publish --access=public
```
