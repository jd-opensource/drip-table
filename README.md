<a href='http://drip-table.jd.com/'>
  <h1 style="display: flex; align-items: center; justify-content: center">
    <img src='https://storage.360buyimg.com/imgtools/7e0e546a96-d962c880-f9a2-11eb-bf08-d585041b7c80.svg'/>
    <span style="margin-left: 10px">Drip Table</span>
  </h1>
</a>

English | [简体中文](./README.zh-CN.md)

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

## Introduction

`DripTable` is a solution, launched by JD Retail, for building dynamic tables in mid-and-back end webapp. This project based on React and JSON Schema standard, and is aimed to reduce the difficulty of developing dynamic tables in `CMS` and improve working efficiency by means of quickly generating dynamic tables in data-driven way.

`DripTable` contains serval sub projects: `drip-table`, `drip-table-generator`, `drip-table-driver-antd`.

The introduction of each sub-project are as follows:

- `drip-table`: the core library of the solution for building dynamic tables. It's main ability is to render a dynamic table automatically when received data which conforms to the `JSON Schema` standard.

- `drip-table-generator`: a visual tool for producing configuration data that meets the `JSON Schema` standard in order to sent to `DripTable` for rendering a table and columns.

- `drip-table-driver-antd`: a theme package which is composed of `antd` components and icons.

## Problems can be solved

1. Solve the problem that complicated tables are difficult to add new features and manage existed codes.
2. Optimize the process of development that there's no need to involve development and release for each change.
3. Lower the barriers to communication between developers and product managers who built and previewed table to meet requirements by using the visual tool.
4. Solve the problem that the existing visual tools cannot set columns and customize contents of cells of a table.

## Advantages

1. **Efficient**: Simplify the process of developing a table and develop columns of a table in a `LowCode` way;
2. **Configurable**: Change tables in simple way by modifying the configuration data that meets the `JSON Schema` standard;
3. **Visualization**: Produce configurations that meet the `JSON Schema` standard by dragging and dropping components simply with the visual tool.
4. **Free UI framework**: Serval theme packages can be used, and custom theme packages are also supported.

## Getting Start

DripTable can be divided into two scenes: configuration side and application side. The configuration side is mainly responsible for producing data that meet the `JSON Schema` standard in visual and `LowCode` ways. The application side is used to render a table from data configurations.

### The application side

1. Install dependencies

    Install the drip-table and a drip-table theme package at the same time:

    > yarn
    ```sh
    yarn add drip-table drip-table-driver-{drivername}
    ```

    >  npm
    ```sh
    npm install --save drip-table drip-table-driver-{drivername}
    ```

    Theme packages below are available:

    * drip-table-driver-antd

2. Import at the entrance of a file

    ```js
    // import drip-table
    import DripTable from 'drip-table';
    // import a theme package, take antd as an example
    import DripTableDriverAntDesign from 'drip-table-driver-antd';
    // import ant-design css
    import 'antd/dist/antd.css';
    // import drip-table css
    import 'drip-table/index.css';
    ```

3. Use components in pages
    ```js
    const schema = {
      "$schema": "http://json-schema.org/draft/2019-09/schema#",
      configs: {
        size: 'middle',
      },
      columns: [
        {
          "$id": "id",
          title: 'My Title',
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

    Then the application side can be rendered normally, as the sample screenshot below:

    ![drip-table-demo](https://img13.360buyimg.com/imagetools/jfs/t1/217000/18/7528/191045/61b6d9ebE1c96d83b/a63b8edce7757bd8.png)

### The configuration side

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
    import 'drip-table-generator/index.css';
    ```

3. Use components in pages

    ```js
    return <DripTableGenerator />
    ```

    Then the configuration side can be rendered normally, as the sample screenshot below:

    ![drip-table-generator](https://img10.360buyimg.com/imagetools/jfs/t1/209919/9/12490/4540144/61b71921Ee35a9a3c/e2f7167fef822f17.gif)

## Contribution

If you're interested in this project, you're welcome to create pull requests. We are appreciated for your star.

### development

1. Clone

2. Install dependencies

    ```sh
    lerna bootstrap
    ```

3. Run project

    ```sh
    yarn start
    ```

    * visit http://localhost:8000
    * `drip-table` demo page: /drip-table/guide/basic-demo
    * `drip-table-generator` demo page: /drip-table-generator/preview

For more commands, see [DEVELOP](./DEVELOP.md) .

## License
[MIT License](./LICENSE)
