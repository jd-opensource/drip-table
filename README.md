<a href='http://drip-table.jd.com/'>
  <h1 style="display: flex; align-items: center; justify-content: center">
    <img src='https://storage.360buyimg.com/imgtools/7e0e546a96-d962c880-f9a2-11eb-bf08-d585041b7c80.svg'/>
    <span style="margin-left: 10px">Drip Table</span>
  </h1>
</a>

English | [简体中文](./README.zh-CN.md) | [Documentation](http://drip-table.jd.com/) | [Discussions](https://github.com/JDFED/drip-table/discussions)｜[Gitter](https://gitter.im/drip-table/community)


<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[contributors]: https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square "Number of contributors on All-Contributors"

<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![npm version](https://img.shields.io/npm/v/drip-table.svg?style=flat)](https://www.npmjs.com/package/drip-table)
![node](https://img.shields.io/badge/node-%3E%3D13.14.0-blue.svg)
![yarn](https://img.shields.io/badge/yarn-%3E%3D1.0.0-blue.svg)
![document](https://img.shields.io/badge/documentation-yes-brightgreen.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
[![All Contributors][contributors]](./CONTRIBUTORS.md)

## 📖 Introduction

`Drip table`is a dynamic table solution for enterprise level middle and background launched by JD retail. The project is based on `React` and `JSON Schema` . It aims to reduce the difficulty of developing table and improve work efficiency by `simple configuration` to quickly generate page dynamic table.

`Drip table` contains serval sub projects: `drip-table`, `drip-table-generator`, `drip-table-driver-antd`.

The introduction of each sub-project are as follows:

- `drip-table`: the core library of the solution for building dynamic tables. It's main ability is to render a dynamic table automatically when received data which conforms to the `JSON Schema` standard.

- `drip-table-generator`: a visual tool for producing configuration data that meets the `JSON Schema` standard in order to sent to `DripTable` for rendering a table and columns.

- `drip-table-driver-antd`: a theme package which is composed of `Ant Design` components and icons.

## ⬆️ Getting Start

`Drip table` is divided into two application scenarios: configuration end and application end. The configuration side is mainly responsible for generating `JSON Schema` standard data through visualization and `low-code`. The function of the application side is to render the `JSON Schema` standard configuration data into a dynamic table.

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
   import DripTableGenerator from "drip-table-generator";
   import "drip-table-generator/dist/index.css";
   ```

3. Use components in pages

   ```js
   return <DripTableGenerator />;
   ```

   Then the configuration side can be rendered normally, as the sample screenshot below:

   ![drip-table-generator](https://img10.360buyimg.com/imagetools/jfs/t1/209919/9/12490/4540144/61b71921Ee35a9a3c/e2f7167fef822f17.gif)

### The application side

1. Install dependencies

   Install the `drip-table` and a `drip-table` theme package at the same time:

   > yarn

   ```sh
   yarn add drip-table drip-table-driver-{drivername}
   ```

   > npm

   ```sh
   npm install --save drip-table drip-table-driver-{drivername}
   ```

   Theme packages below are available:

   - drip-table-driver-antd

2. Import at the entrance of a file

   ```js
   // import drip-table
   import DripTable from "drip-table";
   // import a theme package, take antd as an example
   import DripTableDriverAntDesign from "drip-table-driver-antd";
   // import ant-design css
   import "antd/dist/antd.css";
   // import drip-table css
   import "drip-table/dist/index.css";
   ```

3. Use components in pages

   ```js
   const schema = {
     $schema: "http://json-schema.org/draft/2019-09/schema#",
     configs: {
       size: "middle",
     },
     columns: [
       {
         $id: "id",
         title: "My Title",
         "ui:type": "text",
         "ui:props": { mode: "single" },
         type: "string",
         dataIndex: "dataIndexName",
       },
     ],
   };
   return (
     <DripTable
       driver={DripTableDriverAntDesign}
       schema={schema}
       dataSource={[]}
     />
   );
   ```

   Then the application side can be rendered normally, as the sample screenshot below:

   ![drip-table-demo](https://img13.360buyimg.com/imagetools/jfs/t1/217000/18/7528/191045/61b6d9ebE1c96d83b/a63b8edce7757bd8.png)

## 🤝 Contribution

If you're interested in this project, you're welcome to create ✨[issue](https://github.com/JDFED/drip-table/issues). We are appreciated for your ❤️[star](https://github.com/JDFED/drip-table).

### development

1. Clone

   ```sh
   git clone https://github.com/JDFED/drip-table.git
   ```

2. Install dependencies

   ```sh
   lerna bootstrap
   ```

3. Run project

   ```sh
   yarn start
   ```

- visit http://localhost:8000
- `drip-table` demo page: /drip-table/guide/basic-demo
- `drip-table-generator` demo page: /drip-table-generator/preview

For more commands, see [DEVELOP](./DEVELOP.md) .
Please visit the official website address [drip-table](http://drip-table.jd.com/) 。

## License

[MIT License](./LICENSE)
