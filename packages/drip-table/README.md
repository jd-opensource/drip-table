# Drip-Table Development Guide

`Drip-Table` is the core library of the solution for building dynamic tables. It's main ability is to render a dynamic table automatically when received data which conforms to the `JSON Schema` standard.

## Directory

- update continually

```
├── src                            // source code
  ├── components                   // common components that drip-table depends on
  │ ├── ErrorBoundary              // error notification component
  │ ├── Highlight                  // highlight component
  │ └── RichText                   // HTML character rendering component
  ├── drip-table                   // drip-table main component
  │ ├─ components                  // built-in common components
  │ | ├── image                    // picture display component
  │ | ├── link                     // link operation component
  │ | ├── render-html              // custom HTML render component
  │ | ├── text                     // text display component
  │ | ├── components.ts            // common type definition
  │ | └── index.ts                 // export
  | ├── header                     // header of table
  | ├── utils                      // util functions
  | └── virtual-table              // virtual scrollable table
  ├── drip-table-provider          // drip-table entry
  ├── context.ts                   // export global context
  ├── hooks.ts                     // global states
  ├── index.ts                     // export
  ├── shims-styles.d.ts            // style type definition
  └── types.ts                     // export type definition
```

## Development

### Steps
1. create a new branch that names to express the features simply.
2. coding in local branch.
3. add documents of new features in `docs/drip-table` directory.
4. add features in `docs/drip-table/changelog` file.
5. submit code and merge into `master` branch.
6. modify version infomation in `package.json` file.
7. submit and push code.
8. release new version.

### Cautions
- Use React.memo to wrap a functional component, and compare props to update the wrapped component.
- Merge related states instead of using too many useStates.
- Do not use arrow functions to assgin to event functions as values directly. (Reference: [How to read an often-changing value from useCallback?](https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback))
- Either class component or functional component while definiting a component as much as possible.

## Release

add owner in npm depository for the first time.

```sh
npm owner add [username] drip-table
```

### Version number modification rules

- Major version number(1): Required. Modify when there are major changes in the functional modules, such as adding multiple modules or changing the architecture. Whether to modify this version number is determined by the project manager.

- Sub version number(2): Required. Modify when the function has a certain increase or change, such as adding authority management, adding custom views, etc. Whether to modify this version number is determined by the project manager.

- Phase version number(3): Required. Generally, a revised version is released when a bug is fixed or a small change is made. The time interval is not limited. When a serious bug is fixed, a revised version can be released. Whether to modify this version number is determined by the project manager.

- Date version number(051021): Optional. The date version number is used to record the date of the modification of the project, and the modification needs to be recorded every day. Whether to modify this version number is determined by developers.

- Greek letter version number(beta): Optional. This version number is used to mark which pharse of development the current software is in, and it needs to be modified when the software enters to another pharse. Whether to modify this version number is determined by the project manager.

```sh
git commit -m 'release: drip-table 1.2.3'
lerna run build --stream --scope=drip-table
cd packages/drip-table
npm publish --access=public
```
