<a href='http://drip-table.jd.com/'>
  <h1 style="display: flex; align-items: center; justify-content: center">
    <img src='https://storage.360buyimg.com/imgtools/7e0e546a96-d962c880-f9a2-11eb-bf08-d585041b7c80.svg'/>
    <span style="margin-left: 10px">Drip Table Generator</span>
  </h1>
</a>

English | [简体中文](./README.zh-CN.md)

[![npm version](https://img.shields.io/npm/v/drip-table.svg?style=flat)](https://www.npmjs.com/package/drip-table-generator)
![node](https://img.shields.io/badge/node-%3E%3D13.14.0-blue.svg)
![yarn](https://img.shields.io/badge/yarn-%3E%3D1.0.0-blue.svg)
![document](https://img.shields.io/badge/documentation-yes-brightgreen.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

## Introduction

`DripTableGenerator` is a visual tool for producing configuration data that meets the `JSON Schema` standard in order to sent to `DripTable` for rendering a table and columns.

## Getting Start

1. Install dependencies

    The configuration side depend on the application side, please make sure that `drip-table` and `drip-table-driver-{drivername}` are installed before installing dependencies.

    > yarn

    ```sh
    yarn add drip-table-generator
    ```

    > npm

    ```sh
    npm install --save drip-table-generator
    ```

2. Import at the entrance of a file

    ```js
    import DripTableGenerator from 'drip-table-generator';
    import 'drip-table-generator/dist/index.min.css';
    ```

3. Use components in pages

    ```js
    return <DripTableGenerator />
    ```

    Then the configuration side can be rendered normally, as the sample screenshot below:

    ![drip-table-generator](https://img10.360buyimg.com/imagetools/jfs/t1/209919/9/12490/4540144/61b71921Ee35a9a3c/e2f7167fef822f17.gif)

### development

1. Clone

2. Install dependencies

    ```sh
    lerna bootstrap
    ```

3. Build project

    ```sh
    lerna run build --stream --scope=@drip/drip-table-generator
    ```

For more commands, see [DEVELOP](./DEVELOP.md) .

## License
MIT License
