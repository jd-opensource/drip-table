<a href='http://drip-table.jd.com/'>
  <h1 style="display: flex; align-items: center; justify-content: center">
    <img src='https://storage.360buyimg.com/imgtools/7e0e546a96-d962c880-f9a2-11eb-bf08-d585041b7c80.svg'/>
    <span style="margin-left: 10px">Drip Table Generator</span>
  </h1>
</a>

[English](./README.md) | 简体中文

[![npm version](https://img.shields.io/npm/v/drip-table.svg?style=flat)](https://www.npmjs.com/package/drip-table-generator)
![node](https://img.shields.io/badge/node-%3E%3D13.14.0-blue.svg)
![yarn](https://img.shields.io/badge/yarn-%3E%3D1.0.0-blue.svg)
![document](https://img.shields.io/badge/documentation-yes-brightgreen.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

## 介绍

`drip-table-generator`是一个可视化的用于 `DripTable` 配置 `JSON Schema` 标准的配置数据的生成工具。

## 开始使用

1. 安装依赖

    配置端依赖应用端，安装前先确保已安装 `drip-table`。

    > yarn

    ```sh
    yarn add drip-table-generator
    ```

    > npm

    ```sh
    npm install --save drip-table-generator
    ```

2. 在文件开头引入依赖

    ```js | pure
    import DripTableGenerator from 'drip-table-generator';
    import 'drip-table-generator/dist/index.min.css';
    ```

3. 在页面中引用

    ```js | pure
    return <DripTableGenerator />
    ```

    配置端正常渲染效果如下：

    ![drip-table-generator](https://storage.360buyimg.com/imgtools/287adb8078-a09940a0-efc4-11ed-b3db-7f20d4d9a150.gif)

## 开发手册

如果您对这个项目感兴趣，欢迎提 issue ，也欢迎 star 支持一下。

### 本地运行

1. 克隆项目

2. 安装依赖

    ```sh
    lerna bootstrap
    ```

3.  构建项目

    ```sh
    lerna run build --stream --scope=@drip/drip-table-generator
    ```

* 访问 http://localhost:8000

更多命令请查看 [DEVELOP 文档](./DEVELOP.zh-CN.md) 。

## License

MIT License
