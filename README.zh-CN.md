<a href='http://drip-table.jd.com/'>
  <h1 style="display: flex; align-items: center; justify-content: center">
    <img src='https://storage.360buyimg.com/imgtools/7e0e546a96-d962c880-f9a2-11eb-bf08-d585041b7c80.svg'/>
    <span style="margin-left: 10px">Drip Table</span>
  </h1>
</a>

[English](./README.md) | 简体中文

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[contributors]: https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square 'Number of contributors on All-Contributors'
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![npm version](https://img.shields.io/npm/v/drip-table.svg?style=flat)](https://www.npmjs.com/package/drip-table)
![node](https://img.shields.io/badge/node-%3E%3D13.14.0-blue.svg)
![yarn](https://img.shields.io/badge/yarn-%3E%3D1.0.0-blue.svg)
![document](https://img.shields.io/badge/documentation-yes-brightgreen.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
[![All Contributors][contributors]](./CONTRIBUTORS.md)

## 介绍

`DripTable` 是京东零售推出的一款用于企业级中后台的动态列表解决方案，项目基于 `React` 和 `JSON Schema`，旨在通过简单配置快速生成页面动态列表来降低 CMS 页面列表开发难度、提高工作效率。

`DripTable` 目前包含以下子项目：`drip-table`、`drip-table-generator`、`drip-table-driver-antd`。

各个子项目具体介绍如下：

- `drip-table`：动态列表解决方案的核心库，其主要能力是支持符合 `JSON Schema` 标准的数据自动渲染列表内容。

- `drip-table-generator`：一个可视化的用于 `DripTable` 配置 `JSON Schema` 标准的配置数据的生成工具。

- `drip-table-driver-antd`： `DripTable` 的 `Ant Design` UI组件库主题包。

## 可解决问题

1. 解决复杂列表页开发困难和代码难以维护的问题。
2. 优化现有前端列表页开发流程和效率，无需每次功能变更均涉及冗长的开发和上线流程。
3. 利用可视化搭建工具，产品人员实现需求的快速搭建和预览，降低开发人员和产品人员沟通门槛。
4. 解决现有可视化方案无法配置单元格，自定义单元格内容的问题。

## 有何优势

1. **高效开发**：提高前端列表开发效率，实现 `LowCode` 方式快速开发列表页；
2. **实现配置化**：每次只需修改 `JSON Schema` 数据即可自动渲染处所需要的列表，降低用户使用成本；
3. **配置可视化**：通过专用可视化配置工具，实现简单拖拽即可生成 `JSON Schema` 数据；
4. **界面框架自由**：可自由选择多种界面框架主题，另外还支持自定义主题包；

## 开始使用

`DripTable` 分为两种应用场景：配置端和应用端。配置端主要负责通过可视化方式和 `LowCode` 方式进行 `JSON Schema` 标准数据的生成。应用端的职能则是将 `JSON Schema` 标准配置数据渲染成动态列表。

### 应用端

1. 安装依赖

    同时安装 `drip-table` 和 `drip-table` 主题包：

    ```sh
    # yarn
    yarn add drip-table drip-table-driver-{drivername}
    # npm
    npm install drip-table drip-table-driver-{drivername}
    ```

    目前可选列表如下：

    * drip-table-driver-antd

2. 在文件开头引入依赖

    ```js
    // 引入 drip-table
    import DripTable from 'drip-table';
    // 引入主题包，以 antd 为例
    import DripTableDriverAntDesign from 'drip-table-driver-antd';
    // 引入 ant-design 样式
    import 'antd/dist/antd.css';
    // 引入 drip-table 样式
    import 'drip-table/index.css';
    ```

3. 引用

    ```js
    const schema = {
      "$schema": "http://json-schema.org/draft/2019-09/schema#",
      configs: {
        size: 'middle',
      },
      columns: [
        {
          "$id": "id",
          title: '名称',
          'ui:type': 'text',
          'ui:props': { mode: 'single' },
          type: 'string',
          dataIndex: 'dataIndexName',
        }
      ]
    };
    return (
      <DripTable driver={DripTableDriverAntDesign} schema={schema} dataSource={[]} />
    );
    ```

    应用端正常渲染效果如下：

    ![drip-table-demo](https://img13.360buyimg.com/imagetools/jfs/t1/217000/18/7528/191045/61b6d9ebE1c96d83b/a63b8edce7757bd8.png)

### 配置端

1. 安装依赖

    配置端依赖应用端，安装前先确保已安装 `drip-table` 和 `drip-table-driver-{drivername}`。

    ```sh
    # yarn
    yarn add drip-table-generator
    # npm
    npm install drip-table-generator
    ```

2. 在文件开头引入依赖

    ```js
    import DripTableGenerator from 'drip-table-generator';
    import 'drip-table-generator/index.css';
    ```

3. 在页面中引用

    ```js
    return <DripTableGenerator />
    ```

    配置端正常渲染效果如下：

    ![drip-table-generator](https://img10.360buyimg.com/imagetools/jfs/t1/209919/9/12490/4540144/61b71921Ee35a9a3c/e2f7167fef822f17.gif)

## 开发手册

如果您对这个项目感兴趣，欢迎提 issue ，也欢迎 star 支持一下。

### 本地运行

1. 克隆项目

2. 安装依赖

    ```sh
    lerna bootstrap
    ```

3. 运行项目

    ```sh
    yarn start
    ```

* 访问 http://localhost:8000
* `drip-table` 示例路由：/drip-table/guide/basic-demo
* `drip-table-generator` 示例路由：/drip-table-generator/preview

更多命令请查看 [DEVELOP 文档](./DEVELOP.zh-CN.md) 。

## License
[MIT License](./LICENSE)
