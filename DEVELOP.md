# DripTable Development Guide

## Before Development

English | [简体中文](./DEVELOP.zh-CN.md)

**Knowledge points that you need to master before developing**

### What is JSON Schema?

1. `JSON Schema` is a vocabulary that allows you to annotate and validate JSON documents.
2. [JSON Schema official document](http://json-schema.org/)
3. [JSON Schema guide](https://www.jianshu.com/p/1711f2f24dcf?utm_campaign=hugo)

### What is Lerna?

1. `Lerna` is a tool for managing JavaScript projects with multiple packages.
2. [Lerna official document](https://lerna.js.org/)
3. [Lerna guide](https://www.jianshu.com/p/09fd41cdbbc4)

## Environment

- install `git`, `node`, `yarn`. version requirement: `node` >=13.14.0, `yarn` >= 1.0.0
- configure [NPM](https://registry.npmjs.com/) source if needed.

  > configure NPM source

  ```sh
  npm config set registry https://registry.npmjs.com/
  ```

  > login

  ```shell
  npm adduser (--registry=https://registry.npmjs.com/)
  ```

  - Download codes

## Start

1. install dependencies

   ```sh
   lerna bootstrap
   ```

2. build independecies

   > yarn

   ```sh
   yarn run build
   ```

   > npm

   ```sh
   npm run build
   ```

3. run

   ```
   yarn start
   ```

> visit `http://localhost:8000` in browser.

## Directory

- update continually

```
├── docs                           // official website
│ ├── drip-table                   // drip-table sub page
│ │ ├── changelog
│ │ │ └── index.md                 // log markdown
| | ├── functions                  // drip-table functions
| | ├── guide                      // drip-table guide
| | ├── sample                     // drip-table samples
| | ├── faq.md                     // drip-table faq
| | └── index.md                   // drip-table document entry
│ ├── drip-table-generator         // drip-table-generator sub page
│ │ ├── changelog
│ │ │ └── index.md                 // log markdown
| | ├── preview                    // drip-table-generator demos
| | ├── faq.md                     // drip-table-generator faq
| | └── index.md                   // drip-table-generator document entry
│ ├── global-schema.ts             // global schema for demos
│ ├── index.css                    // official website CSS
│ ├── index.md                     // official website markdown
│ ├── index.tsx                    // official website entry
│ └── loading.js                   // official website loading component
└── packages                       // codes menu
  ├── drip-table                   // drip-table codes
  └── drip-table-generator         // drip-table visual tool
```

## Development

1. Fork.
2. Create a new branch that names to express the features simply.
3. Coding.
4. Create a pull request.

- For more details of `drip-table`, see [README](./packages/drip-table/README.md);
- For more details of `drip-table-generator`, see [README](./packages/drip-table-generator/README.md);

## NPM Publish

If you changed `drip-table` source code，you should update [package.json](packages/drip-table/package.json) and  [changelog](docs/drip-table/changelog.md) ， enter the [ drip-table catalogue](packages/drip-table) and execute `npm publish`。

If you changed `drip-table-generator` source code，you should update [package.json](packages/drip-table-generator/package.json) and  [changelog](docs/drip-table-generator/changelog.md) ， enter the [ drip-table-generator catalogue](packages/drip-table-generator) and execute `npm publish`。

> If you don't have permission to publish npm package, go to the [Official Wechat group] (./Contact. md) and contact the group owner to add permission, ` npm owner add<username><package name>`

## Release official website

```
yarn run build:docs
```
