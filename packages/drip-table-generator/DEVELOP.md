# DripTableGenerator Development Guide

`DripTableGenerator` is a visual tool for producing configuration data that meets the `JSON Schema` standard in order to sent to `DripTable` for rendering a table and columns.

## Directory

- update continually

```
├── src                            // Source code
  ├── components                   // Common components that drip-table-generator depends on
  │ ├── Draggable                  // draggable div
  │ ├── Highlight                  // Highlight component
  │ └── RichText                   // HTML character rendering component
  ├── custom-components            // custom component
  │ └── ArrayComponent             // ArrayList component
  ├── layout                       // layout
  │ ├── attribute-layout.tsx       // attribute form panel
  │ ├── component-layout.tsx       // component list
  │ ├── configs.ts                 // global configs
  │ ├── custom-form.tsx            // driver of attribute form
  │ ├── editable-layout.tsx        // edit table columns
  │ ├── preview-layout.tsx         // preview table
  │ └── tool-layout.tsx            // tools
  ├── store                        // states manager
  │ ├── custom-hook.ts             // setState
  │ └── index.ts                   // export states
  ├── table-components             // configuration of table components
  │ ├── configs.ts                 // common configuration
  │ ├── index.ts                   // export configuration
  │ ├── links.ts                   // links component configuration
  │ ├── picture.ts                 // picture component configuration
  │ ├── render-html.ts             // custom HTML render component configuration
  │ └── text.ts                    // text component configuration
  ├── utils
  │ └── common.ts                  // common functions
  ├── context.ts                   // global context
  ├── drip-table-generator.tsx     // entry
  ├── hooks.ts                     // global states
  ├── index.module.less            // global styles
  ├── index.ts                     // export
  ├── shims-styles.d.ts            // style type definition
  ├── shims-window.d.ts            // global variations definition
  ├── typing.ts                    // generator props type definition
  └── wrapper.ts                   // generator app root element
```

## Development

### Preparation

1. Install dependencies

  ```sh
    lerna bootstrap
  ```

2. run project

  ```sh
    yarn start
  ```

### Steps

1. Fork.
2. create a new branch which shall be named to express the features briefly.
3. make your own changes and submit.
4. create a pull request.

### Cautions

- Use React.memo to wrap a functional component, and compare props to update the wrapped component.
- Merge related states instead of using too many useStates.
- Do not use arrow functions to assign to event functions as values directly. (Reference: [How to read an often-changing value from useCallback?](https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback))
- Either class component or functional component while defining a component as much as possible.

## Release

add owner in npm depository for the first time.

```sh
npm owner add [username] drip-table-generator
```

### Version number modification rules

- Major version number(1): Required. Modify when there are major changes in the functional modules, such as adding multiple modules or changing the architecture. Whether to modify this version number is determined by the project manager.

- Sub version number(2): Required. Modify when the function has a certain increase or change, such as adding authority management, adding custom views, etc. Whether to modify this version number is determined by the project manager.

- Phase version number(3): Required. Generally, a revised version is released when a bug is fixed or a small change is made. The time interval is not limited. When a serious bug is fixed, a revised version can be released. Whether to modify this version number is determined by the project manager.

- Date version number(051021): Optional. The date version number is used to record the date of the modification of the project, and the modification needs to be recorded every day. Whether to modify this version number is determined by developers.

- Greek letter version number(beta): Optional. This version number is used to mark which phrase of development the current software is in, and it needs to be modified when the software enters to another phrase. Whether to modify this version number is determined by the project manager.

```sh
git commit -m 'release: drip-table-generator 1.2.3'
lerna run build --stream --scope=drip-table-generator
cd packages/drip-table-generator
npm publish --access=public
```
